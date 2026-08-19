import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutConcept from './components/AboutConcept';
import SkillEvolution from './components/SkillEvolution';
import AISecuritySpectrum from './components/AISecuritySpectrum';
import Projects from './components/Projects';
import ResearchHub from './components/ResearchHub';
import PrinciplesMatrix from './components/PrinciplesMatrix';
import ResumeSection from './components/ResumeSection';
import GitActivity from './components/GitActivity';
import TerminalShell from './components/TerminalShell';
import ProjectEstimator from './components/ProjectEstimator';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';

export default function App() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Custom Event Listener for Cmd+K trigger
  useEffect(() => {
    const handleOpen = () => setCommandPaletteOpen(true);
    document.addEventListener('open-command-palette', handleOpen);
    return () => document.removeEventListener('open-command-palette', handleOpen);
  }, []);

  // Intersection Observer for Active Section Highlighting
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => sections.forEach((sec) => observer.unobserve(sec));
  }, []);

  return (
    <div className="min-h-screen bg-[#08090a] text-slate-100 relative">
      
      {/* Top Navbar */}
      <Header 
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        activeSection={activeSection}
      />

      {/* Main Narrative & Engineering Lab Sections */}
      <main>
        <Hero />
        <AboutConcept />
        <SkillEvolution />
        <AISecuritySpectrum />
        <Projects />
        <ResearchHub />
        <PrinciplesMatrix />
        <ResumeSection />
        <GitActivity />
        <TerminalShell />
        <ProjectEstimator />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Command Palette Spotlight Launcher */}
      <CommandPalette 
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

    </div>
  );
}
