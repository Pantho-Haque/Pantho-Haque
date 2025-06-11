import Link from "next/link";
import { CONTACT } from "@/constants";

export default function Contacts() {
  const { LOCATION, MAP_LINK, EMAIL, EMAIL_LINK, PHONE, PHONE_LINK } = CONTACT;
  return (
    <div className="px-4 md:px-8 py-10">
      <h1
        id="contact"
        className="text-5xl font-semibold ml-3 pb-3 md:ml-14 mt-20 border-b-2 border-emerald-700"
      >
        # Contact
      </h1>

      <section className="mt-10 lg:mx-20 lg:flex gap-6 lg:gap-8">
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg shadow-lg shadow-emerald-900/20 border border-slate-700 p-6">
            <h2 className="text-2xl font-semibold text-emerald-300 mb-4">
              Get In Touch
            </h2>
            <p className="text-slate-300 mb-6">
              Feel free to reach out with any questions or opportunities. I&lsquo;ll
              get back to you as soon as possible.
            </p>

            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-300 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-200"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-300 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-200"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-slate-300 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-200"
                  placeholder="What is this regarding?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-300 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-200"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className=" flex flex-col gap-6 lg:w-1/2 ">
          {/* location */}
          <Link href={MAP_LINK} target="_blank">
            <div
              className="flex items-start p-6 rounded-lg
            bg-gradient-to-b from-slate-800 to-slate-900 
            shadow-lg shadow-emerald-900/20 border border-slate-700
            transform transition-all duration-300 hover:scale-105"
            >
              <div className="bg-emerald-700/20 p-3 rounded-full mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-emerald-300"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-medium text-emerald-300 mb-2">
                  Location
                </h3>
                <p className="font-medium text-slate-200">{LOCATION}</p>
              </div>
            </div>
          </Link>

          {/* email */}
          <Link href={EMAIL_LINK} target="blank">
            <div
              className="flex items-start p-6 rounded-lg
            bg-gradient-to-b from-slate-800 to-slate-900
            shadow-lg shadow-emerald-900/20 border border-slate-700
            transform transition-all duration-300 hover:scale-105"
            >
              <div className="bg-emerald-700/20 p-3 rounded-full mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-emerald-300"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-medium text-emerald-300 mb-2">
                  Email
                </h3>
                <p className="font-medium text-slate-200">{EMAIL}</p>
              </div>
            </div>
          </Link>

          {/* phone */}
          <Link href={PHONE_LINK} target="_blank">
            <div
              className="flex items-start p-6 rounded-lg
            bg-gradient-to-b from-slate-800 to-slate-900
            shadow-lg shadow-emerald-900/20 border border-slate-700
            transform transition-all duration-300 hover:scale-105"
            >
              <div className="bg-emerald-700/20 p-3 rounded-full mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-emerald-300"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-medium text-emerald-300 mb-2">
                  Phone
                </h3>
                <p className="font-medium text-slate-200">{PHONE}</p>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
