"use client";
import { SectionLabel, Pill } from "@/components";
import { TSkills } from "@/types";
import { TerminalBar } from "./Terminal";
import Reveal from "./Reveal";

export default function Skills({ skills }: { skills: TSkills }) {
  const entries = Object.entries(skills) as [string, string[]][];
  const total = entries.reduce((n, [, l]) => n + l.length, 0);

  return (
    <section id="capabilities" className="relative z-10 mx-auto mb-14 max-w-[1500px] scroll-mt-16 px-4 sm:px-6 md:px-8">
      <SectionLabel>CAPABILITY MATRIX</SectionLabel>
      <TerminalBar command={`root@subject:~$ cat skills.json | jq '.categories[]'  # ${total} entries indexed`} />

      <div className="grid gap-2.5 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
        {entries.map(([cat, list], idx) => (
          <Reveal key={cat} delay={idx * 0.08}>
            <div className="group relative h-full overflow-hidden border border-(--border) bg-(--surface) px-4 py-3.5 transition-all duration-200 hover:border-(--green) hover:bg-(--surface-hover) hover:shadow-[0_0_24px_rgba(var(--green-rgb),0.12)]">
              {/* hover scan sweep */}
              <div aria-hidden className="pointer-events-none absolute left-0 right-0 top-0 h-0.5 opacity-0 [background:linear-gradient(90deg,transparent,var(--green),transparent)] group-hover:animate-[sweep_1.4s_linear_infinite]" />

              <div className="absolute right-2.5 top-2 select-none font-(--font-crt) text-[28px] leading-none text-[rgba(var(--green-rgb),0.06)] transition-colors group-hover:text-[rgba(var(--green-rgb),0.2)]">
                {String(idx + 1).padStart(2, "0")}
              </div>

              <div className="mb-2.5 flex items-center gap-1.5 font-(--font-display) text-[12px] font-bold uppercase tracking-[0.25em] text-(--green)">
                <span className="text-(--muted) transition-transform group-hover:translate-x-0.5">▸</span>
                {cat}
                <span className="ml-auto mr-8 font-(--font-mono) text-[11px] font-normal tracking-[0.15em] text-(--muted)">{list.length} ENTRIES</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {list.map((s) => <Pill key={s}>{s}</Pill>)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
