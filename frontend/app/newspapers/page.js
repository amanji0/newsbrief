'use client';
import { useState, useRef } from 'react';
import { Library, ArrowRight, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Printer } from 'lucide-react';
import Image from 'next/image';

const NEWSPAPERS = [
  { id: 'hindu', name: 'The Hindu', color: '#1B365D', edition: 'Chennai Edition' },
  { id: 'nyt', name: 'The New York Times', color: '#000000', edition: 'International' },
  { id: 'express', name: 'The Indian Express', color: '#B30000', edition: 'New Delhi Edition' },
  { id: 'guardian', name: 'The Guardian', color: '#052962', edition: 'UK Edition' },
];

// Mock data holding the generated realistic newspaper pages
const MOCK_PAGES = [
  '/newspaper_page_1.png', // Front Page
  '/newspaper_page_2.png', // Inside Page
];

export default function NewspapersPage() {
  const [selectedPaper, setSelectedPaper] = useState(null);
  
  // E-Paper Viewer State
  const [currentPage, setCurrentPage] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const containerRef = useRef(null);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  
  const handleNextPage = () => {
    if (currentPage < MOCK_PAGES.length - 1) {
      setCurrentPage(prev => prev + 1);
      setZoomLevel(1); // Reset zoom on page turn
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
      setZoomLevel(1);
    }
  };

  // View 1: Grid of Newspapers
  if (!selectedPaper) {
    return (
      <div className="w-full max-w-5xl mx-auto animate-in fade-in duration-300">
        <div className="flex items-center gap-3 mb-8">
          <Library size={28} className="text-[var(--primary-color)]" />
          <h1 className="text-3xl font-bold m-0 tracking-tight">Authentic E-Paper Library</h1>
        </div>
        
        <p className="text-[var(--text-muted)] mb-8 max-w-2xl text-lg">
          Read full daily editions exactly as they were printed. Select a publication below to launch the immersive E-Paper viewer.
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
                <Printer size={20} className="text-[var(--text-muted)] group-hover:text-[var(--primary-color)] transition-colors" />
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

  // View 2: Immersive Image-based E-Paper Viewer
  return (
    <div className="fixed inset-0 z-[200] bg-[#1C1C1E] flex flex-col animate-in fade-in duration-300 overflow-hidden">
      
      {/* Top Toolbar */}
      <div className="h-16 bg-[#2C2C2E]/80 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 md:px-8 shrink-0">
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSelectedPaper(null)}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium text-sm bg-white/5 px-3 py-1.5 rounded-full"
          >
            <ChevronLeft size={16} />
            Library
          </button>
          
          <div className="hidden md:flex items-center gap-2 border-l border-white/10 pl-4">
            <div className="w-5 h-5 rounded flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: selectedPaper.color }}>
              {selectedPaper.name.charAt(0)}
            </div>
            <span className="font-semibold text-white/90 text-sm">{selectedPaper.name}</span>
            <span className="text-white/40 text-xs ml-2">— E-Paper Edition</span>
          </div>
        </div>

        {/* Viewer Controls */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center bg-black/30 rounded-lg p-1 border border-white/10">
            <button onClick={handleZoomOut} className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors" title="Zoom Out">
              <ZoomOut size={16} />
            </button>
            <span className="text-white/50 text-xs font-medium w-12 text-center select-none">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button onClick={handleZoomIn} className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors" title="Zoom In">
              <ZoomIn size={16} />
            </button>
          </div>

          <div className="flex items-center gap-2 ml-2">
            <button 
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="p-1.5 rounded bg-black/30 text-white border border-white/10 disabled:opacity-30 hover:bg-white/10 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-white/70 text-xs font-medium min-w-[60px] text-center">
              Pg {currentPage + 1} / {MOCK_PAGES.length}
            </span>
            <button 
              onClick={handleNextPage}
              disabled={currentPage === MOCK_PAGES.length - 1}
              className="p-1.5 rounded bg-black/30 text-white border border-white/10 disabled:opacity-30 hover:bg-white/10 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>

      {/* Interactive Paper Viewer Area */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto bg-[#1C1C1E] flex items-center justify-center p-4 md:p-8 relative"
        style={{ cursor: zoomLevel > 1 ? 'grab' : 'default' }}
      >
        <div 
          className="relative transition-transform duration-200 ease-out shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-white"
          style={{ 
            transform: `scale(${zoomLevel})`,
            transformOrigin: zoomLevel > 1 ? 'top left' : 'center center',
            width: 'min(100%, 800px)', // Standard broadsheet aspect roughly
            aspectRatio: '1 / 1.3'
          }}
        >
          {/* We use standard img to let it handle natural sizing within our aspect ratio constraints easily */}
          <img 
            src={MOCK_PAGES[currentPage]} 
            alt={`Page ${currentPage + 1} of ${selectedPaper.name}`}
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>
      </div>

    </div>
  );
}
