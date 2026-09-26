import React from 'react';
import { HERO_STATS } from '../data/portfolioData';
import { GraduationCap, FolderGit2, Cpu, Target } from 'lucide-react';

export const StatsStrip: React.FC = () => {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0: return <GraduationCap size={16} className="text-[#FF6A00]" />;
      case 1: return <FolderGit2 size={16} className="text-[#FF6A00]" />;
      case 2: return <Cpu size={16} className="text-[#FF6A00]" />;
      default: return <Target size={16} className="text-[#FF6A00]" />;
    }
  };

  return (
    <section className="relative z-20 pb-16 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/10 bg-[#101010]/80 backdrop-blur-md p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/10">
            {HERO_STATS.map((stat, idx) => (
              <div 
                key={stat.label} 
                className={`flex items-center gap-4 ${idx > 0 ? 'lg:pl-8' : ''} ${idx < HERO_STATS.length - 1 ? 'lg:pr-8' : ''}`}
              >
                {/* Icon Circle */}
                <div className="w-12 h-12 rounded-xl bg-[#181818] border border-white/5 flex items-center justify-center shrink-0">
                  {getIcon(idx)}
                </div>

                <div className="space-y-0.5">
                  <div className="text-xl sm:text-2xl font-black text-[#F5F5F5] font-display tracking-tight flex items-baseline gap-1">
                    <span>{stat.num}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]"></span>
                  </div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6A00]">
                    {stat.label}
                  </div>
                  <div className="text-xs text-[#A0A0A0]">
                    {stat.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
