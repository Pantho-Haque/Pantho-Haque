"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Icon } from "@/components";
import { THero } from "@/types";

function CornerBracket({ position, size = 20, thickness = 2, color = "var(--green)" }: {
  position: "tl" | "tr" | "bl" | "br";
  size?: number;
  thickness?: number;
  color?: string;
}) {
  const styles: Record<string, React.CSSProperties> = {
    tl: { top: -1, left: -1, borderTop: `${thickness}px solid ${color}`, borderLeft: `${thickness}px solid ${color}` },
    tr: { top: -1, right: -1, borderTop: `${thickness}px solid ${color}`, borderRight: `${thickness}px solid ${color}` },
    bl: { bottom: -1, left: -1, borderBottom: `${thickness}px solid ${color}`, borderLeft: `${thickness}px solid ${color}` },
    br: { bottom: -1, right: -1, borderBottom: `${thickness}px solid ${color}`, borderRight: `${thickness}px solid ${color}` },
  };
  return (
    <div style={{ position: "absolute", width: size, height: size, zIndex: 10, ...styles[position] }} />
  );
}

function useLiveClock() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false }));
      setDate(now.toISOString().slice(0, 10));
      setFrame(f => f + 1);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return { time, date, frame };
}

function CamHUD() {
  const { time, date, frame } = useLiveClock();

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 20, fontFamily: "var(--font-mono)" }}>
      {/* Top-left */}
      <div style={{ position: "absolute", top: 12, left: 14, lineHeight: 1.65 }}>
        <div style={{ fontSize: 9, color: "var(--green)", opacity: 0.75, letterSpacing: "0.12em" }}>CAM 07 // SECTOR-ALPHA</div>
        <div style={{ fontSize: 9, color: "var(--green)", opacity: 0.55, letterSpacing: "0.08em" }}>{date}</div>
        <div style={{ fontSize: 15, color: "var(--green)", fontWeight: 700, letterSpacing: "0.06em", marginTop: 2 }}>{time}</div>
      </div>

      {/* REC badge */}
      <div style={{ position: "absolute", top: 12, right: 14, display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{
          width: 7, height: 7, borderRadius: "50%", background: "var(--red)", display: "inline-block",
          animation: "blink 1.2s infinite", boxShadow: "0 0 8px var(--red)",
        }} />
        <span style={{ fontSize: 10, color: "var(--red)", letterSpacing: "0.2em" }}>REC</span>
      </div>

      {/* Bottom-left */}
      <div style={{ position: "absolute", bottom: 12, left: 14, lineHeight: 1.8, opacity: 0.5 }}>
        <div style={{ fontSize: 8, color: "var(--green)", letterSpacing: "0.1em" }}>LOCATION: DOWNTOWN DISTRICT</div>
        <div style={{ fontSize: 8, color: "var(--green)", letterSpacing: "0.1em" }}>FRAME: {String(frame).padStart(6, "0")} {"// RES: 1920×1080"}</div>
      </div>

      {/* Bottom-right */}
      <div style={{ position: "absolute", bottom: 12, right: 14, textAlign: "right", opacity: 0.5 }}>
        <div style={{ fontSize: 8, color: "var(--green)", letterSpacing: "0.1em" }}>CODEC: H.264 / AVC</div>
        <div style={{ fontSize: 8, color: "var(--green)", letterSpacing: "0.1em" }}>BITRATE: 8.4 Mbps</div>
      </div>

      {/* Centre crosshair (subtle) */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.1, pointerEvents: "none" }}>
        <svg width="60" height="60" viewBox="0 0 60 60">
          <line x1="30" y1="0" x2="30" y2="22" stroke="var(--green)" strokeWidth="0.8"/>
          <line x1="30" y1="38" x2="30" y2="60" stroke="var(--green)" strokeWidth="0.8"/>
          <line x1="0" y1="30" x2="22" y2="30" stroke="var(--green)" strokeWidth="0.8"/>
          <line x1="38" y1="30" x2="60" y2="30" stroke="var(--green)" strokeWidth="0.8"/>
          <circle cx="30" cy="30" r="6" fill="none" stroke="var(--green)" strokeWidth="0.8"/>
        </svg>
      </div>
    </div>
  );
}

function TrackingBox({ hero, imageError, setImageError }: {
  hero: THero;
  imageError: boolean;
  setImageError: (v: boolean) => void;
}) {
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{
      position: "absolute",
      top: "6%",
      left: "4%",
      width: "92%",
      height: "88%",
      zIndex: 8,
    }}>
      {/* Tracking border */}
      {/* <div style={{
        position: "absolute", inset: 0,
        border: "1px solid var(--green)",
        boxShadow: "0 0 24px rgba(0,255,65,0.2), inset 0 0 20px rgba(0,255,65,0.04)",
        animation: "tracking-pulse 3s ease-in-out infinite",
      }}>
        <CornerBracket position="tl" size={16} />
        <CornerBracket position="tr" size={16} />
        <CornerBracket position="bl" size={16} />
        <CornerBracket position="br" size={16} />
      </div> */}

      {/* Top label */}
      <div style={{
        position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
        background: "rgba(0,0,0,0.88)", border: "1px solid var(--green)",
        padding: "2px 10px", fontSize: 8, letterSpacing: "0.2em",
        color: "var(--green)", fontFamily: "var(--font-mono)", whiteSpace: "nowrap", zIndex: 15,
      }}>
        PERSON OF INTEREST
      </div>

      {/* Photo */}
      <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
        {hero.cover_photo.trim() && !imageError ? (
          <Image
            src={hero.cover_photo.trim()}
            alt={hero.name}
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "top center", filter: "grayscale(10%) contrast(1.05) brightness(0.9)" }}
            onError={() => setImageError(true)}
          />
        ) : (
          <div style={{ width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--muted)",fontSize:10,fontFamily:"var(--font-mono)",flexDirection:"column",gap:8 }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/></svg>
            NO SIGNAL
          </div>
        )}

        {/* Bottom gradient for name readability */}
        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:"42%",background:"linear-gradient(transparent,rgba(0,0,0,0.9))",zIndex:5 }} />

        {/* Name overlay inside photo */}
        <div style={{ position:"absolute",bottom:10,left:0,right:0,textAlign:"center",zIndex:6,fontFamily:"var(--font-mono)" }}>
          <div style={{ fontSize: 12, color: "var(--green)", fontWeight: 700, letterSpacing: "0.1em" }}>
            {hero.name.toUpperCase()}
          </div>
          <div style={{ fontSize: 8, color: "rgba(0,255,65,0.6)", letterSpacing: "0.08em", marginTop: 3 }}>
            {hero.current_position.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Bottom blinking ID tag */}
      <div style={{
        position: "absolute", bottom: -12, left: "50%", transform: "translateX(-50%)",
        background: "rgba(0,0,0,0.88)", border: "1px solid rgba(0,255,65,0.4)",
        padding: "2px 10px", fontSize: 8, letterSpacing: "0.15em",
        color: blink ? "var(--green)" : "rgba(0,255,65,0.25)",
        fontFamily: "var(--font-mono)", whiteSpace: "nowrap", zIndex: 15, transition: "color 0.3s",
      }}>
        ID: SWE-001 // MATCH: 98.7%
      </div>
    </div>
  );
}

