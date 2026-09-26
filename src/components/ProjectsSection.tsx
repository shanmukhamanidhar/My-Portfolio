import React from 'react';
import type { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { soundFx } from '../utils/sound';
import { BookOpen, Satellite, Keyboard, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';

interface ProjectsSectionProps {
  onOpenCaseStudy: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenCaseStudy }) => {
  // Render bespoke visual artifacts for each project
  const renderVisual = (id: string) => {
    switch (id) {
      case 'studybuddy':
      case 'studyplanner':
        return (
          <div className="relative w-full h-72 sm:h-84 lg:h-96 bg-[#101215] border border-white/[0.08] flex items-center justify-center p-4 sm:p-8 tech-grid overflow-hidden group-hover:border-[#FF6A00]/40 transition-colors">
            {/* Ambient orange glow */}
            <div className="absolute inset-0 bg-[#FF6A00]/[0.07] rounded-full blur-3xl transform scale-75 pointer-events-none"></div>

            {/* StudyBuddy Productivity Workspace Interface */}
            <div className="relative z-10 w-full max-w-xl p-5 sm:p-6 bg-[#16181D]/95 border border-white/[0.08] backdrop-blur-md space-y-4 font-mono text-xs">
              {/* Top Bar */}
              <div className="flex items-center justify-between text-[#A0A0A0] pb-2.5 border-b border-white/[0.08] text-[11px]">
                <span className="flex items-center gap-2 text-[#FF6A00] font-bold">
                  <BookOpen size={14} />
                  STUDYBUDDY // WORKLOAD &amp; REVISION
                </span>
                <span className="text-[#FF6A00] font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse"></span>
                  MONGODB_CONNECTED
                </span>
              </div>

              {/* Dynamic Task & Subject Schedules */}
              <div className="space-y-2.5">
                <div className="p-2.5 rounded bg-white/[0.02] border border-white/[0.05] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-[12px] text-[#F5F5F5] font-semibold">Data Structures &amp; Algorithms</div>
                    <div className="text-[10px] text-[#888888]">Binary Trees &amp; Min-Heap Priority Queue</div>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 text-[9.5px] uppercase font-bold tracking-wider bg-[#FF6A00]/10 text-[#FF6A00] border border-[#FF6A00]/30 rounded">
                      REVISION CYCLE #2
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-white/[0.02] border border-white/[0.05] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-[12px] text-[#F5F5F5] font-semibold">Systems Architecture</div>
                    <div className="text-[10px] text-[#888888]">Virtual Memory Paging &amp; C Pointer Safety</div>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 text-[9.5px] uppercase font-bold tracking-wider bg-white/5 text-neutral-300 border border-white/10 rounded">
                      SCHEDULED
                    </span>
                  </div>
                </div>
              </div>

              {/* Workload Progress & Retention Indicator */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[10.5px]">
                  <span className="text-[#A0A0A0]">WEEKLY STUDY TARGET VELOCITY</span>
                  <span className="text-[#FF6A00] font-bold">88% ON TRACK</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="w-[88%] h-full bg-gradient-to-r from-[#FF6A00] to-[#FF8A24]"></div>
                </div>
              </div>

              {/* Footer Specs */}
              <div className="flex justify-between items-center text-[10px] text-[#A0A0A0] pt-2 border-t border-white/[0.08]">
                <span>SCHEMA: BSON TIME-SERIES</span>
                <span className="text-white font-mono">CLIENT: SEMANTIC HTML5/JS</span>
              </div>
            </div>
          </div>
        );

      case 'satqueryai':
        return (
          <div className="relative w-full h-64 sm:h-72 bg-[#0E1114] border border-white/[0.08] flex items-center justify-center p-6 tech-grid overflow-hidden group-hover:border-[#FF6A00]/40 transition-colors">
            <div className="absolute inset-0 bg-[#FF6A00]/[0.08] rounded-full blur-2xl transform scale-75 pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-sm p-5 bg-[#14181E]/95 border border-white/[0.08] backdrop-blur-md space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between text-[#A0A0A0] pb-2 border-b border-white/[0.08] text-[11px]">
                <span className="flex items-center gap-2 text-[#FF6A00] font-bold">
                  <Satellite size={14} />
                  SENTINEL_2 // MULTISPECTRAL
                </span>
                <span>NDVI: +0.742</span>
              </div>

              {/* Spectral Histogram */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-[#A0A0A0]">
                  <span>SPECTRAL BANDS (NIR/RED)</span>
                  <span className="text-[#FF6A00]">512x512 TILE</span>
                </div>
                <div className="grid grid-cols-8 gap-1.5 h-14 items-end">
                  {[35, 60, 85, 45, 95, 70, 80, 50].map((h, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-t from-[#FF6A00]/30 to-[#FF6A00] rounded-[1px] transition-all duration-300 group-hover:scale-y-105"
                      style={{ height: `${h}%` }}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-[#A0A0A0] pt-2 border-t border-white/[0.08]">
                <span>ENGINE: NUMPY / CV</span>
                <span className="text-white font-bold">CLOUD_MASK: THRESHOLDED</span>
              </div>
            </div>
          </div>
        );

      default:
        // TypeRush Telemetry
        return (
          <div className="relative w-full h-64 sm:h-72 bg-[#131110] border border-white/[0.08] flex items-center justify-center p-6 tech-grid overflow-hidden group-hover:border-[#FF6A00]/40 transition-colors">
            <div className="absolute inset-0 bg-[#FF6A00]/[0.08] rounded-full blur-2xl transform scale-75 pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-sm p-5 bg-[#181513]/95 border border-white/[0.08] backdrop-blur-md space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between text-[#A0A0A0] pb-2 border-b border-white/[0.08] text-[11px]">
                <span className="flex items-center gap-2 text-[#FF6A00] font-bold">
                  <Keyboard size={14} />
                  KEYSTROKE TELEMETRY
                </span>
                <span>HIGH_PRECISION</span>
              </div>

              <div className="flex items-baseline justify-between py-2">
                <div>
                  <span className="text-3xl font-black text-[#F5F5F5] font-display">118</span>
                  <span className="text-xs text-[#A0A0A0] ml-1.5 font-mono">WPM SPEED</span>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-[#FF6A00] font-mono">0.42ms</span>
                  <div className="text-[9.5px] text-[#A0A0A0]">KEY INTERVAL JITTER</div>
                </div>
              </div>

              <div className="flex justify-between text-[10px] text-[#A0A0A0] pt-2 border-t border-white/[0.08]">
                <span>RUNTIME: BROWSER DOM</span>
                <span className="text-white">DYNAMIC CADENCE</span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="projects" className="py-24 sm:py-32 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-[#FF6A00]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]"></span>
              <span>02 / SELECTED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#F5F5F5] font-display uppercase">
              FEATURED <span className="text-[#FF6A00]">PROJECTS</span>
            </h2>
          </div>

          <p className="font-mono text-xs text-[#A0A0A0] max-w-sm uppercase tracking-wider">
            [ REAL IMPLEMENTATIONS // ZERO INVENTED CLAIMS ]
          </p>
        </div>

        {/* ASYMMETRICAL EDITORIAL CASE STUDY PRESENTATION */}
        <div className="space-y-24">
          
          {/* PROJECT 01: StudyBuddy (Heroic Full-Width Flagship Presentation) */}
          {PROJECTS[0] && (
            <div className="group space-y-6 pb-16 border-b border-white/[0.08]">
              {/* Metadata Header Line: Number, Name, Category */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs text-[#A0A0A0] uppercase tracking-widest">
                <div className="flex items-center gap-3">
                  <span className="text-[#FF6A00] font-bold text-sm">01 //</span>
                  <h3 className="text-[#F5F5F5] font-bold text-base sm:text-lg font-display uppercase">
                    {PROJECTS[0].title}
                  </h3>
                  <span className="text-white/30 hidden sm:inline">·</span>
                  <span className="text-neutral-400 hidden sm:inline">{PROJECTS[0].tagline}</span>
                </div>
                <div className="text-[11px] text-[#FF6A00] font-semibold">
                  {PROJECTS[0].category}
                </div>
              </div>

              {/* Large Visual Canvas */}
              <div 
                onClick={() => {
                  soundFx.playClick(650, 0.03);
                  onOpenCaseStudy(PROJECTS[0]);
                }}
                className="cursor-pointer"
              >
                {renderVisual(PROJECTS[0].id)}
              </div>

              {/* Short Description, Technologies & Action Links */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start pt-2">
                <div className="lg:col-span-8 space-y-3">
                  <p className="text-base sm:text-lg text-[#F5F5F5] leading-relaxed">
                    {PROJECTS[0].solution}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                    {PROJECTS[0].technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider bg-white/[0.03] border border-white/[0.08] text-[#A0A0A0]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Action Links */}
                <div className="lg:col-span-4 flex flex-wrap items-center lg:justify-end gap-5 pt-1 font-mono text-xs">
                  {PROJECTS[0].githubUrl && (
                    <a
                      href={PROJECTS[0].githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#A0A0A0] hover:text-[#F5F5F5] flex items-center gap-1.5 transition-colors"
                    >
                      <GithubIcon size={14} />
                      <span>VIEW CODE</span>
                    </a>
                  )}
                  <button
                    onClick={() => {
                      soundFx.playClick(650, 0.03);
                      onOpenCaseStudy(PROJECTS[0]);
                    }}
                    className="text-[#F5F5F5] hover:text-[#FF6A00] flex items-center gap-1.5 font-semibold transition-colors"
                  >
                    <span>INSPECT CASE STUDY</span>
                    <ArrowUpRight size={14} className="text-[#FF6A00]" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ASYMMETRIC ROW: Projects 02 (SatQueryAI) and 03 (TypeRush) in Staggered Offset Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* PROJECT 02: SatQueryAI */}
            {PROJECTS[1] && (
              <div className="lg:col-span-6 group space-y-6 pb-12 border-b lg:border-b-0 border-white/[0.08]">
                {/* Metadata Header */}
                <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[#A0A0A0]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#FF6A00] font-bold">02 //</span>
                    <h3 className="text-[#F5F5F5] font-bold text-base font-display uppercase">
                      {PROJECTS[1].title}
                    </h3>
                  </div>
                  <span className="text-[10px] text-[#FF6A00] font-semibold">{PROJECTS[1].category}</span>
                </div>

                {/* Visual Canvas */}
                <div 
                  onClick={() => {
                    soundFx.playClick(650, 0.03);
                    onOpenCaseStudy(PROJECTS[1]);
                  }}
                  className="cursor-pointer"
                >
                  {renderVisual(PROJECTS[1].id)}
                </div>

                {/* Short Description */}
                <div className="space-y-3">
                  <div className="font-mono text-xs text-[#A0A0A0]">
                    {PROJECTS[1].tagline}
                  </div>
                  <p className="text-sm text-[#A0A0A0] leading-relaxed">
                    {PROJECTS[1].solution}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {PROJECTS[1].technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 font-mono text-[10px] bg-white/[0.03] border border-white/[0.08] text-[#A0A0A0]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-5 pt-1 font-mono text-xs">
                  {PROJECTS[1].githubUrl && (
                    <a
                      href={PROJECTS[1].githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#A0A0A0] hover:text-[#F5F5F5] flex items-center gap-1.5 transition-colors"
                    >
                      <GithubIcon size={13} />
                      <span>VIEW CODE</span>
                    </a>
                  )}
                  <button
                    onClick={() => {
                      soundFx.playClick(650, 0.03);
                      onOpenCaseStudy(PROJECTS[1]);
                    }}
                    className="text-[#F5F5F5] hover:text-[#FF6A00] inline-flex items-center gap-1 font-semibold transition-colors"
                  >
                    <span>CASE STUDY</span>
                    <ArrowUpRight size={13} className="text-[#FF6A00]" />
                  </button>
                </div>
              </div>
            )}

            {/* PROJECT 03: TypeRush */}
            {PROJECTS[2] && (
              <div className="lg:col-span-6 group space-y-6 pb-12 border-b lg:border-b-0 border-white/[0.08] lg:pt-8">
                {/* Metadata Header */}
                <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[#A0A0A0]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#FF6A00] font-bold">03 //</span>
                    <h3 className="text-[#F5F5F5] font-bold text-base font-display uppercase">
                      {PROJECTS[2].title}
                    </h3>
                  </div>
                  <span className="text-[10px] text-[#FF6A00] font-semibold">{PROJECTS[2].category}</span>
                </div>

                {/* Visual Canvas */}
                <div 
                  onClick={() => {
                    soundFx.playClick(650, 0.03);
                    onOpenCaseStudy(PROJECTS[2]);
                  }}
                  className="cursor-pointer"
                >
                  {renderVisual(PROJECTS[2].id)}
                </div>

                {/* Short Description */}
                <div className="space-y-3">
                  <div className="font-mono text-xs text-[#A0A0A0]">
                    {PROJECTS[2].tagline}
                  </div>
                  <p className="text-sm text-[#A0A0A0] leading-relaxed">
                    {PROJECTS[2].solution}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {PROJECTS[2].technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 font-mono text-[10px] bg-white/[0.03] border border-white/[0.08] text-[#A0A0A0]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-5 pt-1 font-mono text-xs">
                  {PROJECTS[2].githubUrl && (
                    <a
                      href={PROJECTS[2].githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#A0A0A0] hover:text-[#F5F5F5] flex items-center gap-1.5 transition-colors"
                    >
                      <GithubIcon size={13} />
                      <span>VIEW CODE</span>
                    </a>
                  )}
                  <button
                    onClick={() => {
                      soundFx.playClick(650, 0.03);
                      onOpenCaseStudy(PROJECTS[2]);
                    }}
                    className="text-[#F5F5F5] hover:text-[#FF6A00] inline-flex items-center gap-1 font-semibold transition-colors"
                  >
                    <span>CASE STUDY</span>
                    <ArrowUpRight size={13} className="text-[#FF6A00]" />
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};
