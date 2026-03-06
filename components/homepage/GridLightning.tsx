"use client";
import { useEffect, useRef } from "react";

export default function GridLightning() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const CELL = 56;          // grid cell size in px
    const TRAIL = 7;          // number of segments kept as visible trail
    const SPEED = 0.045;      // fraction of a cell per frame (fast!)
    const NUM = 12;            // number of independent bolts

    let raf: number;
    let W = 0, H = 0;

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight ;
      canvas!.width = W;
      canvas!.height = H;
    }
    resize();
    window.addEventListener("resize", resize);

    // A segment = { x1,y1, x2,y2 } — always axis-aligned
    type Seg = { x1: number; y1: number; x2: number; y2: number };

    type Bolt = {
      // current grid intersection (start of current segment)
      gx: number; gy: number;    // in grid units
      // direction: 0=+x, 1=+y, 2=-x, 3=-y
      dir: number;
      // progress 0..1 along current cell
      t: number;
      speed: number;
      hue: number;
      trail: Seg[];              // recent completed segments
    };

    function cols() { return Math.floor(W / CELL) + 1; }
    function rows() { return Math.floor(H / CELL) + 1; }

    function spawnBolt(): Bolt {
      const c = cols(), r = rows();
      const horiz = Math.random() < 0.5;
      return {
        gx: Math.floor(Math.random() * c),
        gy: Math.floor(Math.random() * r),
        dir: horiz ? (Math.random() < 0.5 ? 0 : 2) : (Math.random() < 0.5 ? 1 : 3),
        t: 0,
        speed: SPEED * (0.8 + Math.random() * 0.6),
        hue: 170 + Math.random() * 35,
        trail: [],
      };
    }

    function nextDir(cur: number): number {
      // 50% continue, 25% turn CW, 25% turn CCW — always 90°
      const r = Math.random();
      if (r < 0.50) return cur;
      if (r < 0.75) return (cur + 1) % 4;
      return (cur + 3) % 4;
    }

    // pixel coords of a grid intersection
    function px(gx: number, gy: number) {
      return { x: gx * CELL, y: gy * CELL };
    }

    // head pixel given current bolt state
    function headPx(b: Bolt) {
      const { x: x0, y: y0 } = px(b.gx, b.gy);
      const dx = [1, 0, -1, 0][b.dir] * CELL * b.t;
      const dy = [0, 1, 0, -1][b.dir] * CELL * b.t;
      return { x: x0 + dx, y: y0 + dy };
    }

    const bolts: Bolt[] = Array.from({ length: NUM }, spawnBolt);

    function tick() {
      const c = cols(), r = rows();
      bolts.forEach((b) => {
        b.t += b.speed;
        if (b.t >= 1) {
          // complete this segment — add to trail
          const { x: x0, y: y0 } = px(b.gx, b.gy);
          const nx = b.gx + [1, 0, -1, 0][b.dir];
          const ny = b.gy + [0, 1, 0, -1][b.dir];
          const { x: x1, y: y1 } = px(nx, ny);
          b.trail.push({ x1: x0, y1: y0, x2: x1, y2: y1 });
          if (b.trail.length > TRAIL) b.trail.shift();

          // advance to next intersection
          b.gx = nx;
          b.gy = ny;
          b.t -= 1;

          // bounce if out of bounds
          if (b.gx < 0 || b.gx >= c || b.gy < 0 || b.gy >= r) {
            b.gx = Math.max(0, Math.min(c - 1, b.gx));
            b.gy = Math.max(0, Math.min(r - 1, b.gy));
            b.dir = (b.dir + 2) % 4; // reverse
          } else {
            b.dir = nextDir(b.dir);
          }
        }
      });
    }

    function drawGrid() {
      const c = cols(), r = rows();
      ctx!.strokeStyle = "rgba(20,160,140,0.12)";
      ctx!.lineWidth = 0.5;
      for (let i = 0; i <= c; i++) {
        ctx!.beginPath(); ctx!.moveTo(i * CELL, 0); ctx!.lineTo(i * CELL, H); ctx!.stroke();
      }
      for (let j = 0; j <= r; j++) {
        ctx!.beginPath(); ctx!.moveTo(0, j * CELL); ctx!.lineTo(W, j * CELL); ctx!.stroke();
      }
    }

    function drawBolt(b: Bolt) {
      const total = b.trail.length + 1; // trail segs + active seg
      const head = headPx(b);
      const { x: hx0, y: hy0 } = px(b.gx, b.gy);

      ctx!.lineCap = "square"; // sharp ends for grid-line look
      ctx!.lineJoin = "miter";

      // draw trail segments
      b.trail.forEach((seg, i) => {
        const age = i / total; // 0 = oldest, near 1 = newest
        const alpha = age * 0.7;
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

      // draw active (current) segment
      ctx!.save();
      ctx!.strokeStyle = `hsla(${b.hue},95%,80%,0.95)`;
      ctx!.lineWidth = 2;
      ctx!.shadowColor = `hsl(${b.hue},100%,75%)`;
      ctx!.shadowBlur = 8;
      ctx!.beginPath();
      ctx!.moveTo(hx0, hy0);
      ctx!.lineTo(head.x, head.y);
      ctx!.stroke();
      ctx!.restore();

      // bright head dot (small — just 3px, not a circle)
      ctx!.save();
      ctx!.fillStyle = `hsl(${b.hue},100%,92%)`;
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

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0" />;
}