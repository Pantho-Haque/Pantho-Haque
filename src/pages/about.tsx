import Image from "next/image";

import aboutmepic from "../../public/assets/aboutme.png";

export default function Aboutme() {
  return (
    <section
      id="about"
      className="mt-24 flex flex-col lg:flex-row gap-10 justify-center items-center   "
    >
      <div
        
        className="relative bg-gradient-to-bl lg:bg-gradient-to-tr from-emerald-950 via-slate-900 w-full max-w-lg h-120  rounded-lg "
      >
        <Image src={aboutmepic} alt="Deco" className="w-80 mx-auto" />
      </div>
      <div className="max-w-lg lg:ml-10 px-5">
        <h1 className="text-5xl font-semibold mt-10 lg:mt-0  mb-1">
          # About me
        </h1>
        <h3 className="text-2xl text-emerald-500 font-semibold  mb-5">
          Web developer being a student
        </h3>
        <div className="text-justify">
          Currently I am a student of 3rd year in Computer Science and
          Engineering , Khulna University of Engineering and Technology.
          <br />I have worked in several projects with seniors and teachers.Also
          I have 3 years of learning experience in those fields
          <p className="italic text-cyan-400 text-lg"> - Graphics designing</p>
          <p className="italic text-cyan-400 text-lg"> - Web Designing </p>
          <p className="italic text-cyan-400 text-lg"> - Web Development </p>
        </div>
      </div>
    </section>
  );
}
