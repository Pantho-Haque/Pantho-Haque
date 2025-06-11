import Image from "next/image";
import { useEffect, useState } from "react";
import MediaLinks from "../components/MediaLinks";

export default function Home() {
  const [section, setSection] = useState("home");

  return (
    <section id="home" className="mt-5">
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
        <Image src={"/assets/profile.png"} alt="Deco" className="w-60 mx-auto" priority width={100} height={200} />
      </div>
    </section>
  );
}
