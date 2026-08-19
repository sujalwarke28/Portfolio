import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Lock, LockOpen } from 'lucide-react';
import { philosophyThemes, personalInfo } from '../data/portfolioData';
import { sound } from '../utils/sound';
import Reveal, { RevealGroup, revealItem } from './motion/Reveal';
import { CursorZone } from './fx/CursorZoneContext';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

function VaultDoor({ sectionRef }) {
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 0.8', 'start 0.15'] });

  const wheelRotate = useTransform(scrollYProgress, [0, 1], [0, 540]);
  const doorScale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);
  const doorOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.4, 0]);

  if (reducedMotion) return null;

  return (
    <motion.div
      style={{ opacity: doorOpacity, scale: doorScale }}
      className="pointer-events-none absolute inset-0 flex items-center justify-center z-20"
      aria-hidden="true"
    >
      <div className="relative w-64 h-64 sm:w-80 sm:h-80">
        <div className="absolute inset-0 rounded-full border-2 border-[var(--color-line-strong)] bg-[var(--color-canvas-deep)]" />
        <div className="absolute inset-4 rounded-full border border-[var(--color-line)]" />
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[var(--color-ink-faint)]/40"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 30}deg) translate(0, -120px)`,
            }}
          />
        ))}
        <motion.div
          style={{ rotate: wheelRotate }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-[var(--color-accent)]/70 flex items-center justify-center">
            {[0, 60, 120].map((deg) => (
              <span
                key={deg}
                className="absolute w-full h-1 bg-[var(--color-accent)]/50"
                style={{ transform: `rotate(${deg}deg)` }}
              />
            ))}
            <Lock className="w-8 h-8 text-[var(--color-accent)]" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Philosophy() {
  const [showQuote, setShowQuote] = useState(false);
  const sectionRef = useRef(null);

  return (
    <CursorZone type="key">
    <section ref={sectionRef} id="philosophy" className="relative py-28 md:py-36 border-t border-[var(--color-line)] overflow-hidden">
      <VaultDoor sectionRef={sectionRef} />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
        <Reveal>
          <span className="block text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">
            The Vault
          </span>
          <h2 className="font-heading font-light text-3xl sm:text-5xl text-[var(--color-ink)] mb-16 max-w-2xl leading-tight">
            The operating principles, not a mission statement.
          </h2>
        </Reveal>

        <RevealGroup className="border-t border-[var(--color-line)] mb-16">
          {philosophyThemes.map((theme, idx) => (
            <motion.div
              key={theme.title}
              variants={revealItem}
              className="grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3rem_10rem_1fr] gap-4 items-baseline py-4 border-b border-[var(--color-line)] font-mono"
            >
              <span className="text-[10px] text-[var(--color-ink-faint)]">{String(idx + 1).padStart(2, '0')}</span>
              <h3 className="text-sm font-medium text-[var(--color-ink)] sm:col-start-2">{theme.title}</h3>
              <p className="text-xs text-[var(--color-ink-faint)] leading-relaxed sm:col-start-3 col-span-2 sm:col-span-1">
                {theme.desc}
              </p>
            </motion.div>
          ))}
        </RevealGroup>

        <button
          onClick={() => { sound.playClick(); setShowQuote((v) => !v); }}
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-ink-faint)] hover:text-[var(--color-accent)] transition-colors"
        >
          {showQuote ? <LockOpen className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
          <span>{showQuote ? 'Reseal the vault' : 'Crack the vault — one more thing, about work'}</span>
        </button>

        <AnimatePresence>
          {showQuote && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <blockquote className="mt-6 font-heading italic text-lg sm:text-xl text-[var(--color-ink)] leading-relaxed max-w-2xl border-l-2 border-[var(--color-accent)] pl-6">
                "{personalInfo.philosophyQuote}"
              </blockquote>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
    </CursorZone>
  );
}
