import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full relative z-30 mt-24 border-t border-slate-200/60 bg-gradient-to-b from-white/40 via-white/70 to-slate-50/80 backdrop-blur-2xl text-slate-600 text-xs font-sans overflow-hidden">
      
      {/* SUBTLE AMBIENT GLOW */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[700px] h-[180px] bg-indigo-500/5 blur-[120px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        
        {/* MAIN 4-COLUMN UNIVERSAL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-slate-200/60">
          
          {/* COL 1: BRAND IDENTITY & ARCHITECTURE (5 COLS) */}
          <div className="lg:col-span-5 space-y-3.5">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform bg-white/90 border border-slate-200/80 shadow-2xs">
                <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <span className="font-black text-base tracking-tight text-slate-900 flex items-center gap-2">
                WordCounter 
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-300/80">
                  FREE
                </span>
              </span>
            </Link>

            <p className="text-slate-500 text-xs leading-relaxed max-w-sm font-normal">
              An independent, privacy-first text analysis suite operating under <span className="font-semibold text-slate-700">rmnlove.com</span>. All tokenization routines run 100% locally in browser memory without server tracking.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-slate-200/80 text-[11px] font-medium text-slate-700 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_#10b981]" />
                Zero Cloud Logging
              </span>
              <a 
                href="mailto:contact@rmnlove.com" 
                className="text-[11px] font-medium text-slate-600 hover:text-indigo-600 flex items-center gap-1.5 transition-colors"
              >
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>contact@rmnlove.com</span>
              </a>
            </div>
          </div>

          {/* COL 2: WORKSPACE (2 COLS) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest block">
              Workspace
            </span>
            <ul className="space-y-2.5 text-xs font-medium text-slate-500">
              <li>
                <Link href="/" className="hover:text-slate-900 transition-all flex items-center gap-2 hover:translate-x-0.5">
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Live Analyzer</span>
                </Link>
              </li>
              <li>
                <Link href="/#content-guide" className="hover:text-slate-900 transition-all flex items-center gap-2 hover:translate-x-0.5">
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>Writing Standards</span>
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-slate-900 transition-all flex items-center gap-2 hover:translate-x-0.5">
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Platform FAQ</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 3: COMMUNITY & SUPPORT (2 COLS) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest block">
              Community
            </span>
            <ul className="space-y-2.5 text-xs font-medium text-slate-500">
              <li>
                <Link href="/help-us" className="hover:text-slate-900 transition-all flex items-center gap-2 hover:translate-x-0.5">
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>Support Our Tools</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-slate-900 transition-all flex items-center gap-2 hover:translate-x-0.5">
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>Report a Bug</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 4: LEGAL & TRUST (3 COLS) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest block">
              Legal & Trust
            </span>
            <ul className="space-y-2.5 text-xs font-medium text-slate-500">
              <li>
                <Link href="/about" className="hover:text-slate-900 transition-all flex items-center gap-2 hover:translate-x-0.5">
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>About Us & Mission</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-slate-900 transition-all flex items-center gap-2 hover:translate-x-0.5">
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Privacy Policy & Cookies</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-slate-900 transition-all flex items-center gap-2 hover:translate-x-0.5">
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Terms & Disclaimers</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM METRIC & TRUST STRIP */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} rmnlove.com</span>
            <span className="text-slate-300">•</span>
            <span>All rights reserved.</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-500 font-medium">
            <span className="px-2.5 py-0.5 rounded-full bg-white/80 border border-slate-200/80 shadow-2xs">GDPR & CCPA Compliant</span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/80 border border-slate-200/80 shadow-2xs">Client-Side Isolation</span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/80 border border-slate-200/80 shadow-2xs">Strict TLS / SSL</span>
          </div>
        </div>

      </div>
    </footer>
  );
}