import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink, Star } from 'lucide-react';
import { Github } from './SocialIcons';
import { labCaseStudies } from '../data/portfolioData';
import { sound } from '../utils/sound';
import Reveal from './motion/Reveal';
import LivePreviewWindow from './LivePreviewWindow';

const FLOW_FIELDS = [
  { key: 'problem', label: 'Problem' },
  { key: 'whyItMattered', label: 'Why It Mattered' },
  { key: 'approach', label: 'Approach' },
  { key: 'implementation', label: 'Implementation' },
  { key: 'challenges', label: 'Challenges' },
  { key: 'result', label: 'Result' },
  { key: 'whatILearned', label: 'What I Learned' },
];

const HIGHLIGHT_MINUTE = ["12'", "34'", "58'", "76'"];

function ReplayWipe() {
  return (
    <motion.div
      initial={{ x: '-120%' }}
      animate={{ x: '220%' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[var(--color-accent)]/10 to-transparent z-10"
    />
  );
}

function QuickLinks({ study, size = 'sm', onOpenPreview }) {
  const pad = size === 'lg' ? 'px-4 py-2 text-xs' : 'px-3 py-1.5 text-[11px]';
  return (
    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
      {study.demoUrl && (
        <button
          onClick={() => { sound.playClick(); onOpenPreview(study); }}
          className={`inline-flex items-center gap-1.5 rounded-full border border-[var(--color-accent)]/50 text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 font-mono transition-colors ${pad}`}
        >
          <ExternalLink className="w-3.5 h-3.5" /> Live site
        </button>
      )}
      {study.githubUrl && (
        <a
          href={study.githubUrl}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center gap-1.5 rounded-full border border-[var(--color-line)] text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] hover:border-[var(--color-line-strong)] font-mono transition-colors ${pad}`}
        >
          <Github className="w-3.5 h-3.5" /> Source
        </a>
      )}
    </div>
  );
}

function CaseStudy({ study, index, isOpen, onToggle, onOpenPreview }) {
  const [replayKey, setReplayKey] = useState(0);

  const handleToggle = () => {
    if (!isOpen) setReplayKey((k) => k + 1);
    onToggle();
  };

  return (
    <div className="relative border-b border-[var(--color-line)] py-7 overflow-hidden">
      <div
        role="button"
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleToggle(); } }}
        className="w-full flex flex-col sm:flex-row sm:items-start justify-between gap-4 text-left group cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="min-w-0">
          <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[var(--color-ink-faint)] mb-2">
            <span className="text-[var(--color-accent)] font-bold">{HIGHLIGHT_MINUTE[index % HIGHLIGHT_MINUTE.length]}</span>
            {study.category}
            {study.featured && (
              <span className="inline-flex items-center gap-1 text-[var(--color-accent)] border border-[var(--color-accent)]/40 rounded-full px-2 py-0.5 ml-1">
                <Star className="w-2.5 h-2.5 fill-current" /> Flagship
              </span>
            )}
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors mb-2">
            {study.title}
          </h3>
          <p className="text-sm text-[var(--color-ink-faint)] max-w-2xl">{study.tagline}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0 self-start">
          {(study.demoUrl || study.githubUrl) && <QuickLinks study={study} onOpenPreview={onOpenPreview} />}
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="shrink-0 mt-0.5">
            <ChevronDown className="w-5 h-5 text-[var(--color-ink-faint)]" />
          </motion.div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={replayKey}
            initial={{ height: 0, opacity: 0, overflow: 'hidden' }}
            animate={{ height: 'auto', opacity: 1, transitionEnd: { overflow: 'visible' } }}
            exit={{ height: 0, opacity: 0, overflow: 'hidden' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <ReplayWipe />
            <div className="pt-8 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-x-12 gap-y-8">
              <div>
                <p className="text-sm text-[var(--color-ink-dim)] leading-relaxed mb-8 max-w-2xl">{study.summary}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-8">
                  {FLOW_FIELDS.map((f) => (
                    <div key={f.key}>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-ink-faint)] block mb-1.5">
                        {f.label}
                      </span>
                      <p className="text-xs text-[var(--color-ink-dim)] leading-relaxed">{study[f.key]}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {study.highlights.map((h) => (
                    <span key={h} className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-[var(--color-line)] text-[var(--color-ink-faint)]">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:sticky lg:top-24 lg:self-start">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-ink-faint)] block mb-2">
                  Architecture Pipeline
                </span>
                <div className="space-y-1.5 mb-6">
                  {study.architecture.map((step) => (
                    <div key={step} className="text-xs font-mono text-[var(--color-ink-dim)] px-3 py-2 rounded-lg bg-[var(--color-canvas-raised)] border border-[var(--color-line)]">
                      {step}
                    </div>
                  ))}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-ink-faint)] block mb-2">
                  Core Pattern
                </span>
                <pre className="text-[11px] font-mono text-[var(--color-instrument-ink-dim)] p-4 rounded-xl bg-[var(--color-canvas-deep)] border border-[var(--color-line)] overflow-x-auto leading-relaxed">
                  {study.codeSnippet}
                </pre>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Projects() {
  const [openId, setOpenId] = useState(null);
  const [previewStudy, setPreviewStudy] = useState(null);

  const toggle = (id) => {
    sound.playClick();
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section id="projects" className="relative py-28 md:py-36 border-t border-[var(--color-line)]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <Reveal>
          <span className="block text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">
            Match Highlights
          </span>
          <h2 className="font-heading font-light text-3xl sm:text-5xl text-[var(--color-ink)] mb-4 max-w-2xl leading-tight">
            Current & significant engineering work.
          </h2>
          <p className="text-[var(--color-ink-faint)] text-sm max-w-xl mb-8">
            Problem, approach, architecture, and what actually went wrong — not a feature list. Click a highlight to watch the replay.
          </p>
        </Reveal>

        <div>
          {labCaseStudies.map((study, index) => (
            <CaseStudy
              key={study.id}
              study={study}
              index={index}
              isOpen={openId === study.id}
              onToggle={() => toggle(study.id)}
              onOpenPreview={setPreviewStudy}
            />
          ))}
        </div>
      </div>

      <LivePreviewWindow study={previewStudy} onClose={() => setPreviewStudy(null)} />
    </section>
  );
}
