import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SkillsGalaxy from './components/SkillsGalaxy';
import SoftwareGuyLife from './components/SoftwareGuyLife';
import ResumeSection from './components/ResumeSection';
import Projects from './components/Projects';
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
      { threshold: 0.3 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => sections.forEach((sec) => observer.unobserve(sec));
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 relative">
      
      {/* Top Navbar */}
      <Header 
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        activeSection={activeSection}
      />

      {/* Main Sections */}
      <main>
        <Hero />
        <SkillsGalaxy />
        <SoftwareGuyLife />
        <ResumeSection />
        <Projects />
        <GitActivity />
        <TerminalShell />
        <ProjectEstimator />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Command Palette Spotlight */}
      <CommandPalette 
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

    </div>
  );
}
