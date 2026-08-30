"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight, Terminal, Activity, Layers, Cpu, ShieldCheck } from 'lucide-react';
import { AgentLog } from '../types';

export const Hero: React.FC = () => {
  const [logs, setLogs] = useState<AgentLog[]>([
    {
      id: '1',
      timestamp: '18:04:12',
      agent: 'SyncBiz::LeadRouter',
      action: 'Qualified enterprise inbound (Score: 94/100) -> CRM synced',
      status: 'synced',
      latency: '142ms',
    },
    {
      id: '2',
      timestamp: '18:04:19',
      agent: 'BI::AnomalyDetector',
      action: 'Detected inventory velocity drift (+18.4% WoW)',
      status: 'active',
      latency: '89ms',
    },
    {
      id: '3',
      timestamp: '18:04:27',
      agent: 'Core::DataReconciler',
      action: 'Reconciled 42 operational records against primary database',
      status: 'synced',
      latency: '210ms',
    },
  ]);

  const [activeTab, setActiveTab] = useState<'telemetry' | 'agent-cluster' | 'bi-stream'>('telemetry');

  // Simulated live event stream
  useEffect(() => {
    const streamPool: Array<{ agent: string; action: string; latency: string }> = [
      { agent: 'SyncBiz::SupportDispatcher', action: 'Auto-resolved Level-1 ticket for SMB retail client', latency: '98ms' },
      { agent: 'BI::DemandForecaster', action: 'Regenerated weekly revenue vector for Q3 projection', latency: '320ms' },
      { agent: 'Core::WebhookIngest', action: 'Processed 1,240 transactional telemetry events with zero loss', latency: '45ms' },
      { agent: 'SyncBiz::QuoteSynthesizer', action: 'Drafted tailored RFP response from pricing matrix', latency: '180ms' },
    ];

    const interval = setInterval(() => {
      const randomEvent = streamPool[Math.floor(Math.random() * streamPool.length)];
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      
      setLogs((prev) => [
        {
          id: Math.random().toString(),
          timestamp: timeStr,
          agent: randomEvent.agent,
          action: randomEvent.action,
          status: 'synced',
          latency: randomEvent.latency,
        },
        ...prev.slice(0, 3),
      ]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-40 pb-20 md:pt-48 md:pb-28 px-6 max-w-[1200px] mx-auto border-b border-[#1d1a18]">
      {/* Background technical grain */}
      <div className="absolute inset-0 terminal-grid-bg opacity-40 pointer-events-none -z-10"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        {/* Left Column: Copy & CTAs */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="status-pulse-orange"></span>
            <span className="font-mono text-[12px] uppercase tracking-[-0.24px] text-[#b8b3b0]">
              LIVE DISPATCH // CLUSTER V3.8 ONLINE
            </span>
          </div>

          {/* Slogan & Main Heading */}
          <h1 className="text-[42px] sm:text-[54px] lg:text-[64px] font-normal leading-[1.0] tracking-[-2.88px] text-[#eeeeee] mb-6">
            Real-World Business,<br />
            AI-Powered Solutions.
          </h1>

          {/* Subtitle */}
          <p className="text-[16px] text-[#8a8380] leading-[1.5] mb-8 font-normal max-w-lg">
            TGT Analytics builds high-throughput software architectures, autonomous operational agents powered by <span className="text-[#eeeeee]">SyncBiz</span>, and predictive Business Intelligence tailored for real-world enterprise & SMB workflows.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <a
              href="#contact"
              className="btn-dark text-[14px] font-normal tracking-tight"
            >
              Deploy Agent Cluster
            </a>
            <a
              href="#architecture"
              className="ghost-link text-[14px] tracking-tight group"
            >
              Explore Architecture
              <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* System Spec Keypoints */}
          <div className="pt-6 border-t border-[#1d1a18] grid grid-cols-3 gap-4 font-mono text-[12px]">
            <div>
              <div className="text-[#8a8380] uppercase tracking-[-0.24px]">UPTIME</div>
              <div className="text-[#eeeeee] mt-1 text-[15px] font-normal">99.98%</div>
            </div>
            <div>
              <div className="text-[#8a8380] uppercase tracking-[-0.24px]">AVG LATENCY</div>
              <div className="text-[#a0ca92] mt-1 text-[15px] font-normal">&lt; 140ms</div>
            </div>
            <div>
              <div className="text-[#8a8380] uppercase tracking-[-0.24px]">AGENTS ACTIVE</div>
              <div className="text-[#eeeeee] mt-1 text-[15px] font-normal">24/7 Sync</div>
            </div>
          </div>
        </div>

        {/* Right Column: Factory War Room Dashboard Terminal Frame */}
        <div id="live-dashboard" className="lg:col-span-7">
          <div className="bg-[#0d0d0d] border border-[#1d1a18] rounded-[10px] overflow-hidden">
            {/* macOS Chrome Header */}
            <div className="h-10 bg-[#161413] px-4 flex items-center justify-between border-b border-[#1d1a18]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#3d3a39]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#3d3a39]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#3d3a39]"></div>
                <span className="ml-3 font-mono text-[11px] uppercase tracking-tight text-[#8a8380]">
                  tgt-war-room // node-us-east-01
                </span>
              </div>

              {/* Status Switcher Tabs */}
              <div className="flex items-center gap-1 font-mono text-[11px]">
                <button
                  onClick={() => setActiveTab('telemetry')}
                  className={`px-2.5 py-1 rounded-[2px] transition-colors ${
                    activeTab === 'telemetry'
                      ? 'bg-[#1f1d1c] text-[#eeeeee]'
                      : 'text-[#8a8380] hover:text-[#eeeeee]'
                  }`}
                >
                  TELEMETRY
                </button>
                <button
                  onClick={() => setActiveTab('agent-cluster')}
                  className={`px-2.5 py-1 rounded-[2px] transition-colors ${
                    activeTab === 'agent-cluster'
                      ? 'bg-[#1f1d1c] text-[#eeeeee]'
                      : 'text-[#8a8380] hover:text-[#eeeeee]'
                  }`}
                >
                  SYNCBIZ
                </button>
                <button
                  onClick={() => setActiveTab('bi-stream')}
                  className={`px-2.5 py-1 rounded-[2px] transition-colors ${
                    activeTab === 'bi-stream'
                      ? 'bg-[#1f1d1c] text-[#eeeeee]'
                      : 'text-[#8a8380] hover:text-[#eeeeee]'
                  }`}
                >
                  BI INSIGHTS
                </button>
              </div>
            </div>

            {/* Metric Tiles 2x2 Grid */}
            <div className="grid grid-cols-2 divide-x divide-y divide-[#1d1a18] border-b border-[#1d1a18]">
              {/* Metric 1 */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[12px] uppercase text-[#b8b3b0] tracking-[-0.24px]">
                    AUTONOMOUS ACTIONS / DAY
                  </span>
                  <Activity className="w-3.5 h-3.5 text-[#ee6018]" />
                </div>
                <div className="text-[32px] sm:text-[36px] font-normal text-[#eeeeee] tracking-[-1.12px] leading-tight">
                  84,290
                </div>
                {/* Sparkline in Orange */}
                <div className="mt-3 h-8 w-full flex items-end gap-1">
                  {[24, 30, 28, 45, 40, 52, 60, 58, 70, 68, 85, 92].map((val, idx) => (
                    <div
                      key={idx}
                      style={{ height: `${val}%` }}
                      className="flex-1 bg-[#ee6018] rounded-t-[1px] opacity-80"
                    ></div>
                  ))}
                </div>
              </div>

              {/* Metric 2 */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[12px] uppercase text-[#b8b3b0] tracking-[-0.24px]">
                    SMB COST EFFICIENCY
                  </span>
                  <span className="font-mono text-[11px] text-[#a0ca92]">+64.8%</span>
                </div>
                <div className="text-[32px] sm:text-[36px] font-normal text-[#eeeeee] tracking-[-1.12px] leading-tight">
                  $184.2K <span className="text-[14px] text-[#8a8380] font-mono">/ mo saved</span>
                </div>
                {/* Sparkline in Green */}
                <div className="mt-3 h-8 w-full flex items-end gap-1">
                  {[30, 35, 42, 48, 50, 58, 62, 70, 75, 82, 88, 96].map((val, idx) => (
                    <div
                      key={idx}
                      style={{ height: `${val}%` }}
                      className="flex-1 bg-[#a0ca92] rounded-t-[1px] opacity-80"
                    ></div>
                  ))}
                </div>
              </div>

              {/* Metric 3 */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[12px] uppercase text-[#b8b3b0] tracking-[-0.24px]">
                    PIPELINE THROUGHPUT
                  </span>
                  <Layers className="w-3.5 h-3.5 text-[#8a8380]" />
                </div>
                <div className="text-[28px] sm:text-[32px] font-normal text-[#eeeeee] tracking-[-1.12px] leading-tight">
                  1.42M <span className="text-[14px] text-[#8a8380] font-mono">events / hr</span>
                </div>
                <div className="mt-2 text-[12px] text-[#8a8380] font-mono">
                  SyncBiz Ingest: <span className="text-[#a0ca92]">Healthy</span>
                </div>
              </div>

              {/* Metric 4 */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[12px] uppercase text-[#b8b3b0] tracking-[-0.24px]">
                    DATA WAREHOUSE SYNC
                  </span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#a0ca92]" />
                </div>
                <div className="text-[28px] sm:text-[32px] font-normal text-[#eeeeee] tracking-[-1.12px] leading-tight">
                  Snowflake / PG
                </div>
                <div className="mt-2 text-[12px] text-[#8a8380] font-mono">
                  Continuous BI Models: <span className="text-[#ee6018]">Live ETL</span>
                </div>
              </div>
            </div>

            {/* Live Terminal Stream Feed */}
            <div className="p-5 bg-[#0a0a0a]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#8a8380]">
                  <Terminal className="w-3 h-3 text-[#ee6018]" />
                  <span>Real-Time Autonomous Dispatch Feed</span>
                </div>
                <span className="status-pulse-green"></span>
              </div>

              <div className="space-y-2 font-mono text-[12px]">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2 rounded-[3px] bg-[#101010] border border-[#1d1a18] text-[#8a8380]"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-[#4d4947]">{log.timestamp}</span>
                      <span className="text-[#ee6018] font-medium">{log.agent}:</span>
                      <span className="text-[#eeeeee] truncate">{log.action}</span>
                    </div>
                    <span className="text-[10px] text-[#8a8380] px-1.5 py-0.5 rounded bg-[#1d1a18] self-start sm:self-auto shrink-0">
                      {log.latency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
