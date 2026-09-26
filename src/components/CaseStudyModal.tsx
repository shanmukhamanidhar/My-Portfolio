import React, { useEffect, useState } from 'react';
import type { Project } from '../types';
import { soundFx } from '../utils/sound';
import { GithubIcon } from './Icons';
import { 
  X, 
  ArrowLeft, 
  ArrowRight, 
  Copy, 
  Check, 
  Cpu, 
  Layers, 
  Terminal, 
  AlertCircle, 
  CheckCircle,
  Clock
} from 'lucide-react';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (proj: Project) => void;
  allProjects: Project[];
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onSelectProject,
  allProjects
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundFx.playClick(400, 0.03);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  const handleCopyCode = () => {
    if (project.caseStudy.codeSnippet) {
      navigator.clipboard.writeText(project.caseStudy.codeSnippet.code);
      setCopiedCode(true);
      soundFx.playClick(800, 0.03);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex justify-center p-2 sm:p-4 lg:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-5xl bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl text-dark-text light:text-light-text my-auto overflow-hidden shadow-[0_0_60px_rgba(255,90,0,0.12)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Modal Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#121212]/95 backdrop-blur-md border-b border-white/10 font-mono text-xs">
          <div className="flex items-center gap-2 text-dark-muted light:text-light-muted">
            <span className="text-accent font-bold">CASE_STUDY //</span>
            <span className="text-dark-text light:text-light-text uppercase font-semibold">
              {project.id}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 border border-dark-border light:border-light-border hover:border-accent text-dark-muted light:text-light-muted hover:text-dark-text light:hover:text-light-text transition-colors"
              >
                <GithubIcon size={12} />
                <span>GITHUB_REPO</span>
              </a>
            )}

            <button
              onClick={() => {
                soundFx.playClick(400, 0.03);
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1 bg-accent text-white hover:bg-accent-hover font-semibold transition-colors"
            >
              <X size={14} />
              <span>CLOSE [ESC]</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 lg:p-10 space-y-12 max-h-[85vh] overflow-y-auto">
          {/* Header Metadata Block */}
          <div className="space-y-4 pb-8 border-b border-dark-border light:border-light-border">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="px-2 py-0.5 bg-accent/10 border border-accent/30 text-accent font-semibold">
                {project.category}
              </span>
              <span className="px-2 py-0.5 bg-dark-surface light:bg-light-elevated border border-dark-border light:border-light-border text-dark-muted light:text-light-muted">
                STATUS: {project.status}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              {project.title}
            </h1>
            <p className="text-base sm:text-lg text-dark-muted light:text-light-muted font-normal max-w-3xl leading-relaxed">
              {project.tagline}
            </p>

            {/* Spec Sheet Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 font-mono text-xs">
              <div className="p-3 bg-dark-surface light:bg-light-elevated border border-dark-border light:border-light-border">
                <span className="block text-[10px] text-dark-dim light:text-light-dim uppercase">Runtime Engine</span>
                <span className="font-semibold text-dark-text light:text-light-text">{project.specSheet.runtime}</span>
              </div>
              <div className="p-3 bg-dark-surface light:bg-light-elevated border border-dark-border light:border-light-border">
                <span className="block text-[10px] text-dark-dim light:text-light-dim uppercase">Throughput / Latency</span>
                <span className="font-semibold text-accent">{project.specSheet.throughput}</span>
              </div>
              <div className="p-3 bg-dark-surface light:bg-light-elevated border border-dark-border light:border-light-border">
                <span className="block text-[10px] text-dark-dim light:text-light-dim uppercase">Core Paradigm</span>
                <span className="font-semibold text-dark-text light:text-light-text">{project.specSheet.coreParadigm}</span>
              </div>
              <div className="p-3 bg-dark-surface light:bg-light-elevated border border-dark-border light:border-light-border">
                <span className="block text-[10px] text-dark-dim light:text-light-dim uppercase">Data Model</span>
                <span className="font-semibold text-dark-text light:text-light-text">{project.specSheet.persistence}</span>
              </div>
            </div>

            {/* Technologies Tag List */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              <span className="font-mono text-xs text-dark-dim light:text-light-dim mr-2">STACK:</span>
              {project.technologies.map(t => (
                <span key={t} className="px-2 py-0.5 font-mono text-[11px] bg-dark-surface light:bg-light-card border border-dark-border light:border-light-border text-dark-text light:text-light-text">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* 01 — Overview */}
          <section className="space-y-3">
            <div className="font-mono text-xs text-accent font-semibold tracking-wider">
              SECTION 01 // OVERVIEW
            </div>
            <h2 className="text-xl font-bold">The Core Mission</h2>
            <p className="text-dark-muted light:text-light-muted leading-relaxed text-sm sm:text-base">
              {project.caseStudy.overview}
            </p>
          </section>

          {/* 02 — Problem */}
          <section className="space-y-3 p-5 border border-dark-border light:border-light-border bg-dark-surface/50 light:bg-light-elevated/50">
            <div className="font-mono text-xs text-accent font-semibold tracking-wider flex items-center gap-1.5">
              <AlertCircle size={14} />
              <span>SECTION 02 // PROBLEM STATEMENT & BOTTLENECKS</span>
            </div>
            <h2 className="text-xl font-bold">The Challenge</h2>
            <div className="text-dark-muted light:text-light-muted leading-relaxed text-sm sm:text-base whitespace-pre-line">
              {project.caseStudy.problem}
            </div>
          </section>

          {/* 03 — Approach */}
          <section className="space-y-3">
            <div className="font-mono text-xs text-accent font-semibold tracking-wider flex items-center gap-1.5">
              <Cpu size={14} />
              <span>SECTION 03 // STRATEGIC APPROACH & TRADE-OFFS</span>
            </div>
            <h2 className="text-xl font-bold">Engineering Strategy</h2>
            <p className="text-dark-muted light:text-light-muted leading-relaxed text-sm sm:text-base">
              {project.caseStudy.approach}
            </p>
          </section>

          {/* 04 — Architecture & Data Pipeline */}
          <section className="space-y-4">
            <div className="font-mono text-xs text-accent font-semibold tracking-wider flex items-center gap-1.5">
              <Layers size={14} />
              <span>SECTION 04 // SYSTEM ARCHITECTURE & DATA FLOW</span>
            </div>
            <h2 className="text-xl font-bold">Pipeline Architecture</h2>
            <p className="text-sm text-dark-muted light:text-light-muted">
              {project.caseStudy.architecture.description}
            </p>

            {/* Interactive Data Flow Step Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 font-mono">
              {project.caseStudy.architecture.flowSteps.map((step, idx) => (
                <div
                  key={step.step}
                  onClick={() => {
                    setActiveStep(idx);
                    soundFx.playClick(650, 0.03);
                  }}
                  className={`p-4 border cursor-pointer transition-all ${
                    activeStep === idx
                      ? 'border-accent bg-accent/5'
                      : 'border-dark-border light:border-light-border bg-dark-surface light:bg-light-card hover:border-dark-muted'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2 text-xs">
                    <span className="text-accent font-bold">STEP {step.step}</span>
                    {activeStep === idx && (
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-dark-text light:text-light-text mb-1">
                    {step.label}
                  </h4>
                  <p className="text-[11px] text-dark-muted light:text-light-muted leading-snug">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 05 — Implementation & Code Inspector */}
          <section className="space-y-4">
            <div className="font-mono text-xs text-accent font-semibold tracking-wider flex items-center gap-1.5">
              <Terminal size={14} />
              <span>SECTION 05 // IMPLEMENTATION & LOW-LEVEL DETAILS</span>
            </div>
            <h2 className="text-xl font-bold">Implementation Details</h2>
            <p className="text-dark-muted light:text-light-muted leading-relaxed text-sm">
              {project.caseStudy.implementation}
            </p>

            {/* Code Box */}
            {project.caseStudy.codeSnippet && (
              <div className="border border-dark-border light:border-light-border bg-dark-surface light:bg-light-elevated font-mono text-xs">
                <div className="flex items-center justify-between px-4 py-2 border-b border-dark-border light:border-light-border bg-dark-card light:bg-light-card">
                  <div className="flex items-center gap-2 text-dark-muted light:text-light-muted text-[11px]">
                    <span className="text-accent">FILE //</span>
                    <span className="text-dark-text light:text-light-text font-bold">
                      {project.caseStudy.codeSnippet.filename}
                    </span>
                    <span className="uppercase text-[10px] text-dark-dim light:text-light-dim">
                      ({project.caseStudy.codeSnippet.language})
                    </span>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 px-2.5 py-1 border border-dark-border light:border-light-border hover:border-accent text-dark-muted light:text-light-muted hover:text-dark-text light:hover:text-light-text transition-colors text-[10px]"
                  >
                    {copiedCode ? <Check size={12} className="text-[#FF6A00]" /> : <Copy size={12} />}
                    <span>{copiedCode ? 'COPIED' : 'COPY_CODE'}</span>
                  </button>
                </div>

                <pre className="p-4 overflow-x-auto text-[11.5px] leading-relaxed text-dark-text light:text-light-text">
                  <code>{project.caseStudy.codeSnippet.code}</code>
                </pre>
              </div>
            )}
          </section>

          {/* 06 — Challenges Encountered & Solutions */}
          <section className="space-y-4">
            <div className="font-mono text-xs text-accent font-semibold tracking-wider flex items-center gap-1.5">
              <AlertCircle size={14} />
              <span>SECTION 06 // BOTTLENECKS, BUGS & RESOLUTIONS</span>
            </div>
            <h2 className="text-xl font-bold">Technical Hurdles Overcome</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.caseStudy.challenges.map((c, i) => (
                <div key={i} className="p-4 border border-dark-border light:border-light-border bg-dark-card light:bg-light-card space-y-2">
                  <h4 className="font-mono text-xs font-bold text-dark-text light:text-light-text">
                    #{i + 1} — {c.title}
                  </h4>
                  <div className="text-xs text-neutral-400 font-mono leading-snug">
                    <span className="font-bold text-neutral-300">PROBLEM:</span> {c.challenge}
                  </div>
                  <div className="text-xs text-[#FF8A24] font-mono leading-snug pt-1 border-t border-dark-border/40 light:border-light-border/40">
                    <span className="font-bold text-[#FF6A00]">RESOLUTION:</span> {c.solution}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 07 — Outcome & Verification */}
          <section className="space-y-3 p-5 border border-dark-border light:border-light-border bg-dark-surface/60 light:bg-light-elevated/60">
            <div className="font-mono text-xs text-[#FF6A00] font-semibold tracking-wider flex items-center gap-1.5">
              <CheckCircle size={14} />
              <span>SECTION 07 // MEASURED OUTCOMES & VERIFICATION</span>
            </div>
            <h2 className="text-xl font-bold">System Results</h2>
            <p className="text-dark-muted light:text-light-muted leading-relaxed text-sm sm:text-base">
              {project.caseStudy.outcome}
            </p>
          </section>

          {/* 08 — Future Improvements */}
          <section className="space-y-3">
            <div className="font-mono text-xs text-accent font-semibold tracking-wider flex items-center gap-1.5">
              <Clock size={14} />
              <span>SECTION 08 // ARCHITECTURAL ROADMAP & EXPANSIONS</span>
            </div>
            <h2 className="text-xl font-bold">Planned Enhancements</h2>
            <ul className="space-y-2 text-sm text-dark-muted light:text-light-muted font-mono">
              {project.caseStudy.futureImprovements.map((imp, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-accent font-bold">→</span>
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Next / Previous Project Footer Navigation */}
          <div className="pt-8 border-t border-dark-border light:border-light-border flex items-center justify-between font-mono text-xs">
            <button
              onClick={() => {
                soundFx.playClick(500, 0.03);
                onSelectProject(prevProject);
              }}
              className="flex items-center gap-2 p-2 hover:text-accent transition-colors"
            >
              <ArrowLeft size={14} />
              <span>PREV: {prevProject.title.split('/')[0].trim()}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick(500, 0.03);
                onSelectProject(nextProject);
              }}
              className="flex items-center gap-2 p-2 hover:text-accent transition-colors text-right"
            >
              <span>NEXT: {nextProject.title.split('/')[0].trim()}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
