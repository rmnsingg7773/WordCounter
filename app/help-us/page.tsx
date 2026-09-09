"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function HelpUsPage() {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = async () => {
    const url = typeof window !== 'undefined' ? window.location.origin : 'https://rmnlove.com';
    await navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="apple-glass-backdrop text-slate-800 font-sans antialiased flex flex-col relative flex-1">
      
      {/* SOFT APPLE AMBIENT LIGHTING */}
      <div className="absolute top-[-5%] left-[-4%] w-[600px] h-[600px] rounded-full bg-slate-300/35 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[32%] right-[-5%] w-[550px] h-[550px] rounded-full bg-indigo-500/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[4%] left-[15%] w-[500px] h-[500px] rounded-full bg-slate-200/45 blur-[130px] pointer-events-none -z-10" />

      {/* ================= MAIN CONTAINER ================= */}
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 flex-1">
        <div className="tool-card rounded-3xl p-8 sm:p-12 space-y-10 text-slate-700">
          
          {/* TITLE SECTION */}
          <div className="border-b border-slate-200/80 pb-6">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-700">Support Our Free Tools</span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">Support WordCounter</h1>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              WordCounter is maintained as an open, privacy-first web utility hosted under <span className="font-semibold text-slate-800">rmnlove.com</span>. We don&apos;t charge subscription fees, gate features behind paywalls, or collect your personal data. If this tool aids your daily writing, here are practical ways to support the project.
            </p>
          </div>

          {/* 1. BOOKMARK US */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl liquid-pill text-indigo-700 flex items-center justify-center font-black text-sm">
                1
              </div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Bookmark for Faster Everyday Access</h2>
            </div>

            <p className="text-xs leading-relaxed text-slate-600 pl-11">
              Save the tool directly to your browser bar so you have instant, zero-click access whenever you need to check word counts, sentence structures, or character limits.
            </p>

            <div className="ml-11 p-5 rounded-2xl liquid-pill flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-500 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Keyboard Shortcut</span>
                  <span className="text-[11px] text-slate-500 font-medium">Press this combination in your current browser tab:</span>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs font-bold">
                <span className="px-3 py-1.5 rounded-xl bg-white/80 border border-slate-200 shadow-2xs text-slate-800">Ctrl + D</span>
                <span className="text-slate-400 font-sans text-xs">or</span>
                <span className="px-3 py-1.5 rounded-xl bg-white/80 border border-slate-200 shadow-2xs text-slate-800">⌘ + D</span>
              </div>
            </div>
          </section>

          {/* 2. DIRECT LINK COPY */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl liquid-pill text-indigo-700 flex items-center justify-center font-black text-sm">
                2
              </div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Share Directly with Students & Colleagues</h2>
            </div>

            <p className="text-xs leading-relaxed text-slate-600 pl-11">
              Recommend WordCounter to classmates, writing groups, or editorial teams who need a clutter-free, privacy-safe text editor that processes everything purely in local RAM.
            </p>

            <div className="ml-11 flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleCopyLink}
                className="liquid-pill flex items-center gap-2.5 px-4 py-2.5 rounded-full text-indigo-800 text-xs font-bold cursor-pointer active:scale-95"
              >
                <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span>{copiedLink ? 'Link Copied to Clipboard!' : 'Copy Website URL'}</span>
              </button>
            </div>
          </section>

          {/* 3. BLOGGERS & REVIEWS */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl liquid-pill text-indigo-700 flex items-center justify-center font-black text-sm">
                3
              </div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Reference Us in Your Articles & Blogs</h2>
            </div>

            <p className="text-xs leading-relaxed text-slate-600 pl-11">
              If you publish content about academic research, copy writing workflows, or digital productivity, mentioning <strong>WordCounter</strong> helps more writers find a transparent, privacy-first alternative.
            </p>

            <div className="ml-11 p-4 rounded-2xl liquid-pill text-xs text-slate-600 space-y-2">
              <span className="font-bold text-slate-900 block">Recommended HTML Reference Anchor</span>
              <p className="font-mono text-[11px] bg-white/80 p-3 rounded-xl border border-slate-200 text-slate-800 select-all overflow-x-auto">
                &lt;a href=&quot;https://rmnlove.com&quot;&gt;WordCounter - Fast Client-Side Word Counter&lt;/a&gt;
              </p>
            </div>
          </section>

          {/* 4. FEEDBACK & BUG REPORT */}
          <section className="space-y-4 pt-6 border-t border-slate-200/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">Found a Discrepancy or Have an Idea?</h3>
                <p className="text-xs text-slate-500 mt-0.5">We continuously tune our regular expressions based on edge cases found by real writers.</p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all active:scale-95 shrink-0"
              >
                Submit Feedback ➜
              </Link>
            </div>
          </section>

        </div>
      </main>

    </div>
  );
}