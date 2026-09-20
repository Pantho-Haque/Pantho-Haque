"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Icon } from "@/components";
import { THero } from "@/types";

function CornerBracket({ position, size = 20, thickness = 2, color = "var(--green)" }: {
  position: "tl" | "tr" | "bl" | "br";
  size?: number;
  thickness?: number;
  color?: string;
}) {
  const b = `${thickness}px solid ${color}`;
  const styles: Record<string, React.CSSProperties> = {
    tl: { top: -1, left: -1, borderTop: b, borderLeft: b },
    tr: { top: -1, right: -1, borderTop: b, borderRight: b },
    bl: { bottom: -1, left: -1, borderBottom: b, borderLeft: b },
    br: { bottom: -1, right: -1, borderBottom: b, borderRight: b },
  };
  return <div aria-hidden style={{ position: "absolute", width: size, height: size, zIndex: 10, ...styles[position] }} />;
}

function Brackets({ size }: { size: number }) {
  return (<><CornerBracket position="tl" size={size} /><CornerBracket position="tr" size={size} /><CornerBracket position="bl" size={size} /><CornerBracket position="br" size={size} /></>);
}

/* Tilts toward the pointer and publishes --px/--py (-0.5..0.5) for parallax layers. */
function CameraFrame({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0), py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 110, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 110, damping: 18, mass: 0.6 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-7, 7]);
  const glare = useTransform([sx, sy], ([x, y]) =>
    `radial-gradient(circle at ${50 + (x as number) * 90}% ${50 + (y as number) * 90}%, rgba(var(--green-rgb),0.12), transparent 45%)`);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { px.set(0); py.set(0); };

  return (
    <div className="[perspective:1200px]">
      <div className="animate-[sway_16s_ease-in-out_infinite] [transform-style:preserve-3d]">
        <motion.div
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          style={{ rotateX, rotateY, "--px": sx, "--py": sy } as React.CSSProperties}
          className="relative aspect-[16/10] overflow-hidden border border-(--border) bg-(--surface) shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] will-change-transform"
        >
          {children}
          <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-[4] mix-blend-screen" style={{ background: glare }} />
          <div aria-hidden className="cam-noise pointer-events-none absolute inset-0 z-[4]" />
          <div aria-hidden className="cam-vsync pointer-events-none absolute inset-x-0 z-[4] h-[8%]" />
        </motion.div>
      </div>
    </div>
  );
}

function useLiveClock() {
  const [now, setNow] = useState<Date | null>(null);
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const tick = () => { setNow(new Date()); setFrame(f => f + 1); };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return {
    time: now ? now.toLocaleTimeString("en-US", { hour12: false }) : "",
    date: now ? now.toISOString().slice(0, 10) : "",
    frame,
  };
}

function CamHUD() {
  const { time, date, frame } = useLiveClock();
  const tiny = "text-[11px] tracking-[0.1em] text-(--green)";
  return (
    <div className="par-mid pointer-events-none absolute inset-0 z-20 font-(--font-mono)">
      <div className="absolute left-3.5 top-3 leading-[1.65]">
        <div className="text-[12px] tracking-[0.12em] text-(--green) opacity-75">CAM 07 // SECTOR-ALPHA</div>
        <div className="text-[12px] tracking-[0.08em] text-(--green) opacity-55">{date}</div>
        <div className="mt-0.5 text-[19px] font-bold tracking-[0.06em] text-(--green)">{time}</div>
      </div>

      <div className="absolute right-3.5 top-3 flex items-center gap-1.5">
        <span className="inline-block h-[7px] w-[7px] rounded-full bg-(--red) shadow-[0_0_8px_var(--red)]" style={{ animation: "blink 1.2s infinite" }} />
        <span className="text-[13px] tracking-[0.2em] text-(--red)">REC</span>
      </div>

      <div className="absolute bottom-3 left-3.5 leading-[1.8] opacity-50">
        <div className={tiny}>LOCATION: DOWNTOWN DISTRICT</div>
        <div className={tiny}>FRAME: {String(frame).padStart(6, "0")} {"// RES: 1920×1080"}</div>
      </div>

      <div className="absolute bottom-3 right-3.5 text-right opacity-50">
        <div className={tiny}>CODEC: H.264 / AVC</div>
        <div className={tiny}>BITRATE: 8.4 Mbps</div>
      </div>

      <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" width="60" height="60" viewBox="0 0 60 60">
        <line x1="30" y1="0" x2="30" y2="22" stroke="var(--green)" strokeWidth="0.8"/>
        <line x1="30" y1="38" x2="30" y2="60" stroke="var(--green)" strokeWidth="0.8"/>
        <line x1="0" y1="30" x2="22" y2="30" stroke="var(--green)" strokeWidth="0.8"/>
        <line x1="38" y1="30" x2="60" y2="30" stroke="var(--green)" strokeWidth="0.8"/>
        <circle cx="30" cy="30" r="6" fill="none" stroke="var(--green)" strokeWidth="0.8"/>
      </svg>
    </div>
  );
}

