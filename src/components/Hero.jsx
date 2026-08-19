import React, { useEffect, useRef, useState } from 'react';
import { 
  Sparkles, 
  Terminal, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  GitCommit, 
  ArrowRight, 
  Code2, 
  ChevronDown,
  Layers,
  Activity
} from 'lucide-react';
import { personalInfo, metricsHUD } from '../data/portfolioData';
import { sound } from '../utils/sound';

export default function Hero() {
  const canvasRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    "Full-Stack System Architect",
    "Distributed Microservices Engineer",
    "High-Performance Web Developer",
    "AI & Cloud Automation Specialist"
  ];

  // Typing Glitch Effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 30 : 60;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  // Canvas Node & Laser Particle Physics Animation
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

    const mouse = { x: -1000, y: -1000, radius: 160 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    // Particle nodes
    const nodeCount = Math.floor(width < 768 ? 35 : 75);
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1.5,
      color: Math.random() > 0.4 ? '#38bdf8' : Math.random() > 0.5 ? '#a855f7' : '#22c55e',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle nodes & laser links
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Move nodes
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Mouse Repulsion & Glow
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - dist) / mouse.radius;
          node.x -= Math.cos(angle) * force * 3;
          node.y -= Math.sin(angle) * force * 3;
        }

        // Draw Node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = node.color;
        ctx.fill();

        // Connect Nodes with dynamic laser lines
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const ndx = other.x - node.x;
          const ndy = other.y - node.y;
          const ndist = Math.sqrt(ndx * ndx + ndy * ndy);

          if (ndist < 130) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            const alpha = (1 - ndist / 130) * 0.25;
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.shadowBlur = 0;
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
      {/* Background Interactive Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto z-0 opacity-70" />

      {/* Radial Glow Layer */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Top Developer Badge */}
        <div className="flex items-center justify-center lg:justify-start mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono backdrop-blur-md shadow-lg shadow-cyan-500/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>SYSTEM ONLINE</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300 font-semibold">{personalInfo.status}</span>
          </div>
        </div>

        {/* Hero Title & Glitch Typing Subtitle */}
        <div className="text-center lg:text-left max-w-4xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 leading-none">
            Architecting <br />
            <span className="text-gradient-cyan">High-Impact Software</span>
          </h1>

          <div className="h-12 flex items-center justify-center lg:justify-start text-xl sm:text-2xl lg:text-3xl font-mono text-cyan-400 font-semibold mb-6">
            <span className="text-slate-500 mr-2">&gt;</span>
            <span>{displayText}</span>
            <span className="inline-block w-2.5 h-7 bg-cyan-400 ml-1 animate-pulse" />
          </div>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mb-8 leading-relaxed">
            {personalInfo.tagline} {personalInfo.bio}
          </p>

          {/* Action Call-To-Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-14">
            <button
              onClick={() => handleNavToSection('skills')}
              onMouseEnter={() => sound.playHover()}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white font-semibold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
            >
              <Sparkles className="w-4 h-4 text-cyan-200 group-hover:rotate-45 transition-transform" />
              <span>Explore Skill Galaxy</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleNavToSection('engineer-life')}
              onMouseEnter={() => sound.playHover()}
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-200 hover:text-white hover:border-cyan-500/50 hover:bg-slate-800 font-semibold text-sm transition-all flex items-center gap-2 group backdrop-blur-md shadow-lg"
            >
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Software Guy Workflow</span>
            </button>

            <button
              onClick={() => handleNavToSection('terminal')}
              onMouseEnter={() => sound.playHover()}
              className="px-5 py-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 font-mono text-sm transition-all flex items-center gap-2 group"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Launch Terminal</span>
            </button>
          </div>
        </div>

        {/* Real-Time Metrics HUD Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {metricsHUD.map((item, idx) => {
            const Icon = item.icon === 'GitCommit' ? GitCommit : item.icon === 'ShieldCheck' ? ShieldCheck : item.icon === 'Zap' ? Zap : Cpu;
            return (
              <div 
                key={idx}
                onMouseEnter={() => sound.playHover()}
                className="glass-panel glass-panel-hover p-4 rounded-2xl border border-slate-800/80 flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">{item.label}</span>
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-extrabold font-heading text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {item.value}
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 mt-1">
                    <Activity className="w-3 h-3" /> {item.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Down Arrow Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity cursor-pointer z-10" onClick={() => handleNavToSection('skills')}>
        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">Scroll Down</span>
        <ChevronDown className="w-4 h-4 text-cyan-400 animate-bounce" />
      </div>
    </section>
  );
}
