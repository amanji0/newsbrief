import "./globals.css";
import Sidebar from "../components/Sidebar";
import { Search } from 'lucide-react';

export const metadata = {
  title: "NewsBrief | AI News Summarizer",
  description: "Read every newspaper in less time. AI-powered summaries of your favorite sections with an elegant, minimalist design.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-layout">
          <Sidebar />
          
          <div className="main-content">
            <header className="header">
              <div className="header-search">
                <Search size={18} color="var(--text-muted)" />
                <input type="text" placeholder="Search news or topics..." />
              </div>
              <div className="flex gap-4 items-center">
                {/* User profile placeholder */}
                <div style={{width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'}}>
                  A
                </div>
              </div>
            </header>
            
            <div className="content-area">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
