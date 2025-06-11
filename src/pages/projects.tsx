import { PROJECCT_DATA } from "@/constants";
import { motion } from "framer-motion";

import Link from "next/link";


export default function Projects() {
  return (
    <div className="px-4 md:px-8 pt-4">
      <h1
        id="projects"
        className="text-5xl font-semibold ml-3 pb-3 md:ml-14  border-b-2 border-emerald-700"
      >
       # My works!!
      </h1>
   

      <section className="mt-10 lg:mx-40 flex flex-col md:flex-row md:flex-wrap gap-10 justify-between">
        {PROJECCT_DATA.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="w-full md:w-[calc(30%-1rem)] lg:w-base backdrop-blur-sm rounded-xl border border-slate-700 hover:border-cyan-500/40 bg-gradient-to-br from-slate-900/80 to-slate-800/50 overflow-hidden hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col cursor-pointer hover:scale-105"
          >
            <div className="p-5 flex-grow">
              <h3 className="text-xl font-bold text-white mb-2 hover:text-cyan-400 transition-colors">
                {project.name}
              </h3>
              
              <p className="text-slate-300 text-sm leading-relaxed mb-3 min-h-[60px] sm:min-h-[80px]">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.badge.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 text-xs font-medium bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <Link
              href={project.link}
              passHref
              className="group/link mt-auto border-t border-slate-700/50 p-3 flex items-center justify-between bg-slate-800/30 hover:bg-cyan-500/10 transition-all duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-sm font-medium text-cyan-400">{project.link_text}</span>
              <svg
                className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300 text-cyan-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-tl from-cyan-500/30 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
