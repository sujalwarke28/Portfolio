import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useFinePointer } from '../../hooks/useFinePointer';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * A button that pulls toward the cursor within `radius` px, and snaps back
 * on leave. Renders as a plain button on touch/reduced-motion — the pull is
 * pure flourish, never load-bearing for the click itself.
 */
export default function MagneticButton({ children, className = '', radius = 80, strength = 0.35, as: Tag = 'button', ...rest }) {
  const isFinePointer = useFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 16, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 16, mass: 0.4 });

  if (!isFinePointer || reducedMotion) {
    const Plain = Tag;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist < radius) {
      x.set(dx * strength);
      y.set(dy * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionTag = motion[Tag] || motion.button;

  return (
    <MotionTag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
