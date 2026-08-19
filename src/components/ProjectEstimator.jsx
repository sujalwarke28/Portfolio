import React, { useState } from 'react';
import { Calculator, Check, Sparkles, Send, ArrowRight } from 'lucide-react';
import { sound } from '../utils/sound';

export default function ProjectEstimator() {
  const [selectedType, setSelectedType] = useState('fullstack');
  const [selectedFeatures, setSelectedFeatures] = useState(['auth', 'api']);
  const [timeline, setTimeline] = useState('2-4 weeks');

  const projectTypes = [
    { id: 'fullstack', title: 'Full-Stack Web App', basePrice: 3500, desc: 'React/Next.js frontend + Node/Go microservices backend' },
    { id: 'cloud', title: 'Microservices & DevOps Infrastructure', basePrice: 4200, desc: 'Docker, Kubernetes, AWS Terraform, CI/CD pipeline automation' },
    { id: 'ai', title: 'AI/LLM Integration & RAG Search', basePrice: 3800, desc: 'Vector database search, OpenAI/Claude agent pipelines' },
  ];

  const addOnFeatures = [
    { id: 'auth', name: 'Zero-Trust Auth & OAuth2', price: 600 },
    { id: 'api', name: 'gRPC / GraphQL High-Speed API', price: 800 },
    { id: 'realtime', name: 'WebSockets Real-Time Sync', price: 950 },
    { id: 'analytics', name: 'Prometheus & Grafana Telemetry', price: 700 },
  ];

  const toggleFeature = (id) => {
    sound.playClick();
    setSelectedFeatures(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const selectedBase = projectTypes.find(t => t.id === selectedType);
  const featureTotal = selectedFeatures.reduce((acc, fId) => {
    const feat = addOnFeatures.find(f => f.id === fId);
    return acc + (feat ? feat.price : 0);
  }, 0);

  const estimatedTotal = (selectedBase ? selectedBase.basePrice : 0) + featureTotal;

  return (
    <section id="estimator" className="relative py-24 bg-[#030712] border-t border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>INTERACTIVE SCOPE CALCULATOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Software Project <span className="text-gradient-cyan">Cost & Tech Estimator</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-mono mt-2">
            Customize project scope to generate an instant tech stack architecture proposal
          </p>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Options Selection */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Step 1: Project Type */}
            <div>
              <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">1. Select Project Type</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {projectTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => { sound.playClick(); setSelectedType(type.id); }}
                    onMouseEnter={() => sound.playHover()}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      selectedType === type.id
                        ? 'border-cyan-500 bg-cyan-950/40 glow-cyan'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-100 mb-1">{type.title}</h4>
                      <p className="text-[10px] text-slate-400 line-clamp-2">{type.desc}</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-cyan-400 mt-3 block">${type.basePrice}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Architecture Features */}
            <div>
              <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">2. Additional System Modules</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addOnFeatures.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.id);
                  return (
                    <div
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      onMouseEnter={() => sound.playHover()}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? 'border-cyan-500/50 bg-cyan-950/30'
                          : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${isChecked ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-700 bg-slate-900'}`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs text-slate-200">{feat.name}</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">+${feat.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Proposal Summary Box */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-white font-heading mb-4 pb-3 border-b border-slate-800">
                Technical Proposal Summary
              </h3>

              <div className="space-y-3 font-mono text-xs mb-6">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Base Architecture:</span>
                  <span className="text-cyan-400 font-bold">${selectedBase?.basePrice}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>System Modules:</span>
                  <span className="text-purple-400 font-bold">${featureTotal}</span>
                </div>
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-slate-100">
                  <span className="font-bold">Estimated Cost:</span>
                  <span className="text-xl font-extrabold text-emerald-400 font-heading">${estimatedTotal}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 font-mono mb-6">
                ⚡ Includes 100% test coverage, Docker orchestration, and 30-day post-launch warranty SLA.
              </div>
            </div>

            <a
              href="#contact"
              onClick={() => sound.playClick()}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <span>Submit Proposal Inquiry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
