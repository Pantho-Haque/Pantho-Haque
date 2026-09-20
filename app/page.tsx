import resume from "@/resume.json";
import { TResume } from "@/types";
import { HeroSection, Experiences, Skills, Projects, Education, HudNav, CursorReticle, ThemeSwitcher } from "@/components";

/* ── Surveillance grid background ─────────────────────────── */
function GridBg() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 [background-size:40px_40px] [background-image:linear-gradient(rgba(var(--green-rgb),0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--green-rgb),0.06)_1px,transparent_1px)]" />
  );
}

/* ── Vignette ──────────────────────────────────────────────── */
function Vignette() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] [background:radial-gradient(ellipse_80%_70%_at_50%_40%,transparent_40%,rgba(0,0,0,0.35)_100%)]" />
  );
}

/* ── Footer ────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="mx-auto flex w-full max-w-[1500px] flex-wrap items-center justify-between gap-3 border-t border-(--border) px-4 py-5 font-(--font-mono) text-[12px] tracking-[0.15em] text-(--text-dim) sm:px-6 md:px-8">
      <span>{`PANTHO HAQUE // © ${new Date().getFullYear()} // ALL RIGHTS RESERVED`}</span>
      <span style={{ animation: "blink 2s infinite" }}>● MONITORING ACTIVE</span>
      <a href="#subject" className="border border-(--border) px-2.5 py-1 text-(--green-dim) transition-colors hover:border-(--green) hover:bg-(--green-muted) hover:text-(--green)">
        [ ▲ RETURN TO TOP ]
      </a>
    </footer>
  );
}

/* ── Root page (server-rendered from resume.json) ──────────── */
export default function Home() {
  const { skills, experience, projects, hero, summary, education } = resume as TResume;

  return (
    <main className="relative min-h-screen bg-(--bg) pt-11 text-(--green)">
      <GridBg />
      <Vignette />
      <HudNav />
      <CursorReticle />
      <ThemeSwitcher />

      <div className="relative z-10">
        <HeroSection hero={hero} summary={summary} />
        <Experiences experiences={experience} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Education education={education} />
        <Footer />
      </div>
    </main>
  );
}
