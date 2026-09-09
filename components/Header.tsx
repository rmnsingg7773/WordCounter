import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-slate-200/70 bg-white/75 backdrop-blur-2xl sticky top-0 z-40 font-sans transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* BRAND LOGO */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform bg-indigo-50/90 border border-indigo-100/90 shadow-2xs">
              <svg className="w-4.5 h-4.5 text-indigo-700" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-base tracking-tight text-slate-900 flex items-center gap-1.5 leading-none">
                WordCounter 
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-300/80">
                  FREE
                </span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-tight mt-1">
                Liquid Telemetry • rmnlove.com
              </span>
            </div>
          </Link>

          {/* MINIMAL NAVIGATION WITH SVG ICONS */}
          <nav className="hidden sm:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <Link href="/" className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Analyzer</span>
            </Link>
            <Link href="/#content-guide" className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Standards</span>
            </Link>
            <Link href="/about" className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>About</span>
            </Link>
          </nav>
        </div>

        {/* TRUST BADGE */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-slate-200/80 text-[11px] font-medium text-slate-700 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_#10b981]" />
            <span className="hidden sm:inline">100% In-Memory</span> RAM Engine
          </span>
        </div>

      </div>
    </header>
  );
}