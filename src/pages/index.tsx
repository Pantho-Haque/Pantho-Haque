import Image from "next/image";
import { useEffect, useState } from "react";
import {MediaLinks} from "@/components";
import { motion } from "framer-motion";

export default function Home() {
  const [section, setSection] = useState("home");

  return (
    <section id="home" className="relative h-full overflow-hidden">
      
      <div className="text-center max-w-3xl py-10 md:pt-20 mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl lg:text-7xl bg-gradient-to-r from-teal-300 to-cyan-400 bg-clip-text text-transparent font-bold mb-4"
        >
          Pantho Haque
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-semibold text-xl mb-6 text-slate-200"
        >
          Developer <span className="text-cyan-400">&</span> Designer
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-md text-slate-300 leading-8 mb-8"
        >
          Providing exceptional services for programming and design content you need.
          <br />Join me below and let&apos;s create something amazing together.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <MediaLinks />
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative w-80 h-80 mx-auto cursor-pointer"
      >
        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-full blur-lg"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600/20 to-teal-400/20 rounded-full animate-pulse duration-4000"></div>
        <div className="relative w-full h-full rounded-full border-2 border-cyan-500/30 shadow-xl shadow-cyan-500/10 overflow-hidden backdrop-blur-sm bg-slate-800/50 hover:scale-105 transition-all duration-700 ease-in-out">
          <Image 
            src={"/assets/profile.png"} 
            alt="Profile Picture" 
            className="w-full h-full object-cover transition-all duration-700 ease-in-out" 
            priority 
            width={320} 
            height={320} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
        </div>
      </motion.div>
    </section>
  );
}
