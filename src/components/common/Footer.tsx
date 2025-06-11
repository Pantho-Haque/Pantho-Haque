"use client";
import MediaLinks from "../MediaLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  return (
    <footer className="bg-slate-900 py-8 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          {pathname !== "/" ? (
            <>
              <div className="mb-4 md:mb-0 hidden md:block">
                <Link href="/">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Pantho Haque
                  </h1>
                </Link>
                <p className="text-sm text-slate-400">Developer & Designer</p>
              </div>
              <MediaLinks />
              <div className="mt-4 md:mt-0 text-center md:text-left">
                <p className="text-xs text-slate-400">
                  &copy; {new Date().getFullYear()}{" "}
                  <span className="font-medium text-slate-300">
                    Pantho Haque
                  </span>
                </p>
                <p className="text-xs text-slate-400">All rights reserved</p>
              </div>
            </>
          ) : (
            <div className="mt-4 md:mt-0 text-center md:w-full">
              <p className="text-xs text-slate-400">
                &copy; {new Date().getFullYear()}{" "}
                <span className="font-medium text-slate-300">Pantho Haque</span>
              </p>
              <p className="text-xs text-slate-400">All rights reserved</p>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
