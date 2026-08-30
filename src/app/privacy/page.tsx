import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — TGT Analytics',
  description: 'Privacy Policy and Data Protection Standards for TGT Analytics LLC.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#101010] text-[#eeeeee] flex flex-col">
      <Navbar />
      <main className="flex-grow pt-36 pb-24 px-6 max-w-[900px] mx-auto w-full">
        <div className="mb-12 border-b border-[#1d1a18] pb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ee6018]"></span>
            <span className="font-mono text-[12px] uppercase tracking-[-0.24px] text-[#b8b3b0]">
              LEGAL &amp; COMPLIANCE // PRIVACY POLICY
            </span>
          </div>
          <h1 className="text-[36px] sm:text-[44px] font-normal leading-[1.1] tracking-[-1.12px] text-[#eeeeee] mb-4">
            Privacy Policy
          </h1>
          <p className="text-[14px] font-mono text-[#8a8380]">
            Last updated: January 2025 // TGT Analytics LLC
          </p>
        </div>

        <div className="space-y-8 text-[15px] text-[#b8b3b0] leading-relaxed font-normal">
          <section className="space-y-3">
            <h2 className="text-[20px] font-medium text-[#eeeeee]">1. Overview</h2>
            <p>
              TGT Analytics LLC (&quot;TGT Analytics&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the website tgtanalytics.com. This Privacy Policy describes how we collect, use, and protect the information you provide when using our website and consultation services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-[20px] font-medium text-[#eeeeee]">2. Information We Collect</h2>
            <p>
              We only collect personal information that you voluntarily provide to us through our technical consultation intake forms, including your full name, company name, corporate email address, and high-level workflow descriptions.
            </p>
            <p>
              We do not collect sensitive personal financial data, payment card numbers, or passwords through this website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-[20px] font-medium text-[#eeeeee]">3. How We Use Information</h2>
            <p>
              The information you submit is strictly utilized to:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-[#8a8380]">
              <li>Evaluate engineering feasibility and prepare tailored technical roadmaps.</li>
              <li>Schedule architectural consultations with our senior engineering team.</li>
              <li>Communicate directly regarding your project inquiries.</li>
            </ul>
            <p>
              We do not sell, rent, or lease your personal information to third-party advertisers or data brokers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-[20px] font-medium text-[#eeeeee]">4. Data Security &amp; Retention</h2>
            <p>
              We implement industry-standard encryption protocols (TLS/HTTPS) to secure all data transmissions. Information collected via consultation requests is retained only for the duration necessary to deliver requested professional services and comply with legal obligations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-[20px] font-medium text-[#eeeeee]">5. Contact Us</h2>
            <p>
              If you have any questions or requests regarding your data, please contact our data privacy officer at:
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
