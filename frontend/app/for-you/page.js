'use client';
import { useEffect, useState } from 'react';
import { Target, BookOpen, Clock } from 'lucide-react';
import axios from 'axios';

export default function ForYou() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await axios.get('http://localhost:5001/api/foryou');
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  return (
    <div className="exam-foryou-page">
      <div className="exam-header">
        <Target size={28} color="var(--primary-color)" />
        <div>
          <h1 className="exam-title">For You: Exam Prep</h1>
          <p className="exam-subtitle">Real-time current affairs analyzed for UPSC, BPSC, CGL & more.</p>
        </div>
      </div>

      {loading ? (
        <div className="news-feed">
          {[1, 2, 3].map(i => (
            <div key={i} className="news-card shimmer" style={{ height: '300px' }}></div>
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="exam-loading-state">
          <Clock size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
          <h3>Agent is fetching news...</h3>
          <p style={{ color: 'var(--text-muted)' }}>Check back in a few minutes as the real-time AI agent analyzes current affairs.</p>
        </div>
      ) : (
        <div className="exam-foryou-page">
          {articles.map((article) => (
            <div key={article.id} className="exam-card">
              {/* Main Content */}
              <div className="exam-card-main">
                <span className="news-source">{article.source} &bull; {article.category}</span>
                <h2 className="exam-card-title">{article.title}</h2>
                <p className="exam-card-summary">{article.summary}</p>
                
                <div className="news-meta" style={{ marginTop: '1.5rem', borderTop: 'none' }}>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="exam-meta-link">
                    Read full article &rarr;
                  </a>
                  <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              
              {/* Exam Context Panel */}
              <div className="exam-card-context">
                <div className="exam-context-heading">
                  <BookOpen size={18} color="var(--primary-color)" />
                  <h3 style={{ margin: 0, fontSize: '0.875rem' }}>Exam Analysis</h3>
                </div>
                <div className="exam-context-text">
                  {article.examContext}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
