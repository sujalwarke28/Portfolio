import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Zap, 
  Code2, 
  Layers, 
  Sparkles, 
  X, 
  CheckCircle2 
} from 'lucide-react';
import { Github } from './SocialIcons';
import { featuredProjects } from '../data/portfolioData';
import { sound } from '../utils/sound';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Distributed Systems & Cloud', 'AI & Software Engineering Tools', 'Frontend & Graphics Performance'];

  const filteredProjects = activeFilter === 'All' 
    ? featuredProjects 
    : featuredProjects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-24 bg-[#050914] overflow-hidden border-t border-slate-800/80">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>PRODUCTION SOFTWARE SYSTEMS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Featured <span className="text-gradient-cyan">Engineering Projects</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Architectural case studies showcasing low-latency backends, AI parsing agents, and high-fps graphics engines.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { sound.playClick(); setActiveFilter(cat); }}
              onMouseEnter={() => sound.playHover()}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel glass-panel-hover rounded-3xl border border-slate-800 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Project Image & Holographic Overlay */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/40 to-transparent" />
                  
                  <span className="absolute top-3 left-3 text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                    {project.category}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white font-heading mb-2 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-300 mb-4 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-slate-800/80">
                <button
                  onClick={() => { sound.playClick(); setSelectedProject(project); }}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 group/btn"
                >
                  <span>Inspect Code & Arch</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => sound.playHover()}
                  className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white hover:border-cyan-500/40 border border-slate-800"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Architecture Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="glass-panel max-w-2xl w-full p-6 sm:p-8 rounded-3xl border border-cyan-500/40 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-2xl font-bold text-white font-heading mb-2">{selectedProject.title}</h3>
            <p className="text-xs font-mono text-cyan-400 mb-6">{selectedProject.category}</p>

            <div className="space-y-6 mb-8">
              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Overview</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedProject.description}</p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono">
                {Object.entries(selectedProject.metrics).map(([key, val]) => (
                  <div key={key}>
                    <span className="text-slate-500 block uppercase text-[10px]">{key}</span>
                    <span className="text-cyan-300 font-bold">{val}</span>
                  </div>
                ))}
              </div>

              {/* Architecture Topology */}
              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">System Topology</h4>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300">
                  {selectedProject.architecture}
                </div>
              </div>

              {/* Code Snippet */}
              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Core Code Pattern</h4>
                <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto">
                  {selectedProject.codeSnippet}
                </pre>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2"
              >
                <Github className="w-4 h-4" /> View GitHub Code
              </a>
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
