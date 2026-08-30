import React from 'react';
import { Terminal, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#101010] pt-24 pb-16 px-6 max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-[#1d1a18]">
        {/* Brand Column (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="TGT Analytics"
              className="h-7 w-auto object-contain"
            />
            <span className="font-mono text-[13px] tracking-[0.18em] uppercase text-[#eeeeee] font-medium">
              TGT // ANALYTICS
            </span>
          </div>

          <p className="text-[14px] text-[#8a8380] leading-relaxed max-w-sm">
            Real-world business, AI-powered solutions. We bridge high-grade software engineering, autonomous SyncBiz agents, and predictive Business Intelligence for growing businesses.
          </p>

          <div className="pt-2 flex items-center gap-2 font-mono text-[12px] text-[#8a8380]">
            <span className="status-pulse-green"></span>
            <span>All systems operational // Edge Cluster Live</span>
          </div>
        </div>

        {/* Link Columns (2 Cols each) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="font-mono text-[12px] uppercase text-[#eeeeee] tracking-tight">
            SOLUTIONS
          </div>
          <ul className="space-y-2.5 text-[14px] text-[#8a8380]">
            <li>
              <a href="/#solutions" className="hover:text-[#eeeeee] transition-colors">
                Custom Software
              </a>
            </li>
            <li>
              <a href="/#syncbiz" className="hover:text-[#eeeeee] transition-colors flex items-center gap-1">
                <span>SyncBiz Agents</span>
                <span className="text-[10px] font-mono text-[#ee6018] font-bold">24/7</span>
              </a>
            </li>
            <li>
              <a href="/#bi-analytics" className="hover:text-[#eeeeee] transition-colors">
                Predictive BI
              </a>
            </li>
            <li>
              <a href="/#roi-calculator" className="hover:text-[#eeeeee] transition-colors">
                ROI Calculator
              </a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="font-mono text-[12px] uppercase text-[#eeeeee] tracking-tight">
            SYNCBIZ SUITE
          </div>
          <ul className="space-y-2.5 text-[14px] text-[#8a8380]">
            <li>
              <a href="/#syncbiz" className="hover:text-[#eeeeee] transition-colors">
                Lead Qualifier Agent
              </a>
            </li>
            <li>
              <a href="/#syncbiz" className="hover:text-[#eeeeee] transition-colors">
                Document &amp; Record Sync
              </a>
            </li>
            <li>
              <a href="/#syncbiz" className="hover:text-[#eeeeee] transition-colors">
                Operational Intelligence
              </a>
            </li>
            <li>
              <a href="/#syncbiz" className="hover:text-[#eeeeee] transition-colors">
                Multi-Tenant Isolation
              </a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="font-mono text-[12px] uppercase text-[#eeeeee] tracking-tight">
            ARCHITECTURE &amp; SYSTEMS
          </div>
          <ul className="space-y-2.5 text-[14px] text-[#8a8380]">
            <li>
              <a href="/#architecture" className="hover:text-[#eeeeee] transition-colors">
                Multi-Source Ingestion
              </a>
            </li>
            <li>
              <a href="/#architecture" className="hover:text-[#eeeeee] transition-colors">
                Deterministic Guardrails
              </a>
            </li>
            <li>
              <a href="/#architecture" className="hover:text-[#eeeeee] transition-colors">
                Snowflake / PG Marts
              </a>
            </li>
            <li>
              <a href="/#contact" className="hover:text-[#eeeeee] transition-colors flex items-center gap-1">
                <span>Request Architecture Overview</span>
                <ArrowUpRight className="w-3 h-3 opacity-70" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright & Legal */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[12px] text-[#8a8380]">
        <div>
          &copy; {new Date().getFullYear()} TGT Analytics LLC. All rights reserved. Enterprise AI &amp; Software Systems.
        </div>
        <div className="flex items-center gap-6">
          <a href="/privacy" className="hover:text-[#eeeeee] transition-colors">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-[#eeeeee] transition-colors">
            Terms of Service
          </a>
          <a href="mailto:contact@tgtanalytics.com" className="hover:text-[#eeeeee] transition-colors">
            Contact &amp; Security
          </a>
        </div>
      </div>
    </footer>
  );
};
