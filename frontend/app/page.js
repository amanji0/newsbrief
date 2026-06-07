'use client';
import { useState } from 'react';
import { Sparkles, ExternalLink, CheckCircle } from 'lucide-react';

// Mock data for the main newspaper feed
const TOP_NEWS = [
  {
    id: 1,
    source: 'THE HINDU',
    title: 'India successfully launches latest Earth observation satellite',
    time: '2 hours ago',
    image: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=2070&auto=format&fit=crop',
    aiSummary: "ISRO has successfully placed the EOS-08 satellite into its intended low earth orbit. The mission is significant for agriculture, forestry, and disaster management applications. The launch marks another milestone in India's growing space capabilities, utilizing the reliable PSLV rocket system."
  },
  {
    id: 2,
    source: 'ECONOMIC TIMES',
    title: 'Tech stocks surge as inflation data cools faster than expected',
    time: '4 hours ago',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop',
    aiSummary: "Global tech markets rallied today following new consumer price index reports showing inflation cooling down. Analysts predict this may lead central banks to consider rate cuts earlier than previously anticipated. Major tech giants saw gains between 2-4% in early trading sessions."
  },
  {
    id: 3,
    source: 'INDIAN EXPRESS',
    title: 'New comprehensive healthcare policy draft released for public feedback',
    time: '5 hours ago',
    image: 'https://images.unsplash.com/photo-1504439468489-c8920d786a2b?q=80&w=2072&auto=format&fit=crop',
    aiSummary: "The Health Ministry released a draft policy aiming to achieve universal health coverage by 2030. Key provisions include digital health records integration, increased funding for primary care centers, and subsidized insurance for the lower-middle class. Public consultation is open for 30 days."
  },
  {
    id: 4,
    source: 'THE WIRE',
    title: 'Climate summit concludes with landmark agreement on fossil fuels',
    time: '7 hours ago',
    image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9cce?q=80&w=2070&auto=format&fit=crop',
    aiSummary: "After marathon negotiations, 190+ countries agreed to a phased transition away from fossil fuels. While developing nations secured commitments for a 'loss and damage' fund, environmental groups argue the timeline is still too slow to prevent a 1.5°C temperature rise."
  }
];

export default function Home() {
  const [selectedArticle, setSelectedArticle] = useState(TOP_NEWS[0]);

  return (
    <div className="flex w-full gap-8">
      {/* News Feed */}
      <div className="news-feed flex-1">
        <h2 className="text-xl font-bold mb-4 col-span-full">Top Stories Today</h2>
        
        {TOP_NEWS.map((article) => (
          <div 
            key={article.id} 
            className="news-card flex flex-col cursor-pointer"
            onClick={() => setSelectedArticle(article)}
            style={{ 
              borderColor: selectedArticle.id === article.id ? 'var(--primary-color)' : 'transparent',
              boxShadow: selectedArticle.id === article.id ? '0 0 0 2px var(--primary-color)' : 'var(--shadow-sm)'
            }}
          >
            <div 
              className="news-card-image" 
              style={{ backgroundImage: `url(${article.image})` }}
            ></div>
            <div className="news-card-content flex flex-col flex-1">
              <span className="news-source">{article.source}</span>
              <h3 className="news-title">{article.title}</h3>
              <div className="mt-auto">
                <div className="news-meta">
                  <span>{article.time}</span>
                  <span className="text-[var(--primary-color)] text-sm font-medium flex items-center gap-1">
                    <Sparkles size={14} /> AI Summary
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Summary Panel */}
      <div className="summary-panel hidden lg:flex">
        <div className="summary-header">
          <Sparkles size={18} />
          <span>AI Summarization</span>
        </div>
        
        {selectedArticle ? (
          <>
            <div className="mb-4">
              <span className="news-source text-xs">{selectedArticle.source}</span>
              <h3 className="text-lg font-bold mt-1 mb-2 leading-tight">{selectedArticle.title}</h3>
            </div>
            
            <div className="summary-content">
              {selectedArticle.aiSummary}
            </div>

            <div className="mt-auto pt-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] bg-[var(--bg-color)] p-2 rounded-md">
                <CheckCircle size={14} className="text-green-600" />
                <span>Verified against multiple trusted sources</span>
              </div>
              
              <a href="#" className="btn-verify">
                <ExternalLink size={16} />
                Read Original Article
              </a>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
            <Sparkles size={32} className="mb-4" />
            <p>Select an article to view its AI summary.</p>
          </div>
        )}
      </div>
    </div>
  );
}
