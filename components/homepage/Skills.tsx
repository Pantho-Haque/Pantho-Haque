import { TSkills } from "@/types";
import { fu } from "@/utils/tinyHelpers";
import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";
import Pill from "./Pill";

export default function Skills({ skills }: { skills: TSkills }) {
  return (
    <motion.div
      {...fu(0.15)}
      className="relative z-10 mx-auto mb-12 max-w-4xl px-6"
    >
      <SectionLabel>Technical Skills</SectionLabel>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {Object.entries(skills).map(([cat, list]) => (
          <div
            key={cat}
            className="rounded-xl border border-teal-500/15 bg-slate-900/80 p-4 backdrop-blur-sm"
          >
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-teal-500">
              {cat}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {list.map((s: string) => (
                <Pill key={s}>{s}</Pill>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
