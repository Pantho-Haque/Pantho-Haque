import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiFillInstagram,
} from "react-icons/ai";

import { BsFillMoonStarsFill } from "react-icons/bs";
import { BiCurrentLocation, BiPhoneCall, BiMenu } from "react-icons/bi";
import { AiTwotoneMail } from "react-icons/ai";

import Link from "next/link";
import logo from "../../public/assets/logo.svg";
import profilepic from "../../public/assets/profile.png";
import aboutmepic from "../../public/assets/aboutme.png";
import { projectdata } from "../../public/assets/projects/porject";
import graphicsdesign from "../../public/assets/skills/graphicsdesign.png";
import webdesign from "../../public/assets/skills/webdesign.png";
import webdevelopment from "../../public/assets/skills/webdevelopment.png";
import database from "../../public/assets/skills/database.png";

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);
  const [navOpen, setNavOpen] = useState(false);

  const NavLinks = () => (
    <div className="flex flex-col lg:flex-row lg:space-x-2 mr-10 justify-start items-start ">
      {/* <li className="">
    <BsFillMoonStarsFill className="cursor-pointer text-xl" />
  </li> */}

      <a href="#home" className=" hover:bg-cyan-950  px-4 py-2 rounded-md btn ">
        Home
      </a>
      <a
        href="#about"
        className=" hover:bg-cyan-950  px-4 py-2 rounded-md btn "
      >
        About
      </a>
      <a
        href="#skills"
        className=" hover:bg-cyan-950  px-4 py-2 rounded-md btn "
      >
        Skills
      </a>
      <a
        href="#projects"
        className=" hover:bg-cyan-950  px-4 py-2 rounded-md btn "
      >
        Projects
      </a>
      <a
        href="#contact"
        className=" hover:bg-cyan-950  px-4 py-2 rounded-md btn "
      >
        Contact
      </a>
      <a
        href="#"
        className="bg-gradient-to-br from-slate-500 to-slate-900 px-4 py-2 rounded-md btn "
      >
        Resume
      </a>
    </div>
  );

  const MediaLInks = () => (
    <ul className="flex justify-center mt-5 space-x-5">
      <li>
        <a href="https://www.facebook.com/panhohaque75" target="_blank" >
          <AiFillFacebook className="cursor-pointer text-4xl text-slate-200" />
        </a>
      </li>
      <li>
        <a href="https://www.instagram.com/pan_da_pantho/"  target="_blank">
          <AiFillInstagram className="cursor-pointer text-4xl text-slate-200" />
        </a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/panthohaque/" target="_blank">
          <AiFillLinkedin className="cursor-pointer text-4xl text-slate-200" />
        </a>
      </li>
    </ul>
  );
  return (
    <main className="min-w-screen min-h-screen  bg-slate-900 text-slate-200 overflow-hidden">
      <nav className="w-full h-10 p-10 shadow-2xl flex justify-between items-center fixed top-0 left-0 right-0  bg-slate-900 z-30">
        <h1 className="w-10 ml-10">
          <Image src={logo} alt="logo" />
        </h1>
        <div className="hidden lg:flex">
          <NavLinks />
        </div>
        <div className="relative w-12 flex lg:hidden">
          <BiMenu
            className="text-5xl p-2 w-12  border border-emerald-500 rounded-xl cursor-pointer"
            onClick={() => {
              setNavOpen(!navOpen);
            }}
          />
          <div
            className={`${
              navOpen ? "flex" : "hidden"
            } absolute top-12 -left-20 w-40 p-10 pt-3 bg-slate-900 ring-2 rounded-lg`}
          >
            <NavLinks />
          </div>
        </div>
      </nav>

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
            Providing service for programming and design content needs. Join me
            down below and lets get started
          </p>
          <MediaLInks />
        </div>

        <div className="relative bg-gradient-to-b from-slate-800 w-80    h-80 mx-auto rounded-full">
          <Image src={profilepic} alt="Deco" className="w-60 mx-auto" />
        </div>
      </section>

      {/* 
      
            About me
      
      
      */}
      <section
        id="about"
        className="mt-20 lg:mb-60 min-h-screen flex flex-col lg:flex-row gap-10 justify-center items-center   "
      >
        <div
          data-aos="zoom-out"
          className="relative bg-gradient-to-bl lg:bg-gradient-to-tr from-emerald-950 via-slate-900 w-full max-w-lg h-120  rounded-lg "
        >
          <Image src={aboutmepic} alt="Deco" className="w-80 mx-auto" />
        </div>
        <div data-aos="zoom-out" className="max-w-lg lg:ml-10 px-5">
          <h1 className="text-5xl font-semibold mt-10 lg:mt-0  mb-1">
            # About me
          </h1>
          <h3 className="text-2xl text-emerald-500 font-semibold  mb-5">
            Web developer being a student
          </h3>
          <div className="text-justify">
            Currently I am a student of 3rd year in Computer Science and
            Engineering , Khulna University of Engineering and Technology.
            <br />I have worked in several projects with seniors and
            teachers.Also I have 3 years of learning experience in those fields
            <p className="italic text-cyan-400 text-lg">
              {" "}
              - Graphics designing
            </p>
            <p className="italic text-cyan-400 text-lg"> - Web Designing </p>
            <p className="italic text-cyan-400 text-lg"> - Web Development </p>
          </div>
        </div>
      </section>

      {/* 
    
            skills
    
    
    */}
      <h1
        id="skills"
        className="text-5xl font-semibold ml-3 pb-3 md:ml-14 mt-20 border-b-2 border-slate-800 "
      >
        # Skills
      </h1>
      <section className="mt-5 lg:flex lg:flex-wrap gap-10 lg:mb-60 ">
        {[
          {
            icon: graphicsdesign,
            name: "Graphics Designing",
            skills: ["Illustrator", "Photoshop", "Powerpoint", "Figma"],
            desc: "I am capable of designing any website, make any logo or icons that is necessary for an website using those tools.",
          },
          {
            icon: webdesign,
            name: "Frontend",
            skills: [
              "HTML5",
              "CSS3",
              "Bootstrap",
              "TailwindCSS",
              "ChakraUI",
              "JavaScript ES6",
              "JQuery",
              "ReactJS",
              "NextJS",
            ],
            desc: "Crafting engaging web experiences with the power of new technologies is my passion.With a keen eye for detail and a deep understanding I create intuitive, responsive websites.",
          },
          {
            icon: webdevelopment,
            name: "Backend",
            skills: ["NodeJS", "ExpressJS", "Django", "Laravel"],
            desc: "Through APIs frontend applications are being connected with backend applications.A backend applications consist of database management,authentication and etc.",
          },
          {
            icon: database,
            name: "Database",
            skills: ["MySql", "Firebase"],
            desc: "To store any users information and their data we must need to maintain a databaseI have knowledge about both SQL and NoSQL.",
          },
        ].map((el, i) => {
          return (
            <div
              key={i}
              className="flex flex-col justify-center items-center space-y-5 
         md:w-[70%] lg:w-[33%]  mx-auto  p-10 text-center  shadow-xl shadow-slate-950 
         lg:basis-1/3 lg:flex-1 xl:basis-0
         "
              data-aos="zoom-in-down"
            >
              <Image
                src={el.icon}
                className="w-32 h-32 object-cover mx-auto"
                alt=""
              />
              <h1 className="text-xl font-medium text-slate-300">{el.name}</h1>
              <div className="flex gap-1 flex-wrap justify-center items-start">
                {el.skills.map((elem, index) => (
                  <p
                    key={index}
                    className="h-8 px-2 border-2 border-emerald-900 rounded-full  text-center text-emerald-500 font-bold "
                  >
                    {elem}
                  </p>
                ))}
              </div>
              <p>{el.desc}</p>
            </div>
          );
        })}
      </section>

      {/* 
      
          my works
      
      
      */}
      <h1
        id="projects"
        className="text-5xl font-semibold ml-3 pb-3 md:ml-14 mt-40 border-b-2 border-slate-800 "
      >
        # My works!!
      </h1>
      <section className="mt-5 lg:mx-40 lg:flex lg:flex-wrap gap-10 ">
        {projectdata.map((el, i) => {
          return (
            <Link
              href={el.link}
              key={i}
              data-aos="fade-up"
              className="flex flex-col justify-center items-start space-y-2
            md:w-[70%] lg:w-[33%]  mx-auto  p-10 text-start  shadow-xl shadow-slate-950 basis-1/4 flex-1 "
            >
              <motion.div
                whileHover={{
                  scale: 1.01,
                }}
              >
                <Image
                  src={el.img}
                  className="w-full h-full object-cover mx-auto"
                  layout="responsive"
                  alt=""
                />
                <h1 className="text-xl font-medium text-slate-300 mb-4">
                  {el.name}
                </h1>
                <div className="flex gap-1 justify-start items-start">
                  {el.badge.map((elem, index) => (
                    <p
                      key={index}
                      className="h-8 px-2 border-2 border-slate-500 rounded-full  text-center text-emerald-500 font-bold "
                    >
                      {elem}
                    </p>
                  ))}
                </div>
                <p className="mt-4">{el.desc}</p>
              </motion.div>
            </Link>
          );
        })}
        <div className="flex w-full justify-center items-center mt-10">
          <Link
            href="#"
            className="px-6 py-2 border-2 border-cyan-500 rounded-full  text-center text-3xl text-cyan-500 font-bold  hover:bg-cyan-500 hover:text-slate-800  "
          >
            Show More
          </Link>
        </div>
      </section>

      {/* 
      
        contacts
      
      
      */}

      <h1
        id="contact"
        className="text-5xl font-semibold ml-3 pb-3 md:ml-14 mt-40 border-b-2 border-slate-800 "
      >
        # Contact
      </h1>
      <section className="mt-5 lg:mx-20 lg:flex gap-10 lg:gap-3 shadow-xl ">
        {/* location */}
        <div
          className="flex flex-col justify-center items-center space-y-1 
          md:w-[70%] lg:w-[33%]  mx-auto p-5  text-center  shadow-xl shadow-slate-950"
          data-aos="zoom-in-down"
        >
          <div className="flex justify-center items-center gap-1 text-emerald-200">
            <BiCurrentLocation className="text-2xl" />
            <p className="text-xl font-medium ">Current Location</p>
          </div>
          <p className="font-semibold">Fulbarigate , Khulna</p>
        </div>
        {/* email */}
        <div
          className="flex flex-col justify-center items-center space-y-1 
          md:w-[70%] lg:w-[33%]  mx-auto p-5  text-center  shadow-xl shadow-slate-950"
          data-aos="zoom-in-down"
        >
          <div className="flex justify-center items-center gap-1 text-emerald-200">
            <AiTwotoneMail className="text-2xl" />
            <p className="text-xl font-medium ">Email</p>
          </div>
          <p className="font-semibold">panthohaque927908@gmail.com</p>
        </div>

        {/* phone */}
        <div
          className="flex flex-col justify-center items-center space-y-1 
          md:w-[70%] lg:w-[33%]  mx-auto p-5  text-center  shadow-xl shadow-slate-950"
          data-aos="zoom-in-down"
        >
          <div className="flex justify-center items-center gap-1 text-emerald-200">
            <BiPhoneCall className="text-2xl" />
            <p className="text-xl font-medium ">Phone</p>
          </div>
          <p className="font-semibold"> +8801(.....)</p>
        </div>
      </section>

      {/* 
      
          footer
      */}
      <section className="py-40 ">
        <div className="max-w-lg mx-auto px-10">
          <h1 className="text-center text-5xl text-cyan-300 font-semibold mb-5">
            Pantho Haque
          </h1>

          {/* quote */}
          <div className="flex flex-col justify-end items-end text-justify">
            <p>
              &quot;And so do all who live to see such times. But that is not
              for them to decide. All we have to decide is what to do with the
              time that is given us.&quot;
            </p>
            <p>- Gandalf (Lord of the Rings)</p>
          </div>

          {/* link */}
          <MediaLInks />
          <p className="text-center mt-20">
            copyright@<b>Pantho Haque</b>
          </p>
        </div>
      </section>
    </main>
  );
}
