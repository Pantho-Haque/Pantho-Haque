import Image from "next/image";

import database from "../../public/assets/skills/database.png";
import graphicsdesign from "../../public/assets/skills/graphicsdesign.png";
import webdesign from "../../public/assets/skills/webdesign.png";
import webdevelopment from "../../public/assets/skills/webdevelopment.png";

export default function Skills() {
  const skillList = [
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
  ];
  return (
    <section className="mt-5 lg:flex lg:flex-wrap gap-10 lg:mb-60 ">
      {skillList.map((el, i) => {
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
  );
}
