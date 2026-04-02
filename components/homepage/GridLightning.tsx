"use client";
import { useEffect, useRef } from "react";

export default function GridLightning() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const CELL = 56;
    const TRAIL = 9;
    const SPEED = 0.04;
    const NUM = 16;

    let raf: number;
    let W = 0, H = 0;

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width = W;
      canvas!.height = H;
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

    function cols() { return Math.floor(W / CELL) + 1; }
    function rows() { return Math.floor(H / CELL) + 1; }

    function spawnBolt(): Bolt {
      const c = cols(), r = rows();

      // Weighted regions: corners get 2x weight vs edges
      const regions = [0, 1, 2, 3, 4, 4, 5, 5, 6, 6, 7, 7];
      const region = regions[Math.floor(Math.random() * regions.length)];

      const edgeDepth = 3;
      let gx: number, gy: number, dir: number;

      switch (region) {
        case 0: // top edge
          gx = Math.floor(Math.random() * c);
          gy = Math.floor(Math.random() * edgeDepth);
          dir = 1;
          break;
        case 1: // bottom edge
          gx = Math.floor(Math.random() * c);
          gy = r - 1 - Math.floor(Math.random() * edgeDepth);
          dir = 3;
          break;
        case 2: // left edge
          gx = Math.floor(Math.random() * edgeDepth);
          gy = Math.floor(Math.random() * r);
          dir = 0;
          break;
        case 3: // right edge
          gx = c - 1 - Math.floor(Math.random() * edgeDepth);
          gy = Math.floor(Math.random() * r);
          dir = 2;
          break;
        case 4: // top-left corner
          gx = Math.floor(Math.random() * edgeDepth * 2);
          gy = Math.floor(Math.random() * edgeDepth * 2);
          dir = Math.random() < 0.5 ? 0 : 1;
          break;
        case 5: // top-right corner
          gx = c - 1 - Math.floor(Math.random() * edgeDepth * 2);
          gy = Math.floor(Math.random() * edgeDepth * 2);
          dir = Math.random() < 0.5 ? 2 : 1;
          break;
        case 6: // bottom-left corner
          gx = Math.floor(Math.random() * edgeDepth * 2);
          gy = r - 1 - Math.floor(Math.random() * edgeDepth * 2);
          dir = Math.random() < 0.5 ? 0 : 3;
          break;
        case 7: // bottom-right corner
        default:
          gx = c - 1 - Math.floor(Math.random() * edgeDepth * 2);
          gy = r - 1 - Math.floor(Math.random() * edgeDepth * 2);
          dir = Math.random() < 0.5 ? 2 : 3;
          break;
      }

      gx = Math.max(0, Math.min(c - 1, gx));
      gy = Math.max(0, Math.min(r - 1, gy));

      return {
        gx,
        gy,
        dir,
        t: Math.random(),
        speed: SPEED * (0.5 + Math.random() * 1.2),
        hue: 160 + Math.random() * 50,
        trail: [],
        turnBias: 0.2 + Math.random() * 0.6,
        lifetime: 249 + Math.floor(Math.random() * 180),
        age: 0,
      };
    }

    function nextDir(cur: number, bias: number): number {
      const r = Math.random();
      const straight = 0.35 + (1 - bias) * 0.3;
      if (r < straight) return cur;
      if (r < straight + (1 - straight) / 2) return (cur + 1) % 4;
      return (cur + 3) % 4;
    }

    function px(gx: number, gy: number) {
      return { x: gx * CELL, y: gy * CELL };
    }

    function headPx(b: Bolt) {
      const { x: x0, y: y0 } = px(b.gx, b.gy);
      const dx = [1, 0, -1, 0][b.dir] * CELL * b.t;
      const dy = [0, 1, 0, -1][b.dir] * CELL * b.t;
      return { x: x0 + dx, y: y0 + dy };
    }

    const bolts: Bolt[] = Array.from({ length: NUM }, () => {
      const b = spawnBolt();
      b.age = Math.floor(Math.random() * b.lifetime);
      return b;
    });

    function tick() {
      const c = cols(), r = rows();
      bolts.forEach((b) => {
        b.age++;

        if (b.age >= b.lifetime) {
          const fresh = spawnBolt();
          Object.assign(b, fresh);
          return;
        }

        b.t += b.speed;
        if (b.t >= 1) {
          const { x: x0, y: y0 } = px(b.gx, b.gy);
          const nx = b.gx + [1, 0, -1, 0][b.dir];
          const ny = b.gy + [0, 1, 0, -1][b.dir];
          const { x: x1, y: y1 } = px(nx, ny);
          b.trail.push({ x1: x0, y1: y0, x2: x1, y2: y1 });
          if (b.trail.length > TRAIL) b.trail.shift();

          b.gx = nx;
          b.gy = ny;
          b.t -= 1;

          if (b.gx < 0 || b.gx >= c || b.gy < 0 || b.gy >= r) {
            const fresh = spawnBolt();
            Object.assign(b, fresh);
          } else {
            b.dir = nextDir(b.dir, b.turnBias);
          }
        }
      });
    }

    function drawGrid() {
      const c = cols(), r = rows();
      ctx!.strokeStyle = "rgba(20,160,140,0.10)";
      ctx!.lineWidth = 0.5;
      for (let i = 0; i <= c; i++) {
        ctx!.beginPath(); ctx!.moveTo(i * CELL, 0); ctx!.lineTo(i * CELL, H); ctx!.stroke();
      }
      for (let j = 0; j <= r; j++) {
        ctx!.beginPath(); ctx!.moveTo(0, j * CELL); ctx!.lineTo(W, j * CELL); ctx!.stroke();
      }
    }

    function drawBolt(b: Bolt) {
      const lifeFade = Math.min(1, (b.lifetime - b.age) / 20);
      if (lifeFade <= 0) return;

      const total = b.trail.length + 1;
      const head = headPx(b);
      const { x: hx0, y: hy0 } = px(b.gx, b.gy);

      ctx!.lineCap = "square";
      ctx!.lineJoin = "miter";

      b.trail.forEach((seg, i) => {
        const age = i / total;
        const alpha = age * 0.65 * lifeFade;
        ctx!.save();
        ctx!.strokeStyle = `hsla(${b.hue},90%,70%,${alpha})`;
        ctx!.lineWidth = 1.5;
        ctx!.shadowColor = `hsl(${b.hue},90%,65%)`;
        ctx!.shadowBlur = 4;
        ctx!.beginPath();
        ctx!.moveTo(seg.x1, seg.y1);
        ctx!.lineTo(seg.x2, seg.y2);
        ctx!.stroke();
        ctx!.restore();
      });

      ctx!.save();
      ctx!.strokeStyle = `hsla(${b.hue},95%,80%,${0.95 * lifeFade})`;
      ctx!.lineWidth = 2;
      ctx!.shadowColor = `hsl(${b.hue},100%,75%)`;
      ctx!.shadowBlur = 8;
      ctx!.beginPath();
      ctx!.moveTo(hx0, hy0);
      ctx!.lineTo(head.x, head.y);
      ctx!.stroke();
      ctx!.restore();

      ctx!.save();
      ctx!.fillStyle = `hsla(${b.hue},100%,92%,${lifeFade})`;
      ctx!.shadowColor = `hsl(${b.hue},100%,80%)`;
      ctx!.shadowBlur = 12;
      ctx!.fillRect(head.x - 2, head.y - 2, 4, 4);
      ctx!.restore();
    }

    function frame() {
      ctx!.clearRect(0, 0, W, H);
      drawGrid();
      tick();
      bolts.forEach(drawBolt);
      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none bg-[#050d10] fixed inset-0 -z-10" />;
}