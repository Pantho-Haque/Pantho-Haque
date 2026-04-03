"use client";
import { useEffect, useRef } from "react";

export default function GridLightning() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false }); // alpha:false = faster compositing
    if (!ctx) return;

    // Adaptive quality: reduce bolt count on low-DPR / low-end devices
    const isLowEnd = window.devicePixelRatio < 1.5 || navigator.hardwareConcurrency <= 2;
    const CELL     = 56;
    const TRAIL    = isLowEnd ? 6 : 9;
    const SPEED    = 0.045;
    const NUM      = isLowEnd ? 9 : 14;
    const BG       = "#050d10";

    let raf: number;
    let W = 0, H = 0;
    let frameCount = 0;

    // Resize without devicePixelRatio scaling — 1:1 is fine for a background effect
    function resize() {
      W = canvas!.width  = window.innerWidth;
      H = canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    type Seg = { x1: number; y1: number; x2: number; y2: number };
    type Bolt = {
      gx: number; gy: number;
      dir: number;
      t: number;
      speed: number;
      hue: number;
      trail: Seg[];
      turnBias: number;
      lifetime: number;
      age: number;
    };

    const cols = () => Math.floor(W / CELL) + 1;
    const rows = () => Math.floor(H / CELL) + 1;

    function spawnBolt(): Bolt {
      const c = cols(), r = rows();
      const regions = [0, 1, 2, 3, 4, 4, 5, 5, 6, 6, 7, 7];
      const region  = regions[Math.floor(Math.random() * regions.length)];
      const D = 3; // edge depth in cells
      let gx: number, gy: number, dir: number;

      switch (region) {
        case 0: gx = Math.floor(Math.random() * c);           gy = Math.floor(Math.random() * D);               dir = 1; break;
        case 1: gx = Math.floor(Math.random() * c);           gy = r - 1 - Math.floor(Math.random() * D);       dir = 3; break;
        case 2: gx = Math.floor(Math.random() * D);           gy = Math.floor(Math.random() * r);               dir = 0; break;
        case 3: gx = c - 1 - Math.floor(Math.random() * D);  gy = Math.floor(Math.random() * r);               dir = 2; break;
        case 4: gx = Math.floor(Math.random() * D * 2);       gy = Math.floor(Math.random() * D * 2);           dir = Math.random() < 0.5 ? 0 : 1; break;
        case 5: gx = c - 1 - Math.floor(Math.random() * D*2);gy = Math.floor(Math.random() * D * 2);           dir = Math.random() < 0.5 ? 2 : 1; break;
        case 6: gx = Math.floor(Math.random() * D * 2);       gy = r - 1 - Math.floor(Math.random() * D * 2);  dir = Math.random() < 0.5 ? 0 : 3; break;
        default:gx = c - 1 - Math.floor(Math.random() * D*2);gy = r - 1 - Math.floor(Math.random() * D * 2);  dir = Math.random() < 0.5 ? 2 : 3; break;
      }

      return {
        gx: Math.max(0, Math.min(c - 1, gx)),
        gy: Math.max(0, Math.min(r - 1, gy)),
        dir,
        t: Math.random(),
        speed: SPEED * (0.5 + Math.random() * 1.2),
        hue: 160 + Math.random() * 50,
        trail: [],
        turnBias: 0.2 + Math.random() * 0.6,
        lifetime: 180 + Math.floor(Math.random() * 200),
        age: 0,
      };
    }

    function nextDir(cur: number, bias: number): number {
      const r = Math.random();
      const straight = 0.35 + (1 - bias) * 0.3;
      if (r < straight) return cur;
      return r < straight + (1 - straight) / 2 ? (cur + 1) % 4 : (cur + 3) % 4;
    }

    const DX = [1, 0, -1, 0];
    const DY = [0, 1, 0, -1];

    function headPx(b: Bolt) {
      return {
        x: b.gx * CELL + DX[b.dir] * CELL * b.t,
        y: b.gy * CELL + DY[b.dir] * CELL * b.t,
      };
    }

    const bolts: Bolt[] = Array.from({ length: NUM }, () => {
      const b = spawnBolt();
      b.age = Math.floor(Math.random() * b.lifetime); // stagger so they don't all expire together
      return b;
    });

    // ── Tick ────────────────────────────────────────────────────────────────
    function tick() {
      const c = cols(), r = rows();
      for (const b of bolts) {
        b.age++;
        if (b.age >= b.lifetime) { Object.assign(b, spawnBolt()); continue; }

        b.t += b.speed;
        if (b.t >= 1) {
          b.trail.push({
            x1: b.gx * CELL,
            y1: b.gy * CELL,
            x2: (b.gx + DX[b.dir]) * CELL,
            y2: (b.gy + DY[b.dir]) * CELL,
          });
          if (b.trail.length > TRAIL) b.trail.shift();

          b.gx += DX[b.dir];
          b.gy += DY[b.dir];
          b.t  -= 1;

          if (b.gx < 0 || b.gx >= c || b.gy < 0 || b.gy >= r) {
            Object.assign(b, spawnBolt());
          } else {
            b.dir = nextDir(b.dir, b.turnBias);
          }
        }
      }
    }

    // ── Draw ─────────────────────────────────────────────────────────────────
    function drawGrid() {
      const c = cols(), r = rows();
      ctx!.strokeStyle = "rgba(20,160,140,0.10)";
      ctx!.lineWidth   = 0.5;
      // One path for all vertical lines — single stroke call
      ctx!.beginPath();
      for (let i = 0; i <= c; i++) { ctx!.moveTo(i * CELL, 0); ctx!.lineTo(i * CELL, H); }
      for (let j = 0; j <= r; j++) { ctx!.moveTo(0, j * CELL); ctx!.lineTo(W, j * CELL); }
      ctx!.stroke();
    }

    // Fake glow with two cheap layered strokes — no shadowBlur needed
    function strokeGlow(hue: number, alpha: number, width: number) {
      ctx!.strokeStyle = `hsla(${hue},90%,75%,${alpha * 0.35})`;
      ctx!.lineWidth   = width + 3;
      ctx!.stroke();
      ctx!.strokeStyle = `hsla(${hue},95%,80%,${alpha})`;
      ctx!.lineWidth   = width;
      ctx!.stroke();
    }

    function drawBolts() {
      // additive blending makes overlapping trails glow brighter for free
      ctx!.globalCompositeOperation = "lighter";
      ctx!.lineCap  = "square";
      ctx!.lineJoin = "miter";

      for (const b of bolts) {
        const lifeFade = Math.min(1, (b.lifetime - b.age) / 20);
        if (lifeFade <= 0) continue;

        const total = b.trail.length + 1;

        // ── Trail: one batched path per bolt ──────────────────────────────
        if (b.trail.length > 0) {
          ctx!.beginPath();
          for (const seg of b.trail) {
            ctx!.moveTo(seg.x1, seg.y1);
            ctx!.lineTo(seg.x2, seg.y2);
          }
          // Use the newest segment's alpha for the whole trail batch (cheap approximation)
          strokeGlow(b.hue, 0.45 * lifeFade, 1.5);
        }

        // ── Active head segment ───────────────────────────────────────────
        const head = headPx(b);
        ctx!.beginPath();
        ctx!.moveTo(b.gx * CELL, b.gy * CELL);
        ctx!.lineTo(head.x, head.y);
        strokeGlow(b.hue, 0.9 * lifeFade, 2);

        // ── Head dot: just a tiny filled rect, no shadow ─────────────────
        ctx!.fillStyle = `hsla(${b.hue},100%,95%,${lifeFade})`;
        ctx!.fillRect(head.x - 1.5, head.y - 1.5, 3, 3);
      }

      ctx!.globalCompositeOperation = "source-over";
    }

    // ── Frame loop ───────────────────────────────────────────────────────────
    function frame() {
      frameCount++;

      // On very low-end devices skip every other frame (30fps cap)
      if (isLowEnd && frameCount % 2 !== 0) {
        raf = requestAnimationFrame(frame);
        return;
      }

      // Fill background (alpha:false canvas — must repaint manually)
      ctx!.fillStyle = BG;
      ctx!.fillRect(0, 0, W, H);

      drawGrid();
      tick();
      drawBolts();

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-10" />;
}