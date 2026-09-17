export const runtime = 'edge';

const APPROVED_DELIMITER = '<<<PROJECT_SCOPE_APPROVED>>>';

interface ScopePayload {
  client_meta?: {
    language_detected?: string;
    session_id?: string;
    timestamp?: string;
  };
  project_brief?: Record<string, string>;
  lead_assessment?: {
    clarity_score?: string;
    recommended_tier?: string;
  };
  human_summary_md?: string;
  agent_brief_md?: string;
  raw_output?: string;
}

// In-memory pickup store — backup only. The POST response carries the payload
// directly, so the frontend does not depend on this (Vercel Edge isolates may
// not share memory across requests).
const pickupStore = new Map<string, { payload: ScopePayload; ts: number }>();
const PICKUP_TTL_MS = 30 * 60 * 1000; // 30 minutes

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function jsonOk(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function sweepStore() {
  const now = Date.now();
  for (const [k, v] of pickupStore) {
    if (now - v.ts > PICKUP_TTL_MS) pickupStore.delete(k);
  }
}

/**
 * Extracts the last JSON object from a string that may contain the approval
 * delimiter followed by the JSON payload (possibly wrapped in code fences).
 */
function extractJson(raw: string): ScopePayload | null {
  let text = raw;
  const idx = text.indexOf(APPROVED_DELIMITER);
  if (idx !== -1) text = text.slice(idx + APPROVED_DELIMITER.length);

  // Strip markdown fences if the model added them despite instructions.
  text = text.replace(/```(?:json)?/g, '').trim();

  const start = text.indexOf('{');
  if (start === -1) return null;

  // Walk from the first '{' to its matching '}' (brace counting, string-aware).
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') inString = true;
    else if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) {
        try {
          return JSON.parse(text.slice(start, i + 1)) as ScopePayload;
        } catch {
          return null;
        }
      }
    }
  }
  return null;
}

/**
 * Lenient repair for common LLM JSON mistakes: unescaped newlines/tabs inside
 * strings, smart quotes, and trailing commas. Returns a repaired string —
 * the caller re-runs extractJson on it.
 */
function repairJson(text: string): string {
  text = text
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'");
  const out: string[] = [];
  let inString = false;
  let escaped = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (!inString) {
      if (ch === '"') {
        inString = true;
        out.push(ch);
        continue;
      }
      if (ch === ',') {
        // Trailing comma lookahead: skip whitespace, drop comma before } or ].
        let j = i + 1;
        while (j < text.length && /\s/.test(text[j])) j++;
        if (j < text.length && (text[j] === '}' || text[j] === ']')) continue;
      }
      out.push(ch);
      continue;
    }
    // Inside a string.
    if (escaped) {
      escaped = false;
      out.push(ch);
      continue;
    }
    if (ch === '\\') {
      escaped = true;
      out.push(ch);
      continue;
    }
    if (ch === '"') {
      inString = false;
      out.push(ch);
      continue;
    }
    if (ch === '\n') {
      out.push('\\n');
      continue;
    }
    if (ch === '\r') continue;
    if (ch === '\t') {
      out.push('\\t');
      continue;
    }
    out.push(ch);
  }
  return out.join('');
}

/**
 * GET /api/scope-submit?session_id=X — backup pickup of the finalized package.
 */
export async function GET(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get('session_id') || '';
  if (!sessionId) return jsonError('session_id required', 400);

  const entry = pickupStore.get(sessionId);
  if (!entry) return jsonError('Package not found (expired or not yet submitted)', 404);

  return jsonOk({
    ok: true,
    payload: entry.payload,
  });
}

/**
 * POST /api/scope-submit — parse the approved model output, persist the
 * package, deliver it to configured channels (webhook / email), and return
 * the normalized payload DIRECTLY in the response so the frontend can render
 * the finalized documents without a second request.
 *
 * Delivery is best-effort: a webhook/email failure NEVER fails the request —
 * the lead is already captured (payload in response + pickup store).
 */
export async function POST(req: Request): Promise<Response> {
  let body: { raw?: string; sessionId?: string };
  try {
    body = await req.json();
  } catch {
    return jsonError('Invalid JSON body', 400);
  }

  const raw = typeof body.raw === 'string' ? body.raw : '';
  const sessionId =
    typeof body.sessionId === 'string' && body.sessionId
      ? body.sessionId
      : 'tgt-discovery-session';

  if (!raw.includes(APPROVED_DELIMITER)) {
    return jsonError('Approval marker missing', 400);
  }
  if (raw.length > 100000) {
    return jsonError('Payload too large', 400);
  }

  // Parse: strict first, then the repair pass for malformed model JSON.
  let payload = extractJson(raw);
  let parseWarning: string | null = null;
  if (!payload) {
    payload = extractJson(repairJson(raw));
    if (payload) parseWarning = 'json_repaired';
  }
  if (!payload || !payload.project_brief) {
    // Degraded mode: never lose the lead — preserve the raw model output.
    payload = {
      project_brief: {},
      lead_assessment: {},
      human_summary_md: '',
      agent_brief_md: '',
      raw_output: raw.slice(0, 40000),
    };
    parseWarning = 'json_parse_failed_raw_preserved';
  }

  // Normalise session metadata server-side (never trust model-authored meta).
  payload.client_meta = {
    language_detected: payload.client_meta?.language_detected || 'unknown',
    session_id: sessionId,
    timestamp: new Date().toISOString(),
  };

  // Guarantee both handoff documents exist (defensive: older prompt versions).
  payload.human_summary_md = payload.human_summary_md || '';
  payload.agent_brief_md = payload.agent_brief_md || '';

  // Persist for backup pickup.
  sweepStore();
  pickupStore.set(sessionId, { payload, ts: Date.now() });

  const webhookUrl = process.env.SCOPE_WEBHOOK_URL;
  const notifyEmail = process.env.SCOPE_NOTIFY_EMAIL || 'contact@tgtanalytics.com';

  const delivered: string[] = [];
  const deliveryErrors: string[] = [];

  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          source: 'tgt-scope-architect',
          type: 'project_scope.approved',
          session_id: sessionId,
          received_at: new Date().toISOString(),
          ...payload,
        }),
      });
      if (res.ok) delivered.push('webhook');
      else deliveryErrors.push(`webhook HTTP ${res.status}`);
    } catch (err) {
      deliveryErrors.push(`webhook: ${err instanceof Error ? err.message : 'network error'}`);
    }
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const brief = payload.project_brief as Record<string, string>;
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${resendKey}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.SCOPE_EMAIL_FROM || 'Scope Architect <noreply@tgtanalytics.com>',
          to: [notifyEmail],
          subject: `New Project Scope — ${sessionId}`,
          text: [
            '=== CLIENT-FACING SUMMARY ===',
            payload.human_summary_md,
            '',
            '=== AGENT HANDOFF BRIEF ===',
            payload.agent_brief_md,
            '',
            '=== STRUCTURED DATA ===',
            JSON.stringify(payload, null, 2),
          ].join('\n'),
        }),
      });
      if (res.ok) delivered.push('email');
      else deliveryErrors.push(`email HTTP ${res.status}: ${(await res.text()).slice(0, 150)}`);
    } catch (err) {
      deliveryErrors.push(`email: ${err instanceof Error ? err.message : 'network error'}`);
    }
  }

  // ok=true: the payload is secured and returned in this response. Delivery
  // problems are reported as diagnostics, not as a failed request.
  return jsonOk({
    ok: true,
    delivered,
    delivery_errors: deliveryErrors,
    pickup_available: true,
    session_id: sessionId,
    ...(parseWarning ? { parse_warning: parseWarning } : {}),
    payload,
  });
}