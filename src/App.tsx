import React, { useState, useEffect } from 'react';
import type { Project } from './types';
import { PROJECTS } from './data/portfolioData';
import { soundFx } from './utils/sound';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ProjectsSection } from './components/ProjectsSection';
import { TechStack } from './components/TechStack';
import { JourneyTimeline } from './components/JourneyTimeline';
import { Achievements } from './components/Achievements';
import { CodeCraftsmanship } from './components/CodeCraftsmanship';
import { Education } from './components/Education';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { CommandPalette } from './components/CommandPalette';
import { WorkspaceTelemetryDrawer } from './components/WorkspaceTelemetryDrawer';

export const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('portfolio_theme');
    if (saved) return saved === 'dark';
    return true; // Dark mode by default
  });
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Sync dark mode class on root HTML element
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.remove('light');
      root.classList.add('dark');
      localStorage.setItem('portfolio_theme', 'dark');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#080808');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('portfolio_theme', 'light');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#FFFFFF');
    }
  }, [darkMode]);

  // Deep-link Hash listener (e.g. #satqueryai, #studyplanner, #typerush)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const match = PROJECTS.find(p => p.id.toLowerCase() === hash);
      if (match) {
        setSelectedProject(match);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Update hash when modal opens/closes
  const handleOpenCaseStudy = (proj: Project) => {
    setSelectedProject(proj);
    window.location.hash = proj.id;
  };

  const handleCloseCaseStudy = () => {
    setSelectedProject(null);
    if (window.location.hash) {
      history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  };

  // Section Observer for active scroll spy
  useEffect(() => {
    const sections = ['top', 'about', 'projects', 'skills', 'experience', 'education', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut for Command Palette
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen(prev => !prev);
        soundFx.playClick(750, 0.03);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const scrollToWork = () => {
    const el = document.getElementById('projects');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen selection:bg-accent selection:text-white transition-colors duration-300">
      {/* Navbar Header */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        openCommandPalette={() => setCmdOpen(true)}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        activeSection={activeSection}
      />

      {/* Main Content Area */}
      <main>
        {/* Editorial Hero */}
        <Hero
          onViewWork={scrollToWork}
          onContact={scrollToContact}
          onOpenCmd={() => setCmdOpen(true)}
        />

        {/* 01 / Editorial About */}
        <About />

        {/* Selected Work & Case Studies */}
        <ProjectsSection onOpenCaseStudy={handleOpenCaseStudy} />

        {/* Engineering Stack Organized by Purpose */}
        <TechStack />

        {/* Development Journey & Chronological Log */}
        <JourneyTimeline />

        {/* Verified Technical Achievements */}
        <Achievements />

        {/* Code Craftsmanship, GitHub Repos & Source Inspector */}
        <CodeCraftsmanship />

        {/* 06 // Compact Education Section */}
        <Education />

        {/* Minimal Terminal Contact Section */}
        <ContactSection />
      </main>

      {/* Architectural Minimal Footer */}
      <Footer />

      {/* Deep-Dive 8-Point Project Case Study Modal */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={handleCloseCaseStudy}
          onSelectProject={handleOpenCaseStudy}
          allProjects={PROJECTS}
        />
      )}

      {/* Global Command Palette [Ctrl+K / ⌘K] */}
      <CommandPalette
        isOpen={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onSelectProject={handleOpenCaseStudy}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Floating Workspace Telemetry Drawer */}
      <WorkspaceTelemetryDrawer
        activeSection={activeSection}
        onOpenCmd={() => setCmdOpen(true)}
      />
    </div>
  );
};

export default App;
