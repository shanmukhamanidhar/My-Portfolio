import React from 'react';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 sm:py-24 border-b border-white/[0.08] light:border-black/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/[0.08] light:border-black/[0.08]">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-[#FF6A00]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]"></span>
              <span>06 // EDUCATION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#F5F5F5] light:text-[#111111] font-display uppercase">
              ACADEMIC <span className="text-[#FF6A00]">FOUNDATION</span>
            </h2>
          </div>

          <div className="font-mono text-xs text-[#A0A0A0] light:text-[#6B6B6B] uppercase tracking-wider">
            [ FORMAL DEGREE // CSE ]
          </div>
        </div>

        {/* Compact Editorial Ledger */}
        <div className="border border-white/[0.08] light:border-black/[0.08] bg-white/[0.015] light:bg-black/[0.015] p-6 sm:p-8 lg:p-10 transition-colors">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              {/* Highlighted Degree */}
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-display text-[#F5F5F5] light:text-[#111111] tracking-tight uppercase">
                B.Tech — Computer Science &amp; Engineering
              </h3>
              {/* Secondary University */}
              <p className="text-sm sm:text-base text-[#A0A0A0] light:text-[#6B6B6B] font-mono">
                Siddhartha Academy of Higher Education
              </p>
            </div>

            {/* Technical Metadata Label with Orange Accent */}
            <div className="flex items-center gap-2 self-start md:self-center px-3.5 py-1.5 rounded border border-[#FF6A00]/30 bg-[#FF6A00]/[0.06] font-mono text-xs text-[#FF6A00] tracking-wider uppercase whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse"></span>
              <span>Expected graduation: 2029</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
