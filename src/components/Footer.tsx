import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFx } from '../utils/sound';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundFx.playClick(600, 0.03);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: "WORK", href: "#projects" },
    { label: "ABOUT", href: "#about" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "EDUCATION", href: "#education" },
    { label: "LAB", href: "#skills" },
    { label: "CONTACT", href: "#contact" }
  ];

  return (
    <footer className="border-t border-white/[0.08] light:border-black/[0.08] py-16 font-mono text-xs text-[#A0A0A0] light:text-[#6B6B6B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-10 border-b border-white/[0.08] light:border-black/[0.08]">
          {/* Identity */}
          <div className="space-y-1">
            <div className="text-sm font-bold text-[#F5F5F5] light:text-[#111111] font-display uppercase tracking-tight">
              {PERSONAL_INFO.name}
            </div>
            <div className="text-[11px] text-[#A0A0A0] light:text-[#6B6B6B] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]"></span>
              <span>SOFTWARE ENGINEERING &amp; AI SYSTEMS</span>
            </div>
          </div>

          {/* Minimal Nav links */}
          <div className="flex flex-wrap items-center gap-6 text-xs uppercase tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#FF6A00] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* External Channels */}
          <div className="flex items-center gap-6 text-xs uppercase tracking-wider">
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#FF6A00] transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#FF6A00] transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        {/* Colophon & Back to Top */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] text-[#666666]">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with editorial precision &amp; zero template shortcuts.
          </div>

          <button
            onClick={scrollToTop}
            className="hover:text-[#FF6A00] flex items-center gap-1.5 transition-colors uppercase font-bold tracking-widest text-[11px]"
          >
            <span>RETURN TO TOP</span>
            <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
