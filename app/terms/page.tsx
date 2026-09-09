import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service & Disclaimer - WordCounter',
  description: 'Terms and conditions governing the usage of WordCounter text analytics, algorithmic utilities, and liability limitations on rmnlove.com.',
};

export default function TermsPage() {
  return (
    <div className="apple-glass-backdrop text-slate-800 font-sans antialiased flex flex-col relative flex-1">
      
      {/* SOFT APPLE AMBIENT LIGHTING */}
      <div className="absolute top-[-5%] left-[-4%] w-[600px] h-[600px] rounded-full bg-slate-300/35 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[32%] right-[-5%] w-[550px] h-[550px] rounded-full bg-indigo-500/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[4%] left-[15%] w-[500px] h-[500px] rounded-full bg-slate-200/45 blur-[130px] pointer-events-none -z-10" />

      {/* ================= MAIN TERMS DOCUMENT ================= */}
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 flex-1">
        <div className="tool-card rounded-3xl p-8 sm:p-12 space-y-10 text-slate-700">
          
          <div className="border-b border-slate-200/80 pb-6">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-700">Legal Agreement</span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">Terms of Service & Disclaimer</h1>
            <p className="text-xs font-bold text-slate-400 mt-2">Active Protocol • rmnlove.com Ecosystem</p>
          </div>

          <p className="text-sm leading-relaxed text-slate-600">
            Welcome to <strong>WordCounter</strong> (&quot;the Platform&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), hosted on <strong>rmnlove.com</strong>. By accessing, viewing, or submitting text to our web-based counters and analytical tools, you acknowledge that you have read, understood, and agreed to be bound by the terms, conditions, and disclaimers set forth below. If you do not consent to these terms, your sole remedy is to cease using the platform immediately.
          </p>

          {/* 1. INTELLECTUAL PROPERTY & CONTENT SUBMISSIONS */}
          <section className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">1. User Submissions & Copyright Ownership</h2>
            <p className="text-xs leading-relaxed text-slate-600">
              <strong>Complete Author Ownership:</strong> You retain 100% intellectual property rights and copyright ownership over any text, prose, code, or data you type, paste, or evaluate within WordCounter.
            </p>
            <p className="text-xs leading-relaxed text-slate-600">
              Because our linguistic computation runs entirely client-side inside your browser&apos;s active RAM memory, we never store, claim license over, syndicate, or transfer your written works to external databases or artificial intelligence training models.
            </p>
            <p className="text-xs leading-relaxed text-slate-600">
              <strong>Platform Proprietary Assets:</strong> All front-end architectures, algorithms, interface layouts, vector icons, brand identifiers, and analytical codebases remain the exclusive property of WordCounter and rmnlove.com, shielded under international copyright conventions.
            </p>
          </section>

          {/* 2. ALGORITHMIC LIMITATIONS & AS-IS DISCLAIMER */}
          <section className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">2. Algorithmic Processing & &quot;As-Is&quot; Warranty Disclaimer</h2>
            <p className="text-xs leading-relaxed text-slate-600">
              WordCounter is provided on an <strong>&quot;as is&quot;</strong> and <strong>&quot;as available&quot;</strong> basis without warranties of any kind, whether express, implied, or statutory.
            </p>
            <div className="p-4 rounded-2xl liquid-pill text-xs text-slate-600 space-y-2">
              <p>
                <strong>Mathematical & Pacing Estimates:</strong> Calculations including, but not limited to, reading pace (200 WPM benchmark), speaking pace (130 WPM benchmark), sentence boundaries, and keyword density percentages are algorithmic estimates. Variations may occur depending on language complexity, dialect, and formatting styles.
              </p>
              <p>
                You assume full personal responsibility for verifying that your final written compositions satisfy specific academic limits, editorial deadlines, publisher submissions, or character volume caps.
              </p>
            </div>
          </section>

          {/* 3. THIRD-PARTY ADVERTISING & LINKS */}
          <section className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">3. Third-Party Advertising & Affiliate Links</h2>
            <p className="text-xs leading-relaxed text-slate-600">
              To sustain this free utility without charging user fees, WordCounter displays contextual third-party advertisements served via Google AdSense and accredited advertising networks.
            </p>
            <p className="text-xs leading-relaxed text-slate-600">
              When interacting with outbound promotional units or third-party web destinations, you leave our infrastructure. We do not exercise editorial control over, nor assume responsibility for, the content, transaction safety, privacy policies, or cookie tracking practices employed by external third-party domains.
            </p>
          </section>

          {/* 4. LIMITATION OF LIABILITY */}
          <section className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">4. Limitation of Liability</h2>
            <p className="text-xs leading-relaxed text-slate-600">
              To the fullest extent permitted by applicable legal statutes, WordCounter, rmnlove.com, its developers, and affiliated contributors shall not be held liable for any direct, indirect, incidental, consequential, special, or exemplary damages. This includes, without limitation, loss of business revenue, academic evaluation penalties, lost data, system interruption, or client device malfunctions arising from the use or inability to use this platform.
            </p>
          </section>

          {/* 5. ACCEPTABLE USE RESTRICTIONS */}
          <section className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">5. Acceptable Use Policy</h2>
            <p className="text-xs leading-relaxed text-slate-600">
              You agree to utilize WordCounter solely for legitimate educational, professional, and personal text-analysis operations. You expressly agree not to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
              <li>Deploy automated spiders, scrapers, or botnets to flood our client-side hosting endpoints.</li>
              <li>Attempt to decompile, alter, inject malicious payloads, or circumvent server firewall protections.</li>
              <li>Embed or frame our tool in external websites without direct attribution or written consent.</li>
            </ul>
          </section>

          {/* 6. MODIFICATIONS TO TERMS */}
          <section className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">6. Amendments & Service Termination</h2>
            <p className="text-xs leading-relaxed text-slate-600">
              We reserve the right to revise these Terms of Service or discontinue features of the platform at our discretion without prior notification. The most current version of these terms will always remain accessible on this URL. Continued interaction with the site following amendments indicates your full legal acceptance.
            </p>
          </section>

          {/* 7. CONTACT & INQUIRIES */}
          <section className="space-y-3 pt-6 border-t border-slate-200/80">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">7. Legal Inquiries</h2>
            <p className="text-xs leading-relaxed text-slate-600">
              For queries, clarification, or formal legal notices regarding these Terms, please reach out via our dedicated desk:
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold pt-1">
              <Link href="/contact" className="px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 transition-all active:scale-95">
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