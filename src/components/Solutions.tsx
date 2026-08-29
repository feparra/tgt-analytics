import React from 'react';
import { ArrowRight, Code2, Bot, BarChart3, Database, CheckCircle2 } from 'lucide-react';
import { SolutionItem } from '../types';

const SOLUTIONS: SolutionItem[] = [
  {
    id: 'software-engineering',
    number: '01',
    category: 'CORE ENGINEERING',
    title: 'Custom Software & Systems Development',
    description:
      'We design, engineer, and deploy high-performance software tailored to your proprietary business logic. From high-throughput distributed backends to resilient API integrations and cloud infrastructure.',
    features: [
      'Hexagonal & Clean architecture standards',
      'Robust API bridges & Legacy ERP/CRM connectors',
      'Bank-grade isolation and zero-leak auth systems',
      'Custom web & mobile internal tooling interfaces',
    ],
    metrics: {
      label: 'SYSTEM LATENCY',
      value: '< 50ms P99',
    },
    linkText: 'Explore Engineering Capabilities',
  },
  {
    id: 'syncbiz-agents',
    number: '02',
    category: 'SYNCBIZ SUITE',
    title: 'Autonomous Business Agents for SMBs',
    description:
      'Real-world business problems solved with autonomous execution. Our SyncBiz agents orchestrate lead intake, customer support routing, document synthesis, and administrative workflows 24/7 without manual friction.',
    features: [
      'Autonomous CRM & lead qualification pipeline',
      'Automated invoice ingestion & bookkeeping reconciliation',
      'Multi-channel dispatch (Email, WhatsApp, Slack, Web)',
      'Deterministic human-in-the-loop escalation rules',
    ],
    metrics: {
      label: 'HOURS SAVED / MO',
      value: '120+ hrs/team',
    },
    linkText: 'Deploy SyncBiz Agents',
  },
  {
    id: 'business-intelligence',
    number: '03',
    category: 'PREDICTIVE BI',
    title: 'AI-Powered Business Intelligence',
    description:
      'Turn raw transactional chaos into sharp executive intelligence. We build automated data pipelines that query your databases, spot margin leaks, forecast seasonal demand, and deliver instant KPI summaries.',
    features: [
      'Automated Snowflake / PostgreSQL data marts',
      'Real-time anomaly & revenue leak alerts',
      'Natural-language executive query engine',
      'Predictive inventory & cash flow simulations',
    ],
    metrics: {
      label: 'DECISION VELOCITY',
      value: '10x Faster',
    },
    linkText: 'Inspect BI Architectures',
  },
];

export const Solutions: React.FC = () => {
  return (
    <section id="solutions" className="py-24 max-w-[1200px] mx-auto px-6 border-b border-[#1d1a18]">
      {/* Section Eyebrow & Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ee6018]"></span>
            <span className="font-mono text-[12px] uppercase tracking-[-0.24px] text-[#b8b3b0]">
              SYSTEM PILLARS // TGT CAPABILITIES
            </span>
          </div>
          <h2 className="text-[36px] sm:text-[44px] font-normal leading-[1.1] tracking-[-1.12px] text-[#eeeeee] max-w-2xl">
            Engineered for real-world operations, not theoretical prototypes.
          </h2>
        </div>
        <p className="text-[15px] text-[#8a8380] max-w-md font-normal leading-relaxed">
          Combining deterministic software engineering with stochastic AI models to deliver zero-downtime, auditable solutions for growing enterprises.
        </p>
      </div>

      {/* 3-Column Factory Feature Card Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {SOLUTIONS.map((item) => (
          <div
            key={item.id}
            className="factory-card flex flex-col justify-between group hover:border-[#3d3a39] relative"
          >
            <div>
              {/* Card Header with numbering */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#1d1a18]">
                <span className="font-mono text-[12px] uppercase text-[#ee6018] tracking-wider">
                  {item.category}
                </span>
                <span className="font-mono text-[13px] text-[#4d4947] group-hover:text-[#8a8380] transition-colors">
                  {item.number}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-[22px] font-normal text-[#eeeeee] tracking-tight mb-4 group-hover:text-white transition-colors leading-tight">
                {item.title}
              </h3>
              <p className="text-[14px] text-[#8a8380] leading-[1.5] mb-6 font-normal">
                {item.description}
              </p>

              {/* Feature bullet list */}
              <ul className="space-y-2.5 mb-8">
                {item.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[13px] text-[#b8b3b0]">
                    <span className="text-[#a0ca92] text-[12px] font-mono mt-0.5">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Metric Footer & CTA */}
            <div className="pt-6 border-t border-[#1d1a18] flex items-center justify-between">
              <div>
                <div className="font-mono text-[11px] uppercase text-[#8a8380] tracking-tight">
                  {item.metrics.label}
                </div>
                <div className="text-[16px] font-normal text-[#eeeeee] font-mono mt-0.5">
                  {item.metrics.value}
                </div>
              </div>
              <a
                href="#contact"
                className="font-mono text-[12px] uppercase tracking-tight text-[#eeeeee] hover:text-[#fafafa] flex items-center gap-1 group/link"
              >
                <span>Deploy</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
