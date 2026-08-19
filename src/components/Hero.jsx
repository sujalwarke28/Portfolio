import React, { useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { sound } from '../utils/sound';
import { useCanvasScene } from '../hooks/useCanvasScene';
import { CursorZone } from './fx/CursorZoneContext';
import MagneticButton from './fx/MagneticButton';
import ScrambleText from './fx/ScrambleText';

function createFloodlightScene(ctx, { width, height, isCompact }) {
  const motes = Math.floor(isCompact ? 40 : 90);
  const dust = Array.from({ length: motes }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vy: 0.15 + Math.random() * 0.35,
    vx: (Math.random() - 0.5) * 0.15,
    r: Math.random() * 1.6 + 0.4,
    twinkle: Math.random() * Math.PI * 2,
  }));

  return {
    render(mouse, t) {
      ctx.clearRect(0, 0, width, height);

      for (const p of dust) {
        p.y -= p.vy;
        p.x += p.vx;
        if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const force = (140 - dist) / 140;
          p.x -= (dx / dist) * force * 1.2;
          p.y -= (dy / dist) * force * 1.2;
        }

        const flicker = 0.4 + Math.sin(t / 500 + p.twinkle) * 0.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(241, 239, 231, ${Math.max(0, flicker)})`;
        ctx.fill();
      }
    },
    destroy() {}
  };
}

function TunnelFrame({ depth, progress, total }) {
  const d = depth / total;
  const scale = useTransform(progress, [0, 1], [1 - d * 0.5, 2.4 - d * 0.4]);
  const opacity = useTransform(progress, [0, 0.6, 1], [0.5 - d * 0.06, 0.28 - d * 0.04, 0]);
  return (
    <motion.div
      style={{ scale, opacity }}
      className="absolute inset-0 m-auto border border-[var(--color-instrument-line-strong)] rounded-[2rem]"
    >
      <div
        className="absolute inset-0 m-auto rounded-[2rem]"
        style={{
          width: `${92 - d * 14}%`,
          height: `${92 - d * 14}%`,
          margin: 'auto',
          border: '1px solid rgba(241,239,231,0.08)',
        }}
      />
    </motion.div>
  );
}

const TUNNEL_FRAME_COUNT = 6;

function TunnelFrames({ progress }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: 900 }}>
      {Array.from({ length: TUNNEL_FRAME_COUNT }, (_, i) => (
        <TunnelFrame key={i} depth={i} total={TUNNEL_FRAME_COUNT} progress={progress} />
      ))}
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneFactory = useCallback((ctx, meta) => createFloodlightScene(ctx, meta), []);
  useCanvasScene(canvasRef, sceneFactory);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const burstScale = useTransform(scrollYProgress, [0, 1], [0.6, 3.2]);
  const burstOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [0.5, 0.25, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, -80]);

  const handleNavToSection = (id) => {
    sound.playClick();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <CursorZone type="pen">
      <section ref={sectionRef} id="hero" className="relative min-h-[130vh] flex flex-col justify-center bg-[var(--color-canvas-deep)] overflow-hidden">
        <TunnelFrames progress={scrollYProgress} />

        <motion.div
          style={{ scale: burstScale, opacity: burstOpacity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[var(--color-accent)]/[0.08] blur-[160px] pointer-events-none z-0"
        />

        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" aria-hidden="true" />

        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="sticky top-0 min-h-screen flex flex-col justify-center z-10 max-w-6xl mx-auto px-6 lg:px-8 w-full pt-32 pb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2.5 mb-8 text-[11px] font-mono text-[var(--color-instrument-ink-faint)] tracking-widest uppercase"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--color-accent)]" />
            </span>
            <span>{personalInfo.availability}</span>
          </motion.div>

          <h1 className="font-heading font-light text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02] text-[var(--color-instrument-ink)] mb-8 max-w-4xl">
            <ScrambleText as="span" text="Building intelligent systems." className="block" />
            <ScrambleText as="span" text="Learning how they work." className="block" />
            <ScrambleText as="span" text="Making them trustworthy." className="block italic text-[var(--color-accent)]" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-[var(--color-instrument-ink-dim)] text-base sm:text-lg max-w-xl mb-12 leading-relaxed"
          >
            {personalInfo.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 mb-20"
          >
            <MagneticButton
              onClick={() => handleNavToSection('evolution')}
              className="px-6 py-3 rounded-full bg-[var(--color-accent)] text-[#0a0a0a] font-medium text-sm flex items-center gap-2 hover:gap-3 transition-[gap]"
            >
              <span>Walk the formation</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton
              onClick={() => handleNavToSection('projects')}
              className="px-6 py-3 rounded-full border border-[var(--color-instrument-line-strong)] text-[var(--color-instrument-ink-dim)] hover:text-[var(--color-instrument-ink)] hover:border-[var(--color-instrument-ink-faint)] font-medium text-sm transition-colors"
            >
              Review match highlights
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-x-10 gap-y-4 pt-8 border-t border-[var(--color-instrument-line)]"
          >
            {[
              { label: 'Academic GPA', value: '9.16 / 10.0' },
              { label: 'Engineering Focus', value: 'AI Security & Trustworthy Systems' },
              { label: 'HSC Electrical Topper', value: '200 / 200' },
              { label: 'NMIMS Automation Challenge', value: 'Winner' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-instrument-ink-faint)] mb-1">
                  {item.label}
                </span>
                <span className="text-sm font-medium text-[var(--color-instrument-ink)]">{item.value}</span>
              </div>
            ))}
          </motion.div>

          <button
            onClick={() => handleNavToSection('about')}
            className="mt-10 flex items-center gap-1.5 text-[var(--color-instrument-ink-faint)] hover:text-[var(--color-instrument-ink)] transition-colors self-start"
            aria-label="Scroll to About section"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest">Enter the tunnel</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </motion.div>
      </section>
    </CursorZone>
  );
}
