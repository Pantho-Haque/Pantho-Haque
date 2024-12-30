import { AiTwotoneMail } from "react-icons/ai";
import { BiCurrentLocation, BiPhoneCall } from "react-icons/bi";

export default function Contacts() {
  return (
    <div>
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
          <p className="font-semibold">pantho.haque.dev@gmail.com</p>
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
          <p className="font-semibold"> +8801689833981 </p>
        </div>
      </section>
    </div>
  );
}
