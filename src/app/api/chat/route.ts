export const runtime = 'edge';

const SYSTEM_PROMPT = `You are the "Project Scope Architect" (PSA) for TGT Analytics, an expert discovery specialist who helps potential clients conceptualize and define software, automation, and quantitative analytics projects.

CORE DIRECTIVES:
1. POLYGLOT RESPONSE: Detect the user's input language and ALWAYS reply natively in that exact language. Your tone is professional, clear, consultative, and accessible.
2. NO TECH-JARGON: Never discuss technical implementation details (e.g., Docker, SQL schemas, API protocols, microservices, frameworks) DURING the interview. Keep discussions focused on business logic, user experience, data sources, and operational outcomes.
3. SINGLE-INQUIRY FLOW: Ask ONLY ONE primary question per turn to keep the conversation conversational and focused.
4. PROBING INTELLIGENCE: If the user provides an overly brief or abstract answer, ask a specific follow-up question asking for a real-world example before advancing to the next phase.
5. 4-STAGE INTERVIEW:
   - Stage 1: Business pain point & desired impact.
   - Stage 2: Desired output format & end-user decisions.
   - Stage 3: Data origins & update frequency.
   - Stage 4: Integration constraints & target timeline.
6. SYNTHESIS & APPROVAL:
   - When all stages are answered, present a concise "Project Scope Summary" in the user's language.
   - Ask the user to confirm: "Does this accurately reflect your vision?"
   - When the user explicitly agrees/confirms, conclude with a warm closing message in the user's language, then output the final delimiter on its own line:
     <<<PROJECT_SCOPE_APPROVED>>>
     followed immediately by a valid JSON object containing the structured data.

FINAL JSON CONTRACT:
After the delimiter <<<PROJECT_SCOPE_APPROVED>>>, output ONLY a JSON object (no markdown fences, no commentary) with exactly this shape:

{
  "client_meta": {
    "language_detected": "<ISO 639-1 code of the user's language>",
    "session_id": "<the session id provided in the system context>",
    "timestamp": "<current UTC timestamp ISO 8601>"
  },
  "project_brief": {
    "core_problem": "<stage 1 synthesis, in user's language>",
    "expected_outcome": "<stage 2 synthesis, in user's language>",
    "target_users": "<who will use it and what decisions they make, in user's language>",
    "data_sources": "<stage 3 synthesis, in user's language>",
    "update_frequency": "<stage 3 synthesis, in user's language>",
    "constraints": "<stage 4 synthesis, in user's language>",
    "target_timeline": "<stage 4 synthesis, in user's language>"
  },
  "lead_assessment": {
    "clarity_score": "<High | Medium | Low>",
    "recommended_tier": "<SyncBiz Agents | Custom Software | Predictive BI | Custom Architecture / Quantitative Pipeline>"
  },
  "human_summary_md": "<A clean, friendly summary document in the CLIENT'S language, in GitHub-flavored Markdown. Structure: a top heading like '# Tu Proyecto en Resumen' translated to their language, then short sections: What you told us, What we will build, How it will work day-to-day, What happens next. Warm, jargon-free, client-facing tone. Maximum ~350 words. Separate paragraphs with blank lines.>",
  "agent_brief_md": "<A complete handoff document in ENGLISH for the TGT engineering AI agent, in GitHub-flavored Markdown. Structure: '# Project Brief - <project title>'; then sections: '## 1. Objective', '## 2. Functional Requirements' (numbered FR-1..FR-n derived from the interview), '## 3. Data & Integrations' (sources, frequency, constraints), '## 4. Deliverables & UX Expectations', '## 5. Constraints & Non-Goals', '## 6. Suggested Delivery Plan' (3-5 milestone bullets: discovery, MVP, hardening, handoff), '## 7. Open Design Questions' (4-6 specific questions the planning agent should ask the client next). Technical terms ARE allowed here. Maximum ~600 words. Separate paragraphs with blank lines.>"
}`;

const APPROVED_DELIMITER = '<<<PROJECT_SCOPE_APPROVED>>>';

interface RouterTarget {
  name: string;
  baseUrl: string;
  apiKeyEnv: string;
  models: string[];
}

/**
 * Router chain — Fleet LiteLLM gateway first (self-hosted, cheap), OpenRouter
 * as public fallback. Models use each gateway's native naming.
 */
function getRouterChain(): RouterTarget[] {
  const chain: RouterTarget[] = [];

  const fleetUrl = process.env.FLEET_GATEWAY_URL;
  const fleetKey = process.env.FLEET_LITELLM_KEY;
  if (fleetUrl && fleetKey) {
    chain.push({
      name: 'fleet-litellm',
      baseUrl: fleetUrl.replace(/\/+$/, ''),
      apiKeyEnv: 'FLEET_LITELLM_KEY',
      models: [
        process.env.SCOPE_FLEET_MODEL || 'glm-5.2',
        'deepseek-v4-flash:0731',
      ],
    });
  }

  const orKey = process.env.OPENROUTER_API_KEY;
  if (orKey) {
    chain.push({
      name: 'openrouter',
      baseUrl: 'https://openrouter.ai/api/v1',
      apiKeyEnv: 'OPENROUTER_API_KEY',
      models: [
        process.env.SCOPE_MODEL_PRIMARY || 'google/gemini-2.0-flash-001',
        process.env.SCOPE_MODEL_FALLBACK || 'anthropic/claude-3-5-haiku',
      ],
    });
  }

  return chain;
}

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function buildMessages(
  history: { role: string; content: string }[],
  sessionId: string
) {
  return [
    {
      role: 'system',
      content: `${SYSTEM_PROMPT}\n\nSESSION CONTEXT: session_id=${sessionId}; current UTC timestamp=${new Date().toISOString()}.`,
    },
    ...history,
  ];
}

