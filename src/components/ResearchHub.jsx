import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Brain } from 'lucide-react';
import { researchQuestions } from '../data/portfolioData';
import { sound } from '../utils/sound';
import { useCanvasScene } from '../hooks/useCanvasScene';
import Reveal from './motion/Reveal';

function createKnowledgeMapScene(ctx, { width, height, isCompact }) {
  const count = isCompact ? 16 : 34;
  const nodes = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.15,
  }));

  return {
    render() {
      ctx.clearRect(0, 0, width, height);
      nodes.forEach((n, i) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(139, 150, 166, 0.4)';
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const o = nodes[j];
          const d = Math.hypot(o.x - n.x, o.y - n.y);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(o.x, o.y);
            ctx.strokeStyle = `rgba(139, 150, 166, ${(1 - d / 110) * 0.1})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });
    },
    destroy() {}
  };
}

export default function ResearchHub() {
  const canvasRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const sceneFactory = useCallback((ctx, meta) => createKnowledgeMapScene(ctx, meta), []);
  useCanvasScene(canvasRef, sceneFactory);

  const scrollToIndex = (idx) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[idx];
    card?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
  };

  const handlePrev = () => {
    sound.playClick();
    setActiveIndex((i) => Math.max(0, i - 1));
  };
  const handleNext = () => {
    sound.playClick();
    setActiveIndex((i) => Math.min(researchQuestions.length - 1, i + 1));
  };

  const prevActiveIndexRef = useRef(activeIndex);
  useEffect(() => {
    if (prevActiveIndexRef.current !== activeIndex) {
      scrollToIndex(activeIndex);
    }
    prevActiveIndexRef.current = activeIndex;
  }, [activeIndex]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); handleNext(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); handlePrev(); }
  };

  return (
    <section id="research" className="relative py-28 md:py-36 border-t border-[var(--color-line)] overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <Reveal>
          <span className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-signal-soft)] mb-4">
            <Brain className="w-3.5 h-3.5" /> Questions I'm Chasing
          </span>
          <h2 className="font-heading font-light text-3xl sm:text-5xl text-[var(--color-ink)] mb-4 max-w-2xl leading-tight">
            I don't have all the answers yet.
          </h2>
          <p className="text-[var(--color-ink-faint)] text-sm max-w-xl mb-12">
            Active inquiries, not settled conclusions — framed as working hypotheses I'm testing against my own projects.
          </p>
        </Reveal>

        <div
          ref={trackRef}
          role="region"
          aria-label="Research questions carousel"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 focus:outline-none"
        >
          {researchQuestions.map((q, idx) => (
            <article
              key={q.id}
              className="snap-start shrink-0 w-[85%] sm:w-[60%] lg:w-[46%] lab-panel rounded-3xl p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-signal-soft)] px-2.5 py-1 rounded-full border border-[var(--color-line)]">
                    {q.area}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--color-ink-faint)]">0{idx + 1}</span>
                </div>
                <h3 className="font-heading text-xl text-[var(--color-ink)] mb-5 leading-snug">
                  {q.question}
                </h3>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-ink-faint)] block mb-2">
                  Working Hypothesis
                </span>
                <p className="text-xs text-[var(--color-ink-dim)] leading-relaxed">{q.hypothesis}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="flex items-center justify-between mt-8">
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Research question navigation">
            {researchQuestions.map((q, idx) => (
              <button
                key={q.id}
                role="tab"
                aria-selected={activeIndex === idx}
                aria-label={`Show question ${idx + 1}`}
                onClick={() => { sound.playClick(); setActiveIndex(idx); }}
                className={`h-1.5 rounded-full transition-all ${
                  activeIndex === idx ? 'w-6 bg-[var(--color-accent)]' : 'w-1.5 bg-[var(--color-line-strong)]'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              aria-label="Previous question"
              className="p-2.5 rounded-full border border-[var(--color-line)] text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] disabled:opacity-30 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === researchQuestions.length - 1}
              aria-label="Next question"
              className="p-2.5 rounded-full border border-[var(--color-line)] text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] disabled:opacity-30 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
