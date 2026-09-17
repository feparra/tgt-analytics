"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Send, RotateCcw, CheckCircle2, Sparkles, User, Download, FileText, Bot } from 'lucide-react';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

type Phase = 'interviewing' | 'confirming' | 'finalized';

interface FinalPackage {
  human_summary_md: string;
  agent_brief_md: string;
  recommended_tier?: string;
  clarity_score?: string;
}

const WELCOME_MESSAGE = `Welcome to TGT Analytics — Project Scope Architect.
I am here to help you transform your idea, workflow, or business challenge into a concrete, executable project blueprint.

*Feel free to express your ideas in any language you prefer (English, Español, Français, Deutsch, etc.) and in your own words.*

To get started: **What is the main challenge, repetitive bottleneck, or new capability you would like to build or automate?**`;

const APPROVED_MARKER = '<<<PROJECT_SCOPE_APPROVED>>>';
const CONTROL_SEP = '\u0000';

function newSessionId(): string {
  const rand = Math.random().toString(36).slice(2, 8);
  return `tgt-discovery-${rand}`;
}

/** Minimal markdown → HTML for the finalized documents (headings, bold, lists, paragraphs). */
function renderMarkdown(md: string): string {
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const lines = esc(md).split('\n');
  const out: string[] = [];
  let inList = false;
  for (const line of lines) {
    const bolded = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    const li = bolded.match(/^\s*[-*]\s+(.*)/);
    if (li) {
      if (!inList) {
        out.push('<ul class="scope-doc-ul">');
        inList = true;
      }
      out.push(`<li>${li[1]}</li>`);
      continue;
    }
    if (inList) {
      out.push('</ul>');
      inList = false;
    }
    const h = bolded.match(/^(#{1,3})\s+(.*)/);
    if (h) {
      const lvl = h[1].length + 2; // h2..h4 visually
      out.push(`<h${lvl} class="scope-doc-h${lvl}">${h[2]}</h${lvl}>`);
      continue;
    }
    if (bolded.trim() === '') {
      out.push('<div class="scope-doc-sp"></div>');
      continue;
    }
    out.push(`<p class="scope-doc-p">${bolded}</p>`);
  }
  if (inList) out.push('</ul>');
  return out.join('');
}

export const ScopeArchitect: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('interviewing');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [finalPackage, setFinalPackage] = useState<FinalPackage | null>(null);
  const [activeDoc, setActiveDoc] = useState<'human' | 'agent'>('human');
  const [sessionId, setSessionId] = useState(newSessionId);

  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const lastApprovedRef = useRef<string | null>(null);

  // Auto-scroll to bottom as new content streams in.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isStreaming]);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setPhase('interviewing');
    setMessages([{ role: 'assistant', content: WELCOME_MESSAGE }]);
    setInput('');
    setError(null);
    setFinalPackage(null);
    setActiveDoc('human');
    lastApprovedRef.current = null;
    setSessionId(newSessionId());
  }, []);

  const finalize = useCallback(async (rawApproved: string) => {
    if (lastApprovedRef.current === rawApproved) return; // dedupe double-fires
    lastApprovedRef.current = rawApproved;
    try {
      const res = await fetch('/api/scope-submit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ raw: rawApproved, sessionId }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        // Pickup the full package (with both markdown documents).
        const pick = await fetch(`/api/scope-submit?session_id=${encodeURIComponent(sessionId)}`);
        if (pick.ok) {
          const pkg = await pick.json().catch(() => ({}));
          if (pkg.payload) {
            setFinalPackage({
              human_summary_md: pkg.payload.human_summary_md || '',
              agent_brief_md: pkg.payload.agent_brief_md || '',
              recommended_tier: pkg.payload?.lead_assessment?.recommended_tier,
              clarity_score: pkg.payload?.lead_assessment?.clarity_score,
            });
          }
        }
      } else {
        console.error('scope-submit failed', res.status, data);
        setError('Submission failed — your blueprint could not be transmitted. Please try again.');
      }
    } catch (err) {
      console.error('scope-submit network error', err);
      setError('Submission network error. Please try again.');
    }
  }, [sessionId]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || isStreaming || phase === 'finalized') return;

    setError(null);
    setInput('');

    const history = [...messages, { role: 'user' as const, content: text }];
    setMessages(history);
    setIsStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ sessionId, messages: history }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Gateway error (${res.status})`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No response stream');

      const decoder = new TextDecoder();
      let acc = '';
      let first = true;
      let streamedLen = 0;

      const appendAssistant = (chunk: string) => {
        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (first || !last || last.role !== 'assistant') {
            next.push({ role: 'assistant', content: chunk });
            first = false;
          } else {
            next[next.length - 1] = { ...last, content: last.content + chunk };
          }
          return next;
        });
      };

      let done = false;
      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        const chunkStr = decoder.decode(value, { stream: true });
        acc += chunkStr;

        // Control trailer: \u0000{...} — sent by the API as the last chunk.
        const ctrlIdx = acc.lastIndexOf(CONTROL_SEP);
        if (ctrlIdx !== -1) {
          const ctrlJson = acc.slice(ctrlIdx + 1);
          let approved = false;
          let rawApproved = '';
          try {
            const ctrl = JSON.parse(ctrlJson);
            if (ctrl.approved === true) {
              approved = true;
              rawApproved = ctrl.raw || '';
            }
          } catch {
            /* not the trailer — keep streaming */
          }
          // Only the text before the control separator is visible content.
          acc = acc.slice(0, ctrlIdx);
          // The delimiter itself (if present in visible text) is stripped.
          const mkIdx = acc.indexOf(APPROVED_MARKER);
          if (mkIdx !== -1) acc = acc.slice(0, mkIdx);
          appendAssistant(acc.slice(streamedLen));
          streamedLen = acc.length;
          done = true;

          if (approved && rawApproved) {
            setPhase('confirming');
            // Server already assembled the full approved payload — deliver it.
            await finalize(rawApproved);
            setPhase('finalized');
          }
          break;
        }
      }

      // Stream ended without control trailer (no approval): flush the rest.
      if (!done) {
        const markerIdx = acc.indexOf(APPROVED_MARKER);
        if (markerIdx !== -1) acc = acc.slice(0, markerIdx);
        appendAssistant(acc.slice(streamedLen));
      }
      setIsStreaming(false);
    } catch (err) {
      setIsStreaming(false);
      if ((err as Error).name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Connection error');
    }
  }, [input, isStreaming, messages, phase, sessionId, finalize]);

  const downloadDoc = useCallback((name: string, content: string) => {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  return (
    <div className="bg-[#0d0d0d] border border-[#1d1a18] rounded-[10px] flex flex-col h-[680px] overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#1d1a18]">
        <div className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[-0.24px] text-[#b8b3b0]">
          <Sparkles className="w-3.5 h-3.5 text-[#ee6018]" />
          Project Scope Architect
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px] text-[#8a8380]">
          <span className="status-pulse-orange" />
          <span>{phase === 'finalized' ? 'SESSION COMPLETE' : 'DISCOVERY LIVE'}</span>
        </div>
      </div>

      {/* Message stream OR finalized documents */}
      {phase === 'finalized' && finalPackage ? (
        <div className="flex-1 overflow-y-auto px-5 py-6">
          {/* Success banner */}
          <div className="flex items-center gap-3 mb-6 pb-5 border-b border-[#1d1a18]">
            <div className="w-10 h-10 rounded-full bg-[#1d1a18] border border-[#3d3a39] flex items-center justify-center text-[#a0ca92] shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[16px] text-[#eeeeee]">Blueprint delivered to TGT engineering</div>
              <div className="font-mono text-[11px] text-[#8a8380] uppercase tracking-[-0.24px] mt-1">
                {finalPackage.recommended_tier ? `RECOMMENDED TIER: ${finalPackage.recommended_tier}` : 'TGT DISCOVERY LAB'}
                {finalPackage.clarity_score ? ` // CLARITY: ${finalPackage.clarity_score.toUpperCase()}` : ''}
              </div>
            </div>
          </div>

          {/* Document tabs */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveDoc('human')}
              className={`inline-flex items-center gap-2 px-3 h-9 rounded-[3px] font-mono text-[12px] uppercase tracking-[-0.24px] transition-colors ${
                activeDoc === 'human'
                  ? 'bg-[#eeeeee] text-[#101010]'
                  : 'border border-[#3d3a39] text-[#8a8380] hover:text-[#eeeeee] hover:border-[#fafafa]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Your Summary
            </button>
            <button
              onClick={() => setActiveDoc('agent')}
              className={`inline-flex items-center gap-2 px-3 h-9 rounded-[3px] font-mono text-[12px] uppercase tracking-[-0.24px] transition-colors ${
                activeDoc === 'agent'
                  ? 'bg-[#eeeeee] text-[#101010]'
                  : 'border border-[#3d3a39] text-[#8a8380] hover:text-[#eeeeee] hover:border-[#fafafa]'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              Engineering Brief
            </button>
          </div>

          {/* Active document */}
          <div className="bg-[#161413] border border-[#1d1a18] rounded-[3px] p-6 text-[14px] text-[#b8b3b0] leading-[1.6]">
            {activeDoc === 'human' ? (
              finalPackage.human_summary_md ? (
                <div className="scope-doc" dangerouslySetInnerHTML={{ __html: renderMarkdown(finalPackage.human_summary_md) }} />
              ) : (
                <p className="text-[#8a8380]">Summary not available for this session.</p>
              )
            ) : (
              finalPackage.agent_brief_md ? (
                <div className="scope-doc">
                  <div dangerouslySetInnerHTML={{ __html: renderMarkdown(finalPackage.agent_brief_md) }} />
                  <p className="mt-4 pt-4 border-t border-[#1d1a18] text-[12px] text-[#8a8380] font-mono">
                    HANDOFF DOCUMENT // Paste into your planning agent (Hermes, Claude, Codex) to start the design &amp; planning conversation.
                  </p>
                </div>
              ) : (
                <p className="text-[#8a8380]">Brief not available for this session.</p>
              )
            )}
          </div>

          {/* Download buttons */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={() =>
                downloadDoc(
                  activeDoc === 'human' ? `${sessionId}-summary.md` : `${sessionId}-agent-brief.md`,
                  activeDoc === 'human' ? finalPackage.human_summary_md : finalPackage.agent_brief_md
                )
              }
              className="btn-light text-[13px] tracking-tight"
            >
              <Download className="w-4 h-4 mr-2" />
              Download {activeDoc === 'human' ? 'Summary' : 'Brief'} (.md)
            </button>
            <button onClick={reset} className="ghost-link text-[13px] tracking-tight">
              <RotateCcw className="w-3.5 h-3.5 mr-2" />
              New Session
            </button>
          </div>
        </div>
      ) : (
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : ''}`}>
              {m.role === 'assistant' && (
                <div className="w-7 h-7 shrink-0 rounded-[3px] bg-[#1d1a18] border border-[#3d3a39] flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-[#ee6018]" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-[3px] px-4 py-3 text-[14px] leading-[1.5] whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-[#eeeeee] text-[#101010]'
                    : 'bg-[#161413] text-[#eeeeee] border border-[#1d1a18]'
                }`}
              >
                {m.content}
              </div>
              {m.role === 'user' && (
                <div className="w-7 h-7 shrink-0 rounded-[3px] bg-[#eeeeee] flex items-center justify-center shrink-0">
                  <User className="w-3.5 h-3.5 text-[#101010]" />
                </div>
              )}
            </div>
          ))}
          {isStreaming && (
            <div className="flex items-center gap-2 font-mono text-[11px] text-[#8a8380] pl-10">
              <span className="status-pulse-orange"></span>
              <span>ANALYZING REQUIREMENTS...</span>
            </div>
          )}
          {error && (
            <div className="flex items-center justify-between bg-[#1d1a18]/50 border border-[#ee6018]/40 rounded-[3px] px-4 py-2.5 text-[13px] text-[#ee6018]">
              <span>{error}</span>
              <button onClick={reset} className="underline underline-offset-2 hover:text-[#fafafa]">
                Restart
              </button>
            </div>
          )}
        </div>
      )}

      {/* Input area */}
      <div className="border-t border-[#1d1a18] p-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            disabled={isStreaming || phase !== 'interviewing'}
            placeholder={
              phase === 'finalized'
                ? 'Interview complete — this channel is locked'
                : 'Describe your challenge in any language...'
            }
            className="flex-1 bg-[#161413] border border-[#1d1a18] rounded-[3px] px-4 py-2.5 text-[14px] text-[#eeeeee] placeholder-[#4d4947] focus:outline-none focus:border-[#eeeeee] transition-colors disabled:opacity-50"
          />
          <button
            onClick={send}
            disabled={isStreaming || !input.trim() || phase !== 'interviewing'}
            className="btn-light !px-4"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="mt-2 font-mono text-[11px] text-[#8a8380]">
          GUIDED DISCOVERY // 4-STAGE INTERVIEW // POLYGLOT NATIVE
        </p>
      </div>
    </div>
  );
};