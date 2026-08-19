import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutConcept from './components/AboutConcept';
import SkillEvolution from './components/SkillEvolution';
import Projects from './components/Projects';
import AISecuritySpectrum from './components/AISecuritySpectrum';
import ResearchHub from './components/ResearchHub';
import Influences from './components/Influences';
import Philosophy from './components/Philosophy';
import ResumeSection from './components/ResumeSection';
import TerminalShell from './components/TerminalShell';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';

export default function App() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleOpen = () => setCommandPaletteOpen(true);
    document.addEventListener('open-command-palette', handleOpen);
    return () => document.removeEventListener('open-command-palette', handleOpen);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.25 }
    );
    sections.forEach((sec) => observer.observe(sec));
    return () => sections.forEach((sec) => observer.unobserve(sec));
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-ink)] relative">
      <Header
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        activeSection={activeSection}
      />

      <main>
        <Hero />
        <AboutConcept />
        <SkillEvolution />
        <Projects />
        <AISecuritySpectrum />
        <ResearchHub />
        <Influences />
        <Philosophy />
        <ResumeSection />
        <TerminalShell />
        <Contact />
      </main>

      <Footer />

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />
    </div>
  );
}
