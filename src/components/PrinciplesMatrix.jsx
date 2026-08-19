import React, { useState } from 'react';
import { Award, Compass, Sparkles, Quote, ChevronRight, CheckCircle2 } from 'lucide-react';
import { principlesData, personalInfo } from '../data/portfolioData';
import { sound } from '../utils/sound';

export default function PrinciplesMatrix() {
  const [showPhilosophy, setShowPhilosophy] = useState(false);

  return (
    <section id="principles" className="relative py-24 bg-[#050608] overflow-hidden border-t border-slate-800/80">
      
      {/* Background Lighting */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>ENGINEERING PRINCIPLES & INFLUENCES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            Principles That <span className="text-gradient-cyan">Shape My Work</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm font-mono">
            Key tenets translated from real-world figures, leaders, and fictional archetypes into engineering discipline.
          </p>

          <button
            onClick={() => { sound.playClick(); setShowPhilosophy(!showPhilosophy); }}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 text-xs font-mono transition-all"
          >
            <Quote className="w-3.5 h-3.5 text-cyan-400" />
            <span>{showPhilosophy ? "Hide Philosophy Easter Egg" : "Reveal Personal Work Philosophy"}</span>
          </button>
        </div>

        {/* Philosophy Easter Egg Callout */}
        {showPhilosophy && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/40 mb-12 animate-in fade-in max-w-3xl mx-auto text-center relative">
            <Quote className="w-8 h-8 text-cyan-400 mx-auto mb-3 opacity-60" />
            <blockquote className="text-base sm:text-lg font-serif italic text-slate-100 mb-4 leading-relaxed">
              "{personalInfo.philosophyQuote}"
            </blockquote>
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
              — Personal Philosophy on Mastery & Independence
            </span>
          </div>
        )}

        {/* Principles Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principlesData.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => sound.playHover()}
              className="glass-panel glass-panel-hover p-6 rounded-3xl border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800">
                    {item.domain}
                  </span>
                  <span className="text-xs font-bold text-slate-100 font-heading">{item.figure}</span>
                </div>

                <h3 className="text-sm font-bold text-cyan-400 font-mono mb-3">
                  "{item.tenet}"
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {item.application}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
