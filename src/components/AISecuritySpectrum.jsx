import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ShieldCheck, Crown } from 'lucide-react';
import { aiSecuritySpectrum } from '../data/portfolioData';
import { sound } from '../utils/sound';
import { useCanvasScene } from '../hooks/useCanvasScene';
import Reveal from './motion/Reveal';
import { CursorZone } from './fx/CursorZoneContext';

const GATE_STEP_IDX = 4; // "Therefore, AI Needs Boundaries"
const AUTH_STEP_IDX = 5; // "Authorization"
const CHESS_FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function createBoundaryScene(ctx, { width, height }, activeStepRef) {
  const gateX = width * 0.62;
  let particles = Array.from({ length: 26 }, () => ({
    x: Math.random() * gateX * 0.9,
    y: Math.random() * height,
    speed: 0.6 + Math.random() * 0.6,
    authorized: Math.random() > 0.35,
    state: 'flowing',
    settleX: gateX - 8 - Math.random() * 40,
  }));

  return {
    render() {
      ctx.clearRect(0, 0, width, height);
      const stepIdx = activeStepRef.current;
      const gateActive = stepIdx >= GATE_STEP_IDX;
      const authorizing = stepIdx >= AUTH_STEP_IDX;
      const trusted = stepIdx >= 7;

      if (gateActive) {
        ctx.strokeStyle = trusted ? 'rgba(232, 103, 44, 0.35)' : 'rgba(241, 239, 231, 0.18)';
        ctx.setLineDash(trusted ? [] : [3, 5]);
        ctx.beginPath();
        ctx.moveTo(gateX, 8);
        ctx.lineTo(gateX, height - 8);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
      }

      particles.forEach((p) => {
        if (!gateActive || trusted) {
          p.x += p.speed;
          if (p.x > width + 5) p.x = -5;
        } else if (p.x < p.settleX) {
          p.x += p.speed;
        } else if (authorizing) {
          if (p.state === 'flowing') p.state = p.authorized ? 'pass' : 'reject';
          if (p.state === 'pass') {
            p.x += p.speed * 1.4;
            if (p.x > width + 5) p.x = -5 - Math.random() * 40;
          } else {
            p.x -= 0.3;
          }
        }

        const color = trusted
          ? 'rgba(232, 103, 44, 0.85)'
          : !gateActive
          ? 'rgba(241, 239, 231, 0.4)'
          : p.state === 'pass'
          ? 'rgba(232, 103, 44, 0.85)'
          : p.state === 'reject'
          ? 'rgba(180, 70, 70, 0.6)'
          : 'rgba(241, 239, 231, 0.35)';

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });
    },
    destroy() {}
  };
}

export default function AISecuritySpectrum() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const canvasRef = useRef(null);
  const activeStepRef = useRef(0);

  useEffect(() => { activeStepRef.current = activeStepIndex; }, [activeStepIndex]);

  const sceneFactory = useCallback((ctx, meta) => createBoundaryScene(ctx, meta, activeStepRef), []);
  useCanvasScene(canvasRef, sceneFactory);

  const active = aiSecuritySpectrum[activeStepIndex];

  return (
    <CursorZone type="target">
    <section id="ai-security" className="relative py-28 md:py-36 border-t border-[var(--color-line)] overflow-hidden">
      {/* Chessboard grid — faint, evokes the move-by-move framing */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `repeating-conic-gradient(var(--color-ink) 0% 25%, transparent 0% 50%)`,
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <Reveal>
          <span className="block text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-signal-soft)] mb-4">
            The Endgame
          </span>
          <h2 className="font-heading font-light text-3xl sm:text-5xl text-[var(--color-ink)] mb-4 max-w-2xl leading-tight">
            Capability needs a boundary.
          </h2>
          <p className="text-[var(--color-ink-faint)] text-sm max-w-xl mb-14">
            Eight moves, played out like a game — step through what a model can do, and where that stops being safe without deterministic authorization.
          </p>
        </Reveal>

        <Reveal>
          <canvas
            ref={canvasRef}
            className="w-full h-[160px] sm:h-[200px] mb-8 screen-panel rounded-2xl"
            role="img"
            aria-label="Diagram of particles attempting to cross a permission boundary, blocked unless authorized"
          />
        </Reveal>

        <div className="flex items-center gap-1 overflow-x-auto pb-3 mb-10 no-scrollbar border-b border-[var(--color-line)]">
          {aiSecuritySpectrum.map((item, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={item.step}
                onClick={() => { sound.playClick(); setActiveStepIndex(idx); }}
                className={`shrink-0 px-3.5 py-3 text-left transition-colors border-b-2 -mb-px ${
                  isActive ? 'border-[var(--color-accent)]' : 'border-transparent'
                }`}
              >
                <span className={`block text-[10px] font-mono ${isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-ink-faint)]'}`}>
                  {CHESS_FILES[idx]}1 · move {item.step}
                </span>
                <span className={`block text-xs font-medium whitespace-nowrap ${isActive ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink-faint)]'}`}>
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-ink-faint)]">
              {active.level}
            </span>
            {activeStepIndex === aiSecuritySpectrum.length - 1 && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-[var(--color-accent)] border border-[var(--color-accent)]/40 rounded-full px-2 py-0.5">
                <Crown className="w-3 h-3" /> Checkmate
              </span>
            )}
          </div>
          <h3 className="font-heading text-2xl text-[var(--color-ink)] mb-4">{active.title}</h3>
          <p className="text-sm text-[var(--color-ink-dim)] leading-relaxed mb-8">{active.desc}</p>

          <div className="lab-panel rounded-2xl p-5 flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-[var(--color-signal-soft)] shrink-0 mt-0.5" />
            <p className="text-xs font-mono text-[var(--color-ink-dim)] leading-relaxed">
              <span className="text-[var(--color-ink)] font-semibold">Core principle: </span>
              An LLM should never be trusted as the authorization authority. Permissions and tenant boundaries are checked deterministically, outside the model's context.
            </p>
          </div>
        </div>
      </div>
    </section>
    </CursorZone>
  );
}
