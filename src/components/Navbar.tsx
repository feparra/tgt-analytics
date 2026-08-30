"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Terminal } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#101010]/95 backdrop-blur-md border-b border-[#1d1a18] py-3'
          : 'bg-[#101010]/60 backdrop-blur-sm py-5 md:py-6'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between min-h-[52px]">
        {/* Brand Logo */}
        <a href="/" className="flex items-center group py-0.5">
          <img
            src="/logo.png"
            alt="TGT Analytics"
            className="h-10 sm:h-11 md:h-12 max-h-[50px] w-auto object-contain transition-transform duration-150 group-hover:scale-105"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-[13px] font-mono uppercase tracking-[0.04em] text-[#8a8380]">
          <a
            href="/#solutions"
            className="hover:text-[#eeeeee] transition-colors duration-150"
          >
            Solutions
          </a>
          <a
            href="/#syncbiz"
            className="hover:text-[#eeeeee] transition-colors duration-150 flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ee6018]"></span>
            SyncBiz Agents
          </a>
          <a
            href="/#bi-analytics"
            className="hover:text-[#eeeeee] transition-colors duration-150"
          >
            AI Intelligence
          </a>
          <a
            href="/#architecture"
            className="hover:text-[#eeeeee] transition-colors duration-150"
          >
            Architecture
          </a>
          <a
            href="/#roi-calculator"
            className="hover:text-[#eeeeee] transition-colors duration-150"
          >
            ROI Metric
          </a>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="/#contact"
            className="ghost-link text-[13px] tracking-tight uppercase"
          >
            Request Audit
            <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 opacity-80" />
          </a>
          <a
            href="/#live-dashboard"
            onClick={(e) => {
              const el = document.getElementById('live-dashboard');
              if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="btn-light text-[13px] tracking-tight"
          >
            Live War Room
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#8a8380] hover:text-[#eeeeee]"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#101010] border-b border-[#1d1a18] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 font-mono text-[13px] uppercase tracking-wider text-[#8a8380]">
            <a
              href="/#solutions"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#eeeeee]"
            >
              Solutions
            </a>
            <a
              href="/#syncbiz"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#eeeeee] flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#ee6018]"></span>
              SyncBiz Agents
            </a>
            <a
              href="/#bi-analytics"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#eeeeee]"
            >
              AI Intelligence
            </a>
            <a
              href="/#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#eeeeee]"
            >
              Architecture
            </a>
            <a
              href="/#roi-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#eeeeee]"
            >
              ROI Metric
            </a>
          </nav>

          <div className="pt-4 border-t border-[#1d1a18] flex flex-col gap-2.5">
            <a
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="ghost-link w-full justify-center text-[13px]"
            >
              Request Audit
              <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
            </a>
            <a
              href="/#live-dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-light w-full justify-center text-[13px]"
            >
              Live War Room
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
