import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: '404 - Page Not Found | WordCounter',
  description: 'The requested resource could not be located on rmnlove.com.',
};

export default function NotFound() {
  return (
    <div className="apple-glass-backdrop text-slate-800 font-sans antialiased flex flex-col relative flex-1 min-h-[80vh] justify-center items-center">
      
      {/* SOFT APPLE AMBIENT LIGHTING */}
      <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-slate-300/35 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[150px] pointer-events-none -z-10" />

      <main className="max-w-xl mx-auto w-full px-4 sm:px-6 py-12 text-center">
        <div className="tool-card rounded-3xl p-8 sm:p-12 space-y-6 text-slate-700 shadow-xl border border-slate-200/80">
          
          {/* 404 BADGE */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-black tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            HTTP Error 404
          </div>

          {/* MAIN HEADING */}
          <div className="space-y-2">
            <h1 className="text-6xl sm:text-7xl font-black text-slate-900 tracking-tight font-mono">
              404
            </h1>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
              Page Lost in Memory
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
              The endpoint or manuscript you are looking for has been relocated, purged, or does not exist in the active namespace.
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Return to Analyzer</span>
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/80 hover:bg-white text-slate-700 text-xs font-bold border border-slate-200 shadow-2xs transition-all active:scale-95"
            >
              Report Broken URL
            </Link>
          </div>

          {/* QUICK LINKS SECTION */}
          <div className="pt-6 border-t border-slate-200/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
              Helpful Destinations
            </span>
            <div className="flex flex-wrap justify-center gap-2 text-xs font-medium text-slate-600">
              <Link href="/about" className="px-3 py-1 rounded-xl liquid-pill hover:text-indigo-600 transition-colors">
                About Us
              </Link>
              <Link href="/privacy" className="px-3 py-1 rounded-xl liquid-pill hover:text-indigo-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="px-3 py-1 rounded-xl liquid-pill hover:text-indigo-600 transition-colors">
                Terms of Service
              </Link>
              <Link href="/help-us" className="px-3 py-1 rounded-xl liquid-pill hover:text-indigo-600 transition-colors">
                Support Project
              </Link>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}