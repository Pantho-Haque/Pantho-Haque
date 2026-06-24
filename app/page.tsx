"use client";
import { HeroSection, Experiences, Skills, Projects } from "@/components";
import { GetResume } from "@/services/resumeService";

/* ── Surveillance grid background ─────────────────────────── */
function GridBg() {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 0,
      backgroundImage:
        "linear-gradient(rgba(0,255,65,0.04) 1px, transparent 1px), " +
        "linear-gradient(90deg, rgba(0,255,65,0.04) 1px, transparent 1px)",
      backgroundSize: "40px 40px",
      pointerEvents: "none",
    }} />
  );
}

/* ── Vignette ──────────────────────────────────────────────── */
function Vignette() {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 1,
      background: "radial-gradient(ellipse 80% 70% at 50% 40%, transparent 30%, rgba(0,0,0,0.85) 100%)",
      pointerEvents: "none",
    }} />
  );
}

/* ── Scanline overlay ──────────────────────────────────────── */
function Scanlines() {
  return (
    <>
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.025) 2px, rgba(0,255,65,0.025) 4px)",
        pointerEvents: "none",
        animation: "scanlines 12s linear infinite",
      }} />
      <style>{`
        @keyframes scanlines {
          0% { background-position: 0 0; }
          100% { background-position: 0 -200px; }
        }
        @keyframes flicker {
          0%, 94%, 100% { opacity: 1; }
          95% { opacity: 0.93; }
          97% { opacity: 0.97; }
          98% { opacity: 0.9; }
        }
        body { animation: flicker 12s infinite; }
      `}</style>
    </>
  );
}

/* ── Footer ────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(0,255,65,0.15)",
      padding: "16px 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontFamily: "var(--font-mono)",
      fontSize: 9,
      color: "rgba(0,255,65,0.3)",
      letterSpacing: "0.15em",
    }} className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
      <span>SURVEILLANCE NETWORK // ALL RIGHTS RESERVED</span>
      <span style={{ animation: "blink 2s infinite" }}>● MONITORING ACTIVE</span>
      <style>{`
        @keyframes blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
      `}</style>
    </footer>
  );
}

/* ── Root page ─────────────────────────────────────────────── */
export default function Home() {
  const { data: resumeData, isPending } = GetResume();

  if (isPending || !resumeData) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-mono)",
        color: "var(--green)",
        flexDirection: "column",
        gap: 16,
      }}>
        <div style={{ fontSize: 11, letterSpacing: "0.2em", opacity: 0.7 }}>
          ESTABLISHING SECURE CONNECTION...
        </div>
        <div style={{
          width: 200,
          height: 2,
          background: "rgba(0,255,65,0.1)",
          border: "1px solid var(--border)",
          overflow: "hidden",
        }}>
          <div style={{
            height: "100%",
            background: "var(--green)",
            animation: "loading 1.5s ease-in-out infinite",
          }} />
        </div>
        <style>{`
          @keyframes loading {
            0% { width: 0%; margin-left: 0%; }
            50% { width: 60%; margin-left: 20%; }
            100% { width: 0%; margin-left: 100%; }
          }
        `}</style>
      </div>
    );
  }

  const { skills, experience, projects, hero, summary } = resumeData!;

  return (
    <main style={{
      position: "relative",
      minHeight: "100vh",
      background: "var(--bg)",
      color: "var(--green)",
    }}
    className="flex justify-center"
    >
      <GridBg />
      <Vignette />
      <Scanlines />

      <div style={{ position: "relative", zIndex: 10 }}>
        <HeroSection hero={hero} summary={summary} />
        <Experiences experiences={experience} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Footer />
      </div>
    </main>
  );
}