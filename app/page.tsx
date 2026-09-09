"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

type CaseMode = 'upper' | 'lower' | 'title' | 'sentence';

const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t',
  'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
  'can', 'can\'t', 'cannot', 'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing',
  'don\'t', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t',
  'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers',
  'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in',
  'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s', 'me', 'more', 'most', 'mustn\'t',
  'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our',
  'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s',
  'should', 'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs',
  'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re',
  'they\'ve', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t',
  'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s',
  'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t',
  'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves'
]);

function countSyllablesInWord(word: string): number {
  const clean = word.toLowerCase().replace(/[^a-z]/g, '');
  if (clean.length <= 3) return 1;
  const replaced = clean.replace(/(?:[^laeiouy]|ed|es|e)$/, '').replace(/^y/, '');
  const matches = replaced.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

export default function WordCounterPage() {
  const [text, setText] = useState('');
  const [history, setHistory] = useState<string[]>(['']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  // UI Interactive States
  const [caseMenuOpen, setCaseMenuOpen] = useState(false);
  const [densityMode, setDensityMode] = useState<'1' | '2' | '3'>('1');
  const [filterStopWords, setFilterStopWords] = useState(true);
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [targetGoal, setTargetGoal] = useState<number>(500);
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [flowScoreEnabled, setFlowScoreEnabled] = useState(false);
  const [flowModalOpen, setFlowModalOpen] = useState(false);
  const [optionsModalOpen, setOptionsModalOpen] = useState(false);

  const [visibleMetrics, setVisibleMetrics] = useState({
    words: true,
    characters: true,
    sentences: true,
    paragraphs: true,
    readingLevel: true,
    readingTime: true,
    speakingTime: true,
    uniqueWords: true,
    handwritingTime: true,
    charNoSpaces: false,
    avgSentenceWords: false,
    avgSentenceCharacters: false,
    avgWordLength: false,
    shortestSentence: false,
    longestSentence: false,
    syllables: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (optionsModalOpen || flowModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [optionsModalOpen, flowModalOpen]);

  useEffect(() => {
    const saved = localStorage.getItem('rmn_wordcounter_draft');
    if (saved) {
      setText(saved);
      setHistory([saved]);
    }
    const savedMetrics = localStorage.getItem('rmn_wordcounter_metrics_16');
    if (savedMetrics) {
      try {
        setVisibleMetrics(JSON.parse(savedMetrics));
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (autoSaveEnabled) {
      localStorage.setItem('rmn_wordcounter_draft', text);
    }
  }, [text, autoSaveEnabled]);

  const toggleMetric = (key: keyof typeof visibleMetrics) => {
    const updated = { ...visibleMetrics, [key]: !visibleMetrics[key] };
    setVisibleMetrics(updated);
    localStorage.setItem('rmn_wordcounter_metrics_16', JSON.stringify(updated));
  };

  // ---------------- METRICS ENGINE ----------------
  const trimmed = text.trim();
  const rawWordsArray = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
  const wordCount = rawWordsArray.length;
  const charCount = text.length;
  const charNoSpacesCount = text.replace(/\s/g, '').length;

  const rawSentences = trimmed ? trimmed.split(/[.!?]+/).map((s) => s.trim()).filter((s) => s.length > 0) : [];
  const sentenceCount = rawSentences.length > 0 ? rawSentences.length : (wordCount > 0 ? 1 : 0);

  const paragraphCount = trimmed
    ? text.split(/\n+/).filter((p) => p.trim().length > 0).length
    : 0;

  const uniqueWords = new Set(rawWordsArray.map((w) => w.toLowerCase().replace(/[^a-zA-Z0-9]/g, ''))).size;

  const readingTimeSec = Math.max(1, Math.ceil((wordCount / 200) * 60));
  const speakingTimeSec = Math.max(1, Math.ceil((wordCount / 130) * 60));
  const handwritingTimeSec = Math.max(1, Math.ceil((wordCount / 13) * 60));

  const avgSentenceWords = sentenceCount > 0 ? Math.round(wordCount / sentenceCount) : 0;
  const avgSentenceCharacters = sentenceCount > 0 ? Math.round(charNoSpacesCount / sentenceCount) : 0;
  const avgWordLength = wordCount > 0 ? (charNoSpacesCount / wordCount).toFixed(1) : '0';

  const sentenceLengths = rawSentences.map((s) => s.split(/\s+/).filter(Boolean).length);
  const longestSentenceWords = sentenceLengths.length > 0 ? Math.max(...sentenceLengths) : 0;
  const shortestSentenceWords = sentenceLengths.length > 0 ? Math.min(...sentenceLengths) : 0;

  const syllablesCount = rawWordsArray.reduce((acc, w) => acc + countSyllablesInWord(w), 0);

  const formatSec = (sec: number) => {
    if (wordCount === 0) return '0s';
    if (sec < 60) return `${sec}s`;
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return s > 0 ? `${m}m ${s}s` : `${m}m`;
  };

  const getReadability = () => {
    if (wordCount < 10) return { grade: 'N/A' };
    const L = (charNoSpacesCount / wordCount) * 100;
    const S = (sentenceCount / wordCount) * 100;
    const index = Math.round(0.0588 * L - 0.296 * S - 15.8);

    if (index <= 6) return { grade: `Grade ${Math.max(1, index)}` };
    if (index <= 10) return { grade: `Grade ${index}` };
    if (index <= 13) return { grade: `Grade ${index}` };
    return { grade: 'College Graduate' };
  };

  const readability = getReadability();

  const getFlowStats = () => {
    if (rawSentences.length === 0) {
      return {
        score: 0,
        buckets: [
          { label: '1 word', count: 0, active: false, badgeColor: 'bg-purple-100 text-purple-800 border-purple-200' },
          { label: '2–6 words', count: 0, active: false, badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
          { label: '7–15 words', count: 0, active: false, badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
          { label: '16–25 words', count: 0, active: false, badgeColor: 'bg-amber-100 text-amber-800 border-amber-200' },
          { label: '26–39 words', count: 0, active: false, badgeColor: 'bg-orange-100 text-orange-800 border-orange-200' },
          { label: '40+ words', count: 0, active: false, badgeColor: 'bg-rose-100 text-rose-800 border-rose-200' },
        ]
      };
    }

    const b = [0, 0, 0, 0, 0, 0];
    rawSentences.forEach((sentence) => {
      const len = sentence.split(/\s+/).filter(Boolean).length;
      if (len === 1) b[0]++;
      else if (len >= 2 && len <= 6) b[1]++;
      else if (len >= 7 && len <= 15) b[2]++;
      else if (len >= 16 && len <= 25) b[3]++;
      else if (len >= 26 && len <= 39) b[4]++;
      else if (len >= 40) b[5]++;
    });

    const populatedBuckets = b.filter((count) => count > 0).length;
    const varietyScore = Math.min(100, Math.round((populatedBuckets / 4) * 100));

    return {
      score: varietyScore,
      buckets: [
        { label: '1 word', count: b[0], active: b[0] > 0, badgeColor: 'bg-purple-100 text-purple-800 border-purple-200' },
        { label: '2–6 words', count: b[1], active: b[1] > 0, badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
        { label: '7–15 words', count: b[2], active: b[2] > 0, badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
        { label: '16–25 words', count: b[3], active: b[3] > 0, badgeColor: 'bg-amber-100 text-amber-800 border-amber-200' },
        { label: '26–39 words', count: b[4], active: b[4] > 0, badgeColor: 'bg-orange-100 text-orange-800 border-orange-200' },
        { label: '40+ words', count: b[5], active: b[5] > 0, badgeColor: 'bg-rose-100 text-rose-800 border-rose-200' },
      ]
    };
  };

  const flowStats = getFlowStats();

  const getDensityList = () => {
    if (rawWordsArray.length === 0) return [];
    const n = parseInt(densityMode, 10);
    const map: Record<string, number> = {};

    const cleanedTokens = rawWordsArray.map((w) =>
      w.toLowerCase().replace(/^[^a-z0-9']+|[^a-z0-9']+$/gi, '')
    ).filter(Boolean);

    for (let i = 0; i <= cleanedTokens.length - n; i++) {
      const slice = cleanedTokens.slice(i, i + n);

      if (n === 1 && filterStopWords && STOP_WORDS.has(slice[0])) continue;
      if (n > 1 && filterStopWords && (STOP_WORDS.has(slice[0]) || STOP_WORDS.has(slice[slice.length - 1]))) continue;

      const phrase = slice.join(' ');
      if (phrase.trim().length > 1) {
        map[phrase] = (map[phrase] || 0) + 1;
      }
    }

    const totalEligibleTokens = Math.max(1, wordCount);

    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .map(([phrase, count]) => ({
        phrase,
        count,
        percent: Math.round((count / totalEligibleTokens) * 100),
      }));
  };

  const densityList = getDensityList();

  const updateText = (newVal: string) => {
    setText(newVal);
    const updatedHistory = history.slice(0, historyIndex + 1);
    updatedHistory.push(newVal);
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
  };

  const handlePaste = async () => {
    try {
      const clip = await navigator.clipboard.readText();
      updateText(text ? `${text} ${clip}` : clip);
    } catch {
      alert('Use Ctrl+V or Cmd+V to paste content.');
    }
  };

  const handleCopy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  const handleClear = () => {
    if (!text) return;
    if (confirm('Clear the workspace?')) {
      updateText('');
      setSelectedKeyword(null);
      setFlowScoreEnabled(false);
      localStorage.removeItem('rmn_wordcounter_draft');
    }
  };

  const applyCase = (mode: CaseMode) => {
    setCaseMenuOpen(false);
    if (!text) return;

    if (mode === 'upper') updateText(text.toUpperCase());
    if (mode === 'lower') updateText(text.toLowerCase());
    if (mode === 'title') {
      updateText(text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()));
    }
    if (mode === 'sentence') {
      updateText(text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()));
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setText(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setText(history[historyIndex + 1]);
    }
  };

  const activeMetricsCount = Object.values(visibleMetrics).filter(Boolean).length;
  const hiddenMetricsCount = Object.values(visibleMetrics).filter((v) => !v).length;
  const isVisualModeActive = Boolean(selectedKeyword || flowScoreEnabled);
  const goalPercentage = Math.min(100, Math.round((wordCount / (targetGoal || 1)) * 100));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "WordCounter",
    "url": "https://rmnlove.com",
    "description": "Free, privacy-first real-time word counter, character counter, and keyword density analyzer running locally in memory.",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="apple-glass-backdrop text-slate-800 font-sans antialiased flex flex-col relative flex-1">
      
      {/* STRUCTURED DATA ENRICHMENT */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* SOFT APPLE AMBIENT LIGHTING */}
      <div className="absolute top-[-5%] left-[-4%] w-[600px] h-[600px] rounded-full bg-slate-300/35 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[32%] right-[-5%] w-[550px] h-[550px] rounded-full bg-indigo-500/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[4%] left-[15%] w-[500px] h-[500px] rounded-full bg-slate-200/45 blur-[130px] pointer-events-none -z-10" />

      {/* ================= MAIN WORKSPACE ================= */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex-1">
        
        {/* SEMANTIC H1 TAG FOR TECHNICAL SEO COMPLIANCE */}
        <div className="mb-4">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            WordCounter — Real-Time Word & Character Calculator
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Fast client-side text telemetry, readability level, and keyword density analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ================= LEFT COLUMN: 8 COLS ================= */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* HERO STATS CARD */}
            <div className="tool-card rounded-3xl p-5 sm:p-6 space-y-3.5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-baseline gap-6">
                  <div>
                    <span className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight drop-shadow-xs">
                      {wordCount}
                    </span>
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-widest ml-2">Words</span>
                  </div>
                  <div className="text-slate-400 text-3xl font-thin">/</div>
                  <div>
                    <span className="text-3xl sm:text-4xl font-black text-slate-700 tracking-tight">
                      {charCount}
                    </span>
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-widest ml-2">Characters</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setGoalModalOpen(!goalModalOpen)}
                    className="liquid-pill px-4 py-2 rounded-full text-xs font-bold text-slate-800 flex items-center gap-2 cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
                    </svg>
                    <span>Target: {targetGoal}w</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="liquid-pill px-4 py-2 rounded-full text-xs font-bold text-indigo-800 flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    <span>{copiedNotification ? 'Copied!' : 'Copy Text'}</span>
                  </button>
                </div>
              </div>

              {/* TARGET PROGRESS BAR */}
              <div className="space-y-1.5 pt-2 border-t border-slate-200/80">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span>Writing Velocity & Target Completion</span>
                  <span className="text-indigo-700 font-mono font-bold">{goalPercentage}% of {targetGoal} words</span>
                </div>
                <div className="w-full h-2 bg-slate-300/40 rounded-full overflow-hidden p-0.5 border border-white">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ease-out ${
                      goalPercentage >= 100 
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500' 
                        : 'bg-gradient-to-r from-indigo-500 to-purple-600'
                    }`}
                    style={{ width: `${goalPercentage}%` }}
                  />
                </div>
              </div>

              {goalModalOpen && (
                <div className="p-3 liquid-pill rounded-2xl flex items-center gap-3 text-xs modal-animate">
                  <span className="font-bold text-slate-800">Set Custom Target:</span>
                  <input
                    type="number"
                    min="50"
                    step="50"
                    value={targetGoal}
                    onChange={(e) => setTargetGoal(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-24 px-3 py-1.5 bg-white/80 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={() => setGoalModalOpen(false)}
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs cursor-pointer shadow-xs"
                  >
                    Set
                  </button>
                </div>
              )}
            </div>

            {/* ACTION TOOLBAR */}
            <div className="liquid-pill rounded-full px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-slate-700">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handlePaste}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/60 text-slate-800 transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>Paste</span>
                </button>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setCaseMenuOpen(!caseMenuOpen)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/60 text-slate-800 transition-colors cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M6 12h12M9 17h6" />
                    </svg>
                    <span>Change Case</span>
                    <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {caseMenuOpen && (
                    <div className="absolute top-full left-0 mt-2 liquid-modal rounded-2xl py-2 w-40 z-30 text-xs font-semibold modal-animate">
                      <button onClick={() => applyCase('upper')} className="w-full text-left px-4 py-2 hover:bg-indigo-50/70 text-slate-800">UPPERCASE</button>
                      <button onClick={() => applyCase('lower')} className="w-full text-left px-4 py-2 hover:bg-indigo-50/70 text-slate-800">lowercase</button>
                      <button onClick={() => applyCase('title')} className="w-full text-left px-4 py-2 hover:bg-indigo-50/70 text-slate-800">Title Case</button>
                      <button onClick={() => applyCase('sentence')} className="w-full text-left px-4 py-2 hover:bg-indigo-50/70 text-slate-800">Sentence case</button>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleClear}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-rose-50 text-rose-600 transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 text-rose-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Clear</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAutoSaveEnabled(!autoSaveEnabled)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                    autoSaveEnabled ? 'text-emerald-800 bg-emerald-50 border border-emerald-200' : 'text-slate-400'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${autoSaveEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                  <span>Auto-Save {autoSaveEnabled ? 'ON' : 'OFF'}</span>
                </button>
              </div>

              <div className="flex items-center gap-1 border-l border-slate-300 pl-3">
                <button
                  type="button"
                  disabled={historyIndex <= 0}
                  onClick={handleUndo}
                  className="p-1.5 rounded-full hover:bg-white/60 text-slate-700 disabled:opacity-20 cursor-pointer"
                  title="Undo"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a5 5 0 015 5v2m-15-7l4-4m-4 4l4 4" />
                  </svg>
                </button>
                <button
                  type="button"
                  disabled={historyIndex >= history.length - 1}
                  onClick={handleRedo}
                  className="p-1.5 rounded-full hover:bg-white/60 text-slate-700 disabled:opacity-20 cursor-pointer"
                  title="Redo"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 10H11a5 5 0 00-5 5v2m15-7l-4-4m4 4l-4 4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* EDITING CANVAS */}
            <div className="tool-card rounded-3xl p-6 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-200 transition-all min-h-[380px]">
              {isVisualModeActive && text ? (
                <div className="space-y-4 modal-animate">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                    <span className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      {selectedKeyword ? (
                        <span>Highlighting: <strong className="bg-amber-200/80 text-slate-900 border border-amber-300 px-2 py-0.5 rounded-md font-mono">{selectedKeyword}</strong></span>
                      ) : (
                        <span>Flow Score Rhythm Active</span>
                      )}
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedKeyword(null);
                        setFlowScoreEnabled(false);
                      }}
                      className="liquid-pill px-3.5 py-1.5 rounded-full text-slate-800 text-xs font-bold cursor-pointer"
                    >
                      ✕ Return to Editor
                    </button>
                  </div>

                  <div className="text-slate-900 text-base leading-relaxed break-words whitespace-pre-wrap font-sans min-h-[300px]">
                    {selectedKeyword ? (
                      text.split(new RegExp(`(\\b${selectedKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b)`, 'gi')).map((part, i) =>
                        part.toLowerCase() === selectedKeyword.toLowerCase() ? (
                          <mark key={i} className="bg-amber-300 text-slate-950 font-bold px-1 rounded-sm shadow-xs">
                            {part}
                          </mark>
                        ) : (
                          <span key={i}>{part}</span>
                        )
                      )
                    ) : (
                      (text.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [text]).map((sentence, idx) => {
                        const len = sentence.trim().split(/\s+/).filter(Boolean).length;
                        let bg = 'bg-slate-100 text-slate-800';
                        if (len === 1) bg = 'bg-purple-100 text-purple-950 border border-purple-200';
                        else if (len >= 2 && len <= 6) bg = 'bg-indigo-100 text-indigo-950 border border-indigo-200';
                        else if (len >= 7 && len <= 15) bg = 'bg-emerald-100 text-emerald-950 border border-emerald-200';
                        else if (len >= 16 && len <= 25) bg = 'bg-amber-100 text-amber-950 border border-amber-200';
                        else if (len >= 26 && len <= 39) bg = 'bg-orange-100 text-orange-950 border border-orange-200';
                        else if (len >= 40) bg = 'bg-rose-100 text-rose-950 border border-rose-200';

                        return (
                          <span key={idx} className={`px-1.5 py-0.5 rounded-md inline mr-1 leading-loose ${bg}`}>
                            {sentence}
                          </span>
                        );
                      })
                    )}
                  </div>
                </div>
              ) : (
                <textarea
                  rows={14}
                  value={text}
                  onChange={(e) => updateText(e.target.value)}
                  placeholder="Start typing your essay, blog, manuscript, or speech..."
                  className="w-full bg-transparent border-none outline-none resize-y text-slate-900 text-base leading-relaxed placeholder-slate-400 min-h-[340px]"
                />
              )}
            </div>

            {/* SUB-METRICS STRIP */}
            <div className="flex items-center justify-between text-xs text-slate-600 px-2 font-medium">
              <span>{charNoSpacesCount} characters without spaces</span>
              <span>{paragraphCount} paragraphs • {sentenceCount} sentences</span>
            </div>

            {/* ================= RICH EDITORIAL & GUIDELINE SECTION (ADSENSE CRITICAL) ================= */}
            <article id="content-guide" className="tool-card rounded-3xl p-8 mt-12 space-y-8 text-slate-700">
              
              <section className="space-y-3">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Comprehensive Guide to Text Telemetry & Content Optimization
                </h2>
                <p className="text-sm leading-relaxed text-slate-600">
                  Whether crafting an academic thesis, formatting an organic SEO blog post, or adhering to strict social media character limits, precise textual length matters. WordCounter provides real-time character, word, sentence, and readability evaluations without sending your data to remote cloud servers.
                </p>
                <p className="text-sm leading-relaxed text-slate-600">
                  Linguistic density, reading pace, and sentence cadence directly influence how information is absorbed. By balancing short, impactful sentences with detailed analytical compound clauses, writers establish an engaging narrative rhythm that sustains audience attention.
                </p>
              </section>

              {/* TABLE 1: SOCIAL MEDIA LIMITS */}
              <section className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  Official Social Media Character & Word Limits
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Different digital networks enforce unique constraints. Below is the verified breakdown of character allowances across major online platforms:
                </p>
                
                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white/60">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100/80 text-slate-900 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Platform</th>
                        <th className="p-3">Maximum Limit</th>
                        <th className="p-3">Recommended Optimal Length</th>
                        <th className="p-3">Strategic Objective</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      <tr>
                        <td className="p-3 font-semibold text-slate-900">X (Twitter)</td>
                        <td className="p-3 font-mono">280 characters</td>
                        <td className="p-3 font-mono">70–120 characters</td>
                        <td className="p-3">Higher retweets and quick scannability</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-900">Instagram Captions</td>
                        <td className="p-3 font-mono">2,200 characters</td>
                        <td className="p-3 font-mono">150–200 characters</td>
                        <td className="p-3">Keeps text visible above the &apos;...more&apos; truncation fold</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-900">LinkedIn Updates</td>
                        <td className="p-3 font-mono">3,000 characters</td>
                        <td className="p-3 font-mono">1,000–1,500 characters</td>
                        <td className="p-3">Deep professional insight and engagement</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-900">YouTube Title</td>
                        <td className="p-3 font-mono">100 characters</td>
                        <td className="p-3 font-mono">50–60 characters</td>
                        <td className="p-3">Prevents title cutoff on mobile display screens</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-900">Facebook Post</td>
                        <td className="p-3 font-mono">63,206 characters</td>
                        <td className="p-3 font-mono">40–80 characters</td>
                        <td className="p-3">Short posts capture highest organic interactions</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* TABLE 2: SEO BENCHMARKS */}
              <section className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  Search Engine Optimization (SEO) Content Length Standards
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Search engines like Google prioritize complete, high-utility answers over keyword-stuffed thin articles. Use these content length benchmarks to align your editorial strategy:
                </p>
                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white/60">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100/80 text-slate-900 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Element Type</th>
                        <th className="p-3">Standard Length</th>
                        <th className="p-3">Core Quality Guideline</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      <tr>
                        <td className="p-3 font-semibold text-slate-900">SEO Title Tag</td>
                        <td className="p-3 font-mono">50–60 characters</td>
                        <td className="p-3">Keeps headline fully visible in Google SERP without truncation</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-900">Meta Description</td>
                        <td className="p-3 font-mono">150–160 characters</td>
                        <td className="p-3">Summarizes page intent and maximizes organic click-through rate (CTR)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-900">Informational Blog Post</td>
                        <td className="p-3 font-mono">1,500–2,500 words</td>
                        <td className="p-3">Provides comprehensive coverage and ranks for diverse long-tail keywords</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-900">Product Descriptions</td>
                        <td className="p-3 font-mono">300–500 words</td>
                        <td className="p-3">Combines technical product specs with clear consumer benefits</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* SECTION: KEYWORD DENSITY & OVER-OPTIMIZATION */}
              <section className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  Understanding Keyword Density & Avoiding Search Penalties
                </h3>
                <p className="text-xs leading-relaxed text-slate-600">
                  Keyword density represents the percentage of times a chosen keyword appears relative to the entire word count. Modern search algorithms penalize repetitive stuffing. Maintaining a targeted keyword density between <strong>1.0% and 2.0%</strong> ensures natural language flow while signaling topical relevance.
                </p>
                <p className="text-xs leading-relaxed text-slate-600">
                  Our built-in n-gram keyword analyzer strips stop words (such as <em>the</em>, <em>and</em>, <em>at</em>) to isolate authentic repeating vocabulary. Use the x1, x2, and x3 filters above to inspect single words and multi-word semantic clusters.
                </p>
              </section>

              {/* FAQ SECTION */}
              <section id="faq" className="space-y-4 pt-6 border-t border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">Frequently Asked Questions</h3>
                <div className="space-y-3 text-xs">
                  <div className="p-4 rounded-2xl liquid-pill space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">How is reading duration calculated?</h4>
                    <p className="text-slate-600 leading-relaxed">
                      Silent reading duration is calibrated at 200 words per minute (WPM), the standard scientific metric for adult literacy. Speaking time is based on 130 WPM for clear keynote delivery.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl liquid-pill space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">Is any submitted text stored or monitored?</h4>
                    <p className="text-slate-600 leading-relaxed">
                      No. Processing executes entirely inside client RAM memory. No text data is stored in remote databases or transmitted over external network endpoints.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl liquid-pill space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">Does this tool support academic essay pacing?</h4>
                    <p className="text-slate-600 leading-relaxed">
                      Yes. The target tracker enables students and researchers to set custom volume thresholds (e.g. 1,000, 2,500 words) to monitor structural velocity in real time.
                    </p>
                  </div>
                </div>
              </section>

            </article>

          </div>

          {/* ================= RIGHT COLUMN: 4 COLS (STICKY SIDEBAR) ================= */}
          <div className="lg:col-span-4 space-y-3 lg:sticky lg:top-20">
            
            {/* 1. DETAILS METRICS CARD */}
            <div className="tool-card rounded-3xl overflow-hidden shadow-xs">
              <div className="px-3.5 py-1.5 bg-white/40 border-b border-slate-200/70 flex items-center justify-between">
                <span className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Details
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_#10b981]" />
              </div>

              <div className="divide-y divide-slate-100 text-xs font-semibold">
                {visibleMetrics.words && (
                  <div className="px-3.5 py-0.5 flex items-center justify-between">
                    <span className="text-slate-600">Words</span>
                    <span className="font-mono font-bold text-slate-900 bg-white/80 border border-slate-200 px-2 py-0.2 rounded shadow-2xs">{wordCount}</span>
                  </div>
                )}
                {visibleMetrics.characters && (
                  <div className="px-3.5 py-0.5 flex items-center justify-between">
                    <span className="text-slate-600">Characters</span>
                    <span className="font-mono font-bold text-slate-900 bg-white/80 border border-slate-200 px-2 py-0.2 rounded shadow-2xs">{charCount}</span>
                  </div>
                )}
                {visibleMetrics.charNoSpaces && (
                  <div className="px-3.5 py-0.5 flex items-center justify-between">
                    <span className="text-slate-600">Characters (no spaces)</span>
                    <span className="font-mono font-bold text-slate-900 bg-white/80 border border-slate-200 px-2 py-0.2 rounded shadow-2xs">{charNoSpacesCount}</span>
                  </div>
                )}
                {visibleMetrics.sentences && (
                  <div className="px-3.5 py-0.5 flex items-center justify-between">
                    <span className="text-slate-600">Sentences</span>
                    <span className="font-mono font-bold text-slate-900 bg-white/80 border border-slate-200 px-2 py-0.2 rounded shadow-2xs">{sentenceCount}</span>
                  </div>
                )}
                {visibleMetrics.paragraphs && (
                  <div className="px-3.5 py-0.5 flex items-center justify-between">
                    <span className="text-slate-600">Paragraphs</span>
                    <span className="font-mono font-bold text-slate-900 bg-white/80 border border-slate-200 px-2 py-0.2 rounded shadow-2xs">{paragraphCount}</span>
                  </div>
                )}
                {visibleMetrics.uniqueWords && (
                  <div className="px-3.5 py-0.5 flex items-center justify-between">
                    <span className="text-slate-600">Unique Vocabulary</span>
                    <span className="font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.2 rounded">{uniqueWords}</span>
                  </div>
                )}
                {visibleMetrics.readingLevel && (
                  <div className="px-3.5 py-0.5 flex items-center justify-between">
                    <span className="text-slate-600">Reading Level</span>
                    <span className="font-mono font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.2 rounded">
                      {readability.grade}
                    </span>
                  </div>
                )}
                {visibleMetrics.readingTime && (
                  <div className="px-3.5 py-0.5 flex items-center justify-between">
                    <span className="text-slate-600">Reading Time</span>
                    <span className="font-mono font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.2 rounded">
                      {formatSec(readingTimeSec)}
                    </span>
                  </div>
                )}
                {visibleMetrics.speakingTime && (
                  <div className="px-3.5 py-0.5 flex items-center justify-between">
                    <span className="text-slate-600">Speaking Time</span>
                    <span className="font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.2 rounded">
                      {formatSec(speakingTimeSec)}
                    </span>
                  </div>
                )}
                {visibleMetrics.handwritingTime && (
                  <div className="px-3.5 py-0.5 flex items-center justify-between">
                    <span className="text-slate-600">Handwriting</span>
                    <span className="font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.2 rounded">
                      {formatSec(handwritingTimeSec)}
                    </span>
                  </div>
                )}
                {visibleMetrics.avgSentenceWords && (
                  <div className="px-3.5 py-0.5 flex items-center justify-between">
                    <span className="text-slate-600">Avg. Sentence (Words)</span>
                    <span className="font-mono font-bold text-slate-900 bg-white/80 border border-slate-200 px-2 py-0.2 rounded shadow-2xs">{avgSentenceWords}</span>
                  </div>
                )}
                {visibleMetrics.avgSentenceCharacters && (
                  <div className="px-3.5 py-0.5 flex items-center justify-between">
                    <span className="text-slate-600">Avg. Sentence (Characters)</span>
                    <span className="font-mono font-bold text-slate-900 bg-white/80 border border-slate-200 px-2 py-0.2 rounded shadow-2xs">{avgSentenceCharacters}</span>
                  </div>
                )}
                {visibleMetrics.avgWordLength && (
                  <div className="px-3.5 py-0.5 flex items-center justify-between">
                    <span className="text-slate-600">Avg. Word Length</span>
                    <span className="font-mono font-bold text-slate-900 bg-white/80 border border-slate-200 px-2 py-0.2 rounded shadow-2xs">{avgWordLength}</span>
                  </div>
                )}
                {visibleMetrics.shortestSentence && (
                  <div className="px-3.5 py-0.5 flex items-center justify-between">
                    <span className="text-slate-600">Shortest Sentence</span>
                    <span className="font-mono font-bold text-slate-900 bg-white/80 border border-slate-200 px-2 py-0.2 rounded shadow-2xs">{shortestSentenceWords}w</span>
                  </div>
                )}
                {visibleMetrics.longestSentence && (
                  <div className="px-3.5 py-0.5 flex items-center justify-between">
                    <span className="text-slate-600">Longest Sentence</span>
                    <span className="font-mono font-bold text-slate-900 bg-white/80 border border-slate-200 px-2 py-0.2 rounded shadow-2xs">{longestSentenceWords}w</span>
                  </div>
                )}
                {visibleMetrics.syllables && (
                  <div className="px-3.5 py-0.5 flex items-center justify-between">
                    <span className="text-slate-600">Syllables</span>
                    <span className="font-mono font-bold text-slate-900 bg-white/80 border border-slate-200 px-2 py-0.2 rounded shadow-2xs">{syllablesCount}</span>
                  </div>
                )}
              </div>

              <div className="px-3.5 py-1.5 bg-white/40 border-t border-slate-200/70 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => setOptionsModalOpen(true)}
                  className="text-indigo-700 hover:text-indigo-900 font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>More Options ({activeMetricsCount} active / {hiddenMetricsCount} hidden)</span>
                </button>
              </div>
            </div>

            {/* 2. FLOW SCORE CARD */}
            <div className="tool-card rounded-3xl overflow-hidden shadow-xs">
              <div className="px-3.5 py-1.5 bg-white/40 border-b border-slate-200/70 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-widest">
                    Flow Score
                  </span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                    VARIETY
                  </span>
                  <button
                    type="button"
                    onClick={() => setFlowModalOpen(true)}
                    className="w-4 h-4 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
                
                <div
                  role="switch"
                  aria-checked={flowScoreEnabled}
                  onClick={() => {
                    const next = !flowScoreEnabled;
                    setFlowScoreEnabled(next);
                    if (next) setSelectedKeyword(null);
                  }}
                  className={`apple-liquid-switch ${flowScoreEnabled ? 'active' : ''}`}
                >
                  <span className="apple-liquid-thumb" />
                </div>
              </div>

              <div className="p-3 space-y-1.5">
                <div className="flex flex-wrap gap-1.5">
                  {flowStats.buckets.map((b, idx) => (
                    <span
                      key={idx}
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full border transition-all ${
                        b.active ? `${b.badgeColor} shadow-2xs` : 'bg-white/40 text-slate-400 border-slate-200'
                      }`}
                    >
                      {b.label} {b.count > 0 && `(${b.count})`}
                    </span>
                  ))}
                </div>

                <div className="space-y-1 pt-1 border-t border-slate-200/80">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700">
                    <span>Sentence Variety Rhythm</span>
                    <span className="font-mono text-indigo-700 font-bold">{wordCount > 0 ? `${flowStats.score}%` : '0%'}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-300/60 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 via-indigo-500 to-emerald-500 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${wordCount > 0 ? flowStats.score : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. KEYWORD DENSITY */}
            <div className="tool-card rounded-3xl overflow-hidden shadow-xs">
              <div className="px-3.5 py-1.5 bg-white/40 border-b border-slate-200/70 flex items-center justify-between">
                <span className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Density
                </span>
                
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setFilterStopWords(!filterStopWords)}
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full border transition-colors cursor-pointer ${
                      filterStopWords ? 'bg-indigo-100 text-indigo-800 border-indigo-300' : 'bg-white/60 text-slate-600 border-slate-200'
                    }`}
                  >
                    {filterStopWords ? 'Stopwords: OFF' : 'Stopwords: ON'}
                  </button>

                  <div className="flex gap-1">
                    {(['1', '2', '3'] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => {
                          setDensityMode(m);
                          setSelectedKeyword(null);
                        }}
                        className={`text-[9px] px-2 py-0.5 rounded-full font-bold transition-all cursor-pointer ${
                          densityMode === m ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white/60 text-slate-700 hover:bg-white'
                        }`}
                      >
                        x{m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-2.5 max-h-[220px] overflow-y-auto custom-scrollbar space-y-0.5">
                {densityList.length > 0 ? (
                  densityList.map((item, idx) => {
                    const isSelected = selectedKeyword === item.phrase;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setSelectedKeyword(null);
                          } else {
                            setSelectedKeyword(item.phrase);
                            setFlowScoreEnabled(false);
                          }
                        }}
                        className={`w-full text-left px-3 py-1 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-500/20'
                            : 'hover:bg-white/70 text-slate-700 font-medium'
                        }`}
                      >
                        <span className="truncate max-w-[160px] flex items-center gap-1.5">
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />}
                          {item.phrase}
                        </span>
                        <div className="flex items-center gap-2 font-mono">
                          <span className={isSelected ? 'text-indigo-100' : 'text-slate-400'}>{item.count}</span>
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                              isSelected
                                ? 'bg-indigo-700 text-white'
                                : 'bg-white/80 text-slate-600 border border-slate-200'
                            }`}
                          >
                            {item.percent}%
                          </span>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <p className="text-xs text-slate-400 text-center py-4 font-medium">
                    Type text into editor to extract keywords.
                  </p>
                )}
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* ================= OPTIONS MODAL ================= */}
      {mounted && optionsModalOpen && createPortal(
        <div 
          className="fixed inset-0 z-[999999] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOptionsModalOpen(false);
          }}
        >
          <div className="liquid-modal rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 modal-animate">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 shadow-[0_0_8px_#6366f1]" />
                <h3 className="text-sm font-bold text-slate-900">
                  Metrics Configuration ({activeMetricsCount} of 16 visible)
                </h3>
              </div>
              <button
                onClick={() => setOptionsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-600 flex items-center justify-center font-bold text-xs cursor-pointer transition-colors shadow-2xs"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-snug">
              Turn ON/OFF text telemetry metrics in the Details drawer. Changes persist locally.
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-800">
              {[
                { key: 'words', label: 'Words' },
                { key: 'characters', label: 'Characters' },
                { key: 'charNoSpaces', label: 'Characters (no spaces)' },
                { key: 'sentences', label: 'Sentences' },
                { key: 'paragraphs', label: 'Paragraphs' },
                { key: 'uniqueWords', label: 'Unique Vocabulary' },
                { key: 'readingLevel', label: 'Reading Level' },
                { key: 'readingTime', label: 'Reading Time' },
                { key: 'speakingTime', label: 'Speaking Time' },
                { key: 'handwritingTime', label: 'Handwriting' },
                { key: 'avgSentenceWords', label: 'Avg. Sentence (Words)' },
                { key: 'avgSentenceCharacters', label: 'Avg. Sentence (Characters)' },
                { key: 'avgWordLength', label: 'Avg. Word Length' },
                { key: 'shortestSentence', label: 'Shortest Sentence' },
                { key: 'longestSentence', label: 'Longest Sentence' },
                { key: 'syllables', label: 'Syllables Count' },
              ].map(({ key, label }) => {
                const k = key as keyof typeof visibleMetrics;
                const isChecked = visibleMetrics[k];
                return (
                  <div
                    key={key}
                    onClick={() => toggleMetric(k)}
                    className={`flex items-center justify-between px-3 py-2 rounded-2xl border cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-indigo-50/80 border-indigo-300 text-indigo-950 font-bold'
                        : 'bg-white/50 border-slate-200 text-slate-600 hover:bg-white'
                    }`}
                  >
                    <span className="truncate pr-1.5 text-[11px]">{label}</span>
                    <div className={`apple-liquid-switch ${isChecked ? 'active' : ''}`}>
                      <span className="apple-liquid-thumb" />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200/80">
              <span className="text-[10px] text-slate-500 font-mono">
                {activeMetricsCount} Active • {hiddenMetricsCount} Inactive
              </span>
              <button
                onClick={() => setOptionsModalOpen(false)}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-full cursor-pointer shadow-md shadow-indigo-600/20 transition-all active:scale-95"
              >
                Done
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ================= FLOW SCORE MODAL ================= */}
      {mounted && flowModalOpen && createPortal(
        <div 
          className="fixed inset-0 z-[999999] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setFlowModalOpen(false);
          }}
        >
          <div className="liquid-modal rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 modal-animate">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 shadow-[0_0_8px_#6366f1]" />
                Flow Score Sentence Rhythm
              </h3>
              <button
                onClick={() => setFlowModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-600 flex items-center justify-center font-bold text-xs cursor-pointer transition-colors shadow-2xs"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Sentence length highlighting visualizes the musical rhythm of your writing. Combining sentences of varying lengths keeps readers engaged.
            </p>

            <div className="p-4 rounded-2xl liquid-pill space-y-2 text-xs text-slate-700">
              <div className="font-bold text-slate-900 text-xs">Read this classic passage:</div>
              <p className="space-x-1">
                <span className="bg-indigo-100 px-1.5 py-0.5 rounded-md text-indigo-950">This sentence has five words.</span>
                <span className="bg-indigo-100 px-1.5 py-0.5 rounded-md text-indigo-950">Here are five more words.</span>
                <span className="bg-indigo-100 px-1.5 py-0.5 rounded-md text-indigo-950">Five-word sentences are fine.</span>
                <span className="bg-indigo-100 px-1.5 py-0.5 rounded-md text-indigo-950">But several together become monotonous.</span>
              </p>
              <p className="space-x-1 pt-1">
                <span className="bg-purple-100 px-1.5 py-0.5 rounded-md text-purple-950">Now listen.</span>
                <span className="bg-emerald-100 px-1.5 py-0.5 rounded-md text-emerald-950">I vary the sentence length, and I create music.</span>
                <span className="bg-purple-100 px-1.5 py-0.5 rounded-md text-purple-950">Music.</span>
                <span className="bg-indigo-100 px-1.5 py-0.5 rounded-md text-indigo-950">The writing sings.</span>
              </p>
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={() => setFlowModalOpen(false)}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-full cursor-pointer shadow-md shadow-indigo-600/20 transition-all active:scale-95"
              >
                Done
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}