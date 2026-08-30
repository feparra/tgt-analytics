import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — TGT Analytics',
  description: 'Terms of Service and Website Usage Conditions for TGT Analytics LLC.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#101010] text-[#eeeeee] flex flex-col">
      <Navbar />
      <main className="flex-grow pt-36 pb-24 px-6 max-w-[900px] mx-auto w-full">
        <div className="mb-12 border-b border-[#1d1a18] pb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ee6018]"></span>
            <span className="font-mono text-[12px] uppercase tracking-[-0.24px] text-[#b8b3b0]">
              LEGAL &amp; COMPLIANCE // TERMS OF SERVICE
            </span>
          </div>
          <h1 className="text-[36px] sm:text-[44px] font-normal leading-[1.1] tracking-[-1.12px] text-[#eeeeee] mb-4">
            Terms of Service
          </h1>
          <p className="text-[14px] font-mono text-[#8a8380]">
            Last updated: January 2025 // TGT Analytics LLC
          </p>
        </div>

        <div className="space-y-8 text-[15px] text-[#b8b3b0] leading-relaxed font-normal">
          <section className="space-y-3">
            <h2 className="text-[20px] font-medium text-[#eeeeee]">1. Agreement to Terms</h2>
            <p>
              By accessing or using tgtanalytics.com, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-[20px] font-medium text-[#eeeeee]">2. Intellectual Property</h2>
            <p>
              All software architectures, code demonstrations, trademarks, logos, and visual materials displayed on this website are the intellectual property of TGT Analytics LLC or its respective licensors and are protected by applicable copyright and trademark laws.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-[20px] font-medium text-[#eeeeee]">3. Consultation &amp; Services</h2>
            <p>
              Submitting a technical consultation inquiry through our website creates an exploratory communication channel and does not constitute a binding contract or service level agreement until a formal Statement of Work (SOW) is executed between both parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-[20px] font-medium text-[#eeeeee]">4. Limitation of Liability</h2>
            <p>
              In no event shall TGT Analytics LLC or its partners be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use this website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-[20px] font-medium text-[#eeeeee]">5. Contact Information</h2>
            <p>
              For legal inquiries regarding these terms, please contact:
            </p>
            <div className="p-4 bg-[#141211] border border-[#1d1a18] rounded-[3px] font-mono text-[13px] text-[#eeeeee]">
              <div>TGT Analytics LLC</div>
              <div className="text-[#8a8380]">Email: contact@tgtanalytics.com</div>
              <div className="text-[#8a8380]">Website: https://tgtanalytics.com</div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
