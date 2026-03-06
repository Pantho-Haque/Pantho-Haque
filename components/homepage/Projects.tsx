import { TProject } from "@/types";
import { fu } from "@/utils/tinyHelpers";
import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";
import { Code2, ExternalLink } from "lucide-react";

export default function Projects({ projects }: { projects: TProject[] }) {
  return (
    <motion.div
      {...fu(0.2)}
      className="relative z-10 mx-auto mb-24 max-w-4xl px-6"
    >
      <SectionLabel>Projects</SectionLabel>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.04 * i }}
            className="group flex flex-col justify-between rounded-xl border border-teal-500/15 bg-slate-900/80 p-5 backdrop-blur-sm transition-all duration-200 hover:border-teal-500/40 hover:shadow-[0_0_20px_rgba(45,212,191,0.07)]"
          >
            <div>
              <div className="mb-2 flex items-start justify-between gap-2">
                <p className="font-bold text-slate-100 transition-colors duration-150 group-hover:text-teal-300">
                  {p.name}
                </p>
                <div className="flex shrink-0 gap-2">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-teal-400"
                    >
                      <ExternalLink size={13} />
                    </a>
                  )}
                  {p.code && (
                    <a
                      href={p.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-teal-400"
                    >
                      <Code2 size={13} />
                    </a>
                  )}
                </div>
              </div>
              <p className="mb-3 text-xs leading-5 text-slate-400">{p.desc}</p>
            </div>
            <p className="text-[10px] font-semibold tracking-wide text-teal-600">
              {p.stack}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
