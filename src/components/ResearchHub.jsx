import React, { useState } from 'react';
import { HelpCircle, Sparkles, BookOpen, ArrowRight, X, Compass, Brain } from 'lucide-react';
import { researchQuestions } from '../data/portfolioData';
import { sound } from '../utils/sound';

export default function ResearchHub() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  return (
    <section id="research" className="relative py-24 bg-[#08090a] overflow-hidden border-t border-slate-800/80">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono mb-4">
            <Brain className="w-3.5 h-3.5" />
            <span>INTELLECTUAL CURIOSITY & RESEARCH</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            Questions <span className="text-gradient-purple">I'm Chasing</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm font-mono">
            Active inquiries exploring the boundaries of AI robustness, explainability, secure tool boundaries, and intelligent physical infrastructure.
          </p>
        </div>

        {/* Research Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {researchQuestions.map((q, idx) => (
            <div
              key={q.id}
              onClick={() => { sound.playClick(); setSelectedQuestion(q); }}
              onMouseEnter={() => sound.playHover()}
              className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-3xl border border-slate-800 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono text-purple-400 font-bold px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 uppercase">
                    {q.area}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">INQUIRY 0{idx + 1}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white font-heading mb-4 group-hover:text-purple-300 transition-colors leading-snug">
                  "{q.question}"
                </h3>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed font-sans">
                  {q.hypothesis}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-purple-400 mt-6">
                <span>Explore Working Hypothesis</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detail Hypothesis Modal */}
      {selectedQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in">
          <div className="glass-panel max-w-xl w-full p-6 sm:p-8 rounded-3xl border border-purple-500/40 shadow-2xl relative">
            <button
              onClick={() => setSelectedQuestion(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[10px] font-mono text-purple-400 font-bold uppercase block mb-2">{selectedQuestion.area}</span>
            <h3 className="text-xl font-bold text-white font-heading mb-4 leading-snug">"{selectedQuestion.question}"</h3>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 mb-6 leading-relaxed">
              <span className="text-purple-400 font-bold block mb-2">⚡ Working Hypothesis:</span>
              {selectedQuestion.hypothesis}
            </div>

            <button
              onClick={() => setSelectedQuestion(null)}
              className="w-full py-3 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-lg"
            >
              Close Inquiry
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
