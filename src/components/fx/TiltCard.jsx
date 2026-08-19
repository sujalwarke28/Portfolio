import React, { useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate, useSpring, useTransform } from 'framer-motion';
import { useFinePointer } from '../../hooks/useFinePointer';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * Pointer-driven 3D tilt. Falls back to a plain element (still honoring
 * `as`) on touch or prefers-reduced-motion, so nothing ever depends on it
 * to be usable.
 */
export default function TiltCard({ children, className = '', maxTilt = 10, glare = true, as: Tag = 'div', style: styleProp, ...rest }) {
  const isFinePointer = useFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const ref = useRef(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), { stiffness: 260, damping: 22 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), { stiffness: 260, damping: 22 });
  const glareX = useTransform(px, [0, 1], [0, 100]);
  const glareY = useTransform(py, [0, 1], [0, 100]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(241,239,231,0.08), transparent 60%)`;

  if (!isFinePointer || reducedMotion) {
    return (
      <Tag className={className} style={styleProp} {...rest}>
        {children}
      </Tag>
    );
  }

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };
  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const MotionTag = motion[Tag] || motion.div;

  return (
    <MotionTag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ ...styleProp, rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 800 }}
      className={`relative ${className}`}
      {...rest}
    >
      {children}
      {glare && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{ background: glareBackground }}
        />
      )}
    </MotionTag>
  );
}
