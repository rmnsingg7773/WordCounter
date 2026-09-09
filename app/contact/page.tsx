"use client";

import React, { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'General Inquiry',
    body: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `[${formData.category}] ${formData.subject}`,
          message: formData.body,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || 'Failed to dispatch message.');
      } else {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          category: 'General Inquiry',
          body: '',
        });
      }
    } catch {
      setErrorMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apple-glass-backdrop text-slate-800 font-sans antialiased flex flex-col relative flex-1">
      
      {/* SOFT APPLE AMBIENT LIGHTING */}
      <div className="absolute top-[-5%] left-[-4%] w-[600px] h-[600px] rounded-full bg-slate-300/35 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[32%] right-[-5%] w-[550px] h-[550px] rounded-full bg-indigo-500/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[4%] left-[15%] w-[500px] h-[500px] rounded-full bg-slate-200/45 blur-[130px] pointer-events-none -z-10" />

      {/* ================= MAIN CONTAINER ================= */}
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 5 COLS: SUPPORT CARDS */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-indigo-700">Editorial & Technical Support</span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">Contact Desk</h1>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Have questions regarding text metric algorithms, found a tokenization edge-case, or need technical assistance? Our development team answers inquiries directly.
              </p>
            </div>

            <div className="tool-card rounded-3xl p-6 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl liquid-pill text-indigo-700 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">Direct Inquiries</h3>
                  <a href="mailto:contact@rmnlove.com" className="text-xs text-indigo-700 hover:underline font-semibold block mt-0.5">
                    contact@rmnlove.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 border-t border-slate-200/80">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">Guaranteed Response Window</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Standard inquiries answered within 24–48 business hours.</p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-3xl liquid-pill text-xs text-slate-600 space-y-1.5">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Manuscript Confidentiality
              </span>
              <p className="leading-relaxed">
                We never request, accept, or store your private text documents. For linguistic edge-cases or bug reports, please only submit small, redacted sample phrases.
              </p>
            </div>
          </div>

          {/* RIGHT 7 COLS: INTERACTIVE FORM */}
          <div className="lg:col-span-7">
            <div className="tool-card rounded-3xl p-6 sm:p-8">
              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">Message Delivered Successfully</h2>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out. Your communication has been dispatched to the editorial desk of <span className="font-semibold text-slate-800">rmnlove.com</span>. We will follow up via your email shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setErrorMessage('');
                    }}
                    className="text-xs font-bold text-indigo-700 hover:underline pt-2 cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs font-semibold">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200/90 text-xs focus:outline-none focus:border-indigo-500 bg-white/80 shadow-2xs transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="you@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200/90 text-xs focus:outline-none focus:border-indigo-500 bg-white/80 shadow-2xs transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200/90 text-xs focus:outline-none focus:border-indigo-500 bg-white/80 shadow-2xs transition-colors cursor-pointer"
                      >
                        <option>General Inquiry</option>
                        <option>Bug Report / Discrepancy</option>
                        <option>Feature Request</option>
                        <option>Feedback & Suggestions</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Subject</label>
                      <input
                        type="text"
                        required
                        placeholder="Brief overview of topic"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200/90 text-xs focus:outline-none focus:border-indigo-500 bg-white/80 shadow-2xs transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Detailed Message</label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Please elaborate on your inquiry or reproduction steps..."
                      value={formData.body}
                      onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200/90 text-xs focus:outline-none focus:border-indigo-500 bg-white/80 shadow-2xs resize-y transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-2xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer active:scale-[0.99] disabled:opacity-60"
                  >
                    {loading ? 'Delivering...' : 'Submit Communication'}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}