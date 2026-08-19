import React from 'react';
import { motion } from 'framer-motion';
import { influencesData } from '../data/portfolioData';
import Reveal, { RevealGroup, revealItem } from './motion/Reveal';
import { CursorZone } from './fx/CursorZoneContext';
import TiltCard from './fx/TiltCard';
import ScoutingCarousel from './ScoutingCarousel';

const NOTE_TILT = [-2, 1.5, -1, 2, -1.5, 1, -2.2, 1.8];

function Tile({ figure, source, principle, application, index }) {
  return (
    <motion.div variants={revealItem}>
      <TiltCard
        maxTilt={6}
        style={{ transform: `rotate(${NOTE_TILT[index % NOTE_TILT.length]}deg)` }}
        className="lab-panel lab-panel-hover rounded-2xl p-6 flex flex-col"
      >
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
      </TiltCard>
    </motion.div>
  );
}

export default function Influences() {
  const carouselFigures = [
    ...influencesData.realWorld.map((f) => ({ ...f, tone: 'accent', source: 'Real World' })),
    ...influencesData.fiction.map((f) => ({ ...f, tone: 'signal' })),
  ];

  return (
    <CursorZone type="glass">
    <section id="influences" className="relative py-28 md:py-36 border-t border-[var(--color-line)] overflow-hidden">
      {/* Corkboard atmosphere */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(241,239,231,0.5) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
        aria-hidden="true"
      />
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.12]" aria-hidden="true">
        <path d="M 80 120 Q 300 60, 520 160" stroke="var(--color-accent)" strokeWidth="1.5" fill="none" />
        <path d="M 200 400 Q 420 340, 640 460" stroke="var(--color-accent)" strokeWidth="1.5" fill="none" />
        <path d="M 60 620 Q 260 700, 460 610" stroke="var(--color-signal-soft)" strokeWidth="1.5" fill="none" />
      </svg>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <Reveal>
          <span className="block text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">
            The Scouting Report
          </span>
          <h2 className="font-heading font-light text-3xl sm:text-5xl text-[var(--color-ink)] mb-4 max-w-2xl leading-tight">
            Principles, not fandom.
          </h2>
          <p className="text-[var(--color-ink-faint)] text-sm max-w-xl mb-16">
            Every scout builds a dossier on the people who shaped a player. Real people and fictional archetypes, each translated into a specific working discipline — not a highlight reel.
          </p>
        </Reveal>

        <Reveal className="mb-20">
          <ScoutingCarousel figures={carouselFigures} />
        </Reveal>

        <div className="mb-16">
          <Reveal>
            <h3 className="text-[11px] font-mono uppercase tracking-widest text-[var(--color-ink-faint)] mb-6">
              Real World
            </h3>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {influencesData.realWorld.map((item, i) => (
              <Tile key={item.figure} {...item} index={i} />
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
            {influencesData.fiction.map((item, i) => (
              <Tile key={item.figure} {...item} index={i + 4} />
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
    </CursorZone>
  );
}
