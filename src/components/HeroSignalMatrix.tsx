import React, { useEffect, useRef, useState } from 'react';
import { soundFx } from '../utils/sound';

interface NodePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  activity: number;
  id: string;
}

export const HeroSignalMatrix: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeMode, setActiveMode] = useState<'lattice' | 'raster' | 'buffer'>('lattice');
  const [telemetryData, setTelemetryData] = useState({
    activeNodes: 28,
    cursorCoord: '000.0, 000.0',
    cycleRate: '60.0 FPS',
    entropyIndex: '0.9412',
    bufferStatus: 'STEADY_STATE'
  });

  const mousePos = useRef({ x: -1000, y: -1000 });
  const pulseRef = useRef<{ x: number; y: number; radius: number; maxRadius: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initNodes();
    };

    window.addEventListener('resize', handleResize);

    // Initialize nodes
    const nodeCount = Math.min(36, Math.floor((width * height) / 12000));
    let nodes: NodePoint[] = [];

    const initNodes = () => {
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          baseRadius: Math.random() * 1.5 + 1.5,
          activity: Math.random(),
          id: `0x${(i * 11).toString(16).padStart(2, '0').toUpperCase()}`
        });
      }
    };

    initNodes();

    let frameCount = 0;
    let lastFpsUpdate = performance.now();

    const render = (time: number) => {
      frameCount++;
      if (time - lastFpsUpdate > 600) {
        const fps = Math.round((frameCount * 1000) / (time - lastFpsUpdate));
        setTelemetryData(prev => ({
          ...prev,
          cycleRate: `${fps}.0 FPS`,
          activeNodes: nodes.length
        }));
        frameCount = 0;
        lastFpsUpdate = time;
      }

      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.classList.contains('light');
      const accentColor = '#FF6A00';
      const nodeColor = isLight ? 'rgba(18, 19, 22, 0.85)' : 'rgba(243, 244, 246, 0.85)';

      // Draw subtle background grid coordinates
      ctx.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.03)' : 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update and draw pulse if active
      if (pulseRef.current) {
        const pulse = pulseRef.current;
        pulse.radius += 3.5;
        ctx.save();
        ctx.strokeStyle = `rgba(255, 85, 0, ${Math.max(0, 1 - pulse.radius / pulse.maxRadius)})`;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        if (pulse.radius >= pulse.maxRadius) {
          pulseRef.current = null;
        }
      }

      if (activeMode === 'lattice') {
        // Mode 1: Cryptographic / Topological Lattice Graph
        // Update nodes
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 10 || n.x > width - 10) n.vx *= -1;
          if (n.y < 10 || n.y > height - 10) n.vy *= -1;

          // Proximity to mouse
          const dx = mousePos.current.x - n.x;
          const dy = mousePos.current.y - n.y;
          const dist = Math.sqrt(dx * dy + dy * dy);

          // Connect nearby nodes
          for (let j = i + 1; j < nodes.length; j++) {
            const n2 = nodes[j];
            const ndx = n.x - n2.x;
            const ndy = n.y - n2.y;
            const nodeDist = Math.sqrt(ndx * ndx + ndy * ndy);

            if (nodeDist < 110) {
              const alpha = (1 - nodeDist / 110) * 0.6;
              ctx.strokeStyle = isLight 
                ? `rgba(0, 0, 0, ${alpha * 0.2})` 
                : `rgba(255, 255, 255, ${alpha * 0.25})`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.stroke();
            }
          }

          // If mouse is close, draw vector line
          if (dist < 140) {
            ctx.strokeStyle = accentColor;
            ctx.lineWidth = 0.9;
            ctx.setLineDash([2, 2]);
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mousePos.current.x, mousePos.current.y);
            ctx.stroke();
            ctx.setLineDash([]);
          }

          // Draw node
          ctx.fillStyle = dist < 90 ? accentColor : nodeColor;
          ctx.beginPath();
          ctx.arc(n.x, n.y, dist < 90 ? n.baseRadius * 1.6 : n.baseRadius, 0, Math.PI * 2);
          ctx.fill();

          // Subtle ID tag for selected nodes
          if (i % 5 === 0 && dist < 120) {
            ctx.font = '9px "JetBrains Mono", monospace';
            ctx.fillStyle = isLight ? '#555' : '#888';
            ctx.fillText(n.id, n.x + 8, n.y - 4);
          }
        }
      } else if (activeMode === 'raster') {
        // Mode 2: Multispectral Raster Simulation (SatQueryAI Inspired)
        const cols = Math.floor(width / 32);
        const rows = Math.floor(height / 32);
        const t = time * 0.001;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const rx = c * 32 + 8;
            const ry = r * 32 + 8;

            const distM = Math.hypot(rx - mousePos.current.x, ry - mousePos.current.y);
            const wave = Math.sin(c * 0.3 + t) * Math.cos(r * 0.3 + t);
            const intensity = Math.max(0, Math.min(1, (wave + 1) * 0.4 + (distM < 80 ? 0.35 : 0)));

            const alpha = intensity * 0.45;
            ctx.fillStyle = distM < 90 
              ? `rgba(255, 85, 0, ${alpha * 0.8})` 
              : isLight 
                ? `rgba(0, 0, 0, ${alpha * 0.3})` 
                : `rgba(255, 255, 255, ${alpha * 0.4})`;

            ctx.fillRect(rx, ry, 20, 20);

            // Subtle spectral index value
            if ((r + c) % 3 === 0 && distM < 90) {
              ctx.font = '8px "JetBrains Mono", monospace';
              ctx.fillStyle = '#FF6A00';
              ctx.fillText((intensity).toFixed(2), rx + 2, ry + 13);
            }
          }
        }
      } else {
        // Mode 3: Constant-Time Memory Buffer Inspector (Systems & Memory Architecture)
        const lines = 12;
        ctx.font = '11px "JetBrains Mono", monospace';
        const startY = 30;

        for (let l = 0; l < lines; l++) {
          const y = startY + l * 26;
          const address = `0x7FFF_${(0x1000 + l * 0x20).toString(16).toUpperCase()}`;
          const isHighlighted = Math.abs(mousePos.current.y - y) < 18;

          ctx.fillStyle = isHighlighted ? '#FF6A00' : isLight ? '#888899' : '#525560';
          ctx.fillText(address, 16, y);

          // Simulated hex buffer bytes
          let bytesStr = '';
          for (let b = 0; b < 8; b++) {
            const val = Math.floor((Math.sin(l * 8 + b + time * 0.002) + 1) * 127);
            bytesStr += `${val.toString(16).padStart(2, '0').toUpperCase()} `;
          }

          ctx.fillStyle = isHighlighted 
            ? (isLight ? '#121316' : '#ffffff') 
            : (isLight ? '#33333e' : '#a1a1aa');
          ctx.fillText(bytesStr, 130, y);

          // Visual bar
          const barWidth = 80;
          const fill = ((Math.sin(l * 1.5 + time * 0.001) + 1) / 2) * barWidth;
          ctx.fillStyle = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)';
          ctx.fillRect(340, y - 9, barWidth, 10);
          ctx.fillStyle = isHighlighted ? '#FF6A00' : isLight ? '#666' : '#8b8e98';
          ctx.fillRect(340, y - 9, fill, 10);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeMode]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePos.current = { x, y };

    setTelemetryData(prev => ({
      ...prev,
      cursorCoord: `${x.toFixed(1).padStart(5, '0')}, ${y.toFixed(1).padStart(5, '0')}`,
      entropyIndex: (0.91 + (x * y) % 0.08).toFixed(4)
    }));
  };

  const handleMouseLeave = () => {
    mousePos.current = { x: -1000, y: -1000 };
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    pulseRef.current = { x, y, radius: 2, maxRadius: 180 };
    soundFx.playClick(880, 0.04);
  };

  return (
    <div className="relative w-full rounded-none border border-dark-border light:border-light-border bg-dark-card/90 light:bg-light-card/90 overflow-hidden font-mono select-none">
      {/* Top telemetry control header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-b border-dark-border light:border-light-border bg-dark-surface light:bg-light-elevated text-[11px]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          <span className="font-semibold text-dark-text light:text-light-text">
            INTERACTIVE_SYSTEM_CANVAS
          </span>
          <span className="text-dark-dim light:text-light-dim hidden sm:inline">
            // LIVE_WORKSPACE_TELEMETRY
          </span>
        </div>

        {/* Mode switch pills */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => { setActiveMode('lattice'); soundFx.playToggle(); }}
            className={`px-2 py-0.5 text-[10px] transition-colors ${
              activeMode === 'lattice'
                ? 'bg-accent text-white font-medium'
                : 'text-dark-muted light:text-light-muted hover:text-dark-text light:hover:text-light-text'
            }`}
          >
            01. LATTICE_NET
          </button>
          <button
            onClick={() => { setActiveMode('raster'); soundFx.playToggle(); }}
            className={`px-2 py-0.5 text-[10px] transition-colors ${
              activeMode === 'raster'
                ? 'bg-accent text-white font-medium'
                : 'text-dark-muted light:text-light-muted hover:text-dark-text light:hover:text-light-text'
            }`}
          >
            02. SPECTRAL_RASTER
          </button>
          <button
            onClick={() => { setActiveMode('buffer'); soundFx.playToggle(); }}
            className={`px-2 py-0.5 text-[10px] transition-colors ${
              activeMode === 'buffer'
                ? 'bg-accent text-white font-medium'
                : 'text-dark-muted light:text-light-muted hover:text-dark-text light:hover:text-light-text'
            }`}
          >
            03. REGISTERS
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="relative h-[280px] sm:h-[340px] w-full cursor-crosshair">
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          className="w-full h-full block"
        />

        {/* Tactical overlay indicators */}
        <div className="absolute top-3 left-3 pointer-events-none text-[10px] text-dark-muted light:text-light-muted space-y-0.5">
          <div>COORD: <span className="text-dark-text light:text-light-text font-bold">{telemetryData.cursorCoord}</span></div>
          <div>MODE: <span className="text-accent uppercase font-semibold">{activeMode}</span></div>
          <div>RATE: <span className="text-dark-text light:text-light-text">{telemetryData.cycleRate}</span></div>
        </div>

        <div className="absolute bottom-3 right-3 pointer-events-none text-[10px] text-dark-muted light:text-light-muted text-right space-y-0.5">
          <div className="text-accent font-semibold flex items-center justify-end gap-1.5">
            <span className="w-1.5 h-1.5 bg-accent rounded-full inline-block"></span>
            CLICK_TO_INJECT_PULSE
          </div>
          <div>ENTROPY_INDEX: <span className="text-dark-text light:text-light-text">{telemetryData.entropyIndex}</span></div>
          <div>STATUS: <span className="text-[#FF6A00] font-semibold">{telemetryData.bufferStatus}</span></div>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 px-3 py-1.5 border-t border-dark-border light:border-light-border bg-dark-surface/50 light:bg-light-elevated/50 text-[10px] text-dark-dim light:text-light-dim">
        <div>SYS: <span className="text-dark-muted light:text-light-muted">ARM/x86_64 OPT</span></div>
        <div>MEM: <span className="text-dark-muted light:text-light-muted">ZERO_LEAK_HEURISTIC</span></div>
        <div className="hidden sm:block">PIPELINE: <span className="text-accent">DETERMINISTIC</span></div>
        <div className="text-right">INTERACTION: <span className="text-dark-text light:text-light-text">ACTIVE</span></div>
      </div>
    </div>
  );
};
