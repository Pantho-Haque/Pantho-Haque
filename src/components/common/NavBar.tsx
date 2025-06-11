import { useState, useEffect, useRef } from "react";
import { NavLinks } from "@/components/common/NavLinks";

export default function NavBar() {
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setNavOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full h-10 p-10 shadow-2xl flex justify-between items-center bg-slate-900 z-30 border-b-2 border-cyan-900">
      <h1 className="w-10 ml-4 md:ml-20 transition-all duration-300 hover:scale-110">
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 40 40" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-cyan-400"
        >
          <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2" />
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">PH</text>
          <path d="M5 30 L35 10" stroke="currentColor" strokeWidth="1" opacity="0.7" />
        </svg>
      </h1>
      <div className="hidden md:flex">
        <NavLinks />
      </div>
      <div className="relative w-12 flex md:hidden" ref={navRef}>
        <svg
          className="w-12 h-12 p-2 rounded-xl cursor-pointer text-cyan-400 hover:bg-slate-800 transition-colors duration-300"
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
          className={`absolute top-12 right-0 w-48 p-10 pt-3 bg-slate-900 ring-2 ring-cyan-900 rounded-lg shadow-xl transform transition-all duration-300 ease-in-out ${
            navOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <NavLinks />
        </div>
      </div>
    </nav>
  );
}
