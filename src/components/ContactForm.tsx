"use client";

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Terminal, Shield, Send } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    serviceInterest: 'SyncBiz SMB Agents',
    bottleneck: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API dispatch / Web3Forms ingestion
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setIsSuccess(true);
    } catch (err) {
      alert('Unable to process request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 max-w-[1200px] mx-auto px-6 border-b border-[#1d1a18]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left 5 Columns: Value Proposition for Audit */}
        <div className="lg:col-span-5">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="status-pulse-orange"></span>
            <span className="font-mono text-[12px] uppercase tracking-[-0.24px] text-[#b8b3b0]">
              TECHNICAL CONSULTATION // ZERO OBLIGATION
            </span>
          </div>

          <h2 className="text-[36px] sm:text-[44px] font-normal leading-[1.1] tracking-[-1.12px] text-[#eeeeee] mb-6">
            Let&apos;s audit your workflow bottlenecks.
          </h2>

          <p className="text-[16px] text-[#8a8380] leading-[1.5] mb-8 font-normal">
            Whether you need custom high-throughput software, autonomous SyncBiz business agents to eradicate manual friction, or AI-powered Business Intelligence dashboards—we will engineer a tailored plan.
          </p>

          <div className="space-y-4 pt-4 border-t border-[#1d1a18] font-mono text-[13px] text-[#b8b3b0]">
            <div className="flex items-center gap-2">
              <span className="text-[#a0ca92]">✓</span>
              <span>Direct architecture session with senior engineering leads</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#a0ca92]">✓</span>
              <span>Concrete ROI calculation and agent task blueprint</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#a0ca92]">✓</span>
              <span>48-hour response and zero vendor lock-in</span>
            </div>
          </div>
        </div>

        {/* Right 7 Columns: Factory Terminal Form Card */}
        <div className="lg:col-span-7">
          <div className="bg-[#0d0d0d] border border-[#1d1a18] rounded-[10px] p-6 sm:p-10">
            {isSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#1d1a18] border border-[#3d3a39] flex items-center justify-center mx-auto text-[#a0ca92]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-[24px] font-normal text-[#eeeeee] tracking-tight">
                  Consultation Request Dispatched
                </h3>
                <p className="text-[14px] text-[#8a8380] max-w-md mx-auto">
                  Our senior engineering team has received your workflow specifications. We will review your bottlenecks and provide a technical roadmap within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setFormData({
                      name: '',
                      company: '',
                      email: '',
                      serviceInterest: 'SyncBiz SMB Agents',
                      bottleneck: '',
                    });
                  }}
                  className="ghost-link text-[12px] uppercase mt-4"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-[#1d1a18] font-mono text-[12px] text-[#8a8380]">
                  <span>ENGINEERING CONSULTATION INTAKE</span>
                  <span className="text-[#8a8380]">CONFIDENTIAL INQUIRY</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[12px] uppercase text-[#b8b3b0] mb-2 tracking-tight">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#161413] border border-[#1d1a18] rounded-[3px] px-4 py-2.5 text-[14px] text-[#eeeeee] placeholder-[#4d4947] focus:outline-none focus:border-[#eeeeee] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[12px] uppercase text-[#b8b3b0] mb-2 tracking-tight">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Logistics LLC"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-[#161413] border border-[#1d1a18] rounded-[3px] px-4 py-2.5 text-[14px] text-[#eeeeee] placeholder-[#4d4947] focus:outline-none focus:border-[#eeeeee] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[12px] uppercase text-[#b8b3b0] mb-2 tracking-tight">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#161413] border border-[#1d1a18] rounded-[3px] px-4 py-2.5 text-[14px] text-[#eeeeee] placeholder-[#4d4947] focus:outline-none focus:border-[#eeeeee] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[12px] uppercase text-[#b8b3b0] mb-2 tracking-tight">
                      Primary Focus
                    </label>
                    <select
                      value={formData.serviceInterest}
                      onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                      className="w-full bg-[#161413] border border-[#1d1a18] rounded-[3px] px-4 py-2.5 text-[14px] text-[#eeeeee] focus:outline-none focus:border-[#eeeeee] transition-colors font-mono text-[13px]"
                    >
                      <option value="SyncBiz SMB Agents">Autonomous SyncBiz Agents (SMBs)</option>
                      <option value="Custom Software Development">Custom Software &amp; Systems</option>
                      <option value="AI Business Intelligence">AI Business Intelligence &amp; BI</option>
                      <option value="Full Stack Enterprise Audit">Complete Enterprise Audit</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[12px] uppercase text-[#b8b3b0] mb-2 tracking-tight">
                    Current Bottleneck / Workflow Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe the manual tasks, data silos, or software challenges your team is facing..."
                    value={formData.bottleneck}
                    onChange={(e) => setFormData({ ...formData, bottleneck: e.target.value })}
                    className="w-full bg-[#161413] border border-[#1d1a18] rounded-[3px] px-4 py-2.5 text-[14px] text-[#eeeeee] placeholder-[#4d4947] focus:outline-none focus:border-[#eeeeee] transition-colors resize-none"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <p className="text-[12px] text-[#8a8380] mb-4 leading-normal">
                    TGT Analytics respects your privacy. Information submitted is strictly used to deliver tailored technical roadmaps. See our{' '}
                    <a href="/privacy" className="text-[#eeeeee] underline hover:text-[#fafafa]">
                      Privacy Policy
                    </a>.
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-light w-full justify-center text-[14px] font-medium tracking-tight uppercase"
                  >
                    {isSubmitting ? 'Transmitting Specifications...' : 'Schedule Technical Consultation'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
