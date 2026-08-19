import React from 'react';
import { Code, Lock, Sparkles } from 'lucide-react';
import Reveal, { RevealGroup, revealItem } from './motion/Reveal';
import { motion } from 'framer-motion';

const phases = [
  {
    mark: '01',
    label: 'Building Software',
    quote: '“I started by learning how to build software.”',
    body: 'Understanding computer science foundations, writing clean code, and discovering how frontend clients talk to backend servers and cloud databases — the plumbing that everything else sits on top of.'
  },
  {
    mark: '02',
    label: 'Discovering Intelligence',
    quote: '“Then I became fascinated by how software could become intelligent.”',
    body: 'Exploring machine learning, computer vision, and language models that move software beyond rigid rules into something that adapts to input it has never seen before.'
  },
  {
    mark: '03',
    label: 'Enforcing Boundaries & Trust',
    quote: '“Now I’m interested in how intelligent systems can become reliable, secure, and useful.”',
    body: 'Recognizing that an AI agent without deterministic authorization boundaries can become a liability the moment it can act, not just answer — and building the guardrails that keep capability from becoming risk.'
  }
];

const traits = [
  { title: 'Systems over assignments', desc: 'Curiosity about how things work under the hood, past what a course requires.', icon: Code },
  { title: 'Security & trustworthy AI', desc: 'Enforcing boundaries so AI can be useful without being unaccountable.', icon: Lock },
  { title: 'Continuous improvement', desc: 'High learning velocity and a refusal to stay comfortable with "good enough".', icon: Sparkles },
];

export default function AboutConcept() {
  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <Reveal>
          <span className="block text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">
            Engineering Thesis
          </span>
          <h2 className="font-heading font-light text-3xl sm:text-5xl text-[var(--color-ink)] mb-16 max-w-2xl leading-tight">
            Who Sujal is, told as a trajectory — not a résumé.
          </h2>
        </Reveal>

        <div className="space-y-16 md:space-y-20">
          {phases.map((phase, idx) => (
            <Reveal key={phase.mark} delay={idx * 0.05}>
              <div className="grid grid-cols-[auto_1fr] gap-6 md:gap-10">
                <span className="font-heading text-3xl md:text-4xl font-light text-[var(--color-ink-faint)] pt-1">
                  {phase.mark}
                </span>
                <div className="border-l border-[var(--color-line)] pl-6 md:pl-10">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--color-ink-faint)] block mb-2">
                    {phase.label}
                  </span>
                  <p className="font-heading italic text-xl md:text-2xl text-[var(--color-ink)] mb-4 leading-snug">
                    {phase.quote}
                  </p>
                  <p className="text-[var(--color-ink-dim)] leading-relaxed max-w-2xl">
                    {phase.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <RevealGroup className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-24 pt-16 border-t border-[var(--color-line)]">
          {traits.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} variants={revealItem} className="lab-panel lab-panel-hover rounded-2xl p-6">
                <Icon className="w-4 h-4 text-[var(--color-accent)] mb-4" />
                <h3 className="text-sm font-medium text-[var(--color-ink)] mb-2">{item.title}</h3>
                <p className="text-xs text-[var(--color-ink-faint)] leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
