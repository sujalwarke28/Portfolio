import React, { useState } from 'react';
import { ShieldCheck, Lock, AlertTriangle, Cpu, CheckCircle2, ArrowRight, Layers, Key } from 'lucide-react';
import { aiSecuritySpectrum } from '../data/portfolioData';
import { sound } from '../utils/sound';

export default function AISecuritySpectrum() {
  const [activeStepIndex, setActiveStepIndex] = useState(4); // Default to Step 5 (Authorization)

  return (
    <section id="ai-security" className="relative py-24 bg-[#08090a] overflow-hidden border-t border-slate-800/80">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>AI SYSTEMS & SECURITY THESIS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            The AI Capability <span className="text-gradient-green">& Authorization Spectrum</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm font-mono">
            Why intelligent agents require deterministic RBAC guardrails, permission boundaries, and human-in-the-loop authorization gates.
          </p>
        </div>

        {/* Step-by-step Interactive Spectrum */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-10">
          {aiSecuritySpectrum.map((item, idx) => {
            const isActive = activeStepIndex === idx;
            const isCritical = idx === 4;

            return (
              <div
                key={idx}
                onClick={() => { sound.playClick(); setActiveStepIndex(idx); }}
                onMouseEnter={() => sound.playHover()}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? isCritical
                      ? 'border-emerald-500 bg-emerald-950/40 glow-green scale-[1.03]'
                      : 'border-cyan-500 bg-cyan-950/40 glow-cyan scale-[1.03]'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-slate-500">STAGE {item.step}</span>
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      isCritical ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {item.level}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-100">{item.title}</h4>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-cyan-400">
                  <span>Inspect Risk</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Stage Deep Inspection Box */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-emerald-400">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-emerald-400 font-bold block">
                STAGE {aiSecuritySpectrum[activeStepIndex].step} ANALYSIS
              </span>
              <h3 className="text-2xl font-bold text-white font-heading">
                {aiSecuritySpectrum[activeStepIndex].title}
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-6">
            {aiSecuritySpectrum[activeStepIndex].desc}
          </p>

          {/* Key Principle Alert */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block mb-1">CORE ARCHITECTURE PRINCIPLE:</span>
              "An LLM should never be trusted as the authorization authority. Permissions, database tenant boundaries, and project authorization must be checked deterministically outside the LLM context."
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
