import React from 'react';
import { motion } from 'framer-motion';
import { influencesData } from '../data/portfolioData';
import Reveal, { RevealGroup, revealItem } from './motion/Reveal';

function Tile({ figure, source, principle, application }) {
  return (
    <motion.div variants={revealItem} className="lab-panel lab-panel-hover rounded-2xl p-6 flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-4">
        <h3 className="font-heading text-lg text-[var(--color-ink)]">{figure}</h3>
        {source && (
          <span className="shrink-0 text-[9px] font-mono uppercase tracking-wider text-[var(--color-ink-faint)] px-2 py-0.5 rounded-full border border-[var(--color-line)]">
            {source}
          </span>
        )}
      </div>
      <span className="text-xs font-mono text-[var(--color-accent)] mb-3">{principle}</span>
      <p className="text-xs text-[var(--color-ink-faint)] leading-relaxed">{application}</p>
    </motion.div>
  );
}

export default function Influences() {
  return (
    <section id="influences" className="relative py-28 md:py-36 border-t border-[var(--color-line)]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <Reveal>
          <span className="block text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">
            The Minds I Borrow From
          </span>
          <h2 className="font-heading font-light text-3xl sm:text-5xl text-[var(--color-ink)] mb-4 max-w-2xl leading-tight">
            Principles, not fandom.
          </h2>
          <p className="text-[var(--color-ink-faint)] text-sm max-w-xl mb-16">
            Real people and fictional archetypes, each translated into a specific engineering or working discipline — not a highlight reel.
          </p>
        </Reveal>

        <div className="mb-16">
          <Reveal>
            <h3 className="text-[11px] font-mono uppercase tracking-widest text-[var(--color-ink-faint)] mb-6">
              Real World
            </h3>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {influencesData.realWorld.map((item) => (
              <Tile key={item.figure} {...item} />
            ))}
          </RevealGroup>
        </div>

        <div>
          <Reveal>
            <h3 className="text-[11px] font-mono uppercase tracking-widest text-[var(--color-ink-faint)] mb-6">
              Fiction
            </h3>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {influencesData.fiction.map((item) => (
              <Tile key={item.figure} {...item} />
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
