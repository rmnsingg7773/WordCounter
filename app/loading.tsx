export default function Loading() {
  return (
    <div className="min-h-screen premium-dot-bg flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/25 animate-pulse">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping" />
          Loading workspace...
        </div>
      </div>
    </div>
  );
}