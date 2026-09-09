import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'About Us & Mission - WordCounter',
  description: 'Learn about WordCounter on rmnlove.com, our privacy-first client-side architecture, and editorial commitment to content creators.',
};

export default function AboutPage() {
  return (
    <div className="apple-glass-backdrop text-slate-800 font-sans antialiased flex flex-col relative flex-1">
      
      {/* SOFT APPLE AMBIENT LIGHTING */}
      <div className="absolute top-[-5%] left-[-4%] w-[600px] h-[600px] rounded-full bg-slate-300/35 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[32%] right-[-5%] w-[550px] h-[550px] rounded-full bg-indigo-500/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[4%] left-[15%] w-[500px] h-[500px] rounded-full bg-slate-200/45 blur-[130px] pointer-events-none -z-10" />

      {/* ================= MAIN ABOUT MANIFESTO ================= */}
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 flex-1">
        <div className="tool-card rounded-3xl p-8 sm:p-12 space-y-10 text-slate-700">
          
          {/* HEADER INTRO */}
          <div className="border-b border-slate-200/80 pb-6">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-700">Editorial & Technical Profile</span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">About WordCounter</h1>
            <p className="text-xs font-bold text-slate-400 mt-2">
              Official Text Telemetry Utility of <span className="text-slate-700 font-semibold">rmnlove.com</span> • Built for Privacy & Performance
            </p>
          </div>

          {/* SECTION 1: MISSION */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Our Mission & Philosophy</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              WordCounter was built with an uncompromising commitment to performance, privacy, and simplicity. Whether you are an essayist meeting strict university citation bounds, an author pacing novel chapters, a public speaker timing keynote remarks, or a digital marketer calibrating keyword density, our platform delivers accurate, latency-free linguistic calculations without clutter.
            </p>
            <p className="text-sm leading-relaxed text-slate-600">
              Unlike traditional web tools that bloat page loads with heavy third-party trackers or send draft paragraphs across remote clouds, WordCounter operates <strong>100% inside your local device&apos;s RAM</strong>. What you type never leaves your browser window.
            </p>
          </section>

          {/* SECTION 2: WHY CHOOSE US */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Technical Standards & Architecture</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-5 rounded-2xl liquid-pill space-y-2">
                <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                  </div>
                  Client-Side RAM Isolation
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Manuscripts, essays, and confidential code notes are never transmitted over network protocols. All tokenization runs in local JavaScript execution memory.
                </p>
              </div>

              <div className="p-5 rounded-2xl liquid-pill space-y-2">
                <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                  </div>
                  Zero-Lag Tokenization
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Optimized deterministic regex engines calculate character volume, whitespace count, paragraphs, and sentence boundaries instantly, even on 50,000+ word manuscripts.
                </p>
              </div>

              <div className="p-5 rounded-2xl liquid-pill space-y-2">
                <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </div>
                  Empirical Reading Calculations
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Pacing is derived from cognitive reading science: silent reading is calibrated at 200 words per minute (WPM), while speech pacing is estimated at 130 WPM.
                </p>
              </div>

              <div className="p-5 rounded-2xl liquid-pill space-y-2">
                <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
                  </div>
                  N-Gram Keyword Density
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Multi-word n-gram frequency extraction filters common linguistic stop-words to pinpoint repeated phrasing and optimize organic SEO balance.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 3: NETWORK & PUBLISHER TRANSPARENCY */}
          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Publisher Ownership & Domain Hierarchy</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              WordCounter is a core digital property conceived and published under the <strong>rmnlove.com</strong> domain network. The platform remains free to the public through non-intrusive, privacy-compliant programmatic advertising partnerships (including Google AdSense).
            </p>
            <div className="p-4 rounded-2xl liquid-pill text-xs text-slate-600 space-y-2">
              <span className="font-bold text-slate-900 block">Editorial Integrity & Independence</span>
              <p>
                We do not gate basic metrics behind forced sign-ups, payment tiers, or invasive cookies. Our algorithms are rigorously audited to provide consistent, cross-browser compatibility across all modern desktop, tablet, and smartphone operating environments.
              </p>
            </div>
          </section>

          {/* SECTION 4: CONTACT DESK */}
          <section className="space-y-3 pt-6 border-t border-slate-200/80">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Community Feedback & Bug Reporting</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              We continually enhance our linguistic regex routines based on writer feedback. If you discover a hyphenation discrepancy, require specialized formatting support, or wish to suggest features, contact our development desk:
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold pt-1">
              <Link href="/contact" className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 transition-all active:scale-95">
                Contact Desk ➜
              </Link>
              <a href="mailto:contact@rmnlove.com" className="text-indigo-700 font-semibold hover:underline">
                contact@rmnlove.com
              </a>
            </div>
          </section>

        </div>
      </main>

    </div>
  );
}