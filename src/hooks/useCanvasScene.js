import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Shared lifecycle for the portfolio's lightweight Canvas2D "WebGL-style"
 * scenes (Hero network, Skill Evolution graph, AI Security boundary, Research
 * knowledge map). Handles: sizing, mouse tracking, mounting only while the
 * section is on screen, pausing off-screen, cleaning up on unmount, and
 * degrading to a single static frame under prefers-reduced-motion or on
 * small/low-power viewports.
 *
 * @param {React.RefObject<HTMLCanvasElement>} canvasRef
 * @param {(ctx: CanvasRenderingContext2D, meta: { width: number, height: number, isCompact: boolean }) => { render: (mouse: {x:number,y:number}, t: number) => void, destroy?: () => void }} sceneFactory
 * @param {Array} deps - re-init the scene when these change (e.g. active epoch index)
 */
export function useCanvasScene(canvasRef, sceneFactory, deps = []) {
  const reducedMotion = usePrefersReducedMotion();
  const containerVisible = useRef(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width, height, isCompact;
    let scene;
    let frameId;
    let running = false;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      isCompact = width < 768;
      scene?.destroy?.();
      scene = sceneFactory(ctx, { width, height, isCompact });
      if (reducedMotion) {
        scene.render(mouse, 0);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    const loop = (t) => {
      if (!running) return;
      scene.render(mouse, t);
      frameId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reducedMotion) return;
      running = true;
      frameId = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      if (frameId) cancelAnimationFrame(frameId);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        containerVisible.current = entry.isIntersecting;
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      scene?.destroy?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, ...deps]);
}
