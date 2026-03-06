"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Github,
  Mail,
  Phone,
  Code2,
  ExternalLink,
  Trophy,
  Users,
} from "lucide-react";

import { GridLightning, SectionLabel, Pill } from "@/components";
import { fu, fi } from "@/utils/tinyHelpers";

// import resumeData from "../resume.json";
import { GetResume } from "@/services/resumeService";

// ── Resume data ───────────────────────────────────────────────────────────────
const iconMap: Record<string, React.ReactNode> = {
  github: <Github size={14} />,
  mail: <Mail size={14} />,
  phone: <Phone size={14} />,
};

export default function Home() {
  const { data: resumeData , isPending } = GetResume();

  if (isPending) {
    return <div>Loading...</div>;
  }

  const { skills, experience, projects } = resumeData!;

  const contactLinks = resumeData?.contactLinks.map((link) => ({
    ...link,
    icon: iconMap[link.icon] || <ExternalLink size={14} />,
  }));

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#050d10] text-slate-200"
    >
      <GridLightning />

      {/* vignette keeps centre dark */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_70%_50%_at_50%_35%,transparent_20%,#050d10_80%)]" />

      {/* HERO */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-10 pt-20 text-center">
        <motion.div
          {...fi(0.1)}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-400"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-400" />
          Available for opportunities
        </motion.div>

        <motion.h1
          {...fu(0.2)}
          className="mb-4 bg-gradient-to-r from-teal-300 via-cyan-300 to-teal-400 bg-clip-text text-5xl font-black leading-tight tracking-tight text-transparent lg:text-7xl"
        >
          Pantho Haque
        </motion.h1>

        <motion.p
          {...fi(0.4)}
          className="mb-3 text-xl font-semibold text-slate-300"
        >
          Full-Stack Developer <span className="text-cyan-400">&amp;</span>{" "}
          Designer
        </motion.p>

        <motion.p {...fi(0.5)} className="mb-5 text-sm text-slate-400">
          B.Sc CSE · KUET · CGPA{" "}
          <span className="font-bold text-teal-400">3.73</span> · Graduating May
          2025
        </motion.p>

        <motion.p
          {...fi(0.55)}
          className="mx-auto mb-8 max-w-xl text-sm leading-7 text-slate-400"
        >
          Providing exceptional services for programming and design content you
          need.
          <br />
          Join me below and let&apos;s create something amazing together.
        </motion.p>

        <motion.div
          {...fu(0.65)}
          className="mb-12 flex flex-wrap items-center justify-center gap-3"
        >
          {contactLinks?.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-2 text-xs font-semibold text-teal-300 transition-all duration-300 hover:border-teal-400/60 hover:bg-teal-500/20 hover:text-white"
            >
              {l.icon}
              {l.label}
            </a>
          ))}
        </motion.div>

        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative mx-auto mb-10 h-72 w-72 cursor-pointer"
        >
          <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 blur-xl" />
          <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-cyan-500/30 bg-slate-800/50 shadow-xl shadow-cyan-500/10 backdrop-blur-sm transition-transform duration-500 hover:scale-105">
            <Image
              src="/assets/profile.png"
              alt="Pantho Haque"
              className="h-full w-full object-cover"
              priority
              width={288}
              height={288}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
          </div>
        </motion.div>

        <motion.div
          {...fu(0.75)}
          className="mb-16 flex flex-wrap items-center justify-center gap-3"
        >
          <div className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-semibold text-amber-300">
            <Trophy size={12} />
            ITEE FE-Half Passer · Oct 2023
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-300">
            <Users size={12} />
            Team Lead · React &amp; Laravel · Bit2Byte KUET
          </div>
        </motion.div>
      </div>

      {/* EXPERIENCE */}
      <motion.div
        {...fu(0.1)}
        className="relative z-10 mx-auto mb-12 max-w-4xl px-6"
      >
        <SectionLabel>Experience</SectionLabel>
        <div className="rounded-xl border border-teal-500/20 bg-slate-900/80 p-6 backdrop-blur-sm">
          <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="font-bold text-slate-100">{experience.title}</p>
              <p className="text-sm font-semibold text-teal-400">
                {experience.company}
              </p>
            </div>
            <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
              {experience.duration}
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            {experience.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {experience.stack.map((t) => (
              <Pill key={t}>{t}</Pill>
            ))}
          </div>
        </div>
      </motion.div>

      {/* SKILLS */}
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
                {list.map((s:string) => (
                  <Pill key={s}>{s}</Pill>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* PROJECTS */}
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
                <p className="mb-3 text-xs leading-5 text-slate-400">
                  {p.desc}
                </p>
              </div>
              <p className="text-[10px] font-semibold tracking-wide text-teal-600">
                {p.stack}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
