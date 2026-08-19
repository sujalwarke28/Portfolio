import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useFinePointer } from '../../hooks/useFinePointer';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useCursorZoneContext } from './CursorZoneContext';

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, [role="button"], [tabindex]';

function PenTrail({ active }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active) return;
    const ctx = canvas.getContext('2d');
    let frameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const points = [];

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMove = (e) => {
      points.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (points.length > 24) points.shift();
    };
    window.addEventListener('mousemove', handleMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.life -= 0.045;
        if (p.life <= 0) continue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2 * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 103, 44, ${p.life * 0.5})`;
        ctx.fill();
      }
      frameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMove);
    };
  }, [active]);

  if (!active) return null;
  return <canvas ref={canvasRef} className="fixed inset-0 z-[9998] pointer-events-none" aria-hidden="true" />;
}

export default function Cursor() {
  const isFinePointer = useFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const { zone } = useCursorZoneContext();
  const [hoveringInteractive, setHoveringInteractive] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 340, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 340, damping: 30, mass: 0.5 });

  const enabled = isFinePointer && !reducedMotion;

  useEffect(() => {
    if (!enabled) return;
    const prevCursor = document.body.style.cursor;
    document.body.style.cursor = 'none';

    const handleMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const handleOver = (e) => {
      if (e.target.closest?.(INTERACTIVE_SELECTOR)) setHoveringInteractive(true);
    };
    const handleOut = (e) => {
      if (e.target.closest?.(INTERACTIVE_SELECTOR)) setHoveringInteractive(false);
    };
    const handleLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      document.body.style.cursor = prevCursor;
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      document.removeEventListener('mouseleave', handleLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  if (!enabled) return null;

  const ringScale = hoveringInteractive ? 1.8 : 1;

  return (
    <>
      <PenTrail active={zone === 'pen'} />
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x, y, opacity: visible ? 1 : 0 }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
      >
        <motion.div
          animate={{ scale: ringScale }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className="-translate-x-1/2 -translate-y-1/2"
        >
          <ZoneGlyph zone={zone} />
        </motion.div>
      </motion.div>
    </>
  );
}

function ZoneGlyph({ zone }) {
  switch (zone) {
    case 'glass':
      return (
        <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
          <circle cx="20" cy="20" r="14" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.8" />
          <line x1="30" y1="30" x2="40" y2="40" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'key':
      return (
        <svg width="40" height="26" viewBox="0 0 40 26" fill="none">
          <rect x="1" y="1" width="38" height="24" rx="4" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.85" />
          <line x1="1" y1="9" x2="39" y2="9" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.6" />
        </svg>
      );
    case 'target':
      return (
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <circle cx="22" cy="22" r="1.5" fill="var(--color-accent)" />
          <path d="M22 4v9M22 31v9M4 22h9M31 22h9" stroke="var(--color-accent)" strokeWidth="1.2" opacity="0.75" />
          <path d="M4 4v7M4 4h7M40 4v7M40 4h-7M4 40v-7M4 40h7M40 40v-7M40 40h-7" stroke="var(--color-signal-soft)" strokeWidth="1.2" opacity="0.6" />
        </svg>
      );
    case 'pen':
      return (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <circle cx="13" cy="13" r="9" stroke="var(--color-accent)" strokeWidth="1.2" opacity="0.55" />
        </svg>
      );
    default:
      return (
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
          <circle cx="17" cy="17" r="12" stroke="var(--color-ink)" strokeWidth="1" opacity="0.35" />
        </svg>
      );
  }
}
