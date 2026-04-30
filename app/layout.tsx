import Providers from "@/context/providers";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import { Share_Tech_Mono, Orbitron, VT323 } from "next/font/google";

const shareTechMono = Share_Tech_Mono({ weight: "400", subsets: ["latin"], variable: "--font-mono-google" });
const orbitron = Orbitron({ weight: ["400", "700", "900"], subsets: ["latin"], variable: "--font-display-google" });
const vt323 = VT323({ weight: "400", subsets: ["latin"], variable: "--font-crt-google" });

import "@/styles/app.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pantho Haque",
  description: "Software Engineer — React · Next.js · TypeScript",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${shareTechMono.variable} ${orbitron.variable} ${vt323.variable}`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
