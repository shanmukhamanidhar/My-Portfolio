import React from 'react';
import { TIMELINE_ENTRIES } from '../data/portfolioData';

export const JourneyTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-24 sm:py-32 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-[#FF6A00]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]"></span>
              <span>04 / TRAJECTORY &amp; EXPERIENCE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#F5F5F5] font-display uppercase">
              CHRONOLOGICAL <span className="text-[#FF6A00]">TRAJECTORY</span>
            </h2>
          </div>

          <p className="font-mono text-xs text-[#A0A0A0] max-w-sm uppercase tracking-wider">
            [ 2025 — BEYOND // ZERO RETROSPECTIVE NOISE ]
          </p>
        </div>

        {/* Minimal Editorial Chronological Ledger */}
        <div className="divide-y divide-white/[0.08] border-t border-b border-white/[0.08]">
          {TIMELINE_ENTRIES.map((item, idx) => (
            <div
              key={item.id}
              className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start group hover:bg-white/[0.015] transition-colors"
            >
              {/* Column 1: Index & Period */}
              <div className="lg:col-span-3 space-y-1 font-mono">
                <div className="text-[10px] text-[#FF6A00] tracking-widest uppercase">
                  PHASE 0{idx + 1}
                </div>
                <div className="text-sm sm:text-base font-bold text-[#F5F5F5] font-display">
                  {item.period}
                </div>
              </div>

              {/* Column 2: Title & Entity */}
              <div className="lg:col-span-4 space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-black text-[#F5F5F5] font-display uppercase tracking-tight group-hover:text-[#FF6A00] transition-colors">
                  {item.title}
                </h3>
                <div className="font-mono text-xs text-[#FF7A18] uppercase tracking-wider">
                  {item.entity}
                </div>
              </div>

              {/* Column 3: Description & Technical Takeaways */}
              <div className="lg:col-span-5 space-y-3">
                <p className="text-sm text-[#A0A0A0] leading-relaxed font-normal">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10px]">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 uppercase tracking-wider text-[#A0A0A0] bg-white/[0.03] border border-white/[0.08]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
