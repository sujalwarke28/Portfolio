import React from 'react';
import { ArrowUp, Code2, ShieldCheck, Heart } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { sound } from '../utils/sound';

export default function Footer() {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#030712] border-t border-slate-800/80 py-12 text-slate-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Info */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-slate-200 font-bold font-heading text-sm">{personalInfo.name}</div>
            <div className="text-[11px] text-slate-500">Built with React 19, Canvas WebGL, & Tailwind CSS</div>
          </div>
        </div>

        {/* Center Uptime */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Systems Operating Normally (99.99% SLA)</span>
        </div>

        {/* Right Back to top */}
        <div className="flex items-center gap-4">
          <span>© {new Date().getFullYear()} Sujal Warke</span>
          <button
            onClick={scrollToTop}
            onMouseEnter={() => sound.playHover()}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all group"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
