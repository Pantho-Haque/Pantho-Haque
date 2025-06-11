import Image from "next/image";
import { motion } from "framer-motion";

export default function Aboutme() {
  return (
    <section
      id="about"
      className="mt-24 flex flex-col lg:flex-row gap-10 justify-center items-center   "
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full lg:w-1/2 mx-auto"
        >
          <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-900/30 to-cyan-900/20 rounded-2xl blur-lg"></div>
          <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-slate-700/50">
            <div className="relative">
              <div className="absolute w-48 h-72 inset-0 bg-gradient-to-b from-cyan-500 to-cyan-900 rounded-lg blur-lg animate-pulse"></div>
              <Image
                src={"/assets/aboutme.png"}
                alt="Pantho Haque"
                width={500}
                height={500}
                className="w-[160px] relative rounded-lg hover:scale-[1.02] transition-transform duration-300 object-cover"
                priority
              />
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-900/50 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-emerald-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Current Role</p>
                  <p className="text-emerald-400 font-medium">
                    Associate Software Engineer in Pathao Ltd
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-900/50 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-emerald-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">University</p>
                  <p className="text-emerald-400 font-medium">KUET</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-emerald-400 mb-4">
            Full-Stack Developer & CS Enthusiast
          </h3>
          <p className="text-slate-300 leading-relaxed">
            I&apos;m a passionate developer who recently graduated in Computer
            Science and Engineering from Khulna University of Engineering and
            Technology. With a strong foundation in both theory and practice,
            I&apos;ve developed a versatile skill set that allows me to tackle
            complex challenges across the development stack.
          </p>

          <p className="text-slate-300 leading-relaxed">
            I&apos;m an{" "}
            <span className="text-emerald-400 font-medium">
              teaching assistant in Ostad
            </span>{" "}
            and done my internship previously from{" "}
            <span className="text-emerald-400 font-medium">Pathao</span>, which
            was called{" "}
            <span className="text-emerald-400 font-medium">
              AIM internship program
            </span>.
          </p>

          <div className="pt-4">
            <h4 className="text-xl font-semibold text-cyan-400 mb-4">
              Technical Expertise
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Web Development (MERN Stack)",
                "Database Design",
                "UI/UX Design",
                "Mobile App Development",
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <p className="text-slate-300">{skill}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <a
              href="/Pantho-Haque/Resume-PanthoHaque.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-emerald-900/30"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download CV
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
