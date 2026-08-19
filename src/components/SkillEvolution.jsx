import React, { useState } from 'react';
import { GitBranch, CheckCircle2, RefreshCw, Compass, Sparkles, Filter, ChevronRight, Layers } from 'lucide-react';
import { skillEvolutionEpochs } from '../data/portfolioData';
import { sound } from '../utils/sound';

export default function SkillEvolution() {
  const [activeEpochIndex, setActiveEpochIndex] = useState(0);
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'learned' | 'actively developing' | 'exploring'

  const activeEpoch = skillEvolutionEpochs[activeEpochIndex];

  const filteredSkills = filterStatus === 'all'
    ? activeEpoch.skills
    : activeEpoch.skills.filter(s => s.status.toLowerCase() === filterStatus);

  return (
    <section id="evolution" className="relative py-24 bg-[#050608] overflow-hidden border-t border-slate-800/80">
      
      {/* Glow Atmosphere */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono mb-4">
            <GitBranch className="w-3.5 h-3.5" />
            <span>INTERACTIVE ENGINEERING TIMELINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            Skill Evolution <span className="text-gradient-cyan">& Capabilities</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm font-mono">
            Tracking progressive growth across 7 distinct technical epochs — clearly distinguishing learned tools, active development, and research exploration.
          </p>
        </div>

        {/* Epoch Selector Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {skillEvolutionEpochs.map((epoch, idx) => {
            const isActive = activeEpochIndex === idx;
            return (
              <button
                key={epoch.id}
                onClick={() => { sound.playClick(); setActiveEpochIndex(idx); }}
                onMouseEnter={() => sound.playHover()}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-mono shrink-0 transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold shadow-lg shadow-cyan-500/20 scale-[1.02]'
                    : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  {epoch.epoch}
                </span>
                <span>{epoch.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Epoch Main Container */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl relative mb-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold block mb-1">
                EPOCH {activeEpoch.epoch} / 07
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">{activeEpoch.title}</h3>
              <p className="text-xs font-mono text-slate-400 mt-1">{activeEpoch.subtitle}</p>
            </div>

            {/* Status Filter Buttons */}
            <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto">
              {[
                { id: 'all', label: 'All' },
                { id: 'learned', label: 'Learned' },
                { id: 'actively developing', label: 'Developing' },
                { id: 'exploring', label: 'Exploring' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => { sound.playClick(); setFilterStatus(btn.id); }}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-mono transition-all ${
                    filterStatus === btn.id
                      ? 'bg-slate-800 text-cyan-300 border border-cyan-500/40 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 my-6 font-sans leading-relaxed">
            {activeEpoch.description}
          </p>

          {/* Skill Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.map((skill, sIdx) => {
              const isLearned = skill.status.toLowerCase() === 'learned';
              const isDeveloping = skill.status.toLowerCase() === 'actively developing';
              const isExploring = skill.status.toLowerCase() === 'exploring';

              return (
                <div
                  key={sIdx}
                  onMouseEnter={() => sound.playHover()}
                  className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </h4>

                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                        isLearned
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                          : isDeveloping
                          ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                          : 'bg-purple-950 text-purple-300 border border-purple-500/40'
                      }`}>
                        {skill.status.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 mt-2 font-mono leading-relaxed">
                      {skill.note}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
