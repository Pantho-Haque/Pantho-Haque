import { SectionLabel, Pill } from "@/components";
import { TExperience } from "@/types";
import { fu } from "@/utils/tinyHelpers";
import { motion } from "framer-motion";

export default function Experiences({
  experiences,
}: {
  experiences: TExperience[];
}) {
  return (
    <motion.div
      {...fu(0.1)}
      className="relative z-10 mx-auto mb-12 max-w-4xl px-6 flex flex-col gap-2"
    >
      <SectionLabel>Experience</SectionLabel>
      {experiences?.map((exp, i) => (
        <div
          key={i}
          className="rounded-xl border border-teal-500/20 bg-slate-900/80 p-6 backdrop-blur-sm"
        >
          <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="font-bold text-slate-100">{exp.title}</p>
              <p className="text-sm font-semibold text-teal-400">
                {exp.company}
              </p>
            </div>
            <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
              {exp.duration}
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            {exp.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {exp.stack.map((t) => (
              <Pill key={t}>{t}</Pill>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
