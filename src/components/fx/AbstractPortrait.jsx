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
 * Faint watermark motifs keyed by source — not likenesses of anyone, just an
 * abstract visual echo of the world each figure comes from (a chart for
 * Billions, a spark for Marvel, a key for White Collar...).
 */
function Motif({ source }) {
  switch (source) {
    case 'Marvel':
      return <path d="M50 14 L58 42 L82 42 L61 58 L69 86 L50 68 L31 86 L39 58 L18 42 L42 42 Z" />;
    case 'Suits':
      return <path d="M50 16 L62 30 L50 50 L38 30 Z M42 50 L58 50 L64 84 L36 84 Z" />;
    case 'Billions':
      return <path d="M18 70 L34 52 L46 62 L82 22 M82 22 L64 22 M82 22 L82 40" fill="none" strokeWidth="4" stroke="currentColor" />;
    case 'Peaky Blinders':
      return <path d="M14 56 Q50 22 86 56 Q50 44 14 56 Z" />;
    case 'The Mentalist':
      return <path d="M12 50 Q50 20 88 50 Q50 80 12 50 Z M50 50 m-13 0 a13 13 0 1 0 26 0 a13 13 0 1 0 -26 0" />;
    case 'White Collar':
      return <path d="M34 50 m-18 0 a18 18 0 1 0 36 0 a18 18 0 1 0 -36 0 M52 50 L88 50 M74 50 L74 64 M84 50 L84 60" fill="none" strokeWidth="4" stroke="currentColor" />;
    case 'Real World':
      return <path d="M50 12 L58 42 L88 50 L58 58 L50 88 L42 58 L12 50 L42 42 Z" />;
    default:
      return null;
  }
}

/**
 * A generative, non-photographic "portrait" seeded from a name — a small
 * constellation of translucent forms, a faint source-world motif, plus
 * initials. Deliberately abstract: no likenesses, no copyrighted character
 * art, just a distinct mark per person that stays consistent across renders.
 */
export default function AbstractPortrait({ name, source, tone = 'accent', size = 120, className = '' }) {
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
      <g fill={color} opacity="0.16" color={color}>
        <Motif source={source} />
      </g>
      <circle cx="50" cy="50" r="49" fill="none" stroke={color} strokeOpacity="0.35" strokeWidth="1" />
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fontFamily="Fraunces, serif"
        fontStyle="italic"
        fontSize="30"
        fill="var(--color-instrument-ink)"
        opacity="0.92"
      >
        {initials}
      </text>
    </svg>
  );
}
