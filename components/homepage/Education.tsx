"use client";
import { TEducation } from "@/types";
import { SectionLabel } from "@/components";
import Reveal from "./Reveal";

export default function Education({ education }: { education: TEducation }) {
  if (!education) return null;
  return (
    <section id="credentials" className="relative z-10 mx-auto mb-14 max-w-[1100px] scroll-mt-16 px-4 sm:px-6 md:px-8">
      <SectionLabel>CREDENTIALS</SectionLabel>
      <Reveal>
        <div className="relative grid gap-4 border border-(--border) bg-(--surface) p-5 font-(--font-mono) transition-colors hover:border-[rgba(var(--green-rgb),0.45)] sm:grid-cols-[1fr_auto]">
          <div className="absolute left-0 top-0 h-full w-0.5 bg-(--green)" />
          <div>
            <div className="mb-1 text-[11px] tracking-[0.15em] text-(--muted)">{"// ACADEMIC CLEARANCE //"}</div>
            <div className="font-(--font-display) text-[16px] font-bold uppercase tracking-[0.1em] text-(--green)">{education.degree}</div>
            <div className="mt-1 text-[14px] tracking-[0.05em] text-(--amber)">@ {education.institution}</div>
          </div>
          <div className="flex gap-6 sm:flex-col sm:gap-2 sm:text-right">
            {[["CGPA", education.cgpa], ["GRADUATED", education.graduation]].map(([k, v]) => (
              <div key={k}>
                <div className="text-[11px] tracking-[0.15em] text-(--muted)">{k}</div>
                <div className="text-[16px] text-(--green)">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
