# PSA × AI Fleet — Configuration & Testing Guide

**Project:** tgt-analytics — Project Scope Architect (PSA)
**Gateway:** TGT AI Fleet LiteLLM (`tgt-fleet-gateway`, port 4003)
**Last updated:** September 2026

---

## 1. What was built

The PSA now routes LLM calls through your AI Fleet's LiteLLM gateway **first**, with OpenRouter as automatic fallback:

```
Browser ──POST /api/chat──► Vercel Edge
                              │
                              ├─ 1st: Fleet LiteLLM (FLEET_GATEWAY_URL + FLEET_LITELLM_KEY)
                              │      models: glm-5.2 → deepseek-v4-flash:0731
                              │
                              ├─ 2nd: OpenRouter (OPENROUTER_API_KEY)
                              │      models: gemini-flash → claude-haiku
                              │
                              ▼
                     stream to client (delimiter + JSON stripped)
                              │
              on <<<PROJECT_SCOPE_APPROVED>>> ──►
                              │
Browser POST /api/scope-submit ──► parses JSON + 2 markdown docs
                              │
              ├─ in-memory pickup store (frontend reads it back)
              ├─ SCOPE_WEBHOOK_URL (optional)
              └─ RESEND_API_KEY → contact@tgtanalytics.com
```

**Final output = 2 documents**, both shown in the finalized UI with a download button:

1. **`human_summary_md`** — client-facing summary in the client's own language (jargon-free).
2. **`agent_brief_md`** — English handoff brief for your planning agent (Hermes/Claude/Codex), with numbered functional requirements (FR-1..n), data & integrations, delivery plan, and **open design questions** the agent should ask you next.

Both documents are also delivered via webhook/email together with the structured JSON.

---

## 2. Environment variables (Vercel → Settings → Environment Variables)

| Variable | Required | Value |
|---|---|---|
| `FLEET_GATEWAY_URL` | yes (for Fleet) | `https://fleet.syncbizagent.com/v1` (remote) or `http://<fleet-host>:4003/v1` (local/LAN) |
| `FLEET_LITELLM_KEY` | yes (for Fleet) | The `LITELLM_MASTER_KEY` from the Fleet's `.env` |
| `SCOPE_FLEET_MODEL` | no | Default `glm-5.2`. Alternatives: `kimi-k2.7-code`, `deepseek-v4-flash:0731`, `kimi-k3` |
| `OPENROUTER_API_KEY` | recommended | Fallback when the Fleet gateway is down |
| `SCOPE_MODEL_PRIMARY` | no | OpenRouter primary (default `google/gemini-2.0-flash-001`) |
| `SCOPE_MODEL_FALLBACK` | no | OpenRouter fallback (default `anthropic/claude-3-5-haiku`) |
| `SCOPE_WEBHOOK_URL` | optional | Webhook (e.g. n8n / Slack / SyncBiz) that receives the full scope package |
| `RESEND_API_KEY` | optional | Enables email delivery to `SCOPE_NOTIFY_EMAIL` |
| `SCOPE_NOTIFY_EMAIL` | no | Default `contact@tgtanalytics.com` |

> The app works with **either** gateway. If both env vars are absent, `/api/chat` returns a clear 503 telling you what to set.

---

## 3. Fleet-side requirements (your AI Fleet project)

1. **Gateway reachable:** `docker ps` → `tgt-fleet-gateway` must be `Up` and `:4003` mapped.
2. **Master key:** `grep LITELLM_MASTER_KEY .env` on the Fleet host. That value goes into `FLEET_LITELLM_KEY` on Vercel.
3. **Public exposure (for Vercel):** the gateway must be reachable from Vercel's edge. If you only have `http://localhost:4003`, Vercel can't reach it — use the public URL `https://fleet.syncbizagent.com/v1` (already proxied by nginx in your connection.md topology: `/api/*` and WebSocket are proxied; **verify `/v1` is proxied too** — if not, add it to the nginx config).
4. **CORS:** not an issue — the browser never calls the gateway directly; only the Vercel Edge function does (server-to-server).

---

## 4. Testing step by step