function FacialRecognitionPanel({ hero }: { hero: THero }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [activeField, setActiveField] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { setDone(true); clearInterval(id); return 100; }
        return p + 1.5;
      });
    }, 30);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (done) return;
    const id = setInterval(() => setActiveField(f => (f + 1) % 4), 600);
    return () => clearInterval(id);
  }, [done]);

  const fields = [
    { label: "NAME", value: hero.name },
    { label: "AGE", value: "~24" },
    { label: "ROLE", value: hero.current_position },
    { label: "STATUS", value: hero.isAvailable ? "AVAILABLE" : "ENGAGED", highlight: true, good: hero.isAvailable },
  ];

  return (
    <div style={{
      background: "rgba(0,6,0,0.95)", border: "1px solid var(--border)",
      padding: "14px", fontFamily: "var(--font-mono)", width: 240, flexShrink: 0,
    }}>
      {/* Header */}
      <div style={{
        fontSize: 8, letterSpacing: "0.2em", color: "var(--green-dim)",
        marginBottom: 10, borderBottom: "1px solid var(--border)", paddingBottom: 7,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span>AI FACIAL RECOGNITION</span>
        <span style={{ color: done ? "var(--green)" : "var(--amber)", animation: "blink 1s infinite" }}>
          {done ? "● DONE" : "● SCAN"}
        </span>
      </div>

      {/* Thumbnail */}
      <div style={{
        position: "relative", width: "100%", aspectRatio: "4/3",
        border: "1px solid var(--border)", background: "#000", overflow: "hidden", marginBottom: 12,
      }}>
        <CornerBracket position="tl" size={12} />
        <CornerBracket position="tr" size={12} />
        <CornerBracket position="bl" size={12} />
        <CornerBracket position="br" size={12} />

        {hero.photo.trim() && !imageError ? (
          <Image src={hero.photo.trim()} alt={hero.name} fill
            style={{ objectFit:"cover",objectPosition:"top",filter:"grayscale(40%) contrast(1.1)",opacity:0.85 }}
            onError={() => setImageError(true)}
          />
        ) : (
          <div style={{ width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--muted)",fontSize:9 }}>NO SIGNAL</div>
        )}

        {/* Scan sweep */}
        {!done && (
          <div style={{
            position: "absolute", left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg, transparent 0%, var(--green) 40%, rgba(0,255,65,0.5) 60%, transparent 100%)",
            top: `${progress}%`, boxShadow: "0 0 10px var(--green)", zIndex: 5,
          }} />
        )}

        {/* Face mesh */}
        {done && (
          <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%",zIndex:6,opacity:0.55 }} viewBox="0 0 100 75">
            {[[28,18],[50,16],[72,18],[22,32],[50,30],[78,32],[28,50],[50,48],[72,50],[38,22],[62,22],[50,38]].map(([cx,cy],i) => (
              <circle key={i} cx={cx} cy={cy} r="1.2" fill="var(--green)" />
            ))}
            {[[28,18,50,16],[50,16,72,18],[28,18,28,50],[72,18,72,50],[28,32,72,32],[50,16,50,48]].map(([x1,y1,x2,y2],i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--green)" strokeWidth="0.4" opacity="0.35"/>
            ))}
          </svg>
        )}
      </div>

      {/* Fields */}
      {fields.map(({ label, value, highlight, good }, i) => (
        <div key={label} style={{
          marginBottom: 7, padding: "4px 6px",
          background: (!done && activeField === i) ? "rgba(0,255,65,0.06)" : "transparent",
          border: (!done && activeField === i) ? "1px solid rgba(0,255,65,0.2)" : "1px solid transparent",
          transition: "all 0.3s",
        }}>
          <div style={{ fontSize: 8, color: "var(--muted)", letterSpacing: "0.15em", marginBottom: 1 }}>{label}:</div>
          <div style={{
            fontSize: 12,
            color: highlight ? (good ? "var(--green)" : "var(--amber)") : "rgba(0,255,65,0.8)",
            letterSpacing: "0.04em",
          }}>
            {done || i < activeField ? value : "████████"}
          </div>
        </div>
      ))}

      {/* Confidence bar */}
      <div style={{ marginTop: 10, borderTop: "1px solid var(--border)", paddingTop: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 8, color: "var(--muted)", letterSpacing: "0.08em" }}>MATCH CONFIDENCE</span>
          <span style={{ fontSize: 8, color: "var(--green)" }}>{Math.min(progress * 0.987, 98.7).toFixed(1)}%</span>
        </div>
        <div style={{ height: 5, background: "#001500", border: "1px solid var(--border)", overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${Math.min(progress, 98.7)}%`,
            background: "linear-gradient(90deg, var(--green-dark), var(--green))",
            transition: "width 0.06s linear",
          }} />
        </div>
      </div>

      {/* Quick capabilities scan */}
      <div style={{ marginTop: 10, borderTop: "1px solid var(--border)", paddingTop: 8 }}>
        <div style={{ fontSize: 8, color: "var(--muted)", letterSpacing: "0.12em", marginBottom: 6 }}>IDENTIFIED CAPABILITIES:</div>
        {["React / Next.js", "TypeScript", "Docker / CI/CD", "Go Lang"].map((skill, i) => (
          <div key={skill} style={{
            display: "flex", alignItems: "center", gap: 6, marginBottom: 4,
            opacity: progress > (i + 1) * 22 ? 1 : 0.15, transition: "opacity 0.4s",
          }}>
            <div style={{ width: 4, height: 4, background: "var(--green)", flexShrink: 0 }} />
            <span style={{ fontSize: 9, color: "var(--green-dim)", letterSpacing: "0.06em" }}>{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HeroSection({ hero }: { hero: THero }) {
  const [imageError, setImageError] = useState(false);
  if (!hero) return null;

  return (
    <section style={{ position: "relative", zIndex: 10, padding: "40px 24px 36px", maxWidth: 1100, margin: "0 auto" }}>
      {/* Top HUD bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: 16, fontFamily: "var(--font-mono)", fontSize: 9,
        color: "var(--muted)", borderBottom: "1px solid var(--border)", paddingBottom: 7, letterSpacing: "0.15em",
      }}>
        <span>SURVEILLANCE NETWORK // PORTFOLIO-NODE-01 // SUBJECT ACQUIRED</span>
        <span style={{ color: "var(--green)", animation: "blink 2s infinite" }}>● LIVE</span>
      </div>

      {/* Main layout */}
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
        {/* CCTV main frame */}
        <div style={{ flex: "1 1 420px", position: "relative" }}>
          <div style={{
            position: "relative", background: "#020402",
            border: "1px solid var(--border)", overflow: "hidden", aspectRatio: "16/10",
          }}>
            <CornerBracket position="tl" size={22} />
            <CornerBracket position="tr" size={22} />
            <CornerBracket position="bl" size={22} />
            <CornerBracket position="br" size={22} />

            <CamHUD />

            {/* Vignette */}
            <div style={{
              position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
              background: "radial-gradient(ellipse 75% 85% at 50% 50%, transparent 25%, rgba(0,0,0,0.75) 100%)",
            }} />

            {/* Grid */}
            <div style={{
              position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
              backgroundImage: "linear-gradient(rgba(0,255,65,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.015) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }} />

            {/* Crowd silhouettes */}
            <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%",zIndex:1,opacity:0.07 }} viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
              {[60,130,200,610,680,750].map((x,i) => (
                <g key={i} transform={`translate(${x}, ${i%2===0?280:300})`}>
                  <ellipse cx="0" cy="0" rx="18" ry="45" fill="white"/>
                  <circle cx="0" cy="-52" r="14" fill="white"/>
                </g>
              ))}
            </svg>

            <TrackingBox hero={hero} imageError={imageError} setImageError={setImageError} />
          </div>
        </div>

        {/* Right panel */}
        <FacialRecognitionPanel hero={hero} />
      </div>

      {/* Bio + Achievements strip */}
      <div style={{ display: "flex", gap: 14, marginTop: 14, flexWrap: "wrap" }}>
        <div style={{
          flex: "1 1 300px", padding: "12px 16px",
          background: "rgba(0,10,0,0.75)", border: "1px solid var(--border)",
          fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(0,255,65,0.55)",
          lineHeight: 1.9, position: "relative",
        }}>
          <div style={{ position:"absolute",top:0,left:0,width:2,height:"100%",background:"var(--green)" }} />
          <div style={{ fontSize:8,color:"var(--muted)",letterSpacing:"0.15em",marginBottom:4 }}>{"// SUBJECT PROFILE //"}</div>
          {hero.comment_one}<br />{hero.comment_two}
        </div>

        <div style={{ flex:"0 1 auto",display:"flex",flexDirection:"column",gap:8,justifyContent:"center" }}>
          {hero.achievements.map((ac, i) => (
            <div key={i} style={{
              display:"flex",alignItems:"center",gap:8,padding:"6px 12px",
              border:"1px solid var(--border)",background:"rgba(0,255,65,0.04)",
              fontFamily:"var(--font-mono)",fontSize:10,color:"var(--green-dim)",
              letterSpacing:"0.05em",whiteSpace:"nowrap",
            }}>
              {Icon(ac.icon)}{ac.text}
            </div>
          ))}
        </div>
      </div>

      {/* Contact links */}
      <div style={{ display:"flex",flexWrap:"wrap",gap:10,marginTop:12 }}>
        {hero.contactLinks?.map((l) => (
          <a key={l.label} href={l.href} style={{
            display:"flex",alignItems:"center",gap:7,padding:"6px 14px",
            background:"transparent",border:"1px solid var(--border)",
            color:"var(--green-dim)",fontFamily:"var(--font-mono)",fontSize:10,
            letterSpacing:"0.1em",textDecoration:"none",textTransform:"uppercase",
            transition:"all 0.15s",cursor:"crosshair",
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background="var(--green-muted)"; el.style.borderColor="var(--green)"; el.style.color="var(--green)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background="transparent"; el.style.borderColor="var(--border)"; el.style.color="var(--green-dim)"; }}
          >
            {Icon(l.icon)}{l.label}
          </a>
        ))}
      </div>

      <style>{`
        @keyframes blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @keyframes tracking-pulse {
          0%,100%{box-shadow:0 0 16px rgba(0,255,65,0.2),inset 0 0 16px rgba(0,255,65,0.03)}
          50%{box-shadow:0 0 36px rgba(0,255,65,0.45),inset 0 0 24px rgba(0,255,65,0.07)}
        }
      `}</style>
    </section>
  );
}