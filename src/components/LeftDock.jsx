import React, { useRef } from 'react';
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

const INFLUENCE_RADIUS = 90;
const MAX_SCALE = 1.85;

function DockItem({ item, mouseY, isActive, onNavigate }) {
  const ref = useRef(null);
  const Icon = item.icon;

  const distance = useTransform(mouseY, (val) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return Infinity;
    return val - (rect.top + rect.height / 2);
  });

  const scaleRaw = useTransform(distance, [-INFLUENCE_RADIUS, 0, INFLUENCE_RADIUS], [1, MAX_SCALE, 1]);
  const scale = useSpring(scaleRaw, { mass: 0.15, stiffness: 260, damping: 16 });
  const opacityRaw = useTransform(distance, [-INFLUENCE_RADIUS, 0, INFLUENCE_RADIUS], [0.35, 1, 0.35]);
  const opacity = useSpring(opacityRaw, { mass: 0.15, stiffness: 260, damping: 16 });

  const spiralOpacity = useTransform(scale, [1, MAX_SCALE], [0.1, 0.75]);
  const glowShadow = useTransform(scale, (s) => {
    const g = Math.max(0, (s - 1) / (MAX_SCALE - 1));
    return `0 0 ${g * 26}px rgba(232, 103, 44, ${g * 0.6})`;
  });
  const labelOpacity = useTransform(scale, [1, 1.35, MAX_SCALE], [0, 0, 1]);
  const labelX = useTransform(scale, [1, MAX_SCALE], [-8, 0]);

  return (
    <motion.a
      ref={ref}
      href={item.href}
      onClick={(e) => { e.preventDefault(); onNavigate(item.href); }}
      style={{ scale, opacity }}
      className="relative flex items-center justify-center w-11 h-11 shrink-0"
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

function PlainDock({ activeSection, onNavigate }) {
  return (
    <nav
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3"
      aria-label="Section navigation"
    >
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        return (
          <a
            key={item.id}
            href={item.href}
            onClick={(e) => { e.preventDefault(); onNavigate(item.href); }}
            aria-label={item.label}
            aria-current={isActive ? 'true' : undefined}
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
 * A left-edge dock nav with macOS Dock-style magnification: items are faint
 * and near-resting size until the pointer approaches, then swell with a
 * glow and a spinning spiral flourish, falling off smoothly to neighbors.
 * Falls back to a plain always-visible icon list on touch/reduced-motion —
 * the magnification is pure flourish, never load-bearing for navigation.
 */
export default function LeftDock({ activeSection, onNavigate }) {
  const isFinePointer = useFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const mouseY = useMotionValue(Infinity);

  if (!isFinePointer || reducedMotion) {
    return <PlainDock activeSection={activeSection} onNavigate={onNavigate} />;
  }

  return (
    <nav
      onMouseMove={(e) => mouseY.set(e.clientY)}
      onMouseLeave={() => mouseY.set(Infinity)}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3 py-2"
      aria-label="Section navigation"
    >
      {NAV_ITEMS.map((item) => (
        <DockItem key={item.id} item={item} mouseY={mouseY} isActive={activeSection === item.id} onNavigate={onNavigate} />
      ))}
    </nav>
  );
}

export { NAV_ITEMS };
