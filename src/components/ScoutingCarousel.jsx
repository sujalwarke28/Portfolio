import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import AbstractPortrait from './fx/AbstractPortrait';
import LiquidGlassPane from './fx/LiquidGlassPane';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useFinePointer } from '../hooks/useFinePointer';
import { sound } from '../utils/sound';

/**
 * A CSS-3D spiral of liquid-glass cards — no WebGL, no images, just
 * transform-style:preserve-3d and a slow auto-rotating stage. Drag (mouse or
 * touch) to spin manually; Prev/Next buttons give a fully keyboard-operable
 * path to the same result. Falls back to a static wrapped grid under
 * prefers-reduced-motion — same content, no spin.
 */
export default function ScoutingCarousel({ figures }) {
  const reducedMotion = usePrefersReducedMotion();
  const isFinePointer = useFinePointer();
  const stageRef = useRef(null);
  const rotationRef = useRef(0);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const [paused, setPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const count = figures.length;
  const anglePer = 360 / count;
  const radius = 340;

  const applyRotation = (deg) => {
    rotationRef.current = deg;
    if (stageRef.current) {
      stageRef.current.style.transform = `rotateY(${deg}deg)`;
    }
    const normalized = (((-deg % 360) + 360) % 360);
    setActiveIndex(Math.round(normalized / anglePer) % count);
  };

  useEffect(() => {
    if (reducedMotion) return;
    let frameId;
    const loop = () => {
      if (!draggingRef.current && !paused) {
        applyRotation(rotationRef.current + 0.06);
      }
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, paused]);

  const handlePointerDown = (e) => {
    if (reducedMotion) return;
    draggingRef.current = true;
    lastXRef.current = e.clientX;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const handlePointerMove = (e) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    applyRotation(rotationRef.current + dx * 0.35);
  };
  const handlePointerUp = () => {
    draggingRef.current = false;
  };

  const step = (dir) => {
    sound.playClick();
    applyRotation(rotationRef.current + dir * anglePer);
  };

  if (reducedMotion) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
        {figures.map((f) => (
          <div key={f.figure} className="flex flex-col items-center text-center gap-2">
            <LiquidGlassPane className="rounded-full overflow-hidden w-20 h-20">
              <AbstractPortrait name={f.figure} source={f.source} tone={f.tone} size={80} />
            </LiquidGlassPane>
            <span className="text-[10px] font-mono text-[var(--color-ink-faint)]">{f.figure}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className="relative mx-auto h-[340px] sm:h-[400px] select-none touch-none"
        style={{ perspective: 1400 }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        role="group"
        aria-roledescription="carousel"
        aria-label="Spiral carousel of influence figures, drag to rotate"
      >
        <div
          ref={stageRef}
          className="absolute inset-0 mx-auto"
          style={{ transformStyle: 'preserve-3d', transform: 'rotateY(0deg)', width: 140, height: '100%', left: '50%', marginLeft: -70 }}
        >
          {figures.map((f, i) => {
            const angle = i * anglePer;
            const spiralY = (i - count / 2) * 6;
            return (
              <div
                key={f.figure}
                className="absolute top-1/2 left-0 w-[140px] -translate-y-1/2"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px) translateY(${spiralY}px)`,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
              >
                <LiquidGlassPane className="rounded-2xl overflow-hidden w-[140px] h-[140px] flex items-center justify-center shadow-2xl">
                  <AbstractPortrait name={f.figure} source={f.source} tone={f.tone} size={110} />
                </LiquidGlassPane>
                <div className="mt-3 text-center">
                  <span className="block text-xs font-medium text-[var(--color-ink)]">{f.figure}</span>
                  <span className="block text-[10px] font-mono text-[var(--color-ink-faint)] mb-1">{f.source}</span>
                  <span className="block text-[10px] font-mono text-[var(--color-accent)] leading-snug px-1">{f.principle}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          onClick={() => step(1)}
          aria-label="Rotate to previous figure"
          className="p-2.5 rounded-full border border-[var(--color-line)] text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="text-xs font-mono text-[var(--color-ink-faint)] w-40 text-center truncate">
          {figures[activeIndex]?.figure}
        </span>
        <button
          onClick={() => step(-1)}
          aria-label="Rotate to next figure"
          className="p-2.5 rounded-full border border-[var(--color-line)] text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Resume auto-rotation' : 'Pause auto-rotation'}
          className="p-2.5 rounded-full border border-[var(--color-line)] text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] transition-colors"
        >
          {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
        </button>
      </div>
      {isFinePointer && (
        <p className="text-center text-[10px] font-mono text-[var(--color-ink-faint)] mt-2">Drag to spin</p>
      )}
    </div>
  );
}
