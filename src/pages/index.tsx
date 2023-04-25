import Image from "next/image";
import { motion } from "framer-motion";
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";
import AOS from "aos";
import "aos/dist/aos.css";
import {useEffect} from "react";

import { BsFillMoonStarsFill } from "react-icons/bs";

import logo from "../../public/assets/logo.svg";
import profilepic from "../../public/assets/profile.png";
import graphicsdesign from "../../public/assets/skills/graphicsdesign.png";
import webdesign from "../../public/assets/skills/webdesign.png";
import webdevelopment from "../../public/assets/skills/webdevelopment.png";
import { projectdata } from "../../public/assets/projects/porject";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    AOS.init({
      deplay:500,
      duration:1000,
    }); 
  }, [])
  
  return (
    <main className=" min-w-screen min-h-screen  bg-slate-900 text-slate-200 overflow-hidden">
      <nav className="min-w-screen h-10 p-10 shadow-2xl flex justify-between items-center ">
        <h1 className="w-10 ml-10">
          <Image src={logo} alt="logo" />
        </h1>
        <ul className="flex  space-x-5 mr-10 items-center">
          <li className="">
            {" "}
            <BsFillMoonStarsFill className="cursor-pointer text-xl" />{" "}
          </li>
          <li className="">
            <a
              href="#"
              className="bg-gradient-to-br from-slate-500 to-slate-900 px-4 py-2 rounded-md btn "
            >
              Resume
            </a>
          </li>
        </ul>
      </nav>

      <section className="min-h-screen">
        <div className="text-center max-w-2xl  p-20 mx-auto ">
          <h1 className="text-4xl lg:text-7xl text-teal-300 font-medium">
            Pantho Haque
          </h1>
          <p className="font-semibold text-xl mb-5 ">Developer and Designer </p>
          <p className="text-md text-gray-100 leading-8">
            Providing service for programming and design content needs. Join me
            down below and lets get started
          </p>
          <ul className="flex justify-center mt-5 space-x-5">
            <li>
              <a href="#">
                <AiFillFacebook className="cursor-pointer text-4xl text-slate-200" />
              </a>
            </li>
            <li>
              <a href="#">
                <AiFillTwitterCircle className="cursor-pointer text-4xl text-slate-200" />
              </a>
            </li>
            <li>
              <a href="#">
                <AiFillLinkedin className="cursor-pointer text-4xl text-slate-200" />
              </a>
            </li>
          </ul>
        </div>

        <div className="relative bg-gradient-to-b from-slate-800 w-80    h-80 mx-auto rounded-full">
          <Image src={profilepic} alt="Deco" className="w-60 mx-auto" />
        </div>
      </section>


      {/* 
      
            About me
      
      
      */}
      <section className="mt-20 min-h-screen flex flex-col lg:flex-row gap-10 lg:mb-60 ">
      <div className="relative bg-gradient-to-b from-slate-800 w-80    h-80 mx-auto rounded-full">
          <Image src={profilepic} alt="Deco" className="w-60 mx-auto" />
        </div>
      <div></div>
      </section>

      {/* 
    
            skills
    
    
    */}
      <h1 className="text-5xl ml-3 pb-3 md:ml-14 mt-20 border-b-2 border-slate-800 ">
        # Skills
      </h1>
      <section className="mt-5 lg:flex gap-10 lg:mb-60 ">
        <div
          className="flex flex-col justify-center items-center space-y-5 
         md:w-[70%] lg:w-[33%]  mx-auto  p-10 text-center  shadow-xl shadow-slate-950  "
         data-aos="fade-up-right"
        >
          <Image
            src={graphicsdesign}
            className="w-32 h-32 object-cover mx-auto"
            alt=""
          />
          <h1 className="text-xl font-medium text-slate-300">
            Graphics Designing
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quaerat
            in similique aliquam minus incidunt, dolores molestiae voluptate
            beatae fugiat?
          </p>
        </div>
        <div
          className="flex flex-col justify-center items-center space-y-5 
         md:w-[70%] lg:w-[33%]  mx-auto  p-10 text-center  shadow-xl shadow-slate-950  "
         data-aos="zoom-in-up"
        >
          <Image
            src={webdesign}
            className="w-32 h-32 object-cover mx-auto"
            alt=""
          />
          <h1 className="text-xl font-medium text-slate-300">Web Designing</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
            recusandae.
          </p>
        </div>
        <div
          className="flex flex-col justify-center items-center space-y-5 
         md:w-[70%] lg:w-[33%]  mx-auto  p-10 text-center  shadow-xl shadow-slate-950  "
         data-aos="fade-up-left"
        >
          <Image
            src={webdevelopment}
            className="w-32 h-32 object-cover mx-auto"
            alt=""
          />
          <h1 className="text-xl font-medium text-slate-300">
            Web Development
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
            minus.
          </p>
        </div>
      </section>

      {/* 
      
          Works i have done
      
      
      */}
      <h1 className="text-5xl ml-3 pb-3 md:ml-14 mt-40 border-b-2 border-slate-800 ">
        # Works I have Done !!
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
      <section className="min-h-screen"></section>
    </main>
  );
}
