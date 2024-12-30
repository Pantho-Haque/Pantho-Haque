import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { useEffect, useState } from "react";

import profilepic from "../../public/assets/profile.png";

import Aboutme from "../components/Aboutme";
import Contact from "../components/Contacts";
import Footer from "../components/Footer";
import MediaLinks from "../components/MediaLinks";
import Navigation from "../components/Navigation";
import Projects from "../components/Projects";
import Skills from "../components/Skills";

export default function Home() {
  const [section, setSection] = useState("home");
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <main className="min-w-screen min-h-screen flex flex-col justify-between  bg-slate-900 text-slate-200  overflow-hidden">
      <Navigation setSection={setSection} />

      {section === "home" && (
        <section id="home" className="mt-5">
          <div className="text-center max-w-2xl  p-20 mx-auto ">
            <h1 className="text-4xl lg:text-7xl text-teal-300 font-medium">
              Pantho Haque
            </h1>
            <p className="font-semibold text-xl mb-5 ">
              Developer and Designer{" "}
            </p>
            <p className="text-md text-gray-100 leading-8">
              Providing service for programming and design content you needs.
              Join me down below and lets get started
            </p>
            <MediaLinks />
          </div>

          <div className="relative bg-gradient-to-b from-slate-800 w-80    h-80 mx-auto rounded-full">
            <Image src={profilepic} alt="Deco" className="w-60 mx-auto" />
          </div>
        </section>
      )}
      {section == "about" && <Aboutme />}
      {section == "skills" && <Skills />}
      {section == "projects" && <Projects />}
      {section == "contact" && <Contact />}

      <Footer />
    </main>
  );
}
