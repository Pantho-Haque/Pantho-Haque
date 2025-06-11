import {Footer,NavBar} from "@/components";
import "@/styles/globals.css";
import type { AppProps } from "next/app";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="w-screen h-screen flex flex-col justify-between  bg-slate-900 text-slate-200">
      <NavBar />
      <div className="w-full h-full overflow-auto px-10">
        <Component {...pageProps} />
      </div>
      <Footer />
    </main>
  );
}
