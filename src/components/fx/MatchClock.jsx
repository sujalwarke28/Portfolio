import React, { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const PHASE_BY_SECTION = {
  hero: 'KICK-OFF',
  about: 'KICK-OFF',
  evolution: '1ST HALF',
  projects: 'HALF-TIME',
  research: '2ND HALF',
  influences: '2ND HALF',
  philosophy: 'STOPPAGE TIME',
  resume: 'STOPPAGE TIME',
  terminal: 'STOPPAGE TIME',
  contact: 'FULL TIME',
};

export default function MatchClock({ activeSection }) {
  const [minute, setMinute] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setMinute(Math.round(progress * 93));
      ticking = false;
    };
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const phase = PHASE_BY_SECTION[activeSection] || 'KICK-OFF';
  const isFullTime = minute >= 90;

  return (
    <div
      className="fixed bottom-5 right-5 z-40 hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-[var(--color-line-strong)] bg-[#0c0d0f]/90 backdrop-blur-xl shadow-2xl font-mono"
      role="status"
      aria-label={`Scroll progress: minute ${minute}, ${phase.toLowerCase()}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        {!reducedMotion && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-70" />
        )}
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--color-accent)]" />
      </span>
      <span className="text-xs font-semibold text-[var(--color-ink)] tabular-nums">
        {isFullTime ? '90+' : minute}&prime;
      </span>
      <span className="text-[9px] uppercase tracking-widest text-[var(--color-ink-faint)]">{phase}</span>
    </div>
  );
}
