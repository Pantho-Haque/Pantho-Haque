import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [navOpen, setNavOpen] = useState(false);
  const NavLinks = () => (
    <div className="flex flex-col lg:flex-row lg:space-x-2 mr-10 justify-start items-start ">
      <Link href="/" className="hover:bg-cyan-950 px-4 py-2 rounded-md btn">
        Home
      </Link>
      <Link
        href="/about"
        className="hover:bg-cyan-950 px-4 py-2 rounded-md btn"
      >
        About
      </Link>
      <Link
        href="/skills"
        className="hover:bg-cyan-950 px-4 py-2 rounded-md btn"
      >
        Skills
      </Link>
      <Link
        href="/projects"
        className="hover:bg-cyan-950 px-4 py-2 rounded-md btn"
      >
        Projects
      </Link>
      <Link
        href="/contact"
        className="hover:bg-cyan-950 px-4 py-2 rounded-md btn"
      >
        Contact
      </Link>
      <a
        href="/Pantho-Haque/Resume-PanthoHaque.pdf"
        className="bg-gradient-to-br from-slate-500 to-slate-900 px-4 py-2 rounded-md btn "
      >
        Resume
      </a>
    </div>
  );
  return (
    <nav className="w-full h-10 p-10 shadow-2xl flex justify-between items-center fixed top-0 left-0 right-0  bg-slate-900 z-30">
      <h1 className="w-10 ml-10">
        <Image src="/assets/logo.svg" width={40} height={40} alt="logo" />
      </h1>
      <div className="hidden lg:flex">
        <NavLinks />
      </div>
      <div className="relative w-12 flex lg:hidden">
        <svg
          className="w-12 h-12 p-2 rounded-xl cursor-pointer"
          onClick={() => {
            setNavOpen(!navOpen);
          }}
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
            clipRule="evenodd"
          />
        </svg>
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
