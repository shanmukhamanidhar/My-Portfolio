import React from 'react';

export const About: React.FC = () => {
  const technicalParameters = [
    {
      label: "EDUCATION",
      value: "B.Tech in Computer Science & Engineering",
      detail: "Siddhartha Academy · Expected 2029"
    },
    {
      label: "CURRENT FOCUS",
      value: "Software Engineering · AI / ML · Cybersecurity",
      detail: "Active Work: StudyBuddy & ScamShield"
    },
    {
      label: "TECHNOLOGIES",
      value: "Python · C · HTML / CSS · JavaScript · MongoDB",
      detail: "Core Languages & Database Persistence"
    },
    {
      label: "LANGUAGES",
      value: "English · Telugu · Hindi",
      detail: "Multilingual Communication"
    }
  ];

  return (
    <section id="about" className="py-24 sm:py-32 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header Eyebrow */}
        <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-3 font-mono text-xs text-[#FF6A00] uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]"></span>
            <span>01 / ABOUT THE ENGINEER</span>
          </div>

          <div className="font-mono text-[11px] text-[#A0A0A0] tracking-wider uppercase">
            [ PHILOSOPHY &amp; PARAMETERS ]
          </div>
        </div>

        {/* Asymmetrical Editorial Composition: Statement Left, Technical Ledger Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Natural Editorial Statement & Status Block */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-[#F5F5F5] uppercase leading-[0.98]">
              BUILDING WITH{' '}
              <span className="text-[#FF6A00]">PURPOSE.</span>
            </h2>

            <div className="space-y-5 text-base sm:text-lg text-[#A0A0A0] leading-relaxed font-normal">
              <p>
                I am a Computer Science &amp; Engineering student interested in software engineering, AI/ML, and cybersecurity. I enjoy taking an idea from concept to a working system and continuously improving how it works.
              </p>
              <p className="text-sm sm:text-base text-[#888888] leading-relaxed">
                Currently, I am actively developing two projects: <span className="text-[#F5F5F5] font-medium">StudyBuddy</span>, an AI-powered student productivity platform, and <span className="text-[#F5F5F5] font-medium">ScamShield</span>, a cybersecurity project helping users detect and guard against online scams.
              </p>
            </div>

            {/* REAL CURRENT STATUS BLOCK (Section 6) */}
            <div className="pt-6 border-t border-white/[0.08] space-y-3">
              <div className="font-mono text-[10px] text-[#FF6A00] uppercase tracking-widest">
                REAL-TIME ENGINEERING STATUS //
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 font-mono">
                {/* 01: CURRENTLY BUILDING */}
                <div className="p-3.5 bg-white/[0.02] border border-white/[0.08] space-y-1 hover:border-[#FF6A00]/40 transition-colors">
                  <div className="text-[10px] text-[#FF6A00] tracking-wider uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse"></span>
                    CURRENTLY BUILDING
                  </div>
                  <div className="text-sm font-bold text-[#F5F5F5] font-display">
                    StudyBuddy &amp; ScamShield
                  </div>
                  <div className="text-[10px] text-[#FF6A00]/90">
                    In Active Development
                  </div>
                </div>

                {/* 02: CURRENTLY LEARNING */}
                <div className="p-3.5 bg-white/[0.02] border border-white/[0.08] space-y-1 hover:border-white/20 transition-colors">
                  <div className="text-[10px] text-[#A0A0A0] tracking-wider uppercase">
                    CURRENTLY LEARNING
                  </div>
                  <div className="text-[11.5px] text-[#F5F5F5] leading-snug">
                    Software Engineering<br />
                    AI / ML · Web Dev
                  </div>
                </div>

                {/* 03: CURRENTLY EXPLORING */}
                <div className="p-3.5 bg-white/[0.02] border border-white/[0.08] space-y-1 hover:border-white/20 transition-colors">
                  <div className="text-[10px] text-[#A0A0A0] tracking-wider uppercase">
                    CURRENTLY EXPLORING
                  </div>
                  <div className="text-[11.5px] text-[#F5F5F5] leading-snug">
                    Cybersecurity · Scam Analysis<br />
                    System Design · Tools
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Technical Parameters Ledger (Accurate only) */}
          <div className="lg:col-span-5 space-y-0 divide-y divide-white/[0.08] border-t border-b border-white/[0.08]">
            <div className="py-3.5 font-mono text-[11px] text-[#FF6A00] uppercase tracking-widest flex items-center justify-between">
              <span>SYSTEM PARAMETERS</span>
              <span>INDEX // 01</span>
            </div>

            {technicalParameters.map((param, idx) => (
              <div key={param.label} className="py-4 sm:py-5 space-y-1.5 group hover:bg-white/[0.015] transition-colors">
                <div className="flex items-center justify-between font-mono text-[10px] text-[#A0A0A0] uppercase tracking-wider">
                  <span>0{idx + 1} — {param.label}</span>
                </div>
                <div className="text-base sm:text-lg font-bold text-[#F5F5F5] font-display">
                  {param.value}
                </div>
                <div className="text-xs text-[#888888] font-mono">
                  {param.detail}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