### 4.1 Test the Fleet gateway directly (before touching Vercel)

From any machine:

```bash
curl -s https://fleet.syncbizagent.com/v1/chat/completions \
  -H "Authorization: Bearer $LITELLM_MASTER_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"glm-5.2","messages":[{"role":"user","content":"Say FLEET GATEWAY OK"}],"max_tokens":10}'
```

Expected: a chat completion JSON. If you get 401 → wrong key; 404/502 → `/v1` not proxied publicly.

### 4.2 Test locally with the real Fleet gateway

```bash
cd tgt-analytics
npm run dev   # port 3008
```

Create `.env.local` (gitignored):

```
FLEET_GATEWAY_URL=https://fleet.syncbizagent.com/v1
FLEET_LITELLM_KEY=<your LITELLM_MASTER_KEY>
```

Open `http://localhost:3008/scope-architect` and run a full interview. When you approve the summary, you should see the two documents (tabs "Your Summary" / "Engineering Brief") with download buttons.

### 4.3 Test the fallback chain

Temporarily set `FLEET_GATEWAY_URL=http://localhost:9999` (dead port) and confirm the chat still works through OpenRouter. Then check the response header `x-router-used` (e.g. `openrouter/google/gemini-2.0-flash-001`).

### 4.4 Test email/webhook delivery

Set `SCOPE_WEBHOOK_URL` to a webhook.site URL or your n8n endpoint, approve an interview, and confirm the payload contains `human_summary_md` + `agent_brief_md` + `project_brief`.

### 4.5 Deploy to Vercel

```bash
vercel --prod
```

Then set the env vars in the Vercel dashboard (Production scope) and redeploy.

---

## 5. Feeding the brief to your planning agent

When a session finalizes, click **Download Brief (.md)** on the "Engineering Brief" tab, then paste it into your planning agent with:

> "This is a client-approved project brief. Start by reviewing the Open Design Questions in section 7 and ask me these one by one so we can design, plan, and execute the project together."

---

## 6. Security notes (IMPORTANT)

While auditing the Fleet repo I found the `FLEET_API_KEY` master token committed in plaintext in `connection.md` (line ~69: `FLEET_API_KEY=cd0895de...`). **Rotate it** (`FLEET_API_KEY` in the Fleet `.env`, then `docker compose up -d --force-recreate backend frontend gateway-sidecar`) and remove it from the markdown — anyone with that token can push heartbeats and control nodes on your dashboard. The same file documents `LITELLM_MASTER_KEY` handling correctly (never commit it).

---

## 7. Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| 503 "No LLM gateway configured" | Neither gateway env var set | Set `FLEET_GATEWAY_URL`+`FLEET_LITELLM_KEY` or `OPENROUTER_API_KEY` |
| `All gateways unreachable ... HTTP 401` | Wrong master key | Re-read `LITELLM_MASTER_KEY` from Fleet `.env` |
| `HTTP 404` from Fleet | `/v1` not proxied publicly | Add `/v1` proxy rule in Fleet nginx (see connection.md topology) |
| Interview streams but never approves | Model keeps interviewing | Say "yes, approved" explicitly; the model emits the delimiter only on explicit confirmation |
| Documents empty in finalized view | Model emitted JSON without the two markdown fields | Model quality issue — switch `SCOPE_FLEET_MODEL` to `kimi-k2.7-code` or set `SCOPE_MODEL_PRIMARY` to a stronger model |
| Node never appears on Fleet dashboard | (unrelated) — PSA is a Vercel consumer of the gateway, not a Fleet node | n/a |

---

## 8. Architecture files touched (this implementation)

- `src/app/api/chat/route.ts` — dual-gateway router + SSE→text streaming + delimiter interception + `\u0000{approved, raw}` trailer
- `src/app/api/scope-submit/route.ts` — JSON extraction (fence-tolerant), package persistence (GET pickup), webhook + Resend email delivery
- `src/components/ScopeArchitect.tsx` — chat UI, state machine, finalized two-document view, .md download
- `src/app/scope-architect/page.tsx` — dedicated page
- `src/components/Navbar.tsx`, `src/components/Footer.tsx` — navigation entries