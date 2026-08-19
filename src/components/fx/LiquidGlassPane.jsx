import React, { useEffect, useId, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * A frosted glass surface with a slow, liquid-looking refraction, built from
 * a native SVG displacement filter — no images, no WebGL, no dependencies.
 * Static (still refracted, just not animating) under reduced-motion.
 */
export default function LiquidGlassPane({ children, className = '', intensity = 18, style, ...rest }) {
  const filterId = useId().replace(/:/g, '');
  const turbulenceRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const node = turbulenceRef.current;
    if (!node) return;
    let t = 0;
    let frameId;
    const animate = () => {
      t += 0.0025;
      const fx = 0.008 + Math.sin(t) * 0.003;
      const fy = 0.012 + Math.cos(t * 0.8) * 0.004;
      node.setAttribute('baseFrequency', `${fx} ${fy}`);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [reducedMotion]);

  return (
    <div className={`relative ${className}`} style={{ ...style, filter: `url(#${filterId})` }} {...rest}>
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id={filterId}>
          <feTurbulence ref={turbulenceRef} type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={intensity} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div className="absolute inset-0 rounded-[inherit] bg-white/[0.04] backdrop-blur-xl border border-white/10" />
      <div className="relative">{children}</div>
    </div>
  );
}
