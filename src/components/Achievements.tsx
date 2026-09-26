import React from 'react';
import { ACHIEVEMENTS } from '../data/portfolioData';

export const Achievements: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div className="space-y-1.5">
            <div className="font-mono text-xs text-[#FF6A00] uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]"></span>
              <span>VERIFIED VALIDATIONS &amp; SIMULATIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#F5F5F5] font-display uppercase tracking-tight">
              TECHNICAL RECOGNITION &amp; PARTICIPATION
            </h2>
          </div>

          <div className="font-mono text-xs text-[#A0A0A0] uppercase tracking-wider">
            [ COMPACT LEDGER // ZERO HYPERBOLE ]
          </div>
        </div>

        {/* Minimal High-Contrast Ledger Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/[0.08] font-mono">
          {ACHIEVEMENTS.map((ach, idx) => (
            <div
              key={ach.id}
              className="p-6 border-r border-b border-white/[0.08] bg-white/[0.015] hover:bg-white/[0.03] transition-colors flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[#FF6A00] font-bold">0{idx + 1} // {ach.year}</span>
                  <span className="text-[#FF6A00] font-semibold uppercase tracking-wider">
                    {ach.status}
                  </span>
                </div>

                <div className="text-[10px] text-[#A0A0A0] uppercase tracking-widest">
                  {ach.category}
                </div>

                <h3 className="font-display text-base font-bold text-[#F5F5F5] leading-snug">
                  {ach.title}
                </h3>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-white/[0.08] text-xs">
                <div className="text-[11px] text-[#FF7A18] font-semibold">
                  {ach.organization}
                </div>
                <p className="text-[11.5px] text-[#A0A0A0] leading-relaxed font-sans font-normal">
                  {ach.highlight}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
