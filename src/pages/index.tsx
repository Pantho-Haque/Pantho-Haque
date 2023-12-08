import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { useEffect } from "react";


import profilepic from "../../public/assets/profile.png";

import Aboutme from "../components/Aboutme";
import Contact from "../components/Contacts";
import Footer from "../components/Footer";
import MediaLinks from "../components/MediaLinks";
import Navigation from "../components/Navigation";
import Projects from "../components/Projects";
import Skills from "../components/Skills";

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <main className="min-w-screen min-h-screen  bg-slate-900 text-slate-200 overflow-hidden">
      <Navigation />

      {/* 

          home

      */}
      <section id="home" className="min-h-screen mt-20">
        <div className="text-center max-w-2xl  p-20 mx-auto ">
          <h1 className="text-4xl lg:text-7xl text-teal-300 font-medium">
            Pantho Haque
          </h1>
          <p className="font-semibold text-xl mb-5 ">Developer and Designer </p>
          <p className="text-md text-gray-100 leading-8">
            Providing service for programming and design content you needs. Join
            me down below and lets get started
          </p>
          <MediaLinks />
        </div>

        <div className="relative bg-gradient-to-b from-slate-800 w-80    h-80 mx-auto rounded-full">
          <Image src={profilepic} alt="Deco" className="w-60 mx-auto" />
        </div>
      </section>

      {/* 
      
          About me
      
      
      */}

      <Aboutme />
      {/* 
      
         Skills
      
      
      */}
      <h1
        id="skills"
        className="text-5xl font-semibold ml-3 pb-3 md:ml-14 mt-20 border-b-2 border-slate-800 "
      >
        # Skills
      </h1>
      <Skills />

      {/* 
      
          my works
      
      
      */}
      <h1
        id="projects"
        className="text-5xl font-semibold ml-3 pb-3 md:ml-14 mt-40 border-b-2 border-slate-800 "
      >
        # My works!!
      </h1>
      <Projects /> 

      {/* 
      
        contacts
      
      
      */}

      <h1
        id="contact"
        className="text-5xl font-semibold ml-3 pb-3 md:ml-14 mt-40 border-b-2 border-slate-800 "
      >
        # Contact
      </h1>
      <Contact />

      {/* 
      
          footer
      */}
      <Footer />
    </main>
  );
}
