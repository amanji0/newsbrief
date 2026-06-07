'use client';
import { useState } from 'react';
import { Library, BookOpen, ChevronLeft, ArrowRight, Clock, ShieldCheck } from 'lucide-react';

const NEWSPAPERS = [
  { id: 'hindu', name: 'The Hindu', color: '#1B365D', edition: 'Chennai Edition' },
  { id: 'nyt', name: 'The New York Times', color: '#000000', edition: 'International' },
  { id: 'express', name: 'The Indian Express', color: '#B30000', edition: 'New Delhi Edition' },
  { id: 'guardian', name: 'The Guardian', color: '#052962', edition: 'UK Edition' },
];

const MOCK_ARTICLES = {
  hindu: [
    {
      id: 1,
      title: 'Monsoon advances rapidly across Southern Peninsula',
      time: 'Published 2 hours ago',
      content: `The southwest monsoon has advanced into more parts of the central Arabian Sea, most parts of Karnataka, Maharashtra, and some parts of Andhra Pradesh, the India Meteorological Department (IMD) said on Tuesday.\n\nThe rapid progression is expected to bring significant relief to the agricultural sector, which has been grappling with water shortages. The IMD forecast suggests normal to above-normal rainfall for the upcoming month.\n\n"Conditions are favorable for further advance of Southwest Monsoon into more parts of Maharashtra, Chhattisgarh, Odisha, Coastal Andhra Pradesh and Northwest Bay of Bengal during next 3-4 days," the weather bulletin noted.\n\nFarmers in the region have been advised to begin sowing operations as soil moisture reaches optimal levels.`
    },
    {
      id: 2,
      title: 'New electric vehicle policy announced for major metropolitan cities',
      time: 'Published 5 hours ago',
      content: `In a major push towards green mobility, the government today announced a comprehensive electric vehicle (EV) policy targeting major metropolitan areas. The policy includes expanded subsidies for two-wheelers and commercial fleet vehicles.\n\nThe transport ministry stated that the new framework aims to achieve 30% EV penetration in public transport by 2030.\n\nKey highlights include the establishment of charging infrastructure every 5 kilometers in urban centers and tax exemptions for battery manufacturing plants.`
    }
  ],
  nyt: [
    {
      id: 3,
      title: 'Global markets react to shifting central bank policies',
      time: 'Published 1 hour ago',
      content: `Wall Street saw volatile trading on Monday as investors digested mixed signals from global central banks regarding interest rate trajectories. The S&P 500 closed relatively flat after a turbulent session.\n\nEuropean markets fared slightly better following optimistic comments from the European Central Bank regarding inflation control.\n\nAnalysts remain cautious, noting that the coming weeks of corporate earnings reports will likely dictate market momentum for the rest of the quarter.`
    }
  ]
};

export default function NewspapersPage() {
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [readingArticle, setReadingArticle] = useState(null);

  // View: Grid of Newspapers
  if (!selectedPaper) {
    return (
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Library size={28} className="text-[var(--primary-color)]" />
          <h1 className="text-3xl font-bold m-0 tracking-tight">Library</h1>
        </div>
        
        <p className="text-[var(--text-muted)] mb-8 max-w-2xl text-lg">
          Browse full editions of your favorite newspapers. Select a publication below to read today's articles in their entirety.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NEWSPAPERS.map(paper => (
            <div 
              key={paper.id}
              onClick={() => setSelectedPaper(paper)}
              className="bg-[var(--surface-color)] border border-[var(--border-color)] rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between h-48 group"
            >
              <div className="flex justify-between items-start">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl"
                  style={{ backgroundColor: paper.color }}
                >
                  {paper.name.charAt(0)}
                </div>
                <ArrowRight size={20} className="text-[var(--text-muted)] group-hover:text-[var(--primary-color)] transition-colors" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-[var(--text-main)] mb-1">{paper.name}</h3>
                <span className="text-sm text-[var(--text-muted)] font-medium">{paper.edition}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const articles = MOCK_ARTICLES[selectedPaper.id] || MOCK_ARTICLES.hindu; // fallback for mock

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      
      {/* Back Button & Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border-color)]">
        <button 
          onClick={() => setSelectedPaper(null)}
          className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors font-medium text-sm"
        >
          <ChevronLeft size={18} />
          Back to Library
        </button>
        
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: selectedPaper.color }}>
            {selectedPaper.name.charAt(0)}
          </div>
          <span className="font-bold text-[var(--text-main)]">{selectedPaper.name}</span>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 tracking-tight">Today's Edition</h2>

      {/* Article List */}
      <div className="flex flex-col gap-4">
        {articles.map((article) => (
          <div 
            key={article.id}
            onClick={() => setReadingArticle(article)}
            className="bg-[var(--surface-color)] border border-[var(--border-color)] rounded-2xl p-6 cursor-pointer hover:border-[var(--primary-color)] transition-all flex flex-col gap-3 group"
          >
            <h3 className="text-xl font-semibold text-[var(--text-main)] leading-tight group-hover:text-[var(--primary-color)] transition-colors">
              {article.title}
            </h3>
            <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] font-medium mt-2">
              <span className="flex items-center gap-1.5"><Clock size={14} /> {article.time}</span>
              <span className="flex items-center gap-1.5"><BookOpen size={14} /> 3 min read</span>
            </div>
          </div>
        ))}
      </div>

      {/* Reading Mode Modal */}
      {readingArticle && (
        <div className="fixed inset-0 z-[100] bg-[rgba(0,0,0,0.4)] backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
          <div className="bg-[var(--bg-color)] w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-300">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 md:p-6 bg-[var(--surface-color)] border-b border-[var(--border-color)] z-10 sticky top-0">
              <button 
                onClick={() => setReadingArticle(null)}
                className="flex items-center gap-2 text-[var(--primary-color)] font-medium text-sm hover:opacity-80 transition-opacity"
              >
                <ChevronLeft size={18} />
                Done
              </button>
              
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--success-color)] bg-[var(--success-light)] px-3 py-1.5 rounded-full">
                <ShieldCheck size={14} />
                Original Source
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-10 overflow-y-auto bg-white flex-1">
              <span className="text-[var(--primary-color)] font-bold text-xs tracking-wider uppercase mb-3 block">
                {selectedPaper.name}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-main)] leading-tight mb-6 tracking-tight">
                {readingArticle.title}
              </h1>
              
              <div className="flex items-center gap-4 text-sm text-[var(--text-muted)] mb-8 pb-8 border-b border-[var(--border-color)]">
                <span>{readingArticle.time}</span>
              </div>

              <div className="prose prose-lg max-w-none text-[var(--text-main)] leading-relaxed space-y-6 text-[1.1rem]">
                {readingArticle.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
