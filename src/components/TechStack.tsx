import React, { useState } from 'react';
import { TECH_SKILLS, type TechSkillBadge } from '../data/portfolioData';
import { TechIcon } from './TechIcons';
import { soundFx } from '../utils/sound';

export const TechStack: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<TechSkillBadge>(TECH_SKILLS[0]);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Languages', 'Frontend', 'Backend', 'Database', 'Tools'];

  const filteredSkills = filter === 'All' 
    ? TECH_SKILLS 
    : TECH_SKILLS.filter(s => s.category.toLowerCase() === filter.toLowerCase());

  return (
    <section id="skills" className="py-24 sm:py-32 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-[#FF6A00]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]"></span>
              <span>03 / ENGINEERING LAB</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#F5F5F5] font-display uppercase">
              SYSTEMS <span className="text-[#FF6A00]">TOOLKIT</span>
            </h2>
          </div>

          {/* Minimal Text Filters (No Pill Buttons) */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs uppercase tracking-wider">
            {categories.map((cat) => {
              const isSelected = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    soundFx.playToggle();
                    setFilter(cat);
                  }}
                  className={`group relative py-1 transition-colors ${
                    isSelected ? 'text-[#F5F5F5] font-bold' : 'text-[#888888] hover:text-[#A0A0A0]'
                  }`}
                >
                  <span>{cat}</span>
                  {isSelected && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-[#FF6A00]"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Razor-Thin Architectural Grid (No generic rounded cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 border-t border-l border-white/[0.08]">
          {filteredSkills.map((tech, idx) => {
            const isSelected = selectedTech.name === tech.name;
            return (
              <div
                key={tech.name}
                onClick={() => {
                  soundFx.playClick(700, 0.03);
                  setSelectedTech(tech);
                }}
                className={`group relative p-5 border-r border-b border-white/[0.08] cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-5 ${
                  isSelected
                    ? 'bg-white/[0.04]'
                    : 'hover:bg-white/[0.02]'
                }`}
              >
                {/* Top Row: Index + Icon */}
                <div className="flex items-center justify-between font-mono text-[10px] text-[#A0A0A0]">
                  <span className="text-[#FF6A00]">0{idx + 1}</span>
                  <div className={`transition-colors ${isSelected ? 'text-[#FF6A00]' : 'text-neutral-400 group-hover:text-white'}`}>
                    <TechIcon name={tech.name} size={20} />
                  </div>
                </div>

                {/* Bottom Row: Name + Category */}
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-[#F5F5F5] font-display uppercase tracking-tight group-hover:text-white">
                    {tech.name}
                  </h3>
                  <div className="font-mono text-[9.5px] uppercase tracking-wider text-[#A0A0A0]">
                    {tech.category}
                  </div>
                </div>

                {/* Active Indicator Line */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF6A00]"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Skill Lab Dossier Strip */}
        <div className="p-6 border border-white/[0.08] bg-white/[0.015] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 font-mono text-xs">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-[#FF6A00]/40 flex items-center justify-center text-[#FF6A00] shrink-0">
              <TechIcon name={selectedTech.name} size={20} />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="text-base font-bold text-white font-display uppercase">
                  {selectedTech.name}
                </span>
                <span className="text-[10px] text-[#FF6A00] border border-[#FF6A00]/30 px-1.5 py-0.5">
                  {selectedTech.level}
                </span>
              </div>
              <p className="text-xs text-[#A0A0A0] mt-1 font-sans font-normal max-w-xl">
                {selectedTech.description}. Applied in production workflows and deterministic algorithms.
              </p>
            </div>
          </div>

          <div className="text-[11px] text-[#A0A0A0] uppercase tracking-wider border-l border-white/[0.08] pl-6 hidden sm:block">
            STATUS: <span className="text-[#FF6A00] font-semibold">VERIFIED // BENCHMARKED</span>
          </div>
        </div>
      </div>
    </section>
  );
};
