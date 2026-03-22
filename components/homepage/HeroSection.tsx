import Image from "next/image";
import { motion } from "framer-motion";
import { Icon } from "@/components";
import { fu, fi } from "@/utils/tinyHelpers";
import { THero } from "@/types";

export default function HeroSection({ hero }: { hero: THero }) {
  return (
    <div className="relative z-10 mx-auto max-w-4xl px-6 pb-10 pt-20 text-center">
      <div className="rounded-3xl mb-12 bg-white/[0.001] backdrop-blur-sm shadow-[0_0_80px_rgba(0,0,0,0.003),inset_0_1px_0_rgba(255,255,255,0.004)]">
        {hero.isAvailable && (
          <motion.div
            {...fi(0.1)}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-300"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-400" />
            Available for opportunities
          </motion.div>
        )}

        <motion.h1
          {...fu(0.2)}
          className="mb-4 text-white bg-gradient-to-r from-teal-300 via-cyan-300 to-teal-400 bg-clip-text text-5xl font-black leading-tight tracking-tight lg:text-7xl capitalize"
        >
          {hero.name}
        </motion.h1>

        <motion.p
          {...fi(0.4)}
          className="mb-3 text-xl font-semibold text-slate-100 capitalize"
        >
          {hero.current_position}
        </motion.p>

        <motion.p {...fi(0.5)} className="mb-5 text-sm text-slate-200">
          {hero.company_name}
        </motion.p>

        <motion.p
          {...fi(0.55)}
          className="mx-auto mb-8 max-w-xl text-sm leading-7 text-slate-200"
        >
          {hero.comment_one}
          <br />
          {hero.comment_two}
        </motion.p>

        <motion.div
          {...fu(0.65)}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {hero?.contactLinks?.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-2 text-xs font-semibold text-teal-100 transition-all duration-50 hover:border-teal-400/60 hover:bg-teal-400/20 hover:text-white"
            >
              {Icon(l.icon)}
              {l.label}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Profile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="relative mx-auto mb-10 h-72 w-72 cursor-pointer"
      >
        <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 blur-xl" />
        <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-cyan-500/30 bg-slate-800/50 shadow-xl shadow-cyan-500/10 backdrop-blur-sm transition-transform duration-500 hover:scale-105">
          {hero.photo.trim() ? (
            <Image
              src={hero.photo.trim()}
              alt="Pantho Haque"
              className="h-full w-full object-cover"
              priority
              width={288}
              height={288}
            />
          ) : (
            <div className="h-full w-full bg-slate-700/50 flex items-center justify-center text-slate-500 text-4xl">
              !!! 404 !!!
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        </div>
      </motion.div>

      <motion.div
        {...fu(0.75)}
        className="mb-16 flex flex-wrap items-center justify-center gap-3"
      >
        {hero.achivements.map((ac, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 rounded-lg border  px-4 py-2 text-xs font-semibold ${ac.theme}`}
          >
            {Icon(ac.icon)}
            {ac.text}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
