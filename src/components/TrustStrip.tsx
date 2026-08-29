import React from 'react';

const PARTNERS = [
  { name: 'POSTGRESQL', spec: 'OLTP ENGINE' },
  { name: 'SNOWFLAKE', spec: 'DATA CLOUD' },
  { name: 'PYTHON', spec: 'AI PIPELINES' },
  { name: 'FASTAPI', spec: 'ASYNC REST' },
  { name: 'OPENAI', spec: 'AGENT RUNTIME' },
  { name: 'DOCKER', spec: 'ISOLATION' },
  { name: 'NEXT.JS', spec: 'FRONTEND STACK' },
  { name: 'AWS // CLOUD', spec: 'INFRASTRUCTURE' },
];

export const TrustStrip: React.FC = () => {
  return (
    <section className="py-24 max-w-[1200px] mx-auto px-6">
      <div className="text-center mb-10">
        <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-[#8a8380]">
          ENGINEERED ON PROVEN ENTERPRISE FOUNDATIONS
        </span>
      </div>

      {/* Floating Wordmarks in Negative Space */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-center">
        {PARTNERS.map((partner, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center group cursor-default transition-all duration-200 hover:scale-[1.03]"
          >
            <span className="font-mono text-[14px] uppercase tracking-[0.1em] text-[#8a8380] group-hover:text-[#eeeeee] transition-colors">
              {partner.name}
            </span>
            <span className="text-[10px] font-mono text-[#4d4947] tracking-tight mt-1 group-hover:text-[#8a8380] transition-colors">
              {partner.spec}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
