import React from 'react';

export const metadata = {
  title: 'Privacy Policy & Cookies - WordCounter',
  description: 'Comprehensive Privacy Policy detailing client-side memory safety, cookies, and Google AdSense compliance on rmnlove.com.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="apple-glass-backdrop text-slate-800 font-sans antialiased flex flex-col relative flex-1">
      
      {/* SOFT APPLE AMBIENT LIGHTING */}
      <div className="absolute top-[-5%] left-[-4%] w-[600px] h-[600px] rounded-full bg-slate-300/35 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[32%] right-[-5%] w-[550px] h-[550px] rounded-full bg-indigo-500/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[4%] left-[15%] w-[500px] h-[500px] rounded-full bg-slate-200/45 blur-[130px] pointer-events-none -z-10" />

      {/* ================= MAIN PRIVACY DOCUMENT ================= */}
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 flex-1">
        <div className="tool-card rounded-3xl p-8 sm:p-12 space-y-10 text-slate-700">
          
          <div className="border-b border-slate-200/80 pb-6">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-700">Mandatory Regulatory Compliance</span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">Privacy Policy & Cookie Disclosure</h1>
            <p className="text-xs font-bold text-slate-400 mt-2">Active Implementation • Domain: rmnlove.com</p>
          </div>

          <p className="text-sm leading-relaxed text-slate-600">
            At <strong>WordCounter</strong> (accessible via <strong>rmnlove.com</strong>), visitor privacy and manuscript confidentiality are fundamental tenets of our engineering philosophy. This Privacy Policy documents the precise categories of data processed, our local in-memory processing guarantees, and our adherence to international data protection standards (including the General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and Google Publisher Policies).
          </p>

          {/* SECTION 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">1. Data Controller & Operating Entity</h2>
            <p className="text-xs leading-relaxed text-slate-600">
              The data controller responsible for operations and web services rendered on this digital property is:
            </p>
            <div className="p-4 rounded-2xl liquid-pill text-xs space-y-1 font-medium text-slate-700">
              <div><strong className="text-slate-900">WordCounter Infrastructure Team</strong></div>
              <div>Operating Network: rmnlove.com</div>
              <div>Direct Legal & Privacy Desk: <a href="mailto:contact@rmnlove.com" className="text-indigo-700 underline font-semibold">contact@rmnlove.com</a></div>
            </div>
          </section>

          {/* SECTION 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">2. Scope of Processing & User Text Isolation</h2>
            <div className="p-4 rounded-2xl liquid-pill text-xs text-slate-700 space-y-1.5 border border-emerald-300/80 bg-emerald-50/50">
              <span className="font-bold text-emerald-900 block flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                Strict In-Memory RAM Architecture Guarantee
              </span>
              <p className="leading-relaxed">
                All tokenization, linguistic evaluations, density calculations, character counts, and casing converters execute <strong>entirely inside your browser&apos;s local volatile memory (RAM)</strong>. Under no circumstances is your typed or pasted text transferred over HTTP/HTTPS connections to our servers or any third-party clouds. Closing the active browser window permanently eliminates the session text.
              </p>
            </div>
          </section>

          {/* SECTION 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">3. Automated Telemetry & Server Logs</h2>
            <p className="text-xs leading-relaxed text-slate-600">
              When navigating rmnlove.com, our server edge network automatically logs basic technical headers necessary for HTTP traffic routing, load-balancing, and firewall protection against Distributed Denial of Service (DDoS) vectors:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li>Access timestamp and HTTP protocol status codes</li>
              <li>Browser engine version and client operating system environment</li>
              <li>Referring website domain</li>
              <li>Byte size of transferred static interface assets</li>
              <li>Anonymized IP addresses (masked at edge firewalls prior to temporary buffer logging)</li>
            </ul>
          </section>

          {/* SECTION 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">4. Cookies & Client-Side Local Storage</h2>
            <p className="text-xs leading-relaxed text-slate-600">
              Cookies are small text records placed on your client hardware. WordCounter uses first-party client storage strictly to remember functional UI preferences across sessions (such as your chosen keyword density n-gram count or casing transformation toggles). You can disable or purge cookies at any moment through your individual browser preferences without breaking text-counting capabilities.
            </p>
          </section>

          {/* SECTION 5: GOOGLE ADSENSE & THIRD-PARTY ADVERTISING */}
          <section className="space-y-3 p-6 rounded-3xl liquid-pill border border-indigo-200 bg-indigo-50/40">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">5. Third-Party Advertising & Google AdSense Disclosures</h2>
            <p className="text-xs leading-relaxed text-slate-700">
              To sustain this free utility platform without forced subscriptions, we partner with external advertising vendors, prominently including <strong>Google AdSense</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600 mt-2">
              <li>
                <strong>Third-Party Vendor Cookies:</strong> Google and other advertising partners use cookies (such as the DoubleClick cookie) to serve ads based on a user&apos;s prior visits to this website or other web destinations across the Internet.
              </li>
              <li>
                <strong>Personalized Advertising:</strong> Google&apos;s use of advertising cookies enables it and its partners to serve targeted advertisements based on browsing activity.
              </li>
              <li>
                <strong>Mandatory Opt-Out Provisions:</strong> Users may opt out of personalized interest-based advertising anytime by visiting the official industry clearinghouses:
                <div className="mt-2.5 flex flex-wrap gap-3 font-semibold">
                  <a href="https://adssettings.google.com" target="_blank" rel="noreferrer" className="text-indigo-700 hover:underline">
                    ➜ Google Ads Settings
                  </a>
                  <a href="https://www.aboutads.info" target="_blank" rel="noreferrer" className="text-indigo-700 hover:underline">
                    ➜ AboutAds.info Choices
                  </a>
                  <a href="https://youradchoices.com" target="_blank" rel="noreferrer" className="text-indigo-700 hover:underline">
                    ➜ YourAdChoices Portal
                  </a>
                </div>
              </li>
            </ul>
          </section>

          {/* SECTION 6 */}
          <section className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">6. Analytics Infrastructure</h2>
            <p className="text-xs leading-relaxed text-slate-600">
              We may utilize privacy-first aggregate traffic analytics to inspect geographic volume and page-loading benchmarks. These analytical counters strictly mandate IP anonymization routines and do not correlate aggregate browsing counts with individual personal profiles.
            </p>
          </section>

          {/* SECTION 7 */}
          <section className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">7. Statutory User Rights (GDPR & CCPA)</h2>
            <p className="text-xs leading-relaxed text-slate-600">
              In accordance with international privacy directives, users retain explicit rights regarding their data footprint:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
              <li><strong>Right to Verification & Access:</strong> The right to request formal confirmation of any records associated with your identifiers.</li>
              <li><strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> The right to demand permanent deletion of communication history held by our support desk.</li>
              <li><strong>Right to Non-Discrimination:</strong> Equal access and identical processing utility regardless of whether privacy opt-outs are activated.</li>
            </ul>
          </section>

          {/* SECTION 8 */}
          <section className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">8. Revisions to Privacy Manifesto</h2>
            <p className="text-xs leading-relaxed text-slate-600">
              We reserve the right to revise this policy periodically to accommodate browser runtime evolutions or updated legal precedents. Material modifications are communicated directly through date-stamping on this page.
            </p>
          </section>

          {/* SECTION 9: FAQ */}
          <section className="space-y-4 pt-6 border-t border-slate-200/80">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">9. Privacy Frequently Asked Questions (FAQ)</h2>
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl liquid-pill space-y-1">
                <h3 className="font-bold text-slate-900 mb-1">Is my submitted writing stored on your servers?</h3>
                <p className="text-slate-600 leading-relaxed">
                  No. Text parsing executes entirely within your client machine&apos;s active RAM. When you close the browser tab or hit Clear, no record exists on any server.
                </p>
              </div>
              <div className="p-4 rounded-2xl liquid-pill space-y-1">
                <h3 className="font-bold text-slate-900 mb-1">Do you claim ownership over analyzed content?</h3>
                <p className="text-slate-600 leading-relaxed">
                  Never. You retain 100% unrestricted intellectual property rights and copyrights over everything composed or analyzed within our workspace.
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>

    </div>
  );
}