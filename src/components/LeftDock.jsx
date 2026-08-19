import React, { useEffect, useMemo, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Compass, GitBranch, Layers, Brain, Users, Mail } from 'lucide-react';
import { useFinePointer } from '../hooks/useFinePointer';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const NAV_ITEMS = [
  { id: 'about', label: 'About', href: '#about', icon: Compass },
  { id: 'evolution', label: 'Evolution', href: '#evolution', icon: GitBranch },
  { id: 'projects', label: 'Work', href: '#projects', icon: Layers },
  { id: 'research', label: 'Research', href: '#research', icon: Brain },
  { id: 'influences', label: 'Influences', href: '#influences', icon: Users },
  { id: 'contact', label: 'Contact', href: '#contact', icon: Mail },
];

// At rest the dock is a plain straight column, flush with the edge. Only
// while the pointer is over it does it bow open into a semicircle — the
// line and the arc share a vertical center so the morph reads as one shape
// unfurling, not a jump cut.
const LINE_PITCH = 56;
const BASE_RADIUS = 140;
const EXTRA_RADIUS = 45; // additional radial push for the item nearest the cursor
const CONTAINER_HEIGHT = 2 * BASE_RADIUS + 90;
const CONTAINER_WIDTH = BASE_RADIUS + EXTRA_RADIUS + 30;
const INFLUENCE = 130; // px, real 2D screen distance
const MAX_SCALE = 1.7;

function useArcLayout() {
  return useMemo(() => {
    const n = NAV_ITEMS.length;
    const centerIndex = (n - 1) / 2;
    return NAV_ITEMS.map((item, i) => {
      const angle = -Math.PI / 2 + (i / (n - 1)) * Math.PI; // -90deg .. +90deg
      const lineY = CONTAINER_HEIGHT / 2 + (i - centerIndex) * LINE_PITCH;
      return { ...item, angle, lineY };
    });
  }, []);
}

function DockItem({ item, mouseX, mouseY, dockOpen, isActive, onNavigate, containerTop }) {
  const distance = useTransform([mouseX, mouseY], ([mx, my]) => {
    const arcX = BASE_RADIUS * Math.cos(item.angle);
    const arcY = CONTAINER_HEIGHT / 2 + BASE_RADIUS * Math.sin(item.angle);
    return Math.hypot(mx - arcX, my - (containerTop + arcY));
  });

  const gRaw = useTransform(distance, [0, INFLUENCE], [1, 0]);
  const g = useSpring(gRaw, { mass: 0.15, stiffness: 260, damping: 18 });
  const clampedG = useTransform(g, (v) => Math.min(1, Math.max(0, v)));

  const totalRadius = useTransform([dockOpen, clampedG], ([open, mag]) => open * (BASE_RADIUS + mag * EXTRA_RADIUS));
  const x = useTransform(totalRadius, (r) => r * Math.cos(item.angle));
  const y = useTransform([dockOpen, totalRadius], ([open, r]) => {
    const arcY = CONTAINER_HEIGHT / 2 + r * Math.sin(item.angle);
    return item.lineY + (arcY - item.lineY) * open;
  });

  const scale = useTransform(clampedG, [0, 1], [1, MAX_SCALE]);
  const opacity = useTransform(clampedG, [0, 1], [0.35, 1]);
  const glowShadow = useTransform(clampedG, (v) => `0 0 ${v * 26}px rgba(232, 103, 44, ${v * 0.6})`);
  const labelOpacity = useTransform([dockOpen, clampedG], ([open, mag]) => open * Math.max(0, Math.min(1, (mag - 0.55) / 0.45)));
  const labelX = useTransform(clampedG, [0, 1], [-8, 0]);

  const Icon = item.icon;

  return (
    <motion.a
      href={item.href}
      onClick={(e) => { e.preventDefault(); onNavigate(item.href); }}
      style={{ x, y, scale, opacity, position: 'absolute', top: 0, left: 0 }}
      className="relative flex items-center justify-center w-11 h-11 -translate-y-1/2"
      aria-label={item.label}
      aria-current={isActive ? 'true' : undefined}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ boxShadow: glowShadow }}
        aria-hidden="true"
      />

      <div
        className={`relative z-10 flex items-center justify-center w-9 h-9 rounded-xl border transition-colors duration-300 ${
          isActive
            ? 'border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent)]/10'
            : 'border-[var(--color-line)] text-[var(--color-ink-dim)]'
        }`}
      >
        <Icon className="w-4 h-4" />
      </div>

      <motion.span
        style={{ opacity: labelOpacity, x: labelX }}
        className="absolute left-full ml-3 whitespace-nowrap text-xs font-mono px-2.5 py-1.5 rounded-lg bg-[#0c0d0f] border border-[var(--color-line-strong)] text-[var(--color-ink)] pointer-events-none shadow-xl"
      >
        {item.label}
      </motion.span>
    </motion.a>
  );
}

function PlainDock({ items, activeSection, onNavigate }) {
  return (
    <nav
      className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
      style={{ width: CONTAINER_WIDTH, height: CONTAINER_HEIGHT }}
      aria-label="Section navigation"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        return (
          <a
            key={item.id}
            href={item.href}
            onClick={(e) => { e.preventDefault(); onNavigate(item.href); }}
            aria-label={item.label}
            aria-current={isActive ? 'true' : undefined}
            style={{ position: 'absolute', top: item.lineY, left: 0, transform: 'translateY(-50%)' }}
            className={`flex items-center justify-center w-10 h-10 rounded-xl border transition-colors ${
              isActive
                ? 'border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent)]/10'
                : 'border-[var(--color-line)] text-[var(--color-ink-dim)] hover:text-[var(--color-ink)]'
            }`}
          >
            <Icon className="w-4 h-4" />
          </a>
        );
      })}
    </nav>
  );
}

/**
 * A left-edge dock nav: a plain, faint, straight column at rest. Only while
 * the pointer is over the dock does it bow open into a semicircle, and
 * hovering an individual icon pushes it further out along its own radius
 * from that arc's center — an orbit, not a straight enlarge. Falls back to
 * a plain static column (no hover physics) on touch/reduced-motion.
 */
export default function LeftDock({ activeSection, onNavigate }) {
  const isFinePointer = useFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const items = useArcLayout();
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const dockOpenTarget = useMotionValue(0);
  const dockOpen = useSpring(dockOpenTarget, { mass: 0.3, stiffness: 200, damping: 26 });
  const [viewportHeight, setViewportHeight] = useState(() => (typeof window !== 'undefined' ? window.innerHeight : 0));

  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerTop = (viewportHeight - CONTAINER_HEIGHT) / 2;

  if (!isFinePointer || reducedMotion) {
    return <PlainDock items={items} activeSection={activeSection} onNavigate={onNavigate} />;
  }

  return (
    <nav
      onMouseEnter={() => dockOpenTarget.set(1)}
      onMouseMove={(e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); }}
      onMouseLeave={() => { dockOpenTarget.set(0); mouseX.set(-9999); mouseY.set(-9999); }}
      className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
      style={{ width: CONTAINER_WIDTH, height: CONTAINER_HEIGHT }}
      aria-label="Section navigation"
    >
      {items.map((item) => (
        <DockItem
          key={item.id}
          item={item}
          mouseX={mouseX}
          mouseY={mouseY}
          dockOpen={dockOpen}
          isActive={activeSection === item.id}
          onNavigate={onNavigate}
          containerTop={containerTop}
        />
      ))}
    </nav>
  );
}

export { NAV_ITEMS };
