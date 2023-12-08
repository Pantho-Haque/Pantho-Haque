import { motion } from "framer-motion";
import Image from "next/image";

import Link from "next/link";
import { projectdata } from "../../public/assets/projects/porject";

export default function Projects() {
  return (
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
  );
}
