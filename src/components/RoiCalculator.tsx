"use client";

import React, { useState } from 'react';
import { Calculator, ArrowRight, DollarSign, Clock, Users, Sparkles } from 'lucide-react';

export const RoiCalculator: React.FC = () => {
  const [teamSize, setTeamSize] = useState<number>(12);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(8);
  const [hourlyRate, setHourlyRate] = useState<number>(45);

  // Calculations
  const weeklyHoursWasted = teamSize * hoursPerWeek;
  const monthlyHoursSaved = Math.round(weeklyHoursWasted * 4.33 * 0.75); // 75% automation efficiency
  const monthlySavings = Math.round(monthlyHoursSaved * hourlyRate);
  const annualSavings = monthlySavings * 12;
  const efficiencyGainPercent = 68;

  return (
    <section id="roi-calculator" className="py-24 max-w-[1200px] mx-auto px-6 border-b border-[#1d1a18]">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ee6018]"></span>
          <span className="font-mono text-[12px] uppercase tracking-[-0.24px] text-[#b8b3b0]">
            ESTIMATION INSTRUMENT // ROI SIMULATOR
          </span>
        </div>
        <h2 className="text-[36px] sm:text-[44px] font-normal leading-[1.1] tracking-[-1.12px] text-[#eeeeee] mb-4">
          Quantify your operational drag.
        </h2>
        <p className="text-[15px] text-[#8a8380] leading-relaxed">
          See exactly how many manual administrative hours and operational payroll dollars TGT Analytics & SyncBiz agents can return to your business every month.
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left 6 Columns: Interactive Sliders */}
        <div className="lg:col-span-6 bg-[#0d0d0d] border border-[#1d1a18] rounded-[10px] p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#1d1a18] font-mono text-[12px] text-[#8a8380]">
              <span>INPUT PARAMETERS</span>
              <span className="text-[#ee6018]">CALIBRATING</span>
            </div>

            {/* Slider 1: Team Size */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-[14px] text-[#eeeeee] flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#8a8380]" />
                  <span>Team Size (Employees / Operators)</span>
                </label>
                <span className="font-mono text-[16px] text-[#fafafa] bg-[#1f1d1c] px-3 py-1 rounded-[2px] border border-[#3d3a39]">
                  {teamSize} {teamSize === 1 ? 'person' : 'people'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full accent-[#ee6018] bg-[#1d1a18] h-1.5 rounded-none cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-[#4d4947] mt-1.5">
                <span>1</span>
                <span>50</span>
                <span>100+</span>
              </div>
            </div>

            {/* Slider 2: Hours spent on manual tasks */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-[14px] text-[#eeeeee] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#8a8380]" />
                  <span>Manual Tasks / Week (per person)</span>
                </label>
                <span className="font-mono text-[16px] text-[#fafafa] bg-[#1f1d1c] px-3 py-1 rounded-[2px] border border-[#3d3a39]">
                  {hoursPerWeek} hrs/week
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="30"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full accent-[#ee6018] bg-[#1d1a18] h-1.5 rounded-none cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-[#4d4947] mt-1.5">
                <span>2 hrs (Low)</span>
                <span>15 hrs</span>
                <span>30 hrs (Heavy Admin)</span>
              </div>
            </div>

            {/* Slider 3: Blended Hourly Rate */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-[14px] text-[#eeeeee] flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#8a8380]" />
                  <span>Blended Hourly Cost</span>
                </label>
                <span className="font-mono text-[16px] text-[#fafafa] bg-[#1f1d1c] px-3 py-1 rounded-[2px] border border-[#3d3a39]">
                  ${hourlyRate} / hr
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="150"
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full accent-[#ee6018] bg-[#1d1a18] h-1.5 rounded-none cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-[#4d4947] mt-1.5">
                <span>$20/hr</span>
                <span>$85/hr</span>
                <span>$150/hr</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[#1d1a18] text-[12px] font-mono text-[#8a8380]">
            Model uses conservative 75% agent task absorption with human verification loop.
          </div>
        </div>

        {/* Right 6 Columns: Output Metrics Console */}
        <div className="lg:col-span-6 bg-[#161413] border border-[#3d3a39] rounded-[10px] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#1d1a18] font-mono text-[12px]">
              <span className="text-[#8a8380]">PROJECTED EFFICIENCY OUTPUT</span>
              <span className="text-[#a0ca92]">CONFIRMED NET VALUE</span>
            </div>

            {/* Big Headline Stat */}
            <div className="mb-8">
              <div className="font-mono text-[12px] uppercase text-[#b8b3b0] tracking-[-0.24px] mb-1">
                ESTIMATED ANNUAL CAPITAL SAVINGS
              </div>
              <div className="text-[44px] sm:text-[56px] font-normal text-[#fafafa] tracking-[-2.88px] leading-tight font-mono">
                ${annualSavings.toLocaleString()}
              </div>
              <div className="text-[14px] text-[#a0ca92] font-mono mt-1">
                Equivalent to ${(monthlySavings).toLocaleString()} / month recovered
              </div>
            </div>

            {/* 2x2 Metric Breakdown */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#1d1a18]">
              <div>
                <div className="font-mono text-[11px] uppercase text-[#8a8380]">
                  HOURS RECOVERED / MO
                </div>
                <div className="text-[26px] font-normal text-[#eeeeee] font-mono mt-1">
                  {monthlyHoursSaved.toLocaleString()} hrs
                </div>
                <div className="text-[11px] text-[#8a8380] font-mono mt-0.5">
                  Across all team members
                </div>
              </div>

              <div>
                <div className="font-mono text-[11px] uppercase text-[#8a8380]">
                  PROCESS ACCELERATION
                </div>
                <div className="text-[26px] font-normal text-[#eeeeee] font-mono mt-1">
                  {efficiencyGainPercent}%+
                </div>
                <div className="text-[11px] text-[#a0ca92] font-mono mt-0.5">
                  Near-instant dispatch
                </div>
              </div>
            </div>
          </div>

          {/* CTA Box */}
          <div className="pt-8 mt-8 border-t border-[#1d1a18]">
            <a
              href="#contact"
              className="btn-light w-full justify-center text-[14px] font-medium tracking-tight uppercase group"
            >
              <span>Lock In These Savings // Book Consultation</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
