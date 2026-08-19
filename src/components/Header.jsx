import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Command, Menu, X, Terminal, Sun, Moon } from 'lucide-react';
import { sound } from '../utils/sound';
import LeftDock, { NAV_ITEMS } from './LeftDock';

export default function Header({ onOpenCommandPalette, isMuted, setIsMuted, activeSection, theme, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <>
      {/* Desktop: left-edge dock nav + top-left logo + top-right utility cluster */}
      <LeftDock activeSection={activeSection} onNavigate={handleNavClick} />

      <a
        href="#hero"
        onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
        className="hidden lg:flex fixed top-5 left-6 z-40 items-center gap-2.5 group"
      >
        <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] group-hover:scale-125 transition-transform" />
        <span className="font-heading font-medium text-sm tracking-wide text-[var(--color-ink)]">
          Sujal Warke
        </span>
      </a>

      <div className="hidden lg:flex fixed top-5 right-6 z-40 items-center gap-1.5">
        <button
          onClick={() => { sound.playClick(); onOpenCommandPalette(); }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-canvas)]/70 backdrop-blur-md text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] hover:border-[var(--color-line-strong)] text-[11px] font-mono transition-colors"
          aria-label="Open command palette"
          title="Command Palette (Cmd + K)"
        >
          <Command className="w-3.5 h-3.5" />
          <span>⌘K</span>
        </button>
        <button
          onClick={() => handleNavClick('#terminal')}
          className="p-2 rounded-full border border-[var(--color-line)] bg-[var(--color-canvas)]/70 backdrop-blur-md text-[var(--color-ink-faint)] hover:text-[var(--color-accent)] hover:border-[var(--color-line-strong)] transition-colors"
          aria-label="Jump to terminal"
          title="Terminal"
        >
          <Terminal className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => { sound.playClick(); toggleTheme(); }}
          className="p-2 rounded-full border border-[var(--color-line)] bg-[var(--color-canvas)]/70 backdrop-blur-md text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] hover:border-[var(--color-line-strong)] transition-colors"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={handleToggleSound}
          className="p-2 rounded-full border border-[var(--color-line)] bg-[var(--color-canvas)]/70 backdrop-blur-md text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] hover:border-[var(--color-line-strong)] transition-colors"
          aria-label={isMuted ? 'Unmute interface sound' : 'Mute interface sound'}
          title={isMuted ? 'Unmute sound' : 'Mute sound'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Mobile: compact top bar + drawer */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-[var(--color-canvas)]/80 backdrop-blur-xl border-b border-[var(--color-line)]">
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
          className="flex items-center gap-2.5 group"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
          <span className="font-heading font-medium text-sm tracking-wide text-[var(--color-ink)]">
            Sujal Warke
          </span>
        </a>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => { sound.playClick(); toggleTheme(); }}
            className="p-2 rounded-full border border-[var(--color-line)] text-[var(--color-ink-faint)]"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="p-2 rounded-full border border-[var(--color-line)] text-[var(--color-ink)]"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed top-16 left-4 right-4 z-50 rounded-3xl border border-[var(--color-line-strong)] bg-[#0c0d0f]/95 backdrop-blur-xl p-3 shadow-2xl"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                className="block px-4 py-3 rounded-2xl text-sm font-mono text-[var(--color-ink-dim)] hover:text-[var(--color-ink)] hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center gap-2 mt-2 pt-3 border-t border-[var(--color-line)] px-1">
              <button
                onClick={() => { sound.playClick(); onOpenCommandPalette(); setMobileMenuOpen(false); }}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-[var(--color-line)] text-[var(--color-ink-faint)] text-xs font-mono"
              >
                <Command className="w-3.5 h-3.5" /> ⌘K
              </button>
              <button
                onClick={() => handleNavClick('#terminal')}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-[var(--color-line)] text-[var(--color-ink-faint)] text-xs font-mono"
              >
                <Terminal className="w-3.5 h-3.5" /> Terminal
              </button>
              <button
                onClick={handleToggleSound}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-[var(--color-line)] text-[var(--color-ink-faint)] text-xs font-mono"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />} Sound
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
