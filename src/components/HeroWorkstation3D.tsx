import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const HeroWorkstation3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isDisposed = false;

    // Detect reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = mediaQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    // Dimensions
    const width = container.clientWidth || 460;
    const height = container.clientHeight || 460;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(13, 9.5, 13);
    camera.lookAt(0, 1.2, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    const canvas = renderer.domElement;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.touchAction = 'none';
    canvas.style.userSelect = 'none';
    canvas.style.setProperty('-webkit-user-select', 'none');
    canvas.style.setProperty('-webkit-user-drag', 'none');
    canvas.style.pointerEvents = 'auto';
    canvas.style.cursor = 'grab';
    container.appendChild(canvas);

    // Root Workstation Group (rotates around Y)
    const workstationGroup = new THREE.Group();
    scene.add(workstationGroup);

    // ─────────────────────────────────────────────────────────
    // LIGHTING SYSTEM
    // ─────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    // Soft warm key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
    keyLight.position.set(8, 14, 10);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.camera.near = 2;
    keyLight.shadow.camera.far = 30;
    keyLight.shadow.camera.left = -6;
    keyLight.shadow.camera.right = 6;
    keyLight.shadow.camera.top = 6;
    keyLight.shadow.camera.bottom = -6;
    scene.add(keyLight);

    // Orange Rim Light (placed behind-left for high-end edge lighting)
    const orangeRimLight = new THREE.DirectionalLight(0xff6a00, 2.4);
    orangeRimLight.position.set(-10, 8, -10);
    scene.add(orangeRimLight);

    // Fill light from low right
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.35);
    fillLight.position.set(10, 2, -6);
    scene.add(fillLight);

    // Subtle orange point light from desk lamp
    const lampLight = new THREE.PointLight(0xff8a3d, 1.2, 6, 1.8);
    lampLight.position.set(2.4, 2.5, -0.6);
    workstationGroup.add(lampLight);

    // ─────────────────────────────────────────────────────────
    // PROCEDURAL TEXTURE GENERATORS (DPI-scaled CanvasTextures)
    // ─────────────────────────────────────────────────────────

    // 1. Main Monitor Code Texture
    const createCodeTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Texture();

      // Background
      ctx.fillStyle = '#0D0E11';
      ctx.fillRect(0, 0, 1024, 512);

      // Top Tab Bar
      ctx.fillStyle = '#16181D';
      ctx.fillRect(0, 0, 1024, 38);
      ctx.fillStyle = '#22252C';
      ctx.fillRect(16, 6, 160, 32);
      ctx.fillStyle = '#FF6A00';
      ctx.fillRect(16, 36, 160, 2);

      ctx.fillStyle = '#F5F5F5';
      ctx.font = 'bold 14px "JetBrains Mono", monospace';
      ctx.fillText('main.py', 40, 26);
      ctx.fillStyle = '#6B6B6B';
      ctx.fillText('neural_net.c', 200, 26);
      ctx.fillText('telemetry.ts', 330, 26);

      // Window dots
      ctx.fillStyle = '#FF6A00';
      ctx.beginPath();
      ctx.arc(990, 19, 5, 0, Math.PI * 2);
      ctx.fill();

      // Code Lines
      ctx.font = '13px "JetBrains Mono", monospace';
      const lines = [
        { no: '01', code: 'import torch', color: '#FF7A18' },
        { no: '02', code: 'import numpy as np', color: '#FF7A18' },
        { no: '03', code: 'from core.systems import Pipeline, DistributedCore', color: '#888888' },
        { no: '04', code: '', color: '#888888' },
        { no: '05', code: 'class AutonomousInferenceEngine:', color: '#F5F5F5' },
        { no: '06', code: '    def __init__(self, latency_budget_ms: float = 0.85):', color: '#CCCCCC' },
        { no: '07', code: '        self.weights = self.load_quantized_tensors()', color: '#FF6A00' },
        { no: '08', code: '        self.stream = torch.cuda.Stream(priority=-1)', color: '#CCCCCC' },
        { no: '09', code: '        self.telemetry = RingBuffer(capacity=1024)', color: '#FF8A24' },
        { no: '10', code: '', color: '#888888' },
        { no: '11', code: '    def forward(self, x: torch.Tensor) -> dict:', color: '#F5F5F5' },
        { no: '12', code: '        with torch.cuda.stream(self.stream):', color: '#CCCCCC' },
        { no: '13', code: '            features = self.conv_backbone(x)', color: '#CCCCCC' },
        { no: '14', code: '            return {"confidence": 0.998, "status": "OPTIMAL"}', color: '#FF7A18' },
      ];

      lines.forEach((l, idx) => {
        const y = 70 + idx * 24;
        ctx.fillStyle = '#444444';
        ctx.fillText(l.no, 24, y);
        ctx.fillStyle = l.color;
        ctx.fillText(l.code, 60, y);
      });

      // Bottom Terminal Bar
      ctx.fillStyle = '#121418';
      ctx.fillRect(0, 430, 1024, 82);
      ctx.strokeStyle = '#22252C';
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 430, 1024, 1);

      ctx.fillStyle = '#FF6A00';
      ctx.fillText('shanmukha@system:~$', 24, 465);
      ctx.fillStyle = '#F5F5F5';
      ctx.fillText('python3 -m inference --eval-realtime --cuda-stream', 210, 465);
      ctx.fillStyle = '#6B6B6B';
      ctx.fillText('>>> [PASS] All 48 tests verified in 0.42s // Zero memory leaks detected', 24, 492);

      const tex = new THREE.CanvasTexture(canvas);
      tex.minFilter = THREE.LinearFilter;
      return tex;
    };

    // 2. Vertical Telemetry Screen Texture
    const createTelemetryTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 768;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Texture();

      ctx.fillStyle = '#0D0E11';
      ctx.fillRect(0, 0, 512, 768);

      // Header
      ctx.fillStyle = '#16181D';
      ctx.fillRect(0, 0, 512, 44);
      ctx.fillStyle = '#FF6A00';
      ctx.font = 'bold 15px "JetBrains Mono", monospace';
      ctx.fillText('// TELEMETRY_STREAM', 20, 28);

      // System Metric Boxes
      const metrics = [
        { label: 'CPU CORE FREQ', val: '4.80 GHz', bar: 0.85 },
        { label: 'CUDA COMPUTE', val: '99.4% UTIL', bar: 0.94 },
        { label: 'VRAM BUFFER', val: '12.4 / 16 GB', bar: 0.77 },
        { label: 'LATENCY', val: '0.42 ms', bar: 0.25 },
      ];

      metrics.forEach((m, idx) => {
        const y = 70 + idx * 80;
        ctx.fillStyle = '#16181D';
        ctx.fillRect(20, y, 472, 65);
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.strokeRect(20, y, 472, 65);

        ctx.fillStyle = '#888888';
        ctx.font = '11px "JetBrains Mono", monospace';
        ctx.fillText(m.label, 36, y + 25);

        ctx.fillStyle = '#F5F5F5';
        ctx.font = 'bold 15px "JetBrains Mono", monospace';
        ctx.fillText(m.val, 36, y + 48);

        // Progress track
        ctx.fillStyle = '#222222';
        ctx.fillRect(240, y + 36, 230, 8);
        ctx.fillStyle = '#FF6A00';
        ctx.fillRect(240, y + 36, 230 * m.bar, 8);
      });

      // Waveform graph
      ctx.fillStyle = '#16181D';
      ctx.fillRect(20, 420, 472, 310);
      ctx.strokeStyle = '#FF6A00';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < 472; x += 4) {
        const wave = Math.sin(x * 0.05) * 45 + Math.cos(x * 0.12) * 20;
        const y = 575 + wave;
        if (x === 0) ctx.moveTo(20 + x, y);
        else ctx.lineTo(20 + x, y);
      }
      ctx.stroke();

      ctx.fillStyle = '#6B6B6B';
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.fillText('SPECTRUM ANALYSIS // REAL-TIME SAMPLING', 36, 450);

      const tex = new THREE.CanvasTexture(canvas);
      tex.minFilter = THREE.LinearFilter;
      return tex;
    };

    // 3. Laptop Screen Texture
    const createLaptopTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 320;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Texture();

      ctx.fillStyle = '#111317';
      ctx.fillRect(0, 0, 512, 320);

      // Top bar
      ctx.fillStyle = '#181B20';
      ctx.fillRect(0, 0, 512, 28);
      ctx.fillStyle = '#FF6A00';
      ctx.fillRect(16, 6, 8, 8);

      ctx.fillStyle = '#F5F5F5';
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.fillText('STUDYBUDDY // MONGODB ATLAS SYNC', 34, 20);

      // JSON payload
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.fillStyle = '#888888';
      ctx.fillText('{ "status": "CONNECTED", "latency": "14ms",', 20, 60);
      ctx.fillStyle = '#FF7A18';
      ctx.fillText('  "active_users": 184, "sync_interval": "10s",', 20, 85);
      ctx.fillStyle = '#CCCCCC';
      ctx.fillText('  "db_name": "studybuddy_prod_cluster",', 20, 110);
      ctx.fillStyle = '#FF6A00';
      ctx.fillText('  "algorithm": "Spaced_Repetition_Priority_Queue",', 20, 135);
      ctx.fillStyle = '#888888';
      ctx.fillText('  "cache_hit_ratio": 0.984 }', 20, 160);

      // Mini bar graph
      for (let i = 0; i < 16; i++) {
        const barH = 20 + Math.sin(i * 0.7) * 35 + Math.random() * 15;
        ctx.fillStyle = i === 12 ? '#FF6A00' : '#2A2E38';
        ctx.fillRect(20 + i * 28, 280 - barH, 20, barH);
      }

      const tex = new THREE.CanvasTexture(canvas);
      tex.minFilter = THREE.LinearFilter;
      return tex;
    };

    // 4. Floating 3D Info Panel Texture Creator
    const createInfoPanelTexture = (title: string, lines: string[], accentText?: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Texture();

      // Translucent tech background
      ctx.fillStyle = '#101216';
      ctx.fillRect(0, 0, 512, 256);

      // Outer border with accent corner
      ctx.strokeStyle = '#2A2D35';
      ctx.lineWidth = 4;
      ctx.strokeRect(4, 4, 504, 248);

      ctx.fillStyle = '#FF6A00';
      ctx.fillRect(4, 4, 40, 4);
      ctx.fillRect(4, 4, 4, 40);

      // Title
      ctx.fillStyle = '#FF6A00';
      ctx.font = 'bold 20px "JetBrains Mono", monospace';
      ctx.fillText(title, 28, 45);

      // Content Lines
      ctx.fillStyle = '#F5F5F5';
      ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
      lines.forEach((line, idx) => {
        ctx.fillText(line, 28, 90 + idx * 30);
      });

      if (accentText) {
        ctx.fillStyle = '#FF7A18';
        ctx.font = '14px "JetBrains Mono", monospace';
        ctx.fillText(accentText, 28, 220);
      }

      const tex = new THREE.CanvasTexture(canvas);
      tex.minFilter = THREE.LinearFilter;
      return tex;
    };

    // 5. Contact Shadow Radial Texture
    const createShadowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Texture();

      const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
      grad.addColorStop(0.4, 'rgba(0, 0, 0, 0.35)');
      grad.addColorStop(0.8, 'rgba(0, 0, 0, 0.08)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);

      return new THREE.CanvasTexture(canvas);
    };

    // Shared Materials
    const darkDeskMaterial = new THREE.MeshStandardMaterial({
      color: 0x16181d,
      roughness: 0.35,
      metalness: 0.15
    });
    const orangeAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xff6a00,
      roughness: 0.25,
      metalness: 0.5,
      emissive: 0xd95400,
      emissiveIntensity: 0.3
    });
    const matteBlackMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f1012,
      roughness: 0.5,
      metalness: 0.3
    });
    const aluminumMaterial = new THREE.MeshStandardMaterial({
      color: 0x888b94,
      roughness: 0.25,
      metalness: 0.85
    });

    // ─────────────────────────────────────────────────────────
    // 3D GEOMETRY CONSTRUCTION
    // ─────────────────────────────────────────────────────────

    // 1. Desk Tabletop
    const deskTop = new THREE.Mesh(
      new THREE.BoxGeometry(6.8, 0.18, 3.6),
      darkDeskMaterial
    );
    deskTop.position.set(0, 0, 0);
    deskTop.castShadow = true;
    deskTop.receiveShadow = true;
    workstationGroup.add(deskTop);

    // Front edge orange bevel line
    const frontEdgeTrim = new THREE.Mesh(
      new THREE.BoxGeometry(6.82, 0.04, 0.03),
      orangeAccentMaterial
    );
    frontEdgeTrim.position.set(0, -0.06, 1.81);
    workstationGroup.add(frontEdgeTrim);

    // Desk Legs (Dual black metal frames)
    const legGeo = new THREE.BoxGeometry(0.14, 4.0, 3.2);
    const leftLeg = new THREE.Mesh(legGeo, matteBlackMaterial);
    leftLeg.position.set(-3.1, -2.0, 0);
    leftLeg.castShadow = true;
    workstationGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, matteBlackMaterial);
    rightLeg.position.set(3.1, -2.0, 0);
    rightLeg.castShadow = true;
    workstationGroup.add(rightLeg);

    // Leg crossbar support
    const crossbar = new THREE.Mesh(
      new THREE.BoxGeometry(6.1, 0.1, 0.1),
      matteBlackMaterial
    );
    crossbar.position.set(0, -3.2, -0.6);
    workstationGroup.add(crossbar);

    // Desk Pad
    const deskPad = new THREE.Mesh(
      new THREE.BoxGeometry(5.0, 0.02, 2.2),
      new THREE.MeshStandardMaterial({ color: 0x101114, roughness: 0.8 })
    );
    deskPad.position.set(0, 0.1, 0.3);
    deskPad.receiveShadow = true;
    workstationGroup.add(deskPad);

    // 2. Center Ultrawide Monitor
    const centerMonitorGroup = new THREE.Group();
    centerMonitorGroup.position.set(-0.2, 0, -0.7);

    // Monitor Stand
    const standBase = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.04, 0.8), aluminumMaterial);
    standBase.position.set(0, 0.12, 0);
    centerMonitorGroup.add(standBase);

    const standPole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.6, 16), aluminumMaterial);
    standPole.position.set(0, 0.9, -0.15);
    centerMonitorGroup.add(standPole);

    // Monitor Bezel
    const monitorBezel = new THREE.Mesh(
      new THREE.BoxGeometry(3.8, 1.9, 0.12),
      matteBlackMaterial
    );
    monitorBezel.position.set(0, 1.8, -0.1);
    monitorBezel.castShadow = true;
    centerMonitorGroup.add(monitorBezel);

    // Monitor Screen with Code
    const codeTexture = createCodeTexture();
    const monitorScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(3.7, 1.8),
      new THREE.MeshStandardMaterial({
        map: codeTexture,
        roughness: 0.2,
        emissive: 0xff6a00,
        emissiveIntensity: 0.15
      })
    );
    monitorScreen.position.set(0, 1.8, -0.035);
    centerMonitorGroup.add(monitorScreen);

    // Thin orange ambient lightbar on top of monitor
    const monitorLightbar = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 0.04, 0.06),
      orangeAccentMaterial
    );
    monitorLightbar.position.set(0, 2.8, -0.05);
    centerMonitorGroup.add(monitorLightbar);

    workstationGroup.add(centerMonitorGroup);

    // 3. Vertical Telemetry Monitor (Left, Angled)
    const verticalMonitorGroup = new THREE.Group();
    verticalMonitorGroup.position.set(-2.55, 0, -0.3);
    verticalMonitorGroup.rotation.y = 0.38;

    const vStandBase = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.04, 16), aluminumMaterial);
    vStandBase.position.set(0, 0.12, 0);
    verticalMonitorGroup.add(vStandBase);

    const vStandPole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.6, 16), aluminumMaterial);
    vStandPole.position.set(0, 0.9, 0);
    verticalMonitorGroup.add(vStandPole);

    const vMonitorBezel = new THREE.Mesh(
      new THREE.BoxGeometry(1.25, 2.3, 0.1),
      matteBlackMaterial
    );
    vMonitorBezel.position.set(0, 1.75, 0);
    vMonitorBezel.castShadow = true;
    verticalMonitorGroup.add(vMonitorBezel);

    const telemetryTexture = createTelemetryTexture();
    const vMonitorScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(1.18, 2.2),
      new THREE.MeshStandardMaterial({
        map: telemetryTexture,
        roughness: 0.2,
        emissive: 0xff6a00,
        emissiveIntensity: 0.18
      })
    );
    vMonitorScreen.position.set(0, 1.75, 0.055);
    verticalMonitorGroup.add(vMonitorScreen);

    workstationGroup.add(verticalMonitorGroup);

    // 4. Laptop (Right Side, Tilted)
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(2.2, 0.1, 0.3);
    laptopGroup.rotation.y = -0.45;

    // Laptop Base
    const laptopBase = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 0.05, 1.05),
      aluminumMaterial
    );
    laptopBase.position.set(0, 0.03, 0);
    laptopBase.castShadow = true;
    laptopGroup.add(laptopBase);

    // Keyboard on laptop base
    const laptopKeyGrid = new THREE.Mesh(
      new THREE.BoxGeometry(1.3, 0.015, 0.6),
      new THREE.MeshStandardMaterial({ color: 0x141416, roughness: 0.6 })
    );
    laptopKeyGrid.position.set(0, 0.06, -0.15);
    laptopGroup.add(laptopKeyGrid);

    // Laptop Screen (Open at 115 deg)
    const laptopLidGroup = new THREE.Group();
    laptopLidGroup.position.set(0, 0.055, -0.5);
    laptopLidGroup.rotation.x = -0.45;

    const laptopLid = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 1.0, 0.04),
      aluminumMaterial
    );
    laptopLid.position.set(0, 0.5, 0);
    laptopLid.castShadow = true;
    laptopLidGroup.add(laptopLid);

    const laptopTexture = createLaptopTexture();
    const laptopScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(1.42, 0.92),
      new THREE.MeshStandardMaterial({
        map: laptopTexture,
        roughness: 0.25,
        emissive: 0xff6a00,
        emissiveIntensity: 0.15
      })
    );
    laptopScreen.position.set(0, 0.5, 0.022);
    laptopLidGroup.add(laptopScreen);

    laptopGroup.add(laptopLidGroup);
    workstationGroup.add(laptopGroup);

    // 5. Mechanical Keyboard
    const kbGroup = new THREE.Group();
    kbGroup.position.set(-0.3, 0.11, 0.7);

    const kbBody = new THREE.Mesh(
      new THREE.BoxGeometry(1.9, 0.08, 0.7),
      new THREE.MeshStandardMaterial({ color: 0x181a1f, roughness: 0.5 })
    );
    kbBody.position.set(0, 0.04, 0);
    kbBody.castShadow = true;
    kbGroup.add(kbBody);

    // Keycaps layout
    const keycaps = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 0.04, 0.6),
      new THREE.MeshStandardMaterial({ color: 0x282c34, roughness: 0.4 })
    );
    keycaps.position.set(0, 0.09, 0);
    kbGroup.add(keycaps);

    // Orange accent keycaps (ESC, Enter, Space highlight)
    const escKey = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.05, 0.1), orangeAccentMaterial);
    escKey.position.set(-0.8, 0.1, -0.22);
    kbGroup.add(escKey);

    const enterKey = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.05, 0.1), orangeAccentMaterial);
    enterKey.position.set(0.75, 0.1, 0.02);
    kbGroup.add(enterKey);

    const spaceBar = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.05, 0.1), orangeAccentMaterial);
    spaceBar.position.set(-0.05, 0.1, 0.22);
    kbGroup.add(spaceBar);

    workstationGroup.add(kbGroup);

    // 6. Ergonomic Mouse
    const mouseGroup = new THREE.Group();
    mouseGroup.position.set(1.15, 0.11, 0.7);

    const mouseBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.36, 0.14, 0.6),
      new THREE.MeshStandardMaterial({ color: 0x1e2025, roughness: 0.35 })
    );
    mouseBody.position.set(0, 0.07, 0);
    mouseBody.castShadow = true;
    mouseGroup.add(mouseBody);

    const mouseStripe = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.02, 0.4),
      orangeAccentMaterial
    );
    mouseStripe.position.set(0, 0.14, -0.05);
    mouseGroup.add(mouseStripe);

    workstationGroup.add(mouseGroup);

    // 7. Modern Desk Lamp
    const lampGroup = new THREE.Group();
    lampGroup.position.set(2.4, 0.1, -0.9);

    const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.04, 16), matteBlackMaterial);
    lampBase.position.set(0, 0.02, 0);
    lampGroup.add(lampBase);

    // Lower Arm
    const lampArm1 = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.4, 12), aluminumMaterial);
    lampArm1.position.set(-0.25, 0.7, 0.2);
    lampArm1.rotation.z = 0.35;
    lampArm1.rotation.x = -0.2;
    lampGroup.add(lampArm1);

    // Upper Arm
    const lampArm2 = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.2, 12), aluminumMaterial);
    lampArm2.position.set(-0.7, 1.7, 0.4);
    lampArm2.rotation.z = -0.55;
    lampArm2.rotation.x = 0.3;
    lampGroup.add(lampArm2);

    // Lamp Shade
    const lampShade = new THREE.Mesh(
      new THREE.ConeGeometry(0.24, 0.36, 16, 1, true),
      matteBlackMaterial
    );
    lampShade.position.set(-1.1, 2.1, 0.55);
    lampShade.rotation.z = -1.2;
    lampShade.rotation.x = 0.5;
    lampGroup.add(lampShade);

    // Glowing bulb inside shade
    const lampBulb = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 12, 12),
      orangeAccentMaterial
    );
    lampBulb.position.set(-1.08, 2.05, 0.52);
    lampGroup.add(lampBulb);

    workstationGroup.add(lampGroup);

    // 8. Studio Headphones on Aluminum Stand
    const hpGroup = new THREE.Group();
    hpGroup.position.set(-2.8, 0.1, 0.9);

    const hpBase = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.03, 16), aluminumMaterial);
    hpBase.position.set(0, 0.015, 0);
    hpGroup.add(hpBase);

    const hpPole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.1, 12), aluminumMaterial);
    hpPole.position.set(0, 0.56, 0);
    hpGroup.add(hpPole);

    const hpHanger = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.03, 0.12), aluminumMaterial);
    hpHanger.position.set(0, 1.1, 0);
    hpGroup.add(hpHanger);

    // Headband
    const hpBand = new THREE.Mesh(
      new THREE.TorusGeometry(0.26, 0.03, 8, 24, Math.PI),
      matteBlackMaterial
    );
    hpBand.position.set(0, 1.08, 0);
    hpBand.rotation.x = Math.PI / 2;
    hpGroup.add(hpBand);

    // Earcups
    const earcupGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.08, 16);
    const leftCup = new THREE.Mesh(earcupGeo, orangeAccentMaterial);
    leftCup.position.set(-0.24, 0.86, 0);
    leftCup.rotation.z = Math.PI / 2;
    hpGroup.add(leftCup);

    const rightCup = new THREE.Mesh(earcupGeo, orangeAccentMaterial);
    rightCup.position.set(0.24, 0.86, 0);
    rightCup.rotation.z = Math.PI / 2;
    hpGroup.add(rightCup);

    workstationGroup.add(hpGroup);

    // 9. Stack of Technical Books & Notebook
    const booksGroup = new THREE.Group();
    booksGroup.position.set(1.4, 0.1, -0.6);
    booksGroup.rotation.y = 0.25;

    // Book 1 (Bottom)
    const book1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.85, 0.12, 1.15),
      new THREE.MeshStandardMaterial({ color: 0x22252c, roughness: 0.7 })
    );
    book1.position.set(0, 0.06, 0);
    book1.castShadow = true;
    booksGroup.add(book1);

    const spine1 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.12, 1.15), orangeAccentMaterial);
    spine1.position.set(-0.41, 0.06, 0);
    booksGroup.add(spine1);

    // Book 2 (Top)
    const book2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.78, 0.1, 1.05),
      new THREE.MeshStandardMaterial({ color: 0x14161a, roughness: 0.6 })
    );
    book2.position.set(0.02, 0.17, 0.04);
    book2.rotation.y = -0.15;
    book2.castShadow = true;
    booksGroup.add(book2);

    const spine2 = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.1, 1.05), orangeAccentMaterial);
    spine2.position.set(-0.38, 0.17, 0.04);
    spine2.rotation.y = -0.15;
    booksGroup.add(spine2);

    workstationGroup.add(booksGroup);

    // Technical Notebook in front
    const notebook = new THREE.Mesh(
      new THREE.BoxGeometry(0.75, 0.04, 1.0),
      new THREE.MeshStandardMaterial({ color: 0x2a2a2e, roughness: 0.6 })
    );
    notebook.position.set(-1.6, 0.12, 0.7);
    notebook.rotation.y = 0.18;
    notebook.castShadow = true;
    workstationGroup.add(notebook);

    const pen = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.015, 0.75, 8),
      orangeAccentMaterial
    );
    pen.position.set(-1.25, 0.14, 0.75);
    pen.rotation.z = Math.PI / 2;
    pen.rotation.y = 0.18;
    workstationGroup.add(pen);

    // 10. Small Succulent Plant in Hexagonal Pot
    const plantGroup = new THREE.Group();
    plantGroup.position.set(-1.8, 0.1, -0.85);

    const pot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.18, 0.38, 6),
      new THREE.MeshStandardMaterial({ color: 0xe5e5e5, roughness: 0.3 })
    );
    pot.position.set(0, 0.19, 0);
    pot.castShadow = true;
    plantGroup.add(pot);

    // Soil
    const soil = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.22, 0.04, 12),
      new THREE.MeshStandardMaterial({ color: 0x1f1914, roughness: 0.9 })
    );
    soil.position.set(0, 0.38, 0);
    plantGroup.add(soil);

    // Geometric Succulent Leaves (stylized dark green with warm tips)
    const leafGeo = new THREE.ConeGeometry(0.08, 0.25, 5);
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x2e3d34, roughness: 0.6 });
    for (let i = 0; i < 7; i++) {
      const angle = (i / 7) * Math.PI * 2;
      const leaf = new THREE.Mesh(leafGeo, leafMat);
      leaf.position.set(Math.cos(angle) * 0.1, 0.45, Math.sin(angle) * 0.1);
      leaf.rotation.x = Math.sin(angle) * 0.45;
      leaf.rotation.z = -Math.cos(angle) * 0.45;
      plantGroup.add(leaf);
    }
    workstationGroup.add(plantGroup);

    // 11. Subtle Geodesic Tech Globe on Stand
    const globeGroup = new THREE.Group();
    globeGroup.position.set(0.9, 0.1, -0.85);

    const globeStand = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.03, 16), aluminumMaterial);
    globeStand.position.set(0, 0.015, 0);
    globeGroup.add(globeStand);

    const globePole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.45, 8), aluminumMaterial);
    globePole.position.set(0, 0.24, 0);
    globeGroup.add(globePole);

    const globeMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.28, 2),
      new THREE.MeshStandardMaterial({
        color: 0x111111,
        wireframe: true,
        emissive: 0xff6a00,
        emissiveIntensity: 0.4
      })
    );
    globeMesh.position.set(0, 0.52, 0);
    globeGroup.add(globeMesh);

    workstationGroup.add(globeGroup);

    // 12. Compact Modern PC Tower (Under/beside desk)
    const pcGroup = new THREE.Group();
    pcGroup.position.set(3.4, -1.8, 0.2);

    const pcChassis = new THREE.Mesh(
      new THREE.BoxGeometry(0.95, 2.2, 2.1),
      new THREE.MeshStandardMaterial({ color: 0x121418, roughness: 0.4 })
    );
    pcChassis.castShadow = true;
    pcGroup.add(pcChassis);

    // Glass panel
    const pcGlass = new THREE.Mesh(
      new THREE.PlaneGeometry(2.0, 2.05),
      new THREE.MeshPhysicalMaterial({
        color: 0x22252a,
        transmission: 0.85,
        opacity: 0.9,
        transparent: true,
        roughness: 0.1,
        metalness: 0.1
      })
    );
    pcGlass.position.set(-0.48, 0, 0);
    pcGlass.rotation.y = -Math.PI / 2;
    pcGroup.add(pcGlass);

    // Internal glowing GPU / RAM accents
    const pcGpu = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.18, 1.4),
      new THREE.MeshStandardMaterial({ color: 0x242830, roughness: 0.5 })
    );
    pcGpu.position.set(0, -0.2, 0);
    pcGroup.add(pcGpu);

    const ramGlow = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.35, 0.4),
      orangeAccentMaterial
    );
    ramGlow.position.set(0.15, 0.4, -0.2);
    pcGroup.add(ramGlow);

    // Exhaust fan glowing ring
    const fanRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.28, 0.02, 8, 24),
      orangeAccentMaterial
    );
    fanRing.position.set(0, 0.4, -0.98);
    pcGroup.add(fanRing);

    workstationGroup.add(pcGroup);

    // 13. Ground Contact Shadow
    const shadowTex = createShadowTexture();
    const groundShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 8),
      new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        opacity: 0.75,
        depthWrite: false
      })
    );
    groundShadow.position.set(0, -4.01, 0);
    groundShadow.rotation.x = -Math.PI / 2;
    workstationGroup.add(groundShadow);

    // ─────────────────────────────────────────────────────────
    // FLOATING 3D INFORMATION PANELS (Real Depth & Parallax)
    // ─────────────────────────────────────────────────────────
    const panelGeo = new THREE.PlaneGeometry(2.2, 1.1);

    // Panel 1: FOCUS (Top Left, elevated)
    const focusTex = createInfoPanelTexture(
      '// FOCUS',
      ['Software Engineering', 'AI / ML Architectures', 'Problem Solving'],
      'PRIORITY: ACTIVE'
    );
    const focusPanel = new THREE.Mesh(
      panelGeo,
      new THREE.MeshBasicMaterial({ map: focusTex, transparent: true, opacity: 0.95, side: THREE.DoubleSide })
    );
    focusPanel.position.set(-3.6, 3.8, 0.2);
    focusPanel.rotation.y = 0.25;
    focusPanel.rotation.x = -0.05;
    workstationGroup.add(focusPanel);

    // Panel 2: TOOLS (Top Right, slightly recessed)
    const toolsTex = createInfoPanelTexture(
      '// TOOLS',
      ['Python · C · MongoDB', 'HTML / CSS · JavaScript', 'Git · GitHub · Blender'],
      'CORE STACK // VERIFIED'
    );
    const toolsPanel = new THREE.Mesh(
      panelGeo,
      new THREE.MeshBasicMaterial({ map: toolsTex, transparent: true, opacity: 0.95, side: THREE.DoubleSide })
    );
    toolsPanel.position.set(3.4, 3.6, -0.6);
    toolsPanel.rotation.y = -0.3;
    toolsPanel.rotation.x = -0.05;
    workstationGroup.add(toolsPanel);

    // Panel 3: CURRENTLY (Bottom Left foreground)
    const currTex = createInfoPanelTexture(
      '// CURRENTLY',
      ['Building Projects', 'Learning New Tech', 'Exploring AI'],
      'STATUS: ITERATING'
    );
    const currPanel = new THREE.Mesh(
      panelGeo,
      new THREE.MeshBasicMaterial({ map: currTex, transparent: true, opacity: 0.95, side: THREE.DoubleSide })
    );
    currPanel.position.set(-3.4, 0.4, 1.8);
    currPanel.rotation.y = 0.35;
    currPanel.rotation.x = 0.1;
    workstationGroup.add(currPanel);

    // Panel 4: GOAL (Bottom Right foreground)
    const goalTex = createInfoPanelTexture(
      '// GOAL',
      ['Software Engineer', 'Systems & Intelligence', '2025 → 2029'],
      'TRAJECTORY: ON TRACK'
    );
    const goalPanel = new THREE.Mesh(
      panelGeo,
      new THREE.MeshBasicMaterial({ map: goalTex, transparent: true, opacity: 0.95, side: THREE.DoubleSide })
    );
    goalPanel.position.set(3.3, 0.7, 1.6);
    goalPanel.rotation.y = -0.28;
    goalPanel.rotation.x = 0.08;
    workstationGroup.add(goalPanel);

    // Initial slight angle so diorama looks immediately appealing
    workstationGroup.position.set(0, 0.3, 0);

    // ─────────────────────────────────────────────────────────
    // INTERACTION & ANIMATION LOOP
    // ─────────────────────────────────────────────────────────
    let autoRotationY = -Math.PI * 0.15; // Initial starting angle (~27 deg)
    let manualRotationY = 0;
    let manualRotationX = 0;
    let targetMouseOffsetX = 0;
    let targetMouseOffsetY = 0;
    let mouseOffsetX = 0;
    let mouseOffsetY = 0;

    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      e.preventDefault();

      isDragging = true;
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
      canvas.style.cursor = 'grabbing';
      setIsDragging(true);

      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {}
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDragging) {
        e.preventDefault();
        const deltaX = e.clientX - previousPointerX;
        const deltaY = e.clientY - previousPointerY;
        previousPointerX = e.clientX;
        previousPointerY = e.clientY;

        // Direct manual rotation from drag delta
        const sensitivity = 0.0075;
        manualRotationY += deltaX * sensitivity;
        manualRotationX += deltaY * (sensitivity * 0.75);

        // Clamp vertical tilt to prevent flipping (approx ±25 deg = ±0.45 rad)
        manualRotationX = Math.max(-0.45, Math.min(0.45, manualRotationX));

        // When dragging, mouse hover parallax does not fight with drag
        targetMouseOffsetX = 0;
        targetMouseOffsetY = 0;
      } else {
        // When not dragging: subtle cursor hover parallax
        const rect = canvas.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / rect.width - 0.5;
        const normY = (e.clientY - rect.top) / rect.height - 0.5;

        // Subtle hover offset: Y up to ±10° (0.17 rad), X up to ±6° (0.10 rad)
        targetMouseOffsetY = normX * (10 * Math.PI / 180);
        targetMouseOffsetX = normY * (6 * Math.PI / 180);
        setIsInteracting(true);
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (isDragging) {
        isDragging = false;
        canvas.style.cursor = 'grab';
        setIsDragging(false);
        try {
          canvas.releasePointerCapture(e.pointerId);
        } catch {}
      }
    };

    const onPointerLeave = () => {
      if (!isDragging) {
        targetMouseOffsetX = 0;
        targetMouseOffsetY = 0;
        setIsInteracting(false);
      }
    };

    const onDragStart = (e: Event) => {
      e.preventDefault();
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);
    canvas.addEventListener('pointerleave', onPointerLeave);
    canvas.addEventListener('dragstart', onDragStart);

    // Global safety listeners
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    // Handle Resize
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation Clock
    const clock = new THREE.Clock();

    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();

      // 1. Continuous slow automatic rotation around Y-axis
      // 1 full revolution every ~28 seconds (0.224 rad/s)
      // CONTINUOUS AND NEVER STOPS
      if (!prefersReducedMotion) {
        autoRotationY += delta * 0.224;
      }

      // 2. Smooth damping for mouse hover parallax
      const lerpSpeed = Math.min(1, delta * 6.0);
      mouseOffsetX += (targetMouseOffsetX - mouseOffsetX) * lerpSpeed;
      mouseOffsetY += (targetMouseOffsetY - mouseOffsetY) * lerpSpeed;

      // 3. Final Combined Rotation:
      // finalY = autoRotationY + manualRotationY + mouseOffsetY
      // finalX = manualRotationX + mouseOffsetX
      workstationGroup.rotation.y = autoRotationY + manualRotationY + mouseOffsetY;
      workstationGroup.rotation.x = manualRotationX + mouseOffsetX;

      // Subtle float animation for panels
      const time = clock.getElapsedTime();
      focusPanel.position.y = 3.8 + Math.sin(time * 1.5) * 0.08;
      toolsPanel.position.y = 3.6 + Math.cos(time * 1.3) * 0.08;
      currPanel.position.y = 0.4 + Math.sin(time * 1.4 + 1) * 0.06;
      goalPanel.position.y = 0.7 + Math.cos(time * 1.6 + 2) * 0.06;

      // Slow spin for the globe wireframe
      globeMesh.rotation.y += delta * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    // ─────────────────────────────────────────────────────────
    // CLEANUP
    // ─────────────────────────────────────────────────────────
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      mediaQuery.removeEventListener('change', handleMotionChange);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('dragstart', onDragStart);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      resizeObserver.disconnect();

      // Dispose Three resources
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else if (obj.material) {
            obj.material.dispose();
          }
        }
      });

      renderer.dispose();
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div className="relative w-full max-w-[480px] sm:max-w-[540px] lg:max-w-[580px] h-[400px] sm:h-[480px] lg:h-[520px] flex items-center justify-center select-none ml-auto">
      {/* Deep Soft Orange Ambient Glow Behind 3D Scene */}
      <div className="absolute w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full bg-[#FF6A00]/[0.12] blur-[110px] pointer-events-none transform translate-x-4"></div>
      <div className="absolute w-[180px] h-[180px] rounded-full bg-[#FF8A24]/[0.10] blur-[70px] pointer-events-none"></div>

      {/* 3D WebGL Canvas Container with Drag & Hover Feedback */}
      <div 
        ref={mountRef} 
        style={{ pointerEvents: 'auto', touchAction: 'none' }}
        className="w-full h-full relative z-20 touch-none select-none"
      />

      {/* Subtle Technical Label Badge: DRAG TO EXPLORE ↔ */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 pointer-events-none font-mono text-[10px] text-[#A0A0A0]/80 uppercase tracking-widest flex items-center gap-2 px-3 py-1 rounded bg-[#111111]/80 border border-white/[0.08] backdrop-blur-sm shadow-sm whitespace-nowrap select-none">
        <span className={`w-1.5 h-1.5 rounded-full ${isDragging ? 'bg-[#FF6A00] animate-ping' : isInteracting ? 'bg-[#FF7A18]' : 'bg-[#FF6A00]/70'}`}></span>
        <span>DRAG TO EXPLORE ↔</span>
      </div>
    </div>
  );
};
