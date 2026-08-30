"use client";

import React, { useState } from 'react';
import { ArrowRight, Bot, Users, Briefcase, Zap, Shield, Cpu } from 'lucide-react';

interface AudienceModule {
  id: string;
  tag: string;
  title: string;
  badge: string;
  description: string;
  capabilities: string[];
  statLabel: string;
  statValue: string;
}

const AUDIENCES: AudienceModule[] = [
  {
    id: 'agencies',
    tag: 'AGENCY & CONSULTING',
    title: 'SyncBiz for Consultancies & Agencies',
    badge: 'Automated Extraction',
    description:
      'Created specifically because software consultancies and client-service businesses need unified data extraction without messy manual client onboarding.',
    capabilities: [
      'Multi-tenant client intake automation',
      'Continuous Jira & GitHub sprint digest generation',
      'Automated weekly client KPI synthesis',
      'Zero-leak workspace permission isolation',
    ],
    statLabel: 'ONBOARDING VELOCITY',
    statValue: '4x Acceleration',
  },
  {
    id: 'operations',
    tag: 'OPERATIONS & SMBS',
    title: 'SyncBiz for Real-Life Small & Mid-Sized Businesses',
    badge: '24/7 Operations',
    description:
      'Eliminate the administrative tax that slows down business growth. SyncBiz agents handle repetitive paperwork, order triage, and CRM updates in real time.',
    capabilities: [
      'Real-time WhatsApp & Email customer routing',
      'Automated document validation and operational record sync',
      'Dynamic staff shift scheduling & SMS alerts',
      'Inventory stock replenishment triggers',
    ],
    statLabel: 'ADMIN OVERHEAD REDUCTION',
    statValue: '-72% Hours',
  },
  {
    id: 'marketing',
    tag: 'GROWTH & REVENUE',
    title: 'SyncBiz for Marketing & Sales Pipelines',
    badge: 'Zero Lead Loss',
    description:
      'Autonomous lead qualification and CRM orchestration that acts before leads turn cold. Connect your ads directly to instant conversational AI qualifiers.',
    capabilities: [
      'Instant 60-second inbound lead qualification',
      'CRM multi-stage synchronization (HubSpot, Salesforce, Pipedrive)',
      'Automated personalized follow-up sequences',
      'Live conversion attribution & ROI logging',
    ],
    statLabel: 'LEAD RESPONSE TIME',
    statValue: '< 30 Seconds',
  },
  {
    id: 'analytics',
    tag: 'EXECUTIVE ANALYTICS',
    title: 'SyncBiz Operational Intelligence & Resource Modeling',
    badge: 'Predictive Engine',
    description:
      'Autonomous operational forecasting and resource utilization telemetry. Dynamic workload allocation modeling and bottleneck forecasting built with enterprise rigor.',
    capabilities: [
      'Operational workload resilience tracking',
      'Capacity runway burn-rate simulations',
      'Autonomous task & schedule reconciliation',
      'Isolated per-tenant operational database architecture',
    ],
    statLabel: 'FORECAST ACCURACY',
    statValue: '99.4% Precision',
  },
];

