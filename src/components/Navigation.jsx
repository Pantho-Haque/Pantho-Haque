import Image from "next/image";
import { useState } from "react";

import { BiMenu } from "react-icons/bi";

import logo from "../../public/assets/logo.svg";

export default function Navigation() {
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
      {/* <a
        href="#projects"
        className=" hover:bg-cyan-950  px-4 py-2 rounded-md btn "
      >
        Projects
      </a> */}
      <a
        href="#contact"
        className=" hover:bg-cyan-950  px-4 py-2 rounded-md btn "
      >
        Contact
      </a>
      <a
        href="/Resume-PanthoHaque.pdf"
        className="bg-gradient-to-br from-slate-500 to-slate-900 px-4 py-2 rounded-md btn "
      >
        Resume
      </a>
    </div>
  );
  return (
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
  );
}
