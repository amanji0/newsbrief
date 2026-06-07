'use client';
import { useState } from 'react';
import { Library, ArrowRight, ChevronLeft, Calendar, FileText } from 'lucide-react';

const NEWSPAPERS = [
  { id: 'hindu', name: 'The Hindu', color: '#1B365D', edition: 'Chennai Edition' },
  { id: 'nyt', name: 'The New York Times', color: '#000000', edition: 'International' },
  { id: 'express', name: 'The Indian Express', color: '#B30000', edition: 'New Delhi Edition' },
  { id: 'guardian', name: 'The Guardian', color: '#052962', edition: 'UK Edition' },
];

const MOCK_DOCUMENT = {
  hindu: [
    {
      section: 'Front Page',
      articles: [
        {
          title: 'Monsoon advances rapidly across Southern Peninsula',
          author: 'Special Correspondent',
          content: `The southwest monsoon has advanced into more parts of the central Arabian Sea, most parts of Karnataka, Maharashtra, and some parts of Andhra Pradesh, the India Meteorological Department (IMD) said on Tuesday.

The rapid progression is expected to bring significant relief to the agricultural sector, which has been grappling with water shortages. The IMD forecast suggests normal to above-normal rainfall for the upcoming month.

"Conditions are favorable for further advance of Southwest Monsoon into more parts of Maharashtra, Chhattisgarh, Odisha, Coastal Andhra Pradesh and Northwest Bay of Bengal during next 3-4 days," the weather bulletin noted.

Farmers in the region have been advised to begin sowing operations as soil moisture reaches optimal levels.`
        },
        {
          title: 'New electric vehicle policy announced for major metropolitan cities',
          author: 'Business Bureau',
          content: `In a major push towards green mobility, the government today announced a comprehensive electric vehicle (EV) policy targeting major metropolitan areas. The policy includes expanded subsidies for two-wheelers and commercial fleet vehicles.

The transport ministry stated that the new framework aims to achieve 30% EV penetration in public transport by 2030.

Key highlights include the establishment of charging infrastructure every 5 kilometers in urban centers and tax exemptions for battery manufacturing plants. Industry leaders have largely welcomed the move, citing it as a necessary step for sustainable urban development.`
        }
      ]
    },
    {
      section: 'World News',
      articles: [
        {
          title: 'Global markets react to shifting central bank policies',
          author: 'Reuters',
          content: `Wall Street saw volatile trading on Monday as investors digested mixed signals from global central banks regarding interest rate trajectories. The S&P 500 closed relatively flat after a turbulent session.

European markets fared slightly better following optimistic comments from the European Central Bank regarding inflation control. 

Analysts remain cautious, noting that the coming weeks of corporate earnings reports will likely dictate market momentum for the rest of the quarter.`
        }
      ]
    }
  ]
};

export default function NewspapersPage() {
  const [selectedPaper, setSelectedPaper] = useState(null);

  // View 1: Grid of Newspapers
  if (!selectedPaper) {
    return (
      <div className="w-full max-w-5xl mx-auto animate-in fade-in duration-300">
        <div className="flex items-center gap-3 mb-8">
          <Library size={28} className="text-[var(--primary-color)]" />
          <h1 className="text-3xl font-bold m-0 tracking-tight">E-Paper Library</h1>
        </div>
        
        <p className="text-[var(--text-muted)] mb-8 max-w-2xl text-lg">
          Read the entire newspaper as a continuous, distraction-free document.
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
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm"
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

  const documentData = MOCK_DOCUMENT[selectedPaper.id] || MOCK_DOCUMENT.hindu; // fallback for mock
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // View 2: Full Document Viewer (E-Paper)
  return (
    <div className="w-full max-w-4xl mx-auto relative animate-in slide-in-from-bottom-4 duration-500">
      
      {/* Document Sticky Header */}
      <div className="sticky top-0 z-[100] bg-[var(--surface-color)]/90 backdrop-blur-xl border-b border-[var(--border-color)] p-4 md:px-8 flex items-center justify-between -mx-4 md:-mx-8 mb-8 shadow-sm">
        <button 
          onClick={() => setSelectedPaper(null)}
          className="flex items-center gap-2 text-[var(--primary-color)] hover:opacity-80 transition-opacity font-medium text-sm bg-[var(--accent-light)] px-3 py-1.5 rounded-full"
        >
          <ChevronLeft size={16} />
          Library
        </button>
        
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-[var(--text-muted)] hidden md:block" />
          <span className="font-semibold text-[var(--text-main)] text-sm md:text-base">{selectedPaper.name} — Document View</span>
        </div>
      </div>

      {/* Document Content */}
      <div className="bg-white rounded-none md:rounded-3xl shadow-none md:shadow-xl border-0 md:border border-[var(--border-color)] overflow-hidden mb-12">
        
        {/* Newspaper Title Header */}
        <div 
          className="px-6 py-12 md:p-16 text-center text-white relative overflow-hidden"
          style={{ backgroundColor: selectedPaper.color }}
        >
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-overlay"></div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 relative z-10" style={{ fontFamily: 'Georgia, serif' }}>
            {selectedPaper.name}
          </h1>
          <div className="flex items-center justify-center gap-6 text-sm font-medium tracking-wide uppercase opacity-90 relative z-10">
            <span>{selectedPaper.edition}</span>
            <span className="w-1 h-1 rounded-full bg-white"></span>
            <span className="flex items-center gap-2"><Calendar size={14} /> {today}</span>
          </div>
        </div>

        {/* Sections & Articles Continuous Scroll */}
        <div className="px-6 py-10 md:p-16">
          {documentData.map((section, idx) => (
            <div key={idx} className="mb-16 last:mb-0">
              
              {/* Section Divider */}
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-[var(--primary-color)] tracking-tight uppercase">
                  {section.section}
                </h2>
                <div className="flex-1 h-[2px] bg-[var(--border-color)]"></div>
              </div>

              {/* Articles in this section */}
              <div className="flex flex-col gap-12">
                {section.articles.map((article, aIdx) => (
                  <article key={aIdx} className="prose prose-lg max-w-none">
                    <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-main)] leading-tight mb-3 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                      {article.title}
                    </h3>
                    
                    {article.author && (
                      <p className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider mb-6">
                        By {article.author}
                      </p>
                    )}
                    
                    <div className="text-[var(--text-main)] leading-relaxed space-y-5 text-[1.05rem] md:text-[1.15rem]">
                      {article.content.split('\n\n').map((paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph}</p>
                      ))}
                    </div>

                    {aIdx < section.articles.length - 1 && (
                      <div className="w-16 h-1 bg-[var(--border-color)] mx-auto mt-12 rounded-full"></div>
                    )}
                  </article>
                ))}
              </div>

            </div>
          ))}

          {/* End of Document Footer */}
          <div className="mt-16 pt-8 border-t border-[var(--border-color)] text-center text-[var(--text-muted)] text-sm">
            <p>End of {selectedPaper.name} Document Edition.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
