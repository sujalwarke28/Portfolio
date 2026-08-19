import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import { philosophyThemes, personalInfo } from '../data/portfolioData';
import { sound } from '../utils/sound';
import Reveal, { RevealGroup, revealItem } from './motion/Reveal';

export default function Philosophy() {
  const [showQuote, setShowQuote] = useState(false);

  return (
    <section id="philosophy" className="relative py-28 md:py-36 border-t border-[var(--color-line)]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <Reveal>
          <span className="block text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">
            How I Think
          </span>
          <h2 className="font-heading font-light text-3xl sm:text-5xl text-[var(--color-ink)] mb-16 max-w-2xl leading-tight">
            The operating principles, not a mission statement.
          </h2>
        </Reveal>

        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 mb-16">
          {philosophyThemes.map((theme) => (
            <motion.div key={theme.title} variants={revealItem} className="border-l border-[var(--color-line)] pl-5">
              <h3 className="text-sm font-medium text-[var(--color-ink)] mb-1.5">{theme.title}</h3>
              <p className="text-xs text-[var(--color-ink-faint)] leading-relaxed">{theme.desc}</p>
            </motion.div>
          ))}
        </RevealGroup>

        <button
          onClick={() => { sound.playClick(); setShowQuote((v) => !v); }}
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-ink-faint)] hover:text-[var(--color-accent)] transition-colors"
        >
          <Quote className="w-3.5 h-3.5" />
          <span>{showQuote ? 'Hide the one about work' : 'One more thing, about work'}</span>
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
  );
}
