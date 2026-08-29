"use client";

import React, { useState } from 'react';
import { BarChart3, TrendingUp, AlertTriangle, ShieldCheck, Database, RefreshCw } from 'lucide-react';

export const BiAnalytics: React.FC = () => {
  const [biView, setBiView] = useState<'revenue' | 'inventory' | 'churn'>('revenue');

  return (
    <section id="bi-analytics" className="py-24 max-w-[1200px] mx-auto px-6 border-b border-[#1d1a18]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left 5 Columns: Concept and Value */}
        <div className="lg:col-span-5">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a0ca92]"></span>
            <span className="font-mono text-[12px] uppercase tracking-[-0.24px] text-[#b8b3b0]">
              INTELLIGENCE LAYER // PREDICTIVE BI
            </span>
          </div>

          <h2 className="text-[36px] sm:text-[44px] font-normal leading-[1.1] tracking-[-1.12px] text-[#eeeeee] mb-6">
            Business Intelligence that acts before you even ask.
          </h2>

          <p className="text-[16px] text-[#8a8380] leading-[1.5] mb-8 font-normal">
            Traditional BI gives you static yesterday-reports. TGT Analytics connects live data pipelines to autonomous inference models that identify revenue leaks, forecast cash needs, and trigger proactive adjustments.
          </p>

          {/* 3 Key BI differentiators */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-[2px] bg-[#1d1a18] border border-[#3d3a39] flex items-center justify-center text-[#a0ca92] text-[12px] shrink-0 font-mono">
                01
              </div>
              <div>
                <h4 className="text-[15px] font-normal text-[#eeeeee]">Automated Anomaly Interception</h4>
                <p className="text-[13px] text-[#8a8380]">Instant alerts when margins drop or fulfillment slows beyond 2 standard deviations.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-[2px] bg-[#1d1a18] border border-[#3d3a39] flex items-center justify-center text-[#a0ca92] text-[12px] shrink-0 font-mono">
                02
              </div>
              <div>
                <h4 className="text-[15px] font-normal text-[#eeeeee]">Natural-Language Executive Queries</h4>
                <p className="text-[13px] text-[#8a8380]">Ask &quot;What was our customer acquisition cost per channel this week?&quot; and get verified SQL data in seconds.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-[2px] bg-[#1d1a18] border border-[#3d3a39] flex items-center justify-center text-[#a0ca92] text-[12px] shrink-0 font-mono">
                03
              </div>
              <div>
                <h4 className="text-[15px] font-normal text-[#eeeeee]">Unified Multi-Source Warehouse</h4>
                <p className="text-[13px] text-[#8a8380]">Connect Stripe, Shopify, QuickBooks, HubSpot, and custom DBs into a coherent single source of truth.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right 7 Columns: Interactive BI Console Preview */}
        <div className="lg:col-span-7 bg-[#0d0d0d] border border-[#1d1a18] rounded-[10px] p-6 sm:p-8">
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#1d1a18] gap-4">
            <div>
              <div className="font-mono text-[11px] uppercase text-[#8a8380] tracking-wider">
                ACTIVE BI MODEL ENGINE
              </div>
              <div className="text-[18px] text-[#eeeeee] font-mono mt-0.5">
                TGT-Predictive-Matrix // v4.2
              </div>
            </div>

            {/* View Switcher */}
            <div className="flex gap-1.5 font-mono text-[11px]">
              <button
                onClick={() => setBiView('revenue')}
                className={`px-3 py-1.5 rounded-[2px] border transition-colors ${
                  biView === 'revenue'
                    ? 'bg-[#1f1d1c] border-[#fafafa] text-[#fafafa]'
                    : 'bg-transparent border-[#1d1a18] text-[#8a8380] hover:text-[#eeeeee]'
                }`}
              >
                REVENUE
              </button>
              <button
                onClick={() => setBiView('inventory')}
                className={`px-3 py-1.5 rounded-[2px] border transition-colors ${
                  biView === 'inventory'
                    ? 'bg-[#1f1d1c] border-[#fafafa] text-[#fafafa]'
                    : 'bg-transparent border-[#1d1a18] text-[#8a8380] hover:text-[#eeeeee]'
                }`}
              >
                INVENTORY
              </button>
              <button
                onClick={() => setBiView('churn')}
                className={`px-3 py-1.5 rounded-[2px] border transition-colors ${
                  biView === 'churn'
                    ? 'bg-[#1f1d1c] border-[#fafafa] text-[#fafafa]'
                    : 'bg-transparent border-[#1d1a18] text-[#8a8380] hover:text-[#eeeeee]'
                }`}
              >
                RETENTION
              </button>
            </div>
          </div>

          {/* Dynamic Content based on biView */}
          {biView === 'revenue' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-[#101010] border border-[#1d1a18] rounded-[3px]">
                  <div className="font-mono text-[11px] text-[#8a8380] uppercase">MONTHLY RUN RATE</div>
                  <div className="text-[24px] text-[#eeeeee] font-mono mt-1">$412,850</div>
                  <div className="text-[11px] text-[#a0ca92] font-mono mt-1">+14.2% MoM</div>
                </div>
                <div className="p-4 bg-[#101010] border border-[#1d1a18] rounded-[3px]">
                  <div className="font-mono text-[11px] text-[#8a8380] uppercase">LEAK DETECTED</div>
                  <div className="text-[24px] text-[#ee6018] font-mono mt-1">$0.00</div>
                  <div className="text-[11px] text-[#8a8380] font-mono mt-1">Audit clean</div>
                </div>
                <div className="col-span-2 sm:col-span-1 p-4 bg-[#101010] border border-[#1d1a18] rounded-[3px]">
                  <div className="font-mono text-[11px] text-[#8a8380] uppercase">EST. Q4 MARGIN</div>
                  <div className="text-[24px] text-[#eeeeee] font-mono mt-1">38.4%</div>
                  <div className="text-[11px] text-[#a0ca92] font-mono mt-1">High confidence</div>
                </div>
              </div>

              {/* Simulated Chart Bars */}
              <div className="p-4 bg-[#101010] border border-[#1d1a18] rounded-[3px]">
                <div className="flex justify-between text-[11px] font-mono text-[#8a8380] mb-3">
                  <span>30-DAY REVENUE VELOCITY VECTOR</span>
                  <span>CONFIDENCE INTERVAL: 98.7%</span>
                </div>
                <div className="h-28 flex items-end gap-2">
                  {[45, 52, 48, 60, 58, 68, 72, 70, 80, 85, 82, 94, 98, 92, 100].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        style={{ height: `${h}%` }}
                        className={`w-full rounded-t-[1px] transition-all duration-300 ${
                          i >= 12 ? 'bg-[#ee6018]' : 'bg-[#a0ca92]'
                        }`}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-[10px] font-mono text-[#4d4947] mt-2">
                  <span>HISTORICAL</span>
                  <span className="text-[#ee6018]">AI FORECAST (NEXT 14D)</span>
                </div>
              </div>
            </div>
          )}

          {biView === 'inventory' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#101010] border border-[#1d1a18] rounded-[3px]">
                  <div className="font-mono text-[11px] text-[#8a8380] uppercase">STOCK DEPLETION RISK</div>
                  <div className="text-[24px] text-[#a0ca92] font-mono mt-1">LOW (0.4%)</div>
                  <div className="text-[11px] text-[#8a8380] font-mono mt-1">Autonomous reorders live</div>
                </div>
                <div className="p-4 bg-[#101010] border border-[#1d1a18] rounded-[3px]">
                  <div className="font-mono text-[11px] text-[#8a8380] uppercase">DAYS SALES OF INVENTORY</div>
                  <div className="text-[24px] text-[#eeeeee] font-mono mt-1">21.4 Days</div>
                  <div className="text-[11px] text-[#a0ca92] font-mono mt-1">-3.8d vs industry avg</div>
                </div>
              </div>

              <div className="p-4 bg-[#101010] border border-[#1d1a18] rounded-[3px] font-mono text-[12px] space-y-2">
                <div className="text-[#8a8380] pb-2 border-b border-[#1d1a18]">ACTIVE INVENTORY AGENT TRIGGERS:</div>
                <div className="flex justify-between text-[#eeeeee]">
                  <span>SKU-9402 [Raw Electronics]</span>
                  <span className="text-[#a0ca92]">Auto-reorder dispatched (PO #8491)</span>
                </div>
                <div className="flex justify-between text-[#eeeeee]">
                  <span>SKU-1049 [Packaging Materials]</span>
                  <span className="text-[#b8b3b0]">Stocked (48 days buffer)</span>
                </div>
              </div>
            </div>
          )}

          {biView === 'churn' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#101010] border border-[#1d1a18] rounded-[3px]">
                  <div className="font-mono text-[11px] text-[#8a8380] uppercase">PREDICTED 90-DAY RETENTION</div>
                  <div className="text-[24px] text-[#a0ca92] font-mono mt-1">94.8%</div>
                  <div className="text-[11px] text-[#8a8380] font-mono mt-1">Cohort health optimal</div>
                </div>
                <div className="p-4 bg-[#101010] border border-[#1d1a18] rounded-[3px]">
                  <div className="font-mono text-[11px] text-[#8a8380] uppercase">AT-RISK ACCOUNTS SAVED</div>
                  <div className="text-[24px] text-[#ee6018] font-mono mt-1">18 Accounts</div>
                  <div className="text-[11px] text-[#a0ca92] font-mono mt-1">$48.2K saved ARR</div>
                </div>
              </div>

              <div className="p-4 bg-[#101010] border border-[#1d1a18] rounded-[3px] text-[12px] font-mono text-[#8a8380]">
                <div className="text-[#eeeeee] mb-1">&gt; TGT Retention Agent Action:</div>
                SyncBiz automatically detected 14 days of login inactivity on enterprise tier and scheduled proactive technical concierge outreach.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