function TrackingBox({ hero }: { hero: THero }) {
  const [imageError, setImageError] = useState(false);
  const tag = "par-fg absolute left-1/2 -translate-x-1/2 whitespace-nowrap border font-(--font-mono) text-(--green)";

  return (
    <div className="absolute left-[4%] top-[6%] z-[8] flex h-[80%] w-[92%] items-center justify-center">
      {/* Tracking frame */}
      <div className="par-fg absolute bottom-[12%] left-[40%] right-[40%] top-[30%] z-[12] border border-(--green) shadow-[0_0_30px_rgba(var(--green-rgb),0.25),inset_0_0_20px_rgba(var(--green-rgb),0.06)]">
        <Brackets size={18} />
      </div>

      <div className={`${tag} top-[26%] z-[16] border-(--green) bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] px-2.5 py-0.5 text-[10px] tracking-[0.2em] shadow-[0_0_20px_rgba(var(--green-rgb),0.3)] sm:px-3.5 sm:py-[3px] sm:text-[12px]`}>
        ● PERSON OF INTEREST
      </div>

      {/* Photo */}
      <div className="relative h-full w-full overflow-hidden">
        {hero.cover_photo.trim() && !imageError ? (
          <Image
            src={hero.cover_photo.trim()}
            alt={hero.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 75vw"
            className="par-bg object-cover object-center [filter:grayscale(10%)_contrast(1.05)_brightness(0.9)] animate-[kenburns_28s_ease-in-out_infinite_alternate]"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 font-(--font-mono) text-[13px] text-(--muted)">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/></svg>
            NO SIGNAL
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 z-[5] h-[42%] [background:linear-gradient(transparent,rgba(0,0,0,0.9))]" />

        {/* Name overlay — hidden on small screens where it collides with the ID tag */}
        <div className="absolute inset-x-0 bottom-2.5 z-[6] hidden text-center font-(--font-mono) sm:block">
          <div className="text-[15px] font-bold tracking-[0.1em] text-(--green)">{hero.name.toUpperCase()}</div>
          <div className="mt-[3px] text-[11px] tracking-[0.08em] text-(--text)">{hero.current_position.toUpperCase()}</div>
        </div>
      </div>

      <div className={`${tag} bottom-[13%] z-[15] border-[rgba(var(--green-rgb),0.4)] bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] px-2 py-px text-[9px] tracking-[0.15em] sm:px-2.5 sm:py-0.5 sm:text-[11px]`}
        style={{ animation: "dim-blink 1.8s steps(1) infinite" }}>
        ID: SWE-001 // MATCH: 98.7%
      </div>
    </div>
  );
}

function FacialRecognitionPanel({ hero }: { hero: THero }) {
  const [progress, setProgress] = useState(0);
  const [imageError, setImageError] = useState(false);
  const done = progress >= 100;

  useEffect(() => {
    const id = setInterval(() => setProgress(p => (p >= 100 ? (clearInterval(id), 100) : p + 1.5)), 30);
    return () => clearInterval(id);
  }, []);

  const label = "text-[9px] tracking-[0.15em] text-(--muted) sm:text-[11px]";
  const value = "text-[13px] tracking-[0.04em] text-(--text) sm:text-[15px]";
  const match = Math.min(progress * 0.987, 98.7);

  return (
    <div className="w-full shrink-0 border border-(--border) bg-(--surface) p-2 font-(--font-mono) sm:p-3 md:w-auto">
      <div className="mb-1.5 flex items-center justify-between border-b border-(--border) pb-1.5 text-[10px] tracking-[0.2em] text-(--green-dim) sm:text-[11px]">
        <span>AI FACIAL RECOGNITION</span>
        <span style={{ color: done ? "var(--green)" : "var(--amber)" }}>{done ? "● DONE" : "● SCAN"}</span>
      </div>

      <div className="flex flex-row items-start gap-3 md:flex-col">
        <div className="relative h-[60px] w-[80px] shrink-0 self-center overflow-hidden border border-(--border) bg-black sm:mt-3 sm:h-[75px] sm:w-[100px]">
          <Brackets size={8} />
          {hero.photo.trim() && !imageError ? (
            <Image src={hero.photo.trim()} alt={hero.name} fill sizes="100px"
              className="object-cover object-center opacity-85 [filter:grayscale(40%)_contrast(1.1)]"
              onError={() => setImageError(true)} />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[11px] text-(--muted)">NO SIGNAL</div>
          )}
          {!done && (
            <div className="absolute left-0 right-0 z-[5] h-px shadow-[0_0_10px_var(--green)] [background:linear-gradient(90deg,transparent_0%,var(--green)_40%,rgba(var(--green-rgb),0.5)_60%,transparent_100%)]"
              style={{ top: `${progress}%` }} />
          )}
          {done && (
            <svg className="absolute inset-0 z-[6] h-full w-full opacity-55" viewBox="0 0 100 75">
              {[[28,18],[50,16],[72,18],[22,32],[50,30],[78,32],[28,50],[50,48],[72,50],[38,22],[62,22],[50,38]].map(([cx,cy],i) => (
                <circle key={i} cx={cx} cy={cy} r="1.2" fill="var(--green)" />
              ))}
              {[[28,18,50,16],[50,16,72,18],[28,18,28,50],[72,18,72,50],[28,32,72,32],[50,16,50,48]].map(([x1,y1,x2,y2],i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--green)" strokeWidth="0.4" opacity="0.35"/>
              ))}
            </svg>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1 pt-2">
          <div className="flex items-center gap-1">
            <span className={label}>NAME:</span><span className={value}>{hero.name}</span>
            <span className={`${label} ml-2`}>AGE:</span><span className={value}>~24</span>
          </div>
          <div className="flex items-center gap-1">
            <span className={label}>ROLE:</span><span className={value}>{hero.current_position}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className={label}>STATUS:</span>
            <span className={`text-[13px] tracking-[0.04em] sm:text-[15px] ${hero.isAvailable ? "text-(--green)" : "text-(--amber)"}`}>
              {hero.isAvailable ? "AVAILABLE" : "ENGAGED"}
            </span>
            <span className={`${label} ml-2`}>MATCH:</span>
            <div className="h-1 max-w-[50px] flex-1 overflow-hidden border border-(--border) bg-(--green-dark)">
              <div className="h-full bg-gradient-to-r from-(--green-dark) to-(--green) transition-[width] duration-75 ease-linear" style={{ width: `${match}%` }} />
            </div>
            <span className="text-[9px] text-(--green) sm:text-[11px]">{match.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      <div className="mt-1.5 border-t border-(--border) pt-1.5">
        <div className="mb-1 mt-3 text-[9px] tracking-[0.12em] text-(--green) sm:text-[11px]">IDENTIFIED CAPABILITIES:</div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          {["React / Next.js", "TypeScript", "Docker / CI/CD", "Go Lang"].map((skill, i) => (
            <div key={skill} className="flex items-center gap-1 transition-opacity duration-300" style={{ opacity: progress > (i + 1) * 22 ? 1 : 0.35 }}>
              <div className="h-1 w-1 bg-(--green)" />
              <span className="text-[9px] tracking-[0.06em] text-(--green-dim) sm:text-[11px]">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HeroSection({ hero, summary }: { hero: THero; summary?: string }) {
  if (!hero) return null;

  return (
    <section id="subject" className="relative z-10 mx-auto w-full max-w-[1500px] scroll-mt-16 px-4 pb-9 pt-7 sm:px-6 md:px-8">
      <div className="flex flex-col items-stretch gap-4 md:flex-row">
        {/* CCTV main frame */}
        <div className="relative w-full md:flex-1">
          <CameraFrame>
            <Brackets size={22} />
            <CamHUD />
            <div className="pointer-events-none absolute inset-0 z-[3] [background:radial-gradient(ellipse_75%_85%_at_50%_50%,transparent_30%,rgba(0,0,0,0.5)_100%)]" />
            <div className="pointer-events-none absolute inset-0 z-[2] [background-size:30px_30px] [background-image:linear-gradient(rgba(var(--green-rgb),0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--green-rgb),0.015)_1px,transparent_1px)]" />
            <svg className="absolute inset-0 z-[1] h-full w-full opacity-[0.07]" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
              {[60,130,200,610,680,750].map((x,i) => (
                <g key={i} transform={`translate(${x}, ${i%2===0?280:300})`}>
                  <ellipse cx="0" cy="0" rx="18" ry="45" fill="white"/>
                  <circle cx="0" cy="-52" r="14" fill="white"/>
                </g>
              ))}
            </svg>
            <TrackingBox hero={hero} />
          </CameraFrame>
        </div>

        <FacialRecognitionPanel hero={hero} />
      </div>

      {/* Contact links */}
      <div className="mt-3 flex flex-wrap justify-end gap-2.5">
        {hero.contactLinks?.map((l) => {
          const external = l.href.startsWith("http");
          return (
            <a key={l.label} href={l.href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
              className="flex items-center gap-[7px] border border-(--border) px-3.5 py-1.5 font-(--font-mono) text-[13px] uppercase tracking-[0.1em] text-(--green-dim) transition-all duration-150 hover:border-(--green) hover:bg-(--green-muted) hover:text-(--green) hover:shadow-[0_0_14px_rgba(var(--green-rgb),0.2)]">
              {Icon(l.icon)}{l.label}
            </a>
          );
        })}
      </div>

      {/* Bio + Summary + Achievements strip */}
      <div className="mt-3.5 flex flex-wrap gap-3.5">
        <div className="relative flex-[1_1_300px] border border-(--border) bg-(--surface) px-4 py-3 font-(--font-mono) text-[14px] leading-[1.9] text-(--text)">
          <div className="absolute left-0 top-0 h-full w-0.5 bg-(--green)" />
          <div className="mb-1 text-[11px] tracking-[0.15em] text-(--muted)">{"// SUBJECT PROFILE //"}</div>
          {summary && <p className="mb-2 text-[14px] text-(--text)">{summary}</p>}
          <div className="text-[13px] text-(--text-dim)">{hero.comment_one}<br />{hero.comment_two}</div>
        </div>

        <div className="flex flex-col justify-center gap-2">
          {hero.achievements.map((ac, i) => (
            <div key={i} className="flex items-center gap-2 whitespace-nowrap border border-(--border) bg-[rgba(var(--green-rgb),0.04)] px-3 py-1.5 font-(--font-mono) text-[13px] tracking-[0.05em] text-(--green-dim) transition-colors hover:border-[rgba(var(--green-rgb),0.45)] hover:text-(--green)">
              {Icon(ac.icon)}{ac.text}
            </div>
          ))}
        </div>
      </div>

      <a href="#history" className="mt-7 flex items-center justify-center gap-2 font-(--font-mono) text-[12px] tracking-[0.2em] text-(--muted) transition-colors hover:text-(--green)">
        SCROLL TO CONTINUE <span className="animate-bounce">▼</span>
      </a>
    </section>
  );
}
