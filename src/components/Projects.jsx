import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Zap, 
  Code2, 
  Layers, 
  Sparkles, 
  X, 
  CheckCircle2, 
  Lock, 
  Cpu, 
  FileText,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { Github } from './SocialIcons';
import { labCaseStudies } from '../data/portfolioData';
import { sound } from '../utils/sound';

export default function Projects() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(labCaseStudies.map(p => p.category)))];

  const filteredStudies = activeFilter === 'All' 
    ? labCaseStudies 
    : labCaseStudies.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-24 bg-[#050608] overflow-hidden border-t border-slate-800/80">
      
      {/* Background Atmosphere */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>LAB CASE STUDIES & SYSTEMS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            Current & Significant <span className="text-gradient-cyan">Engineering Works</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm font-mono">
            Detailed case studies focusing on problem decomposition, system architecture, authorization guardrails, and real-world deployment.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { sound.playClick(); setActiveFilter(cat); }}
              onMouseEnter={() => sound.playHover()}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              className="glass-panel glass-panel-hover rounded-3xl border border-slate-800 p-6 sm:p-8 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-900 text-cyan-300 border border-slate-800">
                    {study.category}
                  </span>
                  {study.demoUrl && (
                    <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> Live System
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-white font-heading mb-2 group-hover:text-cyan-300 transition-colors">
                  {study.title}
                </h3>
                <p className="text-xs font-mono text-cyan-400 mb-4">{study.tagline}</p>

                <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                  {study.summary}
                </p>

                {/* Core Principle Callout */}
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-300 mb-6">
                  <span className="text-cyan-400 font-bold block mb-1">⚡ Core Engineering Insight:</span>
                  {study.corePrinciple}
                </div>

                {/* Highlights Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {study.highlights.map((h, hIdx) => (
                    <span key={hIdx} className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 border border-slate-800">
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => { sound.playClick(); setSelectedCaseStudy(study); }}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 group/btn"
                >
                  <span>Inspect Architecture & Code</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center gap-2">
                  {study.demoUrl && (
                    <a
                      href={study.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => sound.playHover()}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 text-xs font-mono font-semibold flex items-center gap-1 transition-all"
                    >
                      <Zap className="w-3.5 h-3.5" /> Demo
                    </a>
                  )}

                  {study.githubUrl && (
                    <a
                      href={study.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => sound.playHover()}
                      className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white hover:border-cyan-500/40 border border-slate-800"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Case Study Detail Modal */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in">
          <div className="glass-panel max-w-3xl w-full p-6 sm:p-8 rounded-3xl border border-cyan-500/40 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCaseStudy(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[10px] font-mono text-cyan-400 font-bold block mb-1">{selectedCaseStudy.category}</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading mb-2">{selectedCaseStudy.title}</h3>
            <p className="text-xs font-mono text-slate-400 mb-6">{selectedCaseStudy.tagline}</p>

            <div className="space-y-6 mb-8">
              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Problem Statement</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">{selectedCaseStudy.problem}</p>
              </div>

              {/* Architecture Steps */}
              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">System Architecture Pipeline</h4>
                <div className="space-y-2">
                  {selectedCaseStudy.architecture.map((step, sIdx) => (
                    <div key={sIdx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300">
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Code Pattern */}
              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Core Pattern Implementation</h4>
                <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto">
                  {selectedCaseStudy.codeSnippet}
                </pre>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-800">
              {selectedCaseStudy.demoUrl && (
                <a
                  href={selectedCaseStudy.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 text-xs font-semibold flex items-center gap-2"
                >
                  <Zap className="w-4 h-4 text-cyan-400" /> Launch System Demo
                </a>
              )}

              {selectedCaseStudy.githubUrl && (
                <a
                  href={selectedCaseStudy.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2"
                >
                  <Github className="w-4 h-4" /> View GitHub Repository
                </a>
              )}

              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
