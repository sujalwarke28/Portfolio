import React, { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const GLYPHS = '#%&+=*ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * Cycles random glyphs before settling into the real text, once, the first
 * time it scrolls into view. Immediate/final text under reduced-motion.
 */
export default function ScrambleText({ text, as: Tag = 'span', className = '', speed = 28, ...rest }) {
  const reducedMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState(reducedMotion ? text : '');
  const ref = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(text);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          runScramble();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    let frame = 0;
    let rafId;
    const runScramble = () => {
      const totalFrames = Math.round(text.length * (60 / speed));
      const step = () => {
        frame++;
        const revealCount = Math.floor((frame / totalFrames) * text.length);
        let out = '';
        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ' || text[i] === '\n') { out += text[i]; continue; }
          out += i < revealCount ? text[i] : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setDisplay(out);
        if (frame < totalFrames) rafId = requestAnimationFrame(step);
        else setDisplay(text);
      };
      rafId = requestAnimationFrame(step);
    };

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, text]);

  return (
    <Tag ref={ref} className={className} aria-label={text} {...rest}>
      <span aria-hidden="true">{display}</span>
    </Tag>
  );
}
