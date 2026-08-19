import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, Layers, Terminal, Mail, Volume2, VolumeX, X, FileText, Compass, GitBranch, ShieldCheck, Brain, Users } from 'lucide-react';
import { sound } from '../utils/sound';

export default function CommandPalette({ isOpen, onClose, isMuted, setIsMuted }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        sound.playClick();
        if (isOpen) onClose();
        else document.dispatchEvent(new CustomEvent('open-command-palette'));
      }
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const scrollToSection = (href) => {
    sound.playClick();
    onClose();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const actions = [
    { label: 'Jump to Overview', icon: Globe, action: () => scrollToSection('#hero') },
    { label: 'Jump to Engineering Thesis', icon: Compass, action: () => scrollToSection('#about') },
    { label: 'Jump to Skill Evolution', icon: GitBranch, action: () => scrollToSection('#evolution') },
    { label: 'Jump to Lab Case Studies', icon: Layers, action: () => scrollToSection('#projects') },
    { label: 'Jump to AI Security Spectrum', icon: ShieldCheck, action: () => scrollToSection('#ai-security') },
    { label: "Jump to Questions I'm Chasing", icon: Brain, action: () => scrollToSection('#research') },
    { label: 'Jump to Influences', icon: Users, action: () => scrollToSection('#influences') },
    { label: 'Jump to Résumé & Credentials', icon: FileText, action: () => scrollToSection('#resume') },
    { label: 'Jump to Terminal', icon: Terminal, action: () => scrollToSection('#terminal') },
    { label: 'Jump to Contact', icon: Mail, action: () => scrollToSection('#contact') },
    {
      label: isMuted ? 'Unmute interface sound' : 'Mute interface sound',
      icon: isMuted ? VolumeX : Volume2,
      action: () => { const m = sound.toggleMute(); setIsMuted(m); }
    },
  ];

  const filtered = actions.filter((a) => a.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-overlay max-w-xl w-full rounded-3xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div className="p-4 border-b border-[var(--color-line)] flex items-center gap-3">
              <Search className="w-4 h-4 text-[var(--color-accent)]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a section or run a command..."
                aria-label="Command palette search"
                className="flex-1 bg-transparent border-none outline-none text-[var(--color-ink)] placeholder-[var(--color-ink-faint)] text-sm"
                autoFocus
              />
              <button onClick={onClose} aria-label="Close command palette" className="p-1.5 rounded-full text-[var(--color-ink-faint)] hover:text-[var(--color-ink)]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-2 max-h-[320px] overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="p-6 text-center text-xs text-[var(--color-ink-faint)] font-mono">No matching commands</div>
              ) : (
                filtered.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      onClick={item.action}
                      className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 text-left transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-[var(--color-ink-faint)] group-hover:text-[var(--color-accent)] transition-colors" />
                        <span className="text-xs text-[var(--color-ink-dim)] group-hover:text-[var(--color-ink)]">{item.label}</span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            <div className="px-4 py-3 border-t border-[var(--color-line)] text-[10px] font-mono text-[var(--color-ink-faint)] flex items-center justify-between">
              <span>ESC to close</span>
              <span>⌘K to toggle</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
