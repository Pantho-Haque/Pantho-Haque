"use client";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "subject", label: "SUBJECT" },
  { id: "history", label: "HISTORY" },
  { id: "capabilities", label: "CAPABILITIES" },
  { id: "projects", label: "PROJECTS" },
  { id: "credentials", label: "CREDENTIALS" },
];

export default function HudNav() {
  const [active, setActive] = useState(SECTIONS[0].id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SECTIONS.forEach(s => { const el = document.getElementById(s.id); if (el) io.observe(el); });

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-(--border) bg-[color-mix(in_srgb,var(--bg)_85%,transparent)] font-(--font-mono) backdrop-blur-sm">
      <a href="#subject" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:bg-(--bg) focus:px-3 focus:py-1 focus:text-(--green)">Skip to content</a>
      <div className="mx-auto flex h-11 max-w-[1500px] items-center justify-between gap-4 px-4 text-[12px] tracking-[0.15em] text-(--muted) sm:px-6 md:px-8">
        <a href="#subject" className="hidden whitespace-nowrap text-(--green) lg:block">
          PANTHO.HAQUE <span className="text-(--muted)">{"// PORTFOLIO-NODE-01"}</span>
        </a>

        <nav aria-label="Sections" className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SECTIONS.map((s) => {
            const on = active === s.id;
            return (
              <a key={s.id} href={`#${s.id}`} aria-current={on ? "location" : undefined}
                className={`whitespace-nowrap border px-2.5 py-1 transition-colors duration-150 ${on ? "border-(--green) bg-(--green-muted) text-(--green)" : "border-transparent hover:text-(--green-dim)"}`}>
                {s.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 whitespace-nowrap">
          <a href="https://domiknows.vercel.app/resume" target="_blank" rel="noopener noreferrer"
            className="border border-(--border) px-2.5 py-1 text-(--green) transition-colors hover:border-(--green) hover:bg-(--green-muted)">
            <span className="sm:hidden">[ CV ]</span><span className="hidden sm:inline">[ VIEW RESUME ]</span>
          </a>
          <span className="hidden text-(--green) md:inline" style={{ animation: "blink 2s infinite" }}>● LIVE</span>
        </div>
      </div>
      <div aria-hidden className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-(--green) shadow-[0_0_8px_var(--green)]"
        style={{ transform: `scaleX(${progress})` }} />
    </header>
  );
}
