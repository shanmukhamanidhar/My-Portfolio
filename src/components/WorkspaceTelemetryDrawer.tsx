import React, { useState, useEffect } from 'react';
import { soundFx } from '../utils/sound';
import { Terminal, ChevronUp, ChevronDown, Activity, ArrowUp, Wifi } from 'lucide-react';

interface WorkspaceTelemetryDrawerProps {
  activeSection: string;
  onOpenCmd: () => void;
}

export const WorkspaceTelemetryDrawer: React.FC<WorkspaceTelemetryDrawerProps> = ({
  activeSection,
  onOpenCmd
}) => {
  const [expanded, setExpanded] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [domNodes, setDomNodes] = useState(420);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const percent = Math.min(100, Math.max(0, Math.round((window.scrollY / totalHeight) * 100)));
        setScrollPercent(percent);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    setDomNodes(document.getElementsByTagName('*').length);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    soundFx.playClick(650, 0.03);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside aria-label="Digital Workspace Telemetry" className="fixed bottom-0 left-0 right-0 z-30 font-mono text-[11px] pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pointer-events-auto border-t border-x border-dark-border light:border-light-border bg-dark-bg/95 light:bg-light-bg/95 backdrop-blur-md shadow-lg transition-all duration-200">
          {/* Main minimal telemetry strip */}
          <div className="flex items-center justify-between px-3 py-1.5 text-dark-muted light:text-light-muted">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  soundFx.playToggle();
                  setExpanded(!expanded);
                }}
                className="flex items-center gap-1.5 text-dark-text light:text-light-text font-bold hover:text-accent transition-colors"
                title="Toggle System Diagnostics Drawer"
              >
                <Terminal size={12} className="text-accent" />
                <span>WORKSPACE_TELEMETRY</span>
                {expanded ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
              </button>

              <span className="hidden sm:inline-block text-dark-dim light:text-light-dim">|</span>

              <div className="hidden sm:flex items-center gap-1.5 text-[10px]">
                <Activity size={11} className="text-[#FF6A00]" />
                <span>SECTION:</span>
                <span className="text-dark-text light:text-light-text font-bold uppercase">
                  {activeSection || 'HERO'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[10px]">
              <div>
                SCROLL: <span className="text-accent font-bold">{scrollPercent}%</span>
              </div>

              <button
                onClick={onOpenCmd}
                className="hidden md:flex items-center gap-1 px-1.5 py-0.5 border border-dark-border light:border-light-border hover:border-accent text-dark-text light:text-light-text transition-colors"
                title="Open Command Palette"
              >
                <span>CMD [⌘K]</span>
              </button>

              <button
                onClick={scrollToTop}
                className="p-1 border border-dark-border light:border-light-border hover:border-accent text-dark-text light:text-light-text transition-colors"
                title="Back to Top"
              >
                <ArrowUp size={11} />
              </button>
            </div>
          </div>

          {/* Expanded Drawer Diagnostic Details */}
          {expanded && (
            <div className="p-4 border-t border-dark-border light:border-light-border bg-dark-surface/90 light:bg-light-elevated/90 grid grid-cols-2 sm:grid-cols-4 gap-4 text-[10px] animate-slide-up">
              <div>
                <span className="text-dark-dim light:text-light-dim block">ARCHITECTURE</span>
                <span className="text-dark-text light:text-light-text font-bold">Vite 8 + React 19 + Tailwind</span>
              </div>
              <div>
                <span className="text-dark-dim light:text-light-dim block">DOM COMPLEXITY</span>
                <span className="text-dark-text light:text-light-text font-bold">{domNodes} Active Elements</span>
              </div>
              <div>
                <span className="text-dark-dim light:text-light-dim block">NETWORK STATE</span>
                <span className="text-[#FF6A00] font-bold flex items-center gap-1">
                  <Wifi size={10} />
                  ONLINE [LOW_LATENCY]
                </span>
              </div>
              <div>
                <span className="text-dark-dim light:text-light-dim block">DESIGN LANGUAGE</span>
                <span className="text-accent font-bold">Architectural Monochrome</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
