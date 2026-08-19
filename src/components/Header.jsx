import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Command, Menu, X, Terminal } from 'lucide-react';
import { sound } from '../utils/sound';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Evolution', href: '#evolution' },
  { name: 'Work', href: '#projects' },
  { name: 'Security', href: '#ai-security' },
  { name: 'Research', href: '#research' },
  { name: 'Influences', href: '#influences' },
  { name: 'Contact', href: '#contact' },
];

export default function Header({ onOpenCommandPalette, isMuted, setIsMuted, activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    sound.playClick();
    setMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`flex items-center justify-between gap-6 rounded-full border transition-colors duration-500 ${
          scrolled
            ? 'w-full max-w-3xl px-3 py-2 bg-[#0c0d0f]/90 border-[var(--color-line-strong)] backdrop-blur-xl shadow-2xl'
            : 'w-full max-w-6xl px-5 py-3 bg-transparent border-transparent'
        }`}
      >
        {/* Identity */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
          className="flex items-center gap-2.5 shrink-0 group"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] group-hover:scale-125 transition-transform" />
          <span className="font-heading font-medium text-sm tracking-wide text-[var(--color-ink)]">
            Sujal Warke
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 mx-auto">
          {navLinks.map((link) => {
            const id = link.href.replace('#', '');
            const isActive = activeSection === id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="relative px-3.5 py-1.5 text-xs font-mono tracking-wide transition-colors"
              >
                <span className={isActive ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink-faint)] hover:text-[var(--color-ink-dim)]'}>
                  {link.name}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute left-3.5 right-3.5 -bottom-0.5 h-px bg-[var(--color-accent)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => { sound.playClick(); onOpenCommandPalette(); }}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-[var(--color-line)] text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] hover:border-[var(--color-line-strong)] text-[11px] font-mono transition-colors"
            aria-label="Open command palette"
            title="Command Palette (Cmd + K)"
          >
            <Command className="w-3.5 h-3.5" />
            <span>⌘K</span>
          </button>

          <button
            onClick={() => handleNavClick('#terminal')}
            className="p-2 rounded-full border border-[var(--color-line)] text-[var(--color-ink-faint)] hover:text-[var(--color-accent)] hover:border-[var(--color-line-strong)] transition-colors"
            aria-label="Jump to terminal"
            title="Terminal"
          >
            <Terminal className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleToggleSound}
            className="p-2 rounded-full border border-[var(--color-line)] text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] hover:border-[var(--color-line-strong)] transition-colors"
            aria-label={isMuted ? 'Unmute interface sound' : 'Mute interface sound'}
            title={isMuted ? 'Unmute sound' : 'Mute sound'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="lg:hidden p-2 rounded-full border border-[var(--color-line)] text-[var(--color-ink)]"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden absolute top-20 left-4 right-4 rounded-3xl border border-[var(--color-line-strong)] bg-[#0c0d0f]/95 backdrop-blur-xl p-3 shadow-2xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="block px-4 py-3 rounded-2xl text-sm font-mono text-[var(--color-ink-dim)] hover:text-[var(--color-ink)] hover:bg-white/5"
              >
                {link.name}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
