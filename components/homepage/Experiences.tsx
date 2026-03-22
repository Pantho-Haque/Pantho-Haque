"use client";

import { motion } from "framer-motion";
import { SectionLabel, Pill } from "@/components";
import { TExperience } from "@/types";
import { fu } from "@/utils/tinyHelpers";

export default function Experiences({
  experiences,
}: {
  experiences: TExperience[];
}) {
  return (
    <motion.div
      {...fu(0.1)}
      className="relative z-10 mx-auto mb-12 max-w-4xl px-6 flex flex-col gap-3"
    >
      <SectionLabel>Experience</SectionLabel>

      {experiences?.map((exp, i) => (
        <div
          key={i}
          className="group relative overflow-hidden rounded-2xl border border-teal-500/12 bg-slate-900/65 p-7 backdrop-blur-sm transition-all duration-250 hover:-translate-y-0.5 hover:border-teal-500/30 hover:shadow-[0_12px_32px_rgba(0,0,0,0.3)]"
        >
          {/* Top accent line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-teal-400 via-cyan-400 to-transparent opacity-70" />

          {/* Header row */}
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-4">
              {/* Logo placeholder — swap with real <Image> if you have it */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border border-teal-500/15 bg-teal-500/8 text-lg">
                🛵
              </div>
              <div>
                <p className="font-bold text-slate-100">{exp.title}</p>
                <p className="font-mono text-sm font-semibold tracking-[0.04em] text-teal-400">
                  {exp.company}
                </p>
              </div>
            </div>
            <span className="rounded-full border border-slate-700/60 px-3 py-1 font-mono text-xs text-slate-500">
              {exp.duration}
            </span>
          </div>

          {/* Description — indented to align with text column */}
          <p className="mb-5 pl-[60px] text-sm leading-[1.85] text-slate-400">
            {exp.description}
          </p>

          {/* Stack pills */}
          <div className="flex flex-wrap gap-2 pl-[60px]">
            {exp.stack.map((t) => (
              <Pill key={t}>{t}</Pill>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
}