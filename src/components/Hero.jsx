import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { sound } from '../utils/sound';
import { useCanvasScene } from '../hooks/useCanvasScene';

function createIntelligenceNetworkScene(ctx, { width, height, isCompact }) {
  const nodeCount = isCompact ? 26 : 58;
  const nodes = Array.from({ length: nodeCount }, (_, i) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    radius: Math.random() * 1.6 + 1,
    isGate: i % 9 === 0,
  }));

  return {
    render(mouse) {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 160;
        if (dist < radius) {
          const angle = Math.atan2(dy, dx);
          const force = (radius - dist) / radius;
          node.x -= Math.cos(angle) * force * 2;
          node.y -= Math.sin(angle) * force * 2;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.isGate ? 'rgba(232, 103, 44, 0.85)' : 'rgba(241, 239, 231, 0.45)';
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const ndx = other.x - node.x;
          const ndy = other.y - node.y;
          const ndist = Math.sqrt(ndx * ndx + ndy * ndy);
          if (ndist < 130) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            const alpha = (1 - ndist / 130) * 0.12;
            ctx.strokeStyle = `rgba(241, 239, 231, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    },
    destroy() {}
  };
}

export default function Hero() {
  const canvasRef = useRef(null);
  const sceneFactory = useCallback((ctx, meta) => createIntelligenceNetworkScene(ctx, meta), []);
  useCanvasScene(canvasRef, sceneFactory);

  const handleNavToSection = (id) => {
    sound.playClick();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center bg-lab-grid overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" aria-hidden="true" />

      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[var(--color-accent)]/[0.06] rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 w-full pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2.5 mb-8 text-[11px] font-mono text-[var(--color-ink-faint)] tracking-widest uppercase"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--color-accent)]" />
          </span>
          <span>{personalInfo.availability}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading font-light text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02] text-[var(--color-ink)] mb-8 max-w-4xl"
        >
          Building intelligent systems.
          <br />
          Learning how they work.
          <br />
          <span className="italic text-[var(--color-accent)]">Making them trustworthy.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-[var(--color-ink-dim)] text-base sm:text-lg max-w-xl mb-12 leading-relaxed"
        >
          {personalInfo.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-4 mb-20"
        >
          <button
            onClick={() => handleNavToSection('evolution')}
            className="px-6 py-3 rounded-full bg-[var(--color-accent)] text-[#0a0a0a] font-medium text-sm flex items-center gap-2 hover:gap-3 transition-all"
          >
            <span>Explore the evolution</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleNavToSection('projects')}
            className="px-6 py-3 rounded-full border border-[var(--color-line-strong)] text-[var(--color-ink-dim)] hover:text-[var(--color-ink)] hover:border-[var(--color-ink-faint)] font-medium text-sm transition-colors"
          >
            Inspect the lab work
          </button>
        </motion.div>

        {/* Verified stat row — real, sourced facts only */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-x-10 gap-y-4 pt-8 border-t border-[var(--color-line)]"
        >
          {[
            { label: 'Academic GPA', value: '9.16 / 10.0' },
            { label: 'Engineering Focus', value: 'AI Security & Trustworthy Systems' },
            { label: 'HSC Electrical Topper', value: '200 / 200' },
            { label: 'NMIMS Automation Challenge', value: 'Winner' },
          ].map((item) => (
            <div key={item.label} className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-ink-faint)] mb-1">
                {item.label}
              </span>
              <span className="text-sm font-medium text-[var(--color-ink)]">{item.value}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <button
        onClick={() => handleNavToSection('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] transition-colors z-10"
        aria-label="Scroll to About section"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
}
