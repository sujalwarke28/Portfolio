import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const DIRECTIONS = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
  none: {}
};

/**
 * Scroll-triggered reveal used across every section instead of ad-hoc
 * animate-in classes. Respects prefers-reduced-motion (renders in place,
 * no transform/opacity animation).
 */
export default function Reveal({
  children,
  as: Component = motion.div,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  className = '',
  once = true,
  amount = 0.3,
  ...rest
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = DIRECTIONS[direction] || {};

  return (
    <Component
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </Component>
  );
}

/**
 * Stagger container — pair with <Reveal as={motion.div} variants={item}> children,
 * or use RevealGroup below for the common list-of-cards case.
 */
export function RevealGroup({ children, className = '', stagger = 0.08, ...rest }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: stagger }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export const revealItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};
