"use client";
import { GridLightning, Experiences, Skills, Projects, HeroSection } from "@/components";

import { GetResume } from "@/services/resumeService";

export default function Home() {
  const { data: resumeData, isPending } = GetResume();

  if (isPending) {
    return <div>Loading...</div>;
  }

  const { skills, experience, projects, hero } = resumeData!;

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#050d10] text-slate-200"
    >
      <GridLightning />

      {/* vignette keeps centre dark */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_70%_50%_at_50%_35%,transparent_20%,#050d10_80%)]" />

      {/* HERO */}
      <HeroSection hero={hero} />

      <div className="relative z-10">
        <GridLightning />
        {/* EXPERIENCE */}
        <Experiences experiences={experience} />

        {/* SKILLS */}
        <Skills skills={skills} />
      </div>

      <div className="relative z-10">
        <GridLightning />
        {/* PROJECTS */}
        <Projects projects={projects} />
      </div>
    </section>
  );
}
