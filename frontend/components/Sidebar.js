import Link from 'next/link';
import { Newspaper, Target, BookOpen, Sparkles } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Newspaper size={24} />
        NewsBrief
      </div>
      
      <nav>
        <Link href="/" className="nav-item">
          <BookOpen size={20} />
          Top News
        </Link>
        <Link href="/summarize" className="nav-item">
          <Sparkles size={20} />
          Summarize
        </Link>
        <Link href="/for-you" className="nav-item active">
          <Target size={20} />
          For You (Exams)
        </Link>
      </nav>
    </aside>
  );
}
