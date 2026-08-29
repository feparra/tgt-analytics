"use client";

import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { TrustStrip } from '../components/TrustStrip';
import { Solutions } from '../components/Solutions';
import { SyncBizFeature } from '../components/SyncBizFeature';
import { BiAnalytics } from '../components/BiAnalytics';
import { RoiCalculator } from '../components/RoiCalculator';
import { Architecture } from '../components/Architecture';
import { ContactForm } from '../components/ContactForm';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#101010] text-[#eeeeee] flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <TrustStrip />
        <Solutions />
        <SyncBizFeature />
        <BiAnalytics />
        <RoiCalculator />
        <Architecture />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