export const SyncBizFeature: React.FC = () => {
  const [selectedAudience, setSelectedAudience] = useState<string>('operations');

  const currentModule = AUDIENCES.find((a) => a.id === selectedAudience) || AUDIENCES[1];

  return (
    <section id="syncbiz" className="py-24 max-w-[1200px] mx-auto px-6">
      {/* Section Eyebrow */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="status-pulse-orange"></span>
          <span className="font-mono text-[12px] uppercase tracking-[-0.24px] text-[#b8b3b0]">
            SIGNATURE ENGINE // CONSOLIDATED SYNCBIZ AGENTS
          </span>
        </div>
        <h2 className="text-[36px] sm:text-[44px] font-normal leading-[1.1] tracking-[-1.12px] text-[#eeeeee]">
          Autonomous agents tailored to your business sector.
        </h2>
      </div>

      {/* Selector Tabs (Geist Mono Uppercase) */}
      <div className="flex flex-wrap gap-2 mb-8 font-mono text-[12px]">
        {AUDIENCES.map((aud) => (
          <button
            key={aud.id}
            onClick={() => setSelectedAudience(aud.id)}
            className={`px-4 py-2.5 rounded-[3px] border transition-all duration-150 ${
              selectedAudience === aud.id
                ? 'bg-[#1f1d1c] border-[#fafafa] text-[#fafafa]'
                : 'bg-transparent border-[#1d1a18] text-[#8a8380] hover:text-[#eeeeee] hover:border-[#3d3a39]'
            }`}
          >
            {aud.tag}
          </button>
        ))}
      </div>

      {/* Signature High-Contrast BONE CARD (#eeeeee on #101010 Canvas) */}
      <div className="bone-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12">
        {/* Left 7 Columns: Core Value Description */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[3px] bg-[#101010] text-[#fafafa] font-mono text-[11px] uppercase tracking-tight">
            <Bot className="w-3.5 h-3.5 text-[#ee6018]" />
            <span>{currentModule.badge}</span>
          </div>

          <h3 className="text-[28px] sm:text-[36px] font-normal tracking-[-1.12px] text-[#101010] leading-tight">
            {currentModule.title}
          </h3>

          <p className="text-[16px] text-[#4d4947] leading-relaxed font-normal">
            {currentModule.description}
          </p>

          {/* Capabilities in Bone context */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentModule.capabilities.map((cap, idx) => (
              <div key={idx} className="flex items-start gap-2 text-[14px] text-[#101010]">
                <span className="font-mono text-[#ee6018] font-bold">→</span>
                <span className="font-normal">{cap}</span>
              </div>
            ))}
          </div>

          {/* CTA Row inside Bone Card */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="bg-[#101010] hover:bg-[#1f1d1c] text-[#fafafa] px-6 py-3 rounded-[3px] font-mono text-[13px] uppercase tracking-tight inline-flex items-center gap-2 transition-all duration-150"
            >
              <span>Deploy For {currentModule.tag.split(' ')[0]}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <span className="text-[13px] font-mono text-[#8a8380]">
              Zero disruption deployment • 48hr setup
            </span>
          </div>
        </div>

        {/* Right 5 Columns: Visual Terminal Card on Bone Ground */}
        <div className="lg:col-span-5 bg-[#101010] rounded-[6px] p-6 text-[#eeeeee] border border-[#3d3a39]">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1d1a18] font-mono text-[11px] uppercase text-[#8a8380]">
            <span>SYSTEM AUDIT SPEC</span>
            <span className="text-[#ee6018]">LIVE METRIC</span>
          </div>

          <div className="space-y-4 font-mono">
            <div>
              <div className="text-[11px] text-[#8a8380] uppercase tracking-tight">
                {currentModule.statLabel}
              </div>
              <div className="text-[32px] text-[#eeeeee] font-normal tracking-[-1.12px]">
                {currentModule.statValue}
              </div>
            </div>

            <div className="pt-3 border-t border-[#1d1a18] space-y-2 text-[12px]">
              <div className="flex justify-between">
                <span className="text-[#8a8380]">AGENT RUNTIME:</span>
                <span className="text-[#fafafa]">SyncBiz Micro-kernel</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8a8380]">DATA ISOLATION:</span>
                <span className="text-[#a0ca92]">Encrypted &amp; Isolated</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8a8380]">HUMAN OVERRIDE:</span>
                <span className="text-[#fafafa]">1-Click Fallback</span>
              </div>
            </div>

            <div className="p-3 bg-[#1d1a18] rounded-[3px] text-[11px] text-[#b8b3b0] leading-relaxed">
              <span className="text-[#ee6018]">&gt;</span> SyncBiz agents run directly against your native communication channels and databases with guaranteed transactional consistency.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
