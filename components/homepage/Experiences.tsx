"use client";
import { SectionLabel, Pill } from "@/components";
import { TExperience } from "@/types";
import { TerminalBar } from "./Terminal";
import Reveal from "./Reveal";

export default function Experiences({ experiences }: { experiences: TExperience[] }) {
  return (
    <section id="history" className="relative z-10 mx-auto mb-14 max-w-[1100px] scroll-mt-16 px-4 sm:px-6 md:px-8">
      <SectionLabel>OPERATIONAL HISTORY</SectionLabel>
      <TerminalBar command="root@subject:~$ cat employment_log.txt" />

      <div className="ml-1.5 flex flex-col gap-3 border-l border-(--border) pl-5">
        {experiences?.map((exp, idx) => (
          <Reveal key={idx} delay={idx * 0.1} className="relative">
            {/* timeline node */}
            <span aria-hidden className="absolute -left-[25px] top-5 h-2.5 w-2.5 border border-(--green) bg-(--bg) shadow-[0_0_8px_var(--green)]" />

            <article className="relative overflow-hidden border border-(--border) bg-(--surface) px-5 py-4 transition-colors hover:border-[rgba(var(--green-rgb),0.45)]">
              <div className="absolute right-3.5 top-3 select-none font-(--font-crt) text-[28px] leading-none text-[rgba(var(--green-rgb),0.06)]">
                {String(idx + 1).padStart(2, "0")}
              </div>

              <div className="mb-2 flex flex-wrap items-start justify-between gap-2.5">
                <div>
                  <h3 className="mb-0.5 font-(--font-display) text-[18px] font-bold uppercase tracking-[0.1em] text-(--green)">{exp.title}</h3>
                  <div className="font-(--font-mono) text-[14px] tracking-[0.05em] text-(--amber)">@ {exp.company}</div>
                </div>
                <div className="border border-(--border) bg-[rgba(var(--green-rgb),0.05)] px-2 py-1 font-(--font-mono) text-[13px] text-(--muted)">
                  {exp.duration}
                </div>
              </div>

              <p className="mb-3.5 text-[16px] leading-[1.6] text-(--text)">{exp.description}</p>

              {exp.detailed_desc_html && (
                <details className="group/d mb-3.5" open={idx === 0}>
                  <summary className="inline-flex cursor-crosshair select-none list-none items-center gap-2 border border-(--border) px-2.5 py-1 font-(--font-mono) text-[12px] tracking-[0.15em] text-(--green-dim) transition-colors hover:border-(--green) hover:text-(--green)">
                    <span className="transition-transform group-open/d:rotate-90">▸</span>
                    <span className="group-open/d:hidden">EXPAND DOSSIER</span>
                    <span className="hidden group-open/d:inline">COLLAPSE DOSSIER</span>
                  </summary>
                  <div
                    className="mt-3 border-l-2 border-(--green-dark) pl-3 font-(--font-mono) text-[14px] leading-[1.7] text-(--text) [&_.text-gray-300]:text-(--muted) [&_strong]:text-(--green)"
                    dangerouslySetInnerHTML={{ __html: exp.detailed_desc_html }}
                  />
                </details>
              )}

              <div className="flex flex-wrap gap-1.5">
                {exp.stack?.map((s) => <Pill key={s}>{s}</Pill>)}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
