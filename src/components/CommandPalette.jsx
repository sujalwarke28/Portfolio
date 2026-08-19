import React, { useState, useEffect } from 'react';
import { Search, Command, Globe, Layers, FolderGit2, Terminal, Mail, Sliders, Volume2, VolumeX, X, FileText, Compass, GitBranch, ShieldCheck, Brain, Award } from 'lucide-react';
import { sound } from '../utils/sound';

export default function CommandPalette({ isOpen, onClose, isMuted, setIsMuted }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        sound.playClick();
        if (isOpen) onClose();
        else {
          // Open
          document.dispatchEvent(new CustomEvent('open-command-palette'));
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { label: 'Jump to Overview Header', icon: Globe, action: () => scrollToSection('#hero') },
    { label: 'Jump to Engineering Thesis', icon: Compass, action: () => scrollToSection('#about') },
    { label: 'Jump to 7-Epoch Skill Evolution', icon: GitBranch, action: () => scrollToSection('#evolution') },
    { label: 'Jump to AI Security Spectrum', icon: ShieldCheck, action: () => scrollToSection('#ai-security') },
    { label: 'Jump to Deep Case Studies', icon: Layers, action: () => scrollToSection('#projects') },
    { label: 'Jump to Questions I\'m Chasing', icon: Brain, action: () => scrollToSection('#research') },
    { label: 'Jump to Principles & Influences', icon: Award, action: () => scrollToSection('#principles') },
    { label: 'Jump to Resume & Credentials', icon: FileText, action: () => scrollToSection('#resume') },
    { label: 'Jump to CLI Terminal Lab', icon: Terminal, action: () => scrollToSection('#terminal') },
    { label: 'Jump to Direct Contact Channels', icon: Mail, action: () => scrollToSection('#contact') },
    { 
      label: isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects', 
      icon: isMuted ? VolumeX : Volume2, 
      action: () => { const m = sound.toggleMute(); setIsMuted(m); } 
    },
  ];

  const scrollToSection = (href) => {
    sound.playClick();
    onClose();
    const elem = document.querySelector(href);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const filtered = actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel max-w-xl w-full rounded-3xl border border-cyan-500/40 shadow-2xl overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to section..."
            className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder-slate-500 font-sans text-sm"
            autoFocus
          />
          <button onClick={onClose} className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Options List */}
        <div className="p-2 max-h-[320px] overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500 font-mono">No matching commands found</div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={item.action}
                  onMouseEnter={() => sound.playHover()}
                  className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-900/80 text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-slate-900 text-cyan-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300">{item.label}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">Jump ↵</span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#090d16] p-3 border-t border-slate-800 text-[11px] font-mono text-slate-500 flex items-center justify-between">
          <span>Press ESC to close</span>
          <span>Cmd + K Shortcut</span>
        </div>
      </div>
    </div>
  );
}
