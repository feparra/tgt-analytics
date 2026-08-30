"use client";

import React, { useState } from 'react';
import { Layers, ArrowRight, Shield, Cpu, Database, CheckCircle, Radio } from 'lucide-react';
import { ArchitectureStep } from '../types';

const STEPS: ArchitectureStep[] = [
  {
    step: 'STAGE 01',
    title: 'Multi-Source Ingest & Normalization',
    subtitle: 'Zero-loss asynchronous data stream intake',
    description:
      'We ingest structured and unstructured telemetry from webhooks, API streams, email inboxes, business documents, and relational databases into a sanitized queuing layer.',
    specs: [
      'Kafka / RabbitMQ buffered message pipeline',
      'AES-256 in-transit & at-rest encryption',
      'Format normalization (PDF, JSON, OCR, CSV)',
      'Sub-50ms ingestion ingress SLA',
    ],
  },
  {
    step: 'STAGE 02',
    title: 'SyncBiz Orchestration & Agent Kernel',
    subtitle: 'Stochastic AI models bounded by deterministic guardrails',
    description:
      'The core TGT agent engine assigns tasks to specialized SyncBiz agents (e.g. LeadRouter, AccountingReconciler, SupportDispatcher). High-risk operations pass through strict deterministic validation rules and optional human-in-the-loop approvals.',
    specs: [
      'Isolated execution contexts per tenant',
      'Deterministic rule engine & prompt evaluation',
      'Human-in-the-loop escalation circuit breakers',
      'Low-latency model inference router',
    ],
  },
  {
    step: 'STAGE 03',
    title: 'Autonomous Execution & Live BI Marts',
    subtitle: 'Transactional settlement & continuous executive analytics',
    description:
      'Actions are executed directly against target systems (updating CRMs, dispatching customer notifications, issuing invoices) while continuous BI pipelines feed Snowflake and PostgreSQL data marts for instant reporting.',
    specs: [
      'Transactional 2-phase commit state sync',
      'Real-time automated KPI & revenue telemetry',
      'Continuous anomaly detection scans',
      'Full audit trail and immutable action logs',
    ],
  },
];

export const Architecture: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="architecture" className="py-24 max-w-[1200px] mx-auto px-6 border-b border-[#1d1a18]">
      {/* Eyebrow and Headline */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ee6018]"></span>
          <span className="font-mono text-[12px] uppercase tracking-[-0.24px] text-[#b8b3b0]">
            TECHNICAL SPECIFICATION // ARCHITECTURE PIPELINE
          </span>
        </div>
        <h2 className="text-[36px] sm:text-[44px] font-normal leading-[1.1] tracking-[-1.12px] text-[#eeeeee] max-w-3xl">
          Deterministic reliability meets modern agent autonomy.
        </h2>
      </div>

      {/* 3 Step Cards Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {STEPS.map((step, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStep(idx)}
            className={`p-6 text-left rounded-[6px] border transition-all duration-150 relative ${
              activeStep === idx
                ? 'bg-[#1d1a18] border-[#eeeeee]'
                : 'bg-transparent border-[#1d1a18] hover:border-[#3d3a39]'
            }`}
          >
            <div className="flex items-center justify-between mb-3 font-mono text-[11px]">
              <span className={activeStep === idx ? 'text-[#ee6018]' : 'text-[#8a8380]'}>
                {step.step}
              </span>
              {activeStep === idx && (
                <span className="w-2 h-2 rounded-full bg-[#a0ca92]"></span>
              )}
            </div>
            <div className="text-[17px] font-normal text-[#eeeeee] mb-1 leading-snug">
              {step.title}
            </div>
            <div className="text-[13px] text-[#8a8380] font-normal">
              {step.subtitle}
            </div>
          </button>
        ))}
      </div>

      {/* Deep Dive Panel */}
      <div className="bg-[#0d0d0d] border border-[#1d1a18] rounded-[10px] p-8 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left 7 Columns: Step Description */}
          <div className="lg:col-span-7">
            <div className="font-mono text-[12px] uppercase text-[#ee6018] tracking-wide mb-2">
              {STEPS[activeStep].step} DEEP DIVE
            </div>
            <h3 className="text-[26px] sm:text-[32px] font-normal text-[#eeeeee] tracking-tight mb-4 leading-tight">
              {STEPS[activeStep].title}
            </h3>
            <p className="text-[15px] text-[#8a8380] leading-[1.6] mb-6 font-normal">
              {STEPS[activeStep].description}
            </p>

            {/* Spec items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {STEPS[activeStep].specs.map((spec, sIdx) => (
                <div key={sIdx} className="flex items-start gap-2 text-[13px] text-[#b8b3b0]">
                  <CheckCircle className="w-4 h-4 text-[#a0ca92] shrink-0 mt-0.5" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right 5 Columns: Visual Node Diagram */}
          <div className="lg:col-span-5 bg-[#141211] border border-[#3d3a39] rounded-[6px] p-6 font-mono text-[12px]">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1d1a18] text-[#8a8380]">
              <span>PIPELINE TELEMETRY</span>
              <span className="text-[#a0ca92]">NODE HEALTHY</span>
            </div>

            <div className="space-y-3 text-[#8a8380]">
              <div className="p-2.5 bg-[#101010] border border-[#1d1a18] rounded-[3px] text-[#eeeeee] flex justify-between items-center">
                <span>INGESTION PROTOCOL:</span>
                <span className="text-[#ee6018]">gRPC / Webhook</span>
              </div>
              <div className="p-2.5 bg-[#101010] border border-[#1d1a18] rounded-[3px] text-[#eeeeee] flex justify-between items-center">
                <span>PROCESSING CONCURRENCY:</span>
                <span className="text-[#fafafa]">10,000 req/sec</span>
              </div>
              <div className="p-2.5 bg-[#101010] border border-[#1d1a18] rounded-[3px] text-[#eeeeee] flex justify-between items-center">
                <span>FAILOVER STRATEGY:</span>
                <span className="text-[#a0ca92]">Multi-Region Active</span>
              </div>
              <div className="p-2.5 bg-[#101010] border border-[#1d1a18] rounded-[3px] text-[#eeeeee] flex justify-between items-center">
                <span>AUDIT LOGGING:</span>
                <span className="text-[#fafafa]">Immutable Action History</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
