import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Volume2, 
  VolumeX, 
  Command, 
  Menu, 
  X, 
  Sparkles, 
  Code2, 
  Activity,
  Mail
} from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';
import { personalInfo } from '../data/portfolioData';
import { sound } from '../utils/sound';

export default function Header({ onOpenCommandPalette, isMuted, setIsMuted, activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Hero', href: '#hero' },
    { name: 'Skill Galaxy', href: '#skills' },
    { name: 'Engineer Life', href: '#engineer-life' },
    { name: 'Resume', href: '#resume' },
    { name: 'Projects', href: '#projects' },
    { name: 'Git Activity', href: '#git-activity' },
    { name: 'Terminal', href: '#terminal' },
    { name: 'Estimator', href: '#estimator' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href) => {
    sound.playClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick();
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-3 bg-[#030712]/85 backdrop-blur-md border-b border-slate-800/80 shadow-2xl' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
          className="flex items-center gap-3 group"
          onMouseEnter={() => sound.playHover()}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#090d16] rounded-[10.5px] flex items-center justify-center">
              <Code2 className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-lg tracking-wider text-slate-100 group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              {personalInfo.name}
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </span>
            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              {personalInfo.availability.replace('🟢 ', '')}
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                onMouseEnter={() => sound.playHover()}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Action Controls & Widgets */}
        <div className="flex items-center gap-2.5">
          {/* Command Palette Trigger */}
          <button
            onClick={() => { sound.playClick(); onOpenCommandPalette(); }}
            onMouseEnter={() => sound.playHover()}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 text-xs font-mono transition-all group shadow-sm"
            title="Open Command Palette (Cmd + K)"
          >
            <Command className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>Cmd + K</span>
          </button>

          {/* Sound Synthesizer Toggle */}
          <button
            onClick={handleToggleSound}
            onMouseEnter={() => sound.playHover()}
            className={`p-2 rounded-lg border text-xs font-medium transition-all ${
              isMuted
                ? 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
                : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-sm shadow-cyan-500/20 hover:bg-cyan-500/20'
            }`}
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
          </button>

          {/* Hire Me CTA Button */}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
            onMouseEnter={() => sound.playHover()}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-semibold hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hire Engineer</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => { sound.playClick(); setMobileMenuOpen(!mobileMenuOpen); }}
            className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 px-4 pt-3 pb-6 bg-[#090d16]/95 border-b border-slate-800 backdrop-blur-xl animate-in slide-in-from-top-4">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="px-4 py-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs font-medium text-slate-200 hover:text-cyan-400 hover:border-cyan-500/40"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
            <button
              onClick={() => { sound.playClick(); onOpenCommandPalette(); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 text-xs text-cyan-400 font-mono"
            >
              <Command className="w-4 h-4" /> Open Command Palette
            </button>

            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs"
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