async function callGateway(
  target: RouterTarget,
  model: string,
  history: { role: string; content: string }[],
  sessionId: string
): Promise<Response> {
  const apiKey = target.apiKeyEnv === 'FLEET_LITELLM_KEY'
    ? process.env.FLEET_LITELLM_KEY
    : process.env.OPENROUTER_API_KEY;

  return fetch(`${target.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: buildMessages(history, sessionId),
      temperature: 0.4,
      max_tokens: 4000,
      stream: true,
    }),
  });
}

export async function POST(req: Request): Promise<Response> {
  let body: { messages?: { role: string; content: string }[]; sessionId?: string };
  try {
    body = await req.json();
  } catch {
    return jsonError('Invalid JSON body', 400);
  }

  const history = Array.isArray(body.messages) ? body.messages : [];
  const sessionId =
    typeof body.sessionId === 'string' && body.sessionId
      ? body.sessionId
      : 'tgt-discovery-session';

  // Guardrail: cap the interview length server-side (8 turns = 16 messages).
  if (history.length < 1 || history.length > 16) {
    return jsonError('Invalid conversation length', 400);
  }
  for (const m of history) {
    if (
      !m ||
      (m.role !== 'user' && m.role !== 'assistant') ||
      typeof m.content !== 'string' ||
      m.content.length === 0 ||
      m.content.length > 4000
    ) {
      return jsonError('Invalid message shape', 400);
    }
  }

  const chain = getRouterChain();
  if (chain.length === 0) {
    return jsonError(
      'No LLM gateway configured. Set FLEET_GATEWAY_URL + FLEET_LITELLM_KEY and/or OPENROUTER_API_KEY.',
      503
    );
  }

  let upstream: Response | null = null;
  let lastError = '';
  let usedTarget = '';

  outer: for (const target of chain) {
    for (const model of target.models) {
      try {
        const attempt = await callGateway(target, model, history, sessionId);
        if (attempt.ok) {
          const ct = attempt.headers.get('content-type') || '';
          if (ct.includes('text/event-stream')) {
            upstream = attempt;
            usedTarget = `${target.name}/${model}`;
            break outer;
          }
          lastError = (await attempt.text()).slice(0, 200);
        } else {
          lastError = `${target.name}/${model}: HTTP ${attempt.status}`;
        }
      } catch (err) {
        lastError = `${target.name}/${model}: ${err instanceof Error ? err.message : 'network error'}`;
      }
    }
  }

  if (!upstream || !upstream.body) {
    return jsonError(`All gateways unreachable. Last error: ${lastError}`, 502);
  }

  // Parse the upstream SSE stream and re-emit plain text deltas. When the
  // approval delimiter is detected we STOP forwarding so the raw JSON payload
  // never leaks to the browser. We close the stream with a final control
  // chunk: '\u0000{...}\u0000' carrying delivery metadata for the frontend.
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream!.body!.getReader();
      let buffer = '';
      let full = ''; // full assistant text accumulated
      let forwarded = 0; // chars of visible text already sent to the client
      let cut = -1; // index of the approval delimiter in `full`, once found

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split('\n');
          buffer = lines.pop() ?? ''; // keep incomplete tail line

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith('data:')) continue;
            const data = trimmed.slice(5).trim();
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              const delta: string | undefined = parsed?.choices?.[0]?.delta?.content;
              if (typeof delta !== 'string' || delta.length === 0) continue;

              full += delta;
              if (cut === -1) cut = full.indexOf(APPROVED_DELIMITER);
              // Forward only visible text: stop at the delimiter if found,
              // otherwise hold back a potential partial delimiter tail.
              const safeEnd =
                cut !== -1 ? cut : full.length - APPROVED_DELIMITER.length;
              if (safeEnd > forwarded) {
                controller.enqueue(encoder.encode(full.slice(forwarded, safeEnd)));
                forwarded = safeEnd;
              }
            } catch {
              // Malformed SSE data line — skip.
            }
          }
        }

        // Flush any held-back tail when the stream ended without approval.
        if (cut === -1 && full.length > forwarded) {
          controller.enqueue(encoder.encode(full.slice(forwarded)));
        }
        // Trailing control chunk: tells the client whether the interview is
        // approved. On approval it carries the RAW approved output
        // (delimiter + JSON) so the client can hand it to /api/scope-submit.
        const approved = cut !== -1;
        const trailer = `\u0000${JSON.stringify({
          approved,
          raw: approved ? full.slice(cut) : '',
        })}`;
        controller.enqueue(encoder.encode(trailer));
        controller.close();
      } catch {
        try {
          controller.close();
        } catch {
          /* already closed */
        }
      }
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'no-store',
      'x-router-used': usedTarget,
    },
  });
}