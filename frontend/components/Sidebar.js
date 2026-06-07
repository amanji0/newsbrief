'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Newspaper, Target, BookOpen, Sparkles } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <Newspaper size={26} color="var(--primary-color)" strokeWidth={2.5} />
          NewsBrief
        </div>
        
        <nav>
          <Link href="/" className={`nav-item ${pathname === '/' ? 'active' : ''}`}>
            <BookOpen size={20} />
            Top News
          </Link>
          <Link href="/summarize" className={`nav-item ${pathname === '/summarize' ? 'active' : ''}`}>
            <Sparkles size={20} />
            Summarize
          </Link>
          <Link href="/for-you" className={`nav-item ${pathname === '/for-you' ? 'active' : ''}`}>
            <Target size={20} />
            For You
          </Link>
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-bottom-nav">
        <Link href="/" className={`mobile-nav-item ${pathname === '/' ? 'active' : ''}`}>
          <BookOpen size={22} />
          <span>Top News</span>
        </Link>
        <Link href="/summarize" className={`mobile-nav-item ${pathname === '/summarize' ? 'active' : ''}`}>
          <Sparkles size={22} />
          <span>Summarize</span>
        </Link>
        <Link href="/for-you" className={`mobile-nav-item ${pathname === '/for-you' ? 'active' : ''}`}>
          <Target size={22} />
          <span>For You</span>
        </Link>
      </nav>
    </>
  );
}
