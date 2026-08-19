import React, { useState, useEffect, useRef } from 'react';
import { 
  Code2, 
  Layout, 
  Server, 
  Cloud, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  Sparkles, 
  Globe, 
  Layers, 
  Sliders,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  X
} from 'lucide-react';
import { skillCategories, benchmarkBattles } from '../data/portfolioData';
import { sound } from '../utils/sound';

export default function SkillsGalaxy() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [viewMode, setViewMode] = useState('orbit'); // 'orbit' | 'grid'
  const canvasRef = useRef(null);

  // Flatten skills for Orbit view
  const allSkills = skillCategories.flatMap(cat => 
    cat.skills.map(s => ({ ...s, categoryId: cat.id, categoryColor: cat.color }))
  );

  // Canvas Orbit Animation
  useEffect(() => {
    if (viewMode !== 'orbit') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const centerX = width / 2;
    const centerY = height / 2;

    // Filter skills based on category
    const skillsToRender = activeCategory === 'all' 
      ? allSkills 
      : allSkills.filter(s => s.categoryId === activeCategory);

    // Initialize orbit positions
    const nodes = skillsToRender.map((skill, i) => {
      const radius = Math.min(width, height) * 0.15 + (i % 3) * 60;
      const angle = (i / skillsToRender.length) * Math.PI * 2;
      return {
        ...skill,
        orbitRadius: radius,
        angle: angle,
        speed: 0.003 + (i % 4) * 0.001,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        nodeSize: 18 + (skill.level / 100) * 12,
        isHovered: false,
      };
    });

    let hoveredNode = null;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      let found = null;
      for (const node of nodes) {
        const dx = mx - node.x;
        const dy = my - node.y;
        if (Math.sqrt(dx * dx + dy * dy) < node.nodeSize + 6) {
          found = node;
          break;
        }
      }
      if (found !== hoveredNode) {
        hoveredNode = found;
        if (found) sound.playHover();
      }
    };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      for (const node of nodes) {
        const dx = mx - node.x;
        const dy = my - node.y;
        if (Math.sqrt(dx * dx + dy * dy) < node.nodeSize + 6) {
          sound.playClick();
          setSelectedSkill(node);
          break;
        }
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Orbit Rings
      ctx.lineWidth = 1;
      [100, 160, 220, 280].forEach(r => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
        ctx.stroke();
      });

      // Central Core Node
      ctx.beginPath();
      ctx.arc(centerX, centerY, 32, 0, Math.PI * 2);
      ctx.fillStyle = '#090d16';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#38bdf8';
      ctx.fill();
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 12px JetBrains Mono';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('SUJAL CORE', centerX, centerY);

      // Render Nodes & Link Lines
      nodes.forEach((node) => {
        // Orbit Motion
        node.angle += node.speed;
        node.x = centerX + Math.cos(node.angle) * node.orbitRadius;
        node.y = centerY + Math.sin(node.angle) * node.orbitRadius;

        const isHovered = hoveredNode === node;

        // Laser connection line to core
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(node.x, node.y);
        ctx.strokeStyle = isHovered ? node.categoryColor : 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = isHovered ? 2 : 1;
        if (isHovered) {
          ctx.shadowBlur = 12;
          ctx.shadowColor = node.categoryColor;
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, isHovered ? node.nodeSize * 1.25 : node.nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = node.categoryColor;
        ctx.lineWidth = 2;
        if (isHovered) {
          ctx.shadowBlur = 24;
          ctx.shadowColor = node.categoryColor;
        }
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Text label
        ctx.fillStyle = isHovered ? '#ffffff' : '#cbd5e1';
        ctx.font = `${isHovered ? 'bold 12px' : '11px'} Inter`;
        ctx.textAlign = 'center';
        ctx.fillText(node.name, node.x, node.y + node.nodeSize + 14);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('click', handleClick);
      }
    };
  }, [viewMode, activeCategory]);

  return (
    <section id="skills" className="relative py-24 bg-[#050914] overflow-hidden border-t border-slate-800/80">
      
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE SKILL MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Engineering <span className="text-gradient-cyan">Skill Galaxy</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Explore my core competencies in modern full-stack web applications, low-latency microservices, cloud orchestration, and AI integrations.
          </p>
        </div>

        {/* View Controls & Category Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-md">
            <button
              onClick={() => { sound.playClick(); setActiveCategory('all'); }}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Skills ({allSkills.length})
            </button>

            {skillCategories.map((cat) => {
              const Icon = cat.icon === 'Code2' ? Code2 : cat.icon === 'Layout' ? Layout : cat.icon === 'Server' ? Server : cat.icon === 'Cloud' ? Cloud : Cpu;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => { sound.playClick(); setActiveCategory(cat.id); }}
                  onMouseEnter={() => sound.playHover()}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-slate-800 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: cat.color }} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Mode Switcher (Galaxy Orbit vs Grid View) */}
          <div className="flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => { sound.playClick(); setViewMode('orbit'); }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'orbit'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" /> Orbit View
            </button>
            <button
              onClick={() => { sound.playClick(); setViewMode('grid'); }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" /> Matrix Cards
            </button>
          </div>
        </div>

        {/* Orbit Galaxy View */}
        {viewMode === 'orbit' && (
          <div className="relative glass-panel rounded-3xl border border-slate-800 p-4 mb-16 overflow-hidden h-[540px] flex items-center justify-center">
            <canvas ref={canvasRef} className="w-full h-full cursor-pointer z-10" />
            
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>Click any orbital skill node to inspect detailed benchmarks</span>
            </div>
          </div>
        )}

        {/* Matrix Cards View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {skillCategories
              .filter(cat => activeCategory === 'all' || activeCategory === cat.id)
              .map((cat) => (
                <div key={cat.id} className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800" style={{ color: cat.color }}>
                          <Code2 className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-white font-heading">{cat.name}</h3>
                      </div>
                      <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-900 text-slate-400">
                        {cat.skills.length} Techs
                      </span>
                    </div>

                    <div className="space-y-4">
                      {cat.skills.map((skill, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => { sound.playClick(); setSelectedSkill({ ...skill, categoryColor: cat.color }); }}
                          onMouseEnter={() => sound.playHover()}
                          className="p-3 rounded-xl bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800/80 hover:border-cyan-500/30 transition-all cursor-pointer group"
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                              {skill.name}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-mono text-cyan-400 font-semibold">{skill.level}%</span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">{skill.exp}</span>
                            </div>
                          </div>

                          {/* Animated Progress Bar */}
                          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all duration-1000"
                              style={{ width: `${skill.level}%`, backgroundColor: cat.color }}
                            />
                          </div>

                          <p className="text-[11px] text-slate-400 mt-2 line-clamp-1">{skill.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Skill Benchmark Battle Showcase */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-heading">Benchmark Battle Simulator</h3>
              <p className="text-xs text-slate-400 font-mono">Real-world performance metrics & architecture speed battles</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {benchmarkBattles.map((battle, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                <h4 className="text-sm font-bold text-slate-200 mb-4 font-mono flex items-center justify-between">
                  <span>{battle.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-400">BENCHMARK</span>
                </h4>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  {/* Candidate A */}
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[11px] font-mono text-slate-400 block mb-1">{battle.candidateA.name}</span>
                    <div className="text-lg font-bold text-slate-200">{battle.candidateA.speed}</div>
                    <div className="text-[11px] text-slate-400">{battle.candidateA.throughput}</div>
                    <span className="inline-block text-[10px] text-amber-400 mt-2 font-mono">{battle.candidateA.rating}</span>
                  </div>

                  {/* Candidate B */}
                  <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 glow-cyan">
                    <span className="text-[11px] font-mono text-cyan-300 block mb-1">{battle.candidateB.name}</span>
                    <div className="text-lg font-bold text-cyan-400">{battle.candidateB.speed}</div>
                    <div className="text-[11px] text-cyan-200">{battle.candidateB.throughput}</div>
                    <span className="inline-block text-[10px] text-emerald-400 mt-2 font-mono">{battle.candidateB.rating}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 text-xs font-mono text-slate-300 border border-slate-800/80 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{battle.verdict}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Detailed Skill Inspection Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="glass-panel max-w-lg w-full p-6 rounded-3xl border border-cyan-500/40 shadow-2xl relative">
            <button
              onClick={() => setSelectedSkill(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedSkill.categoryColor }} />
              <h3 className="text-2xl font-bold text-white font-heading">{selectedSkill.name}</h3>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
                <span className="text-slate-400">Proficiency Score:</span>
                <span className="text-cyan-400 font-bold">{selectedSkill.level}% ({selectedSkill.mastery})</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
                <span className="text-slate-400">Experience:</span>
                <span className="text-emerald-400 font-bold">{selectedSkill.exp}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <span className="text-slate-400 font-mono block mb-1">Architecture Description:</span>
                {selectedSkill.description}
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/50 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                <span className="text-cyan-400 font-bold block mb-1">⚡ Benchmark Stat:</span>
                {selectedSkill.benchmark}
              </div>
            </div>

            <button
              onClick={() => setSelectedSkill(null)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-xs shadow-lg"
            >
              Close Inspector
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
