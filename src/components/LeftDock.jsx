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

function generateSpiralPath(turns = 2.2, cx = 22, cy = 22, startR = 3, endR = 20) {
  const steps = 60;
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = t * turns * Math.PI * 2;
    const r = startR + (endR - startR) * t;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return points.join(' ');
}
const SPIRAL_PATH = generateSpiralPath();

// The dock sits on a true semicircle: its flat side against the left edge,
// bulging out toward the content as you move toward the vertical center —
// not a straight column.
const BASE_RADIUS = 108;
const EXTRA_RADIUS = 56; // how much further out a fully-magnified item pushes, along its own radius
const CONTAINER_HEIGHT = 2 * BASE_RADIUS + 90;
const CONTAINER_WIDTH = BASE_RADIUS + EXTRA_RADIUS + 30;
const INFLUENCE = 130; // px, in real 2D screen distance
const MAX_SCALE = 1.7;

function arcPosition(angleRad, radius) {
  return {
    x: radius * Math.cos(angleRad),
    y: CONTAINER_HEIGHT / 2 + radius * Math.sin(angleRad),
  };
}

function useArcLayout() {
  return useMemo(() => {
    const n = NAV_ITEMS.length;
    return NAV_ITEMS.map((item, i) => {
      const angle = -Math.PI / 2 + (i / (n - 1)) * Math.PI; // -90deg .. +90deg
      return { ...item, angle, base: arcPosition(angle, BASE_RADIUS) };
    });
  }, []);
}

function DockItem({ item, mouseX, mouseY, isActive, onNavigate, containerLeft, containerTop }) {
  const distance = useTransform([mouseX, mouseY], ([mx, my]) => {
    const itemScreenX = containerLeft + item.base.x;
    const itemScreenY = containerTop + item.base.y;
    return Math.hypot(mx - itemScreenX, my - itemScreenY);
  });

  const gRaw = useTransform(distance, [0, INFLUENCE], [1, 0]);
  const g = useSpring(gRaw, { mass: 0.15, stiffness: 260, damping: 18 });
  const clampedG = useTransform(g, (v) => Math.min(1, Math.max(0, v)));

  const radius = useTransform(clampedG, (v) => BASE_RADIUS + v * EXTRA_RADIUS);
  const x = useTransform(radius, (r) => r * Math.cos(item.angle));
  const y = useTransform(radius, (r) => CONTAINER_HEIGHT / 2 + r * Math.sin(item.angle));
  const scale = useTransform(clampedG, [0, 1], [1, MAX_SCALE]);
  const opacity = useTransform(clampedG, [0, 1], [0.35, 1]);
  const spiralOpacity = useTransform(clampedG, [0, 1], [0.1, 0.75]);
  const glowShadow = useTransform(clampedG, (v) => `0 0 ${v * 26}px rgba(232, 103, 44, ${v * 0.6})`);
  const labelOpacity = useTransform(clampedG, [0, 0.55, 1], [0, 0, 1]);
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
      <motion.svg
        className="absolute inset-0 pointer-events-none dock-spiral"
        style={{ opacity: spiralOpacity }}
        viewBox="0 0 44 44"
        aria-hidden="true"
      >
        <path d={SPIRAL_PATH} stroke="var(--color-accent)" strokeWidth="1" fill="none" />
      </motion.svg>

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
            style={{ position: 'absolute', top: item.base.y, left: item.base.x, transform: 'translateY(-50%)' }}
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
 * A left-edge dock nav arranged on a true semicircle — flush with the edge
 * at top and bottom, bulging out toward the content at the vertical center.
 * Hovering doesn't just enlarge an icon in place: it pushes it further out
 * along its own radius from the arc's center, so the motion traces the same
 * curve the dock sits on — an orbit, not a straight line. Falls back to a
 * plain static arc (no hover physics) on touch/reduced-motion.
 */
export default function LeftDock({ activeSection, onNavigate }) {
  const isFinePointer = useFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const items = useArcLayout();
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
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
      onMouseMove={(e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); }}
      onMouseLeave={() => { mouseX.set(-9999); mouseY.set(-9999); }}
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
          isActive={activeSection === item.id}
          onNavigate={onNavigate}
          containerLeft={0}
          containerTop={containerTop}
        />
      ))}
    </nav>
  );
}

export { NAV_ITEMS };
