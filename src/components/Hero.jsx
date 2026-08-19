import React, { useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  ChevronDown, 
  BookOpen, 
  Lock,
  GitBranch
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { sound } from '../utils/sound';

export default function Hero() {
  const canvasRef = useRef(null);

  // WebGL / Canvas Intelligence Network Simulation
  useEffect(() => {
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

    const mouse = { x: -1000, y: -1000, radius: 180 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    // Nodes representing data & authorization gates
    const nodeCount = Math.floor(width < 768 ? 30 : 60);
    const nodes = Array.from({ length: nodeCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1.5,
      isGate: i % 7 === 0,
      color: i % 7 === 0 ? '#10b981' : i % 3 === 0 ? '#38bdf8' : '#818cf8',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Nodes & Dynamic Streams
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Cursor Repulsion & Magnetic Interaction
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - dist) / mouse.radius;
          node.x -= Math.cos(angle) * force * 2.5;
          node.y -= Math.sin(angle) * force * 2.5;
        }

        // Draw Node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowBlur = node.isGate ? 12 : 6;
        ctx.shadowColor = node.color;
        ctx.fill();

        // Connect Links
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const ndx = other.x - node.x;
          const ndy = other.y - node.y;
          const ndist = Math.sqrt(ndx * ndx + ndy * ndy);

          if (ndist < 140) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            const alpha = (1 - ndist / 140) * 0.2;
            ctx.strokeStyle = node.isGate || other.isGate ? `rgba(16, 185, 129, ${alpha})` : `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = node.isGate ? 1.5 : 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (canvas) canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleNavToSection = (id) => {
    sound.playClick();
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center bg-cyber-grid overflow-hidden">
      
      {/* WebGL Intelligence Network Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto z-0 opacity-70" />

      {/* Radial Atmosphere Lights */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[650px] h-[650px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Top Digital Identity Badge */}
        <div className="flex items-center justify-center lg:justify-start mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 text-xs font-mono backdrop-blur-md shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-cyan-400 font-bold">SUJAL WARKE</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300 font-medium">B.Tech Computer Science Engineering</span>
          </div>
        </div>

        {/* Hero Title & Positioning Statement */}
        <div className="text-center lg:text-left max-w-4xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-none font-heading">
            Building <span className="text-gradient-cyan">Intelligent Systems</span>.<br />
            Learning How They Work.<br />
            Making Them <span className="text-gradient-green">Trustworthy</span>.
          </h1>

          <p className="text-slate-300 text-base sm:text-xl max-w-2xl mb-8 leading-relaxed font-sans">
            {personalInfo.subtitle}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-14">
            <button
              onClick={() => handleNavToSection('evolution')}
              onMouseEnter={() => sound.playHover()}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white font-semibold text-xs shadow-xl shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group font-mono"
            >
              <GitBranch className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform" />
              <span>Explore Skill Evolution</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleNavToSection('projects')}
              onMouseEnter={() => sound.playHover()}
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-200 hover:text-white hover:border-cyan-500/50 hover:bg-slate-800 font-semibold text-xs transition-all flex items-center gap-2 group backdrop-blur-md shadow-lg font-mono"
            >
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Inspect Lab Case Studies</span>
            </button>

            <button
              onClick={() => handleNavToSection('terminal')}
              onMouseEnter={() => sound.playHover()}
              className="px-5 py-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 font-mono text-xs transition-all flex items-center gap-2 group"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>CLI Terminal</span>
            </button>
          </div>
        </div>

        {/* Telemetry Metrics HUD */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {[
            { label: "ACADEMIC GPA", value: "9.16 / 10.0", sub: "ITM Skills University", icon: Cpu },
            { label: "ENGINEERING FOCUS", value: "AI + Security", sub: "RBAC & Trustworthy Systems", icon: Lock },
            { label: "HSC ELECTRICAL TOPPER", value: "200 / 200", sub: "Perfect Score", icon: ShieldCheck },
            { label: "NMIMS AUTOMATION WINNER", value: "1st Place", sub: "Hardware Telemetry", icon: Sparkles }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                onMouseEnter={() => sound.playHover()}
                className="glass-panel glass-panel-hover p-4 rounded-2xl border border-slate-800/80 flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{item.label}</span>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <div className="text-xl lg:text-2xl font-extrabold font-heading text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {item.value}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 block mt-1">
                    {item.sub}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Down Scroll Trigger */}
      <div 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity cursor-pointer z-10" 
        onClick={() => handleNavToSection('about')}
      >
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Engineering Thesis</span>
        <ChevronDown className="w-4 h-4 text-cyan-400 animate-bounce" />
      </div>
    </section>
  );
}
