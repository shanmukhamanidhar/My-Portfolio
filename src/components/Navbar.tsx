import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFx } from '../utils/sound';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  openCommandPalette: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  activeSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'projects', label: 'WORK' },
    { id: 'about', label: 'ABOUT' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'education', label: 'EDUCATION' },
    { id: 'skills', label: 'LAB' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (id: string) => {
    soundFx.playClick(500, 0.03);
    setMobileMenuOpen(false);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const toggleTheme = () => {
    soundFx.playToggle();
    setDarkMode(!darkMode);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#080808]/95 backdrop-blur-md border-b border-white/[0.08] py-4'
            : 'bg-transparent border-b border-transparent py-6 sm:py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* LEFT: Minimal Personal Identity (Typography-based) */}
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('top');
              }}
              className="group flex flex-col text-left select-none"
            >
              <div className="font-display font-extrabold text-sm sm:text-base tracking-tighter text-[#F5F5F5] uppercase leading-[1.05] group-hover:text-white transition-colors">
                <span>SHANMUKHA</span><br />
                <span className="text-neutral-400 group-hover:text-white transition-colors">MANIDHAR</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1 font-mono text-[9.5px] sm:text-[10px] text-[#A0A0A0] tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse"></span>
                <span>SOFTWARE / AI</span>
              </div>
            </a>

            {/* CENTER: Minimal Floating Navigation with Generous Spacing */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-10 font-mono text-xs uppercase tracking-widest">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="group relative py-1 text-[#A0A0A0] hover:text-[#F5F5F5] transition-colors"
                  >
                    <span className={`transition-colors ${isActive ? 'text-[#F5F5F5] font-semibold' : ''}`}>
                      {item.label}
                    </span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#FF6A00]"></span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* RIGHT: GitHub, LinkedIn, ☼ Theme Symbol, LET'S TALK ↗ */}
            <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs">
              {/* GitHub Link */}
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-block text-[#A0A0A0] hover:text-[#F5F5F5] tracking-wider transition-colors"
              >
                GitHub
              </a>

              {/* LinkedIn Link */}
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-block text-[#A0A0A0] hover:text-[#F5F5F5] tracking-wider transition-colors"
              >
                LinkedIn
              </a>

              {/* Highly Noticeable Editorial Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-mono transition-all duration-200 ${
                  darkMode 
                    ? 'border-[#FF6A00]/70 bg-[#161616] text-[#F5F5F5] hover:border-[#FF6A00] hover:bg-[#222222] shadow-[0_0_15px_rgba(255,106,0,0.18)]' 
                    : 'border-[#FF6A00]/70 bg-white text-[#121212] hover:border-[#FF6A00] hover:bg-neutral-50 shadow-sm'
                }`}
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle Theme"
              >
                <span className="text-[#FF6A00] text-sm font-bold">{darkMode ? '☼' : '☾'}</span>
                <span className="font-bold tracking-wider text-[11px] uppercase text-[#F5F5F5] light:text-[#121212]">
                  {darkMode ? 'LIGHT' : 'DARK'}
                </span>
              </button>

              {/* Minimal Text Link: LET'S TALK ↗ with small orange indicator */}
              <button
                onClick={() => handleNavClick('contact')}
                className="group relative inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-[#F5F5F5] hover:text-white transition-colors"
              >
                <span>LET'S TALK</span>
                <span className="text-[#FF6A00] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
                <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-[#FF6A00] group-hover:w-full transition-all duration-300"></span>
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-[#A0A0A0] hover:text-white p-1"
                aria-label="Toggle Mobile Menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden bg-[#080808]/98 backdrop-blur-xl pt-28 px-6 border-b border-white/[0.08] animate-fade-in flex flex-col justify-between pb-10">
          <div className="space-y-4">
            <div className="text-[10px] font-mono text-[#A0A0A0] uppercase tracking-widest pb-3 border-b border-white/[0.08]">
              NAVIGATION INDEX
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="w-full text-left py-3 border-b border-white/[0.05] flex items-center justify-between text-lg font-display uppercase tracking-tight text-[#F5F5F5] hover:text-[#FF6A00] transition-colors"
              >
                <span>{item.label}</span>
                <span className="text-[#FF6A00] text-xs font-mono">↗</span>
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-white/[0.08] space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between text-[#A0A0A0]">
              <div className="flex items-center gap-5">
                <a href={PERSONAL_INFO.githubUrl} target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
                <a href={PERSONAL_INFO.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
              </div>
              <button 
                onClick={toggleTheme} 
                className="px-2.5 py-1 rounded border border-[#FF6A00]/50 bg-[#161616] text-[#F5F5F5] text-xs flex items-center gap-1.5"
              >
                <span className="text-[#FF6A00] font-bold">{darkMode ? '☼' : '☾'}</span>
                <span>{darkMode ? 'LIGHT' : 'DARK'}</span>
              </button>
            </div>

            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-3.5 border border-[#FF6A00]/40 text-[#FF6A00] hover:bg-[#FF6A00] hover:text-white font-mono uppercase tracking-wider text-center transition-all duration-200"
            >
              LET'S TALK ↗
            </button>
          </div>
        </div>
      )}
    </>
  );
};
