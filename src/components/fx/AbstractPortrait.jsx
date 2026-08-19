import React, { useMemo } from 'react';

function hashSeed(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

function initialsOf(name) {
  const words = name.replace(/[().]/g, '').split(' ').filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

/**
 * A generative, non-photographic "portrait" seeded from a name — a small
 * constellation of translucent forms plus initials. Deliberately abstract:
 * no likenesses, no copyrighted character art, just a distinct mark per
 * person that stays consistent across renders.
 */
export default function AbstractPortrait({ name, tone = 'accent', size = 120, className = '' }) {
  const shapes = useMemo(() => {
    const rand = hashSeed(name);
    const count = 3 + Math.floor(rand() * 2);
    return Array.from({ length: count }, () => ({
      cx: 20 + rand() * 60,
      cy: 20 + rand() * 60,
      r: 14 + rand() * 22,
      opacity: 0.12 + rand() * 0.18,
      rotate: rand() * 360,
    }));
  }, [name]);

  const color = tone === 'signal' ? 'var(--color-signal-soft)' : 'var(--color-accent)';
  const initials = initialsOf(name);

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={`Abstract mark for ${name}`}
    >
      <circle cx="50" cy="50" r="49" fill="var(--color-canvas-deep)" />
      {shapes.map((s, i) => (
        <ellipse
          key={i}
          cx={s.cx}
          cy={s.cy}
          rx={s.r}
          ry={s.r * 0.7}
          fill={color}
          opacity={s.opacity}
          transform={`rotate(${s.rotate} ${s.cx} ${s.cy})`}
        />
      ))}
      <circle cx="50" cy="50" r="49" fill="none" stroke={color} strokeOpacity="0.35" strokeWidth="1" />
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fontFamily="Fraunces, serif"
        fontStyle="italic"
        fontSize="30"
        fill="var(--color-ink)"
        opacity="0.92"
      >
        {initials}
      </text>
    </svg>
  );
}
