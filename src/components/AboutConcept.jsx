import React from 'react';
import { BookOpen, Sparkles, Shield, Cpu, ArrowRight, Compass, Code, Lock } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { sound } from '../utils/sound';

export default function AboutConcept() {
  return (
    <section id="about" className="relative py-24 bg-[#08090a] overflow-hidden border-t border-slate-800/80">
      
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>ENGINEERING THESIS & MINDSET</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            Who is <span className="text-gradient-cyan">Sujal Warke</span>?
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-mono">
            Exploring the trajectory from software development to trustworthy intelligent systems
          </p>
        </div>

        {/* Narrative Core Timeline Cards */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl relative mb-12">
          
          <div className="space-y-8 relative border-l-2 border-slate-800 pl-6 sm:pl-10">
            
            {/* Step 1 */}
            <div className="relative group">
              <span className="absolute -left-[31px] sm:-left-[47px] top-1 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-400 group-hover:scale-125 transition-transform" />
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block mb-1">
                Phase 01 — Building Software
              </span>
              <h3 className="text-xl font-bold text-slate-100 font-heading mb-2">
                "I started by learning how to build software."
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                Understanding computer science foundations, writing clean code, designing full-stack web architectures, and discovering how frontend clients communicate with backend servers and cloud databases.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <span className="absolute -left-[31px] sm:-left-[47px] top-1 w-4 h-4 rounded-full bg-slate-900 border-2 border-purple-400 group-hover:scale-125 transition-transform" />
              <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider block mb-1">
                Phase 02 — Discovering Intelligence
              </span>
              <h3 className="text-xl font-bold text-slate-100 font-heading mb-2">
                "Then I became fascinated by how software could become intelligent."
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                Exploring probabilistic models, Machine Learning ecosystems, computer vision, neural networks, and large language models that move software beyond rigid static rules into adaptive intelligence.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <span className="absolute -left-[31px] sm:-left-[47px] top-1 w-4 h-4 rounded-full bg-slate-900 border-2 border-emerald-400 group-hover:scale-125 transition-transform" />
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-1">
                Phase 03 — Enforcing Boundaries & Trust
              </span>
              <h3 className="text-xl font-bold text-slate-100 font-heading mb-2">
                "Now I'm interested in how intelligent systems can become reliable, secure, and useful."
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                Recognizing that AI agents without deterministic authorization boundaries, RBAC guardrails, and explicit verification can create severe security vulnerabilities. Focus is placed on building trustworthy AI architectures that safely interact with enterprise data and physical hardware.
              </p>
            </div>

          </div>

        </div>

        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Systems Over Assignments",
              desc: "Driven by curiosity to understand how systems work under the hood rather than merely completing course requirements.",
              icon: Code,
              color: "text-cyan-400"
            },
            {
              title: "Security & Trustworthy AI",
              desc: "Enforcing immutable authorization rules so AI agents can perform useful work without compromising data boundaries.",
              icon: Lock,
              color: "text-emerald-400"
            },
            {
              title: "Continuous Improvement",
              desc: "Obsessed with high learning velocity, intense preparation, competitive standards, and building enduring products.",
              icon: Sparkles,
              color: "text-purple-400"
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                onMouseEnter={() => sound.playHover()}
                className="glass-panel glass-panel-hover p-6 rounded-3xl border border-slate-800 flex flex-col justify-between"
              >
                <div className="mb-4">
                  <div className={`p-3 rounded-2xl bg-slate-900 border border-slate-800 w-fit mb-4 ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-white font-heading mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
