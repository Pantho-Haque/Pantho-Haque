import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="min-w-screen min-h-screen flex flex-col justify-between  bg-slate-900 text-slate-200  overflow-hidden">
      <Navigation />
      <Component {...pageProps} />
      <Footer />
    </main>
  );
}
