'use client';
import { useState } from 'react';
import { Sparkles, CheckCircle, Link as LinkIcon, Newspaper, Hash, Settings2, Download } from 'lucide-react';

export default function Summarize() {
  const [activeTab, setActiveTab] = useState('tab-url');
  const [focus, setFocus] = useState('All sections');
  const [length, setLength] = useState('Bullet points');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const focusOptions = ['All sections', 'Key facts only', 'Quotes & data', 'Background context', 'Implications'];
  const lengthOptions = ['Bullet points', 'Short paragraph', 'Detailed breakdown'];

  const handleSummarize = () => {
    setIsSummarizing(true);
    setShowResult(false);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsSummarizing(false);
      setShowResult(true);
    }, 2500);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <div className="page-header mb-2">
        <div>
          <h1 className="text-2xl font-bold font-display">AI Summarizer</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">Paste a URL or pick a newspaper and section to generate smart summaries</p>
        </div>
      </div>

      <div className="summarizer-panel">
        <div className="summarizer-topbar">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
            <div className="font-medium text-[var(--slate-800)] text-sm">Configure Summary</div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--text-muted)]">Powered by</span>
              <span className="text-xs font-semibold text-[var(--accent)] bg-[var(--accent-light)] px-2 py-1 rounded-full flex items-center gap-1">
                <Sparkles size={12} /> NewsBrief AI
              </span>
            </div>
          </div>
          
          <div className="summarizer-tabs">
            <button 
              className={`summarizer-tab ${activeTab === 'tab-url' ? 'active' : ''}`}
              onClick={() => setActiveTab('tab-url')}
            >
              <div className="flex items-center gap-2"><LinkIcon size={14} /> From URL</div>
            </button>
            <button 
              className={`summarizer-tab ${activeTab === 'tab-paper' ? 'active' : ''}`}
              onClick={() => setActiveTab('tab-paper')}
            >
              <div className="flex items-center gap-2"><Newspaper size={14} /> From Newspaper</div>
            </button>
            <button 
              className={`summarizer-tab ${activeTab === 'tab-topic' ? 'active' : ''}`}
              onClick={() => setActiveTab('tab-topic')}
            >
              <div className="flex items-center gap-2"><Hash size={14} /> By Topic</div>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="summarizer-content">
          
          {activeTab === 'tab-url' && (
            <div className="url-input-row mb-6">
              <div className="url-input flex-1">
                <LinkIcon size={14} className="text-[var(--text-muted)]" />
                <input type="url" placeholder="https://www.nytimes.com/article/..." className="w-full bg-transparent outline-none" />
              </div>
              <button className="btn-primary flex items-center gap-2 px-4 rounded-md font-medium" onClick={handleSummarize}>
                <Sparkles size={14} /> Summarize
              </button>
            </div>
          )}

          {activeTab === 'tab-paper' && (
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="newspaper-picker-inline flex-1 m-0">
                <label>Newspaper:</label>
                <select className="bg-transparent outline-none flex-1 font-medium cursor-pointer">
                  <option>The New York Times</option>
                  <option>The Guardian</option>
                  <option>BBC News</option>
                  <option>Reuters</option>
                  <option>Times of India</option>
                </select>
              </div>
              <div className="newspaper-picker-inline flex-1 m-0">
                <label>Section:</label>
                <select className="bg-transparent outline-none flex-1 font-medium cursor-pointer">
                  <option>Front Page / Top Stories</option>
                  <option>World</option>
                  <option>Politics</option>
                  <option>Business & Finance</option>
                  <option>Technology</option>
                  <option>Science & Climate</option>
                </select>
              </div>
              <button className="btn-primary flex items-center justify-center gap-2 px-6 rounded-md font-medium whitespace-nowrap" onClick={handleSummarize}>
                <Sparkles size={14} /> Summarize
              </button>
            </div>
          )}

          {activeTab === 'tab-topic' && (
            <div className="url-input-row mb-6">
              <div className="url-input flex-1">
                <Hash size={14} className="text-[var(--text-muted)]" />
                <input type="text" placeholder="e.g. Artificial Intelligence regulations in EU" className="w-full bg-transparent outline-none" />
              </div>
              <button className="btn-primary flex items-center gap-2 px-4 rounded-md font-medium" onClick={handleSummarize}>
                <Sparkles size={14} /> Summarize
              </button>
            </div>
          )}

          <div className="section-picker mb-4 px-0 border-none pb-0 pt-0">
            <span className="section-label flex items-center gap-1"><Settings2 size={12} /> Focus on:</span>
            {focusOptions.map(opt => (
              <button 
                key={opt}
                className={`section-chip ${focus === opt ? 'active' : ''}`}
                onClick={() => setFocus(opt)}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="mb-2">
            <span className="section-label mb-2 block">Output length:</span>
            <div className="flex gap-2 flex-wrap">
              {lengthOptions.map(opt => (
                <button 
                  key={opt}
                  className={`section-chip ${length === opt ? 'active' : ''}`}
                  onClick={() => setLength(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isSummarizing && (
          <div className="loading-state pb-12 pt-8">
            <div className="loader-ring mb-4 mx-auto"></div>
            <div className="loading-text font-medium text-center">Analyzing sources…</div>
            <div className="loading-sub text-center mt-1">Reading and extracting key information</div>
          </div>
        )}

        {/* Result Output */}
        {showResult && (
          <div className="summary-output visible border-t border-[var(--slate-100)] pt-6 mt-2">
            <div className="summary-header">
              <div className="summary-source">
                <div className="source-logo bg-[var(--slate-100)] text-[var(--slate-800)] font-display font-bold text-xs flex items-center justify-center">AI</div>
                <div>
                  <div className="source-name">NewsBrief Synthesized Report</div>
                  <div className="source-info text-xs">Generated dynamically • Verified sources</div>
                </div>
              </div>
              <div className="summary-actions">
                <button className="verify-badge verified border-none">
                  <CheckCircle size={12} /> Source Verified
                </button>
                <button className="btn-outline flex items-center gap-1 text-xs px-3 py-1 rounded">
                  <Download size={12} /> Export
                </button>
              </div>
            </div>

            <div className="verify-panel mt-4 mb-6">
              <div className="verify-header flex items-center gap-2 mb-3">
                <CheckCircle size={16} /> Source Verification — Cross-checked
              </div>
              <div className="verify-sources grid gap-2">
                <div className="verify-source-item flex justify-between">
                  <span className="verify-source-name">The New York Times</span>
                  <span className="verify-source-status flex items-center gap-1"><CheckCircle size={12} /> Corroborated</span>
                </div>
                <div className="verify-source-item flex justify-between">
                  <span className="verify-source-name">Reuters</span>
                  <span className="verify-source-status flex items-center gap-1"><CheckCircle size={12} /> Corroborated</span>
                </div>
              </div>
            </div>

            <div className="ai-summary-block mb-6">
              <div className="text-sm font-bold text-[var(--primary-color)] uppercase tracking-wide mb-3 flex items-center gap-2">
                <Sparkles size={14} /> Executive Summary
              </div>
              <ul className="space-y-3 text-sm text-[var(--text-main)] leading-relaxed list-disc pl-5">
                <li><strong>Global Markets Rally:</strong> Tech stocks surged internationally after the latest inflation report showed consumer prices cooling to 2.1%.</li>
                <li><strong>Central Bank Implications:</strong> The Federal Reserve indicated it may hold interest rates steady through the end of the year, dismissing immediate rate cuts.</li>
                <li><strong>Sector Impact:</strong> While tech and consumer discretionary sectors saw gains between 2-4%, banking stocks remained relatively flat.</li>
              </ul>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}
