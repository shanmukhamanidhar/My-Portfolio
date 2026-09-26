import React from 'react';
import { HeroWorkstation3D } from './HeroWorkstation3D';
import { soundFx } from '../utils/sound';

interface HeroProps {
  onViewWork: () => void;
  onContact: () => void;
  onOpenCmd: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onViewWork, onContact }) => {
  return (
    <section id="top" className="relative pt-32 sm:pt-36 lg:pt-40 pb-20 sm:pb-28 overflow-hidden border-b border-white/[0.08]">
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 tech-grid opacity-50 pointer-events-none"></div>

      {/* Controlled Soft Orange Glow */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#FF6A00]/[0.05] rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Two-Column Asymmetrical Composition (Desktop: Left ~55%, Right ~45%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 xl:gap-16 items-center">
          
          {/* LEFT COLUMN: Dominant Headline, Pillars, & Accurate Intro */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Small Technical Eyebrow Label */}
            <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-[#FF6A00]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]"></span>
              <span>01 / INTRODUCTION</span>
            </div>

            {/* Monumental Headline: Completely Readable & Never Overlapped */}
            <div className="font-display">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] xl:text-[5.5rem] font-black tracking-tight uppercase leading-[0.92] text-[#F5F5F5]">
                I BUILD<br />
                DIGITAL<br />
                <span className="text-[#FF6A00]">SYSTEMS.</span>
              </h1>
            </div>

            {/* Technical Pillars Below Headline */}
            <div className="font-mono text-xs sm:text-sm text-[#A0A0A0] uppercase tracking-wider pt-2 border-t border-white/[0.08]">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>SOFTWARE ENGINEERING</span>
                <span className="text-[#FF6A00]">/</span>
                <span>AI &amp; ML</span>
                <span className="text-[#FF6A00]">/</span>
                <span>CREATIVE TECHNOLOGY</span>
              </div>
            </div>

            {/* Natural, Honest Student Positioning Description */}
            <p className="text-base sm:text-lg text-[#A0A0A0] max-w-xl leading-relaxed font-normal">
              Computer Science &amp; Engineering student focused on building software, exploring AI, and turning ideas into useful digital products.
            </p>

            {/* Minimal Typography Actions */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-2 font-mono text-xs uppercase tracking-widest">
              <button
                onClick={() => {
                  soundFx.playClick(600, 0.03);
                  onViewWork();
                }}
                className="group relative inline-flex items-center gap-2 text-[#F5F5F5] hover:text-[#FF6A00] transition-colors py-1"
              >
                <span>VIEW SELECTED WORK</span>
                <span className="text-[#FF6A00] transition-transform duration-200 group-hover:translate-y-1">↓</span>
                <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-[#FF6A00] group-hover:w-full transition-all duration-300"></span>
              </button>

              <span className="text-white/20 select-none">|</span>

              <button
                onClick={() => {
                  soundFx.playClick(650, 0.03);
                  onContact();
                }}
                className="group relative inline-flex items-center gap-1.5 text-[#A0A0A0] hover:text-[#F5F5F5] transition-colors py-1"
              >
                <span>START A DIALOGUE</span>
                <span className="text-[#FF6A00] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Real Interactive 3D Workstation in its own separate visual zone (Never Overlaps Headline) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative z-20">
            <HeroWorkstation3D />
          </div>

        </div>
      </div>
    </section>
  );
};
