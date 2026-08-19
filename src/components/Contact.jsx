import React, { useState } from 'react';
import { Copy, Check, Send, MapPin, Clock } from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';
import { sound } from '../utils/sound';
import Reveal from './motion/Reveal';

const PRIMARY_EMAIL = 'warke.sujal281106@gmail.com';
const EDU_EMAIL = '2024.sujalw@isu.ac.in';
const PHONE = '+91 8169613561';

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = (email) => {
    sound.playSuccess();
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playSuccess();
    const subject = encodeURIComponent(`Portfolio inquiry from ${formData.name || 'a visitor'}`);
    const body = encodeURIComponent(`${formData.message}\n\n— ${formData.name} (${formData.email})`);
    window.location.href = `mailto:${PRIMARY_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative py-28 md:py-36 border-t border-[var(--color-line)]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <Reveal>
          <span className="block text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">
            Final Chapter
          </span>
          <h2 className="font-heading font-light text-3xl sm:text-5xl text-[var(--color-ink)] mb-4 max-w-xl leading-tight">
            Let's build something worth remembering.
          </h2>
          <p className="text-[var(--color-ink-faint)] text-sm max-w-lg mb-16">
            Open to engineering internships, research collaborations, and interesting problems in general.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Reveal direction="left">
            <div className="space-y-3 mb-8">
              {[
                { label: 'Personal Email', value: PRIMARY_EMAIL },
                { label: 'University Email', value: EDU_EMAIL },
              ].map((row) => (
                <div key={row.value} className="flex items-center justify-between gap-3 p-4 rounded-2xl border border-[var(--color-line)]">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-ink-faint)] block">{row.label}</span>
                    <span className="text-sm text-[var(--color-ink)]">{row.value}</span>
                  </div>
                  <button
                    onClick={() => handleCopyEmail(row.value)}
                    aria-label={`Copy ${row.label}`}
                    className="p-2 rounded-full border border-[var(--color-line)] text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] transition-colors shrink-0"
                  >
                    {copiedEmail === row.value ? <Check className="w-3.5 h-3.5 text-[var(--color-accent)]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs font-mono text-[var(--color-ink-faint)] mb-8">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" /> {PHONE}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> Mumbai, Maharashtra, India (IST)
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com/sujalwarke28"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 rounded-full border border-[var(--color-line)] text-[var(--color-ink-dim)] hover:text-[var(--color-ink)] hover:border-[var(--color-line-strong)] text-xs font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a
                href="https://linkedin.com/in/sujalwarke"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 rounded-full border border-[var(--color-line)] text-[var(--color-ink-dim)] hover:text-[var(--color-ink)] hover:border-[var(--color-line-strong)] text-xs font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </Reveal>

          <Reveal direction="right">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-mono text-[var(--color-ink-faint)] mb-1.5">Your name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--color-canvas-raised)] border border-[var(--color-line)] text-[var(--color-ink)] text-sm outline-none focus:border-[var(--color-accent)] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs font-mono text-[var(--color-ink-faint)] mb-1.5">Your email</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--color-canvas-raised)] border border-[var(--color-line)] text-[var(--color-ink)] text-sm outline-none focus:border-[var(--color-accent)] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-xs font-mono text-[var(--color-ink-faint)] mb-1.5">Message</label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--color-canvas-raised)] border border-[var(--color-line)] text-[var(--color-ink)] text-sm outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[var(--color-accent)] text-[#0a0a0a] font-medium text-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Open in your email app
              </button>
              <p className="text-[10px] text-[var(--color-ink-faint)] text-center">
                Opens a pre-filled email to {PRIMARY_EMAIL} — nothing is stored on this site.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
