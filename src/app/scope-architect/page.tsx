import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { ScopeArchitect } from '../../components/ScopeArchitect';

export const metadata: Metadata = {
  title: 'Project Scope Architect — TGT Analytics',
  description:
    'Describe your idea in any language. Our discovery agent turns raw business challenges into a structured project blueprint for the TGT Analytics engineering team.',
  alternates: {
    canonical: '/scope-architect',
  },
};

export default function ScopeArchitectPage() {
  return (
    <div className="min-h-screen bg-[#101010] text-[#eeeeee] flex flex-col">
      <Navbar />
      <main className="flex-grow pt-36 pb-24 px-6">
        <div className="max-w-[900px] mx-auto w-full">
          <div className="mb-10 border-b border-[#1d1a18] pb-8">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ee6018]"></span>
              <span className="font-mono text-[12px] uppercase tracking-[-0.24px] text-[#b8b3b0]">
                TGT DISCOVERY LAB // AUTOMATED PRE-SALES
              </span>
            </div>
            <h1 className="text-[36px] sm:text-[44px] font-normal leading-[1.1] tracking-[-1.12px] text-[#eeeeee] mb-4">
              Project Scope Architect
            </h1>
            <p className="text-[16px] text-[#8a8380] leading-[1.5] max-w-2xl">
              Skip the forms. Tell our discovery agent about your bottleneck, workflow, or idea —
              in any language, in your own words. In a few minutes it compiles a structured
              project blueprint and routes it straight to our engineering team.
            </p>
          </div>

          <ScopeArchitect />

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px] text-[#8a8380]">
            <span>✓ ZERO OBLIGATION</span>
            <span>✓ NO TECH-JARGON REQUIRED</span>
            <span>✓ RESPONSE WITHIN 48H</span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}