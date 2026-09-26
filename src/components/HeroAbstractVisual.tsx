import React, { useState } from 'react';

export const HeroAbstractVisual: React.FC = () => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 15, y: y * 15 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const tags = [
    { label: "AI_SYSTEMS", top: "8%", right: "8%" },
    { label: "DATA_CORE", top: "12%", left: "8%" },
    { label: "LOW_LATENCY", bottom: "12%", left: "8%" },
    { label: "ENGINEERING", bottom: "8%", right: "8%" },
  ];

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[420px] sm:max-w-[460px] h-[360px] sm:h-[420px] lg:h-[460px] flex items-center justify-center select-none ml-auto"
    >
      {/* Deep Orange Ambient Radial Glow */}
      <div className="absolute w-[280px] sm:w-[340px] h-[280px] sm:h-[340px] rounded-full bg-[#FF6A00]/18 blur-[80px] pointer-events-none transform translate-x-4"></div>
      <div className="absolute w-[160px] h-[160px] rounded-full bg-[#FF8A24]/20 blur-[50px] pointer-events-none"></div>

      {/* Background Blueprint Grid Layer */}
      <div 
        className="absolute inset-2 sm:inset-4 rounded-2xl border border-[#2A2A2A] bg-[#111111]/70 backdrop-blur-sm tech-grid overflow-hidden transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${mouseOffset.x * 0.3}px, ${mouseOffset.y * 0.3}px)`
        }}
      >
        {/* Subtle grid corner crosshairs */}
        <div className="absolute top-3 left-3 text-[9px] font-mono text-[#FF6A00]/70">+ 01_GEO</div>
        <div className="absolute top-3 right-3 text-[9px] font-mono text-[#6B6B6B]">[LATENCY: 0.2ms]</div>
        <div className="absolute bottom-3 left-3 text-[9px] font-mono text-[#6B6B6B]">SYS_RENDER // 60FPS</div>
        <div className="absolute bottom-3 right-3 text-[9px] font-mono text-[#FF6A00]/70">ACTIVE_</div>
      </div>

      {/* Central 3D Geometric Vector Composition */}
      <div 
        className="relative z-10 w-[240px] sm:w-[290px] h-[240px] sm:h-[290px] flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)`
        }}
      >
        {/* Concentric Orbital Rings */}
        <div className="absolute inset-0 rounded-full border border-dashed border-[#FF6A00]/30 animate-spin-slow"></div>
        <div className="absolute inset-5 rounded-full border border-[#2A2A2A] animate-[spin_35s_linear_infinite_reverse]"></div>
        <div className="absolute inset-12 rounded-full border border-[#FF6A00]/25"></div>

        {/* Orbiting Orange Energy Nodes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2.5 h-2.5 rounded-full bg-[#FF6A00] shadow-[0_0_12px_rgba(255,106,0,0.5)] animate-ping"></div>
        <div className="absolute bottom-5 right-6 w-2 h-2 rounded-full bg-[#FF8A24] shadow-[0_0_10px_rgba(255,138,36,0.5)]"></div>
        <div className="absolute top-10 left-8 w-2 h-2 rounded-full bg-[#F5F5F5] shadow-[0_0_10px_rgba(255,106,0,0.3)]"></div>

        {/* Isometric Layered Geometric Polyhedron SVG */}
        <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-[0_10px_35px_rgba(255,106,0,0.25)]">
          {/* Subtle background wireframe */}
          <polygon
            points="150,25 260,88 260,212 150,275 40,212 40,88"
            fill="none"
            stroke="#2A2A2A"
            strokeWidth="1.5"
          />
          <polygon
            points="150,55 235,105 235,195 150,245 65,195 65,105"
            fill="none"
            stroke="rgba(255,106,0,0.25)"
            strokeWidth="1.2"
          />

          {/* Central 3D Cube / Monolith Faces with Orange Gradients */}
          <defs>
            <linearGradient id="topFace" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF8A24" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#FF6A00" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="leftFace" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1C1C1C" />
              <stop offset="100%" stopColor="#080808" />
            </linearGradient>
            <linearGradient id="rightFace" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2A2A2A" />
              <stop offset="100%" stopColor="#111111" />
            </linearGradient>
            <linearGradient id="accentOrange" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6A00" />
              <stop offset="100%" stopColor="#FF8A24" />
            </linearGradient>
          </defs>

          {/* Isometric Diamond Core */}
          <g transform="translate(150, 150)">
            {/* Top Plane */}
            <path
              d="M0,-70 L60,-35 L0,0 L-60,-35 Z"
              fill="url(#topFace)"
              stroke="#FF8A24"
              strokeWidth="1.5"
            />
            {/* Left Plane */}
            <path
              d="M-60,-35 L0,0 L0,70 L-60,35 Z"
              fill="url(#leftFace)"
              stroke="#2A2A2A"
              strokeWidth="1.5"
            />
            {/* Right Plane */}
            <path
              d="M0,0 L60,-35 L60,35 L0,70 Z"
              fill="url(#rightFace)"
              stroke="rgba(255,106,0,0.3)"
              strokeWidth="1.5"
            />

            {/* Glowing Internal Core Sphere */}
            <circle cx="0" cy="0" r="18" fill="url(#accentOrange)" filter="drop-shadow(0 0 14px #FF6A00)" />
            <circle cx="0" cy="0" r="8" fill="#F5F5F5" opacity="0.9" />

            {/* Coordinate Axis Lines */}
            <line x1="0" y1="0" x2="0" y2="-95" stroke="#FF6A00" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="0" y1="0" x2="85" y2="45" stroke="#6B6B6B" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="0" y1="0" x2="-85" y2="45" stroke="#6B6B6B" strokeWidth="1" strokeDasharray="3,3" />
          </g>
        </svg>

        {/* Floating Code Snippet Glassmorphism Card */}
        <div 
          className="absolute -bottom-2 left-2 bg-[#111111]/95 border border-[#2A2A2A] p-2.5 rounded-lg shadow-xl backdrop-blur-md font-mono text-[10.5px] text-[#6B6B6B] transition-transform duration-300"
          style={{
            transform: `translate(${mouseOffset.x * -0.4}px, ${mouseOffset.y * -0.4}px)`
          }}
        >
          <div className="flex items-center gap-1.5 pb-1 mb-1 border-b border-[#2A2A2A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]"></span>
            <span className="text-[9.5px] text-[#F5F5F5] font-semibold">pipeline.py</span>
          </div>
          <div className="text-[10px] leading-tight space-y-0.5">
            <div><span className="text-[#FF6A00]">def</span> <span className="text-[#F5F5F5]">solve_problem</span>():</div>
            <div className="pl-2.5 text-[#6B6B6B]">return <span className="text-[#FF8A24]">&quot;viable_system&quot;</span></div>
          </div>
        </div>

        {/* Floating Telemetry Stats Badge */}
        <div 
          className="absolute top-2 right-2 bg-[#111111]/95 border border-[#FF6A00]/40 p-2 rounded-lg shadow-[0_0_15px_rgba(255,106,0,0.18)] backdrop-blur-md font-mono text-[10.5px] transition-transform duration-300"
          style={{
            transform: `translate(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px)`
          }}
        >
          <div className="text-[9px] text-[#6B6B6B]">ARCHITECTURE</div>
          <div className="text-[#F5F5F5] font-bold text-[11px] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse"></span>
            AI / SYSTEMS
          </div>
        </div>
      </div>

      {/* Technical Labels around artwork */}
      {tags.map((tag) => (
        <div
          key={tag.label}
          className="absolute font-mono text-[9px] tracking-widest px-2 py-0.5 rounded bg-[#111111]/90 border border-[#2A2A2A] text-[#6B6B6B] pointer-events-none"
          style={{
            top: tag.top,
            bottom: tag.bottom,
            left: tag.left,
            right: tag.right,
          }}
        >
          {tag.label}
        </div>
      ))}
    </div>
  );
};
