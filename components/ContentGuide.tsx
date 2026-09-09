export default function ContentGuide() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12 text-slate-700 leading-relaxed space-y-12">
      {/* Overview */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">
          Understanding Word Count, Character Limits, and Text Telemetry
        </h2>
        <p>
          Whether drafting an academic manuscript, preparing digital ad copy, or fine-tuning an SEO article, monitoring length and cadence is critical. WordCounter provides real-time client-side analysis, calculating word counts, syllable frequency, character density, and structural readability without sending text data across external servers.
        </p>
      </div>

      {/* Grid: Character Limits Cheat Sheet */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-800">
          Platform Character & Word Limits (Standard Benchmarks)
        </h3>
        <p>
          Each distribution channel enforces unique character limits and optimal engagement thresholds. Keeping content within these parameters ensures maximum visibility and avoids truncation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 border rounded-lg bg-slate-50 border-slate-200">
            <h4 className="font-bold text-slate-900">Social Media Benchmarks</h4>
            <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
              <li><strong>X (Twitter):</strong> 280 characters (Standard limit)</li>
              <li><strong>LinkedIn Post:</strong> 3,000 characters (Ideal: 150–300 words)</li>
              <li><strong>Instagram Caption:</strong> 2,200 characters (Ideal: Under 125 chars)</li>
              <li><strong>Facebook Post:</strong> 63,206 characters (Ideal: 40–80 chars)</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg bg-slate-50 border-slate-200">
            <h4 className="font-bold text-slate-900">Search Engine Optimization (SEO)</h4>
            <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
              <li><strong>Title Tag:</strong> 50–60 characters (~580 pixels)</li>
              <li><strong>Meta Description:</strong> 150–160 characters (~960 pixels)</li>
              <li><strong>Informational Blog Post:</strong> 1,500–2,500 words</li>
              <li><strong>Product Description:</strong> 300–500 words</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Reading vs Speaking Time Methodology */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-800">
          How Reading and Speaking Times Are Estimated
        </h3>
        <p>
          Estimating engagement metrics depends on human cognitive pacing:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm pl-2">
          <li>
            <strong>Silent Reading Speed:</strong> The average adult reads silently at roughly <strong>200 to 250 words per minute (WPM)</strong>. Complex technical prose typically lowers this pace to 150 WPM, while light reading can exceed 300 WPM.
          </li>
          <li>
            <strong>Vocal Speaking Speed:</strong> Formal presentation cadence averages between <strong>130 and 150 WPM</strong>. Anything exceeding 160 WPM risks reduced listener retention during live presentations or podcast deliveries.
          </li>
          <li>
            <strong>Handwriting Pace:</strong> Physical handwriting averages approximately <strong>13 to 20 words per minute</strong>, an essential guideline when preparing timed written exams.
          </li>
        </ul>
      </div>

      {/* Flow & Keyword Density */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-800">
          Sentence Variance, Flow Score, and Keyword Optimization
        </h3>
        <p>
          Natural writing relies on rhythm. Monotonous sentences of uniform length cause reader fatigue. The <strong>Flow Score</strong> measures sentence variety—mixing punchy short phrases (1–8 words) with detailed explanatory clauses (16–25 words) to maintain narrative momentum.
        </p>
        <p>
          Additionally, tracking <strong>Keyword Density</strong> safeguards content against search engine penalties. Keyword stuffing occurs when target terms exceed 2.5% to 3% of total word volume. A balanced density of 1% to 1.5% ensures contextual relevance while remaining reader-friendly.
        </p>
      </div>

      {/* Privacy & Security */}
      <div className="p-6 border rounded-xl bg-blue-50/60 border-blue-200 space-y-2">
        <h4 className="text-lg font-bold text-blue-900">
          Client-Side Privacy Guarantee
        </h4>
        <p className="text-sm text-blue-800">
          All computations, character counts, and reading metrics on WordCounter run entirely within browser memory (RAM) using JavaScript. Your text is never transmitted, logged, or stored on external servers or third-party databases.
        </p>
      </div>
    </section>
  );
}