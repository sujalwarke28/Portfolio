import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { skillEvolutionEpochs, skillStatusMeta } from '../data/portfolioData';
import { sound } from '../utils/sound';
import { useCanvasScene } from '../hooks/useCanvasScene';
import Reveal from './motion/Reveal';
import { CursorZone } from './fx/CursorZoneContext';

const RARITY = {
  'experienced': 'GOLD',
  'learning': 'SILVER',
  'exploring': 'BRONZE',
  'research-interest': 'SCOUTED',
};

const STATUS_COLOR = {
  'experienced': 'rgba(232, 103, 44, 0.9)',
  'learning': 'rgba(232, 103, 44, 0.5)',
  'exploring': 'rgba(139, 150, 166, 0.75)',
  'research-interest': 'rgba(241, 239, 231, 0.28)'
};

function buildNetworkLayout(width, height, isCompact) {
  const margin = isCompact ? 30 : 70;
  const colWidth = (width - margin * 2) / (skillEvolutionEpochs.length - 1);
  const nodes = [];

  skillEvolutionEpochs.forEach((epoch, epochIdx) => {
    const x = margin + colWidth * epochIdx;
    const count = epoch.skills.length;
    epoch.skills.forEach((skill, sIdx) => {
      const spread = Math.min(height - 40, count * (isCompact ? 26 : 34));
      const y = height / 2 - spread / 2 + (spread / Math.max(count - 1, 1)) * sIdx + (Math.random() - 0.5) * 8;
      nodes.push({
        x, y,
        epochIdx,
        status: skill.status,
        baseY: y,
        phase: Math.random() * Math.PI * 2,
      });
    });
  });

  // connect each node to the nearest node in the previous column
  const edges = [];
  for (let i = 1; i < skillEvolutionEpochs.length; i++) {
    const prevCol = nodes.filter((n) => n.epochIdx === i - 1);
    const col = nodes.filter((n) => n.epochIdx === i);
    col.forEach((node) => {
      let nearest = prevCol[0];
      let best = Infinity;
      prevCol.forEach((p) => {
        const d = Math.abs(p.y - node.y);
        if (d < best) { best = d; nearest = p; }
      });
      if (nearest) edges.push([nearest, node]);
    });
  }

  return { nodes, edges };
}

