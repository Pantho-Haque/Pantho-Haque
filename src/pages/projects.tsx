import { motion } from "framer-motion";
import Image from "next/image";

import Link from "next/link";
import { projectdata } from "../../public/assets/projects/porject";

export default function Projects() {
  return (
    <div>
      <h1
        id="projects"
        className="text-5xl font-semibold ml-3 pb-3 md:ml-14 mt-40 border-b-2 border-slate-800 "
      >
        # My works!!
      </h1>

      <section className="mt-5 lg:mx-40 lg:flex lg:flex-wrap gap-10 ">
        {projectdata.map((project, i) => {
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group relative overflow-hidden rounded-xl border-2 border-slate-800/50 hover:border-none bg-slate-900/50 p-6 hover:bg-slate-800/50 transition-all duration-300"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {project.name}
                </h3>

                <p className="text-slate-300 text-base leading-relaxed ">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.badge.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm font-medium bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20 hover:border-cyan-500/40 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  href={project.link}
                  passHref={true}
                  className="inline-flex items-center mt-4 text-cyan-400 cursor-pointer hover:text-cyan-300 transition-colors group/link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="font-semibold">{project.link_text}</span>
                  <svg
                    className="w-5 h-5 ml-2 transform group-hover/link:translate-x-1 transition-transform"
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
              </div>
            </motion.div>
          );
        })}
      </section>
    </div>
  );
}
