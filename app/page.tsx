"use client";
import {
  GridLightning,
  Experiences,
  Skills,
  Projects,
  HeroSection,
} from "@/components";

import { GetResume } from "@/services/resumeService";

export default function Home() {
  const { data: resumeData, isPending } = GetResume();

  if (isPending) {
    return <div>Loading...</div>;
  }

  const { skills, experience, projects, hero } = resumeData!;

  return (
    <main id="home" className="relative min-h-screen text-slate-200">
      <GridLightning />

      {/* vignette keeps centre dark */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_35%,transparent_20%,#050d10_80%)]" />

      <div className="relative z-10">
        <HeroSection hero={hero} />
        <Experiences experiences={experience} />
        <Skills skills={skills} />
        <Projects projects={projects} />
      </div>
    </main>
  );
}
