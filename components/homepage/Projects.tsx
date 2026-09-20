"use client";
import { TProject } from "@/types";
import { SectionLabel } from "@/components";
import { Code2, ExternalLink } from "lucide-react";
import Reveal from "./Reveal";

const COLS = "grid-cols-[24px_1fr_170px_80px_60px]";

function Links({ p }: { p: TProject }) {
  const cls = "text-(--muted) transition-colors hover:text-(--green)";
  return (
    <>
      {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} live site`} className={cls}><ExternalLink size={12} /></a>}
      {p.code && <a href={p.code} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} source code`} className={cls}><Code2 size={12} /></a>}
    </>
  );
}

export default function Projects({ projects }: { projects: TProject[] }) {
  const sorted = [...projects].sort((a, b) => a.priority - b.priority);

  return (
    <section id="projects" className="relative z-10 mx-auto mb-14 max-w-[1500px] scroll-mt-16 px-4 sm:px-6 md:px-8">
      <SectionLabel>CLASSIFIED PROJECTS</SectionLabel>

      {/* Table view */}
      <div className="hidden font-(--font-mono) sm:block">
        <div className={`mb-1 grid ${COLS} gap-3 border-b border-(--border) px-3.5 py-1.5 text-[12px] uppercase tracking-[0.15em] text-(--muted)`}>
          <span>#</span><span>Project</span><span>Stack</span><span className="text-center">Status</span><span className="text-right">Links</span>
        </div>
        <div className="flex flex-col gap-0.5">
          {sorted.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <div className={`group relative grid ${COLS} items-start gap-3 border border-transparent bg-(--surface) px-3.5 py-2.5 transition-all duration-150 hover:border-(--border) hover:bg-(--surface-hover) hover:pl-4`}>
                <div aria-hidden className="absolute bottom-0 left-0 top-0 w-0.5 bg-(--green) opacity-0 shadow-[0_0_8px_var(--green)] transition-opacity group-hover:opacity-100" />
                <span className="pt-0.5 text-[12px] text-(--muted)">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div className="mb-1 text-[15px] font-semibold tracking-[0.05em] text-(--green)">{p.name}</div>
                  <div className="text-[13px] leading-[1.7] text-(--text-dim) transition-colors group-hover:text-(--text)">{p.desc}</div>
                </div>
                <div className="pt-0.5 text-[12px] leading-[1.7] text-(--muted)">
                  {p.stack.split(" · ").map(s => <div key={s} className="truncate">{s}</div>)}
                </div>
                <div className="pt-0.5 text-center">
                  <span className={`inline-block border px-1.5 py-0.5 text-[12px] tracking-[0.1em] ${p.live ? "border-(--border) text-(--green)" : "border-[rgba(74,90,74,0.3)] text-(--muted)"}`}>
                    {p.live ? "LIVE" : "PRIVATE"}
                  </span>
                </div>
                <div className="flex justify-end gap-2.5 pt-1"><Links p={p} /></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Card view (mobile) */}
      <div className="grid gap-3 sm:hidden">
        {sorted.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.05}>
            <div className="relative border border-(--border) bg-(--surface) px-4 py-3.5 font-(--font-mono) transition-colors hover:border-[rgba(var(--green-rgb),0.5)]">
              <div className="mb-3 h-px [background:linear-gradient(90deg,var(--green),transparent)]" />
              <div className="mb-2 flex items-start justify-between">
                <div className="text-[15px] font-semibold tracking-[0.05em] text-(--green)">{p.name}</div>
                <div className="flex gap-2.5"><Links p={p} /></div>
              </div>
              <div className="mb-2.5 text-[13px] leading-[1.7] text-(--text-dim)">{p.desc}</div>
              <div className="text-[12px] tracking-[0.08em] text-(--green-dim) opacity-70">{p.stack}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
