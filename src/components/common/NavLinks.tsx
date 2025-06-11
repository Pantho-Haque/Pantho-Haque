"use client";
import { NAV_LINKS } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavLinks = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col md:flex-row md:space-x-2 mr-10 justify-start items-start ">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={
            pathname.split("/")[1] === link.href.split("/")[1]
              ? "bg-cyan-950 px-4 py-2 rounded-md btn "
              : "hover:bg-cyan-950 px-4 py-2 rounded-md btn"
          }
        >
          {link.name}
        </Link>
      ))}
      {/* <a
        href="/Pantho-Haque/Resume-PanthoHaque.pdf"
        className="bg-gradient-to-br from-slate-500 to-slate-900 px-4 py-2 rounded-md btn "
      >
        Resume
      </a> */}
    </div>
  );
};
