import Image from "next/image";
import { motion } from "framer-motion";
import { SKILL_LIST } from "../constants";

export default function Skills() {
  
  return (
    <div className="px-4 md:px-8 pt-4">
      <h1
        id="skills"
        className="text-5xl font-semibold ml-3 pb-3 md:ml-14 border-b-2 border-emerald-700"
      >
       # Skills
      </h1>

      <section className="mt-10 lg:mx-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILL_LIST.map((el, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="backdrop-blur-sm rounded-xl border border-slate-700 hover:border-cyan-500/40 
                bg-gradient-to-br from-slate-900/80 to-slate-800/50 overflow-hidden 
                hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 
                flex flex-col p-6 h-full hover:scale-105"
            >
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-full blur-md"></div>
                  <div className="relative bg-slate-800/50 p-3 rounded-full">
                    <Image
                      src={el.icon}
                      className="w-16 h-16 object-contain"
                      alt={el.name}
                      width={64}
                      height={64}
                    />
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 text-center hover:text-cyan-400 transition-colors">
                {el.name}
              </h3>

              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {el.skills.map((elem, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs font-medium bg-cyan-500/10 text-cyan-400 
                      rounded-full border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
                  >
                    {elem}
                  </span>
                ))}
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mt-auto text-center">
                {el.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