function createEvolutionScene(ctx, { width, height, isCompact }, activeEpochRef) {
  const { nodes, edges } = buildNetworkLayout(width, height, isCompact);

  return {
    render(_mouse, t) {
      ctx.clearRect(0, 0, width, height);
      const activeIdx = activeEpochRef.current;

      edges.forEach(([a, b]) => {
        const litA = a.epochIdx <= activeIdx;
        const litB = b.epochIdx <= activeIdx;
        if (!litA || !litB) {
          ctx.strokeStyle = 'rgba(241, 239, 231, 0.04)';
        } else {
          ctx.strokeStyle = 'rgba(232, 103, 44, 0.18)';
        }
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });

      nodes.forEach((node) => {
        const lit = node.epochIdx <= activeIdx;
        const isCurrent = node.epochIdx === activeIdx;
        const bob = Math.sin(t / 900 + node.phase) * (lit ? 2 : 0);
        const r = isCurrent ? 3.4 : 2.4;
        ctx.beginPath();
        ctx.arc(node.x, node.baseY + bob, r, 0, Math.PI * 2);
        ctx.fillStyle = lit ? STATUS_COLOR[node.status] : 'rgba(241, 239, 231, 0.06)';
        ctx.fill();
        if (isCurrent) {
          ctx.beginPath();
          ctx.arc(node.x, node.baseY + bob, r + 5, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(232, 103, 44, 0.25)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    },
    destroy() {}
  };
}

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'experienced', label: 'Experienced' },
  { id: 'learning', label: 'Learning' },
  { id: 'exploring', label: 'Exploring' },
  { id: 'research-interest', label: 'Research Interest' },
];

export default function SkillEvolution() {
  const [activeEpochIndex, setActiveEpochIndex] = useState(0);
  const [filterStatus, setFilterStatus] = useState('all');
  const canvasRef = useRef(null);
  const activeEpochRef = useRef(0);

  useEffect(() => { activeEpochRef.current = activeEpochIndex; }, [activeEpochIndex]);

  const sceneFactory = useCallback(
    (ctx, meta) => createEvolutionScene(ctx, meta, activeEpochRef),
    []
  );
  useCanvasScene(canvasRef, sceneFactory);

  const activeEpoch = skillEvolutionEpochs[activeEpochIndex];
  const filteredSkills = filterStatus === 'all'
    ? activeEpoch.skills
    : activeEpoch.skills.filter((s) => s.status === filterStatus);

  const selectEpoch = (idx) => {
    sound.playClick();
    setActiveEpochIndex(idx);
  };

  return (
    <CursorZone type="pen">
    <section id="evolution" className="relative py-28 md:py-36 border-t border-[var(--color-line)] overflow-hidden">
      {/* Pitch markings — faint, atmospheric, not a literal diagram */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05]" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <circle cx="600" cy="400" r="140" fill="none" stroke="var(--color-ink)" strokeWidth="2" />
        <circle cx="600" cy="400" r="4" fill="var(--color-ink)" />
        <line x1="600" y1="0" x2="600" y2="800" stroke="var(--color-ink)" strokeWidth="2" />
        <rect x="-40" y="240" width="220" height="320" fill="none" stroke="var(--color-ink)" strokeWidth="2" />
        <rect x="1020" y="240" width="220" height="320" fill="none" stroke="var(--color-ink)" strokeWidth="2" />
      </svg>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <Reveal>
          <span className="block text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">
            The Formation Board
          </span>
          <h2 className="font-heading font-light text-3xl sm:text-5xl text-[var(--color-ink)] mb-4 max-w-2xl leading-tight">
            How I learned to build.
          </h2>
          <p className="text-[var(--color-ink-faint)] text-sm max-w-xl mb-14">
            Seven matchdays, tracked honestly — what's genuinely experienced versus what's actively being learned, explored, or simply a research interest. No inflated ratings.
          </p>
        </Reveal>

        {/* Network canvas — grows as matchdays are scrubbed */}
        <Reveal>
          <canvas
            ref={canvasRef}
            className="w-full h-[220px] sm:h-[280px] mb-8 screen-panel rounded-2xl"
            role="img"
            aria-label="Diagram of skill nodes connecting across seven learning epochs, illuminated up to the currently selected epoch"
          />
        </Reveal>

        {/* Matchday rail */}
        <div className="flex items-center gap-1 overflow-x-auto pb-3 mb-10 no-scrollbar border-b border-[var(--color-line)]">
          {skillEvolutionEpochs.map((epoch, idx) => {
            const isActive = activeEpochIndex === idx;
            return (
              <button
                key={epoch.id}
                onClick={() => selectEpoch(idx)}
                className={`shrink-0 px-4 py-3 text-left transition-colors border-b-2 -mb-px ${
                  isActive ? 'border-[var(--color-accent)]' : 'border-transparent'
                }`}
              >
                <span className={`block text-[10px] font-mono ${isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-ink-faint)]'}`}>
                  MATCHDAY {epoch.epoch}
                </span>
                <span className={`block text-xs font-medium whitespace-nowrap ${isActive ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink-faint)]'}`}>
                  {epoch.title}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start mb-8">
          <div>
            <h3 className="font-heading text-2xl text-[var(--color-ink)] mb-1">{activeEpoch.title}</h3>
            <p className="text-xs font-mono text-[var(--color-ink-faint)]">{activeEpoch.subtitle}</p>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => { sound.playClick(); setFilterStatus(f.id); }}
                className={`px-3 py-1.5 rounded-full text-[11px] font-mono border transition-colors ${
                  filterStatus === f.id
                    ? 'border-[var(--color-accent)] text-[var(--color-accent)]'
                    : 'border-[var(--color-line)] text-[var(--color-ink-faint)] hover:border-[var(--color-line-strong)]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-[var(--color-ink-dim)] leading-relaxed max-w-2xl mb-8">
          {activeEpoch.description}
        </p>

        <ul className="divide-y divide-[var(--color-line)] border-t border-b border-[var(--color-line)]">
          {filteredSkills.map((skill) => (
            <li key={skill.name} className="flex items-center justify-between gap-4 py-4 group">
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: STATUS_COLOR[skill.status] }}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <span className="block text-sm font-medium text-[var(--color-ink)]">{skill.name}</span>
                  <span className="block text-xs text-[var(--color-ink-faint)] truncate">{skill.note}</span>
                </div>
              </div>
              <span className="shrink-0 flex items-center gap-2">
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border border-[var(--color-line)] text-[var(--color-ink-faint)]">
                  {RARITY[skill.status]}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-faint)] hidden sm:inline">
                  {skillStatusMeta[skill.status].label}
                </span>
              </span>
            </li>
          ))}
        </ul>

        {activeEpochIndex < skillEvolutionEpochs.length - 1 && (
          <button
            onClick={() => selectEpoch(activeEpochIndex + 1)}
            className="mt-8 inline-flex items-center gap-2 text-xs font-mono text-[var(--color-ink-faint)] hover:text-[var(--color-accent)] transition-colors"
          >
            <span>Next matchday — {skillEvolutionEpochs[activeEpochIndex + 1].title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </section>
    </CursorZone>
  );
}
