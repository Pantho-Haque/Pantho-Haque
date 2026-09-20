import type { Metadata } from "next";
import { Share_Tech_Mono, Orbitron, VT323 } from "next/font/google";
import { PRE_PAINT_SCRIPT } from "@/components/homepage/themes";
import "@/styles/app.css";

const shareTechMono = Share_Tech_Mono({ weight: "400", subsets: ["latin"], variable: "--font-mono-google" });
const orbitron = Orbitron({ weight: ["400", "700", "900"], subsets: ["latin"], variable: "--font-display-google" });
const vt323 = VT323({ weight: "400", subsets: ["latin"], variable: "--font-crt-google" });

export const metadata: Metadata = {
  title: "Pantho Haque",
  description: "Software Engineer — React · Next.js · TypeScript. Portfolio of Pantho Haque.",
  authors: [{ name: "Pantho Haque" }],
  keywords: ["Pantho Haque", "Software Engineer", "React", "Next.js", "TypeScript", "Frontend Developer"],
  openGraph: {
    title: "Pantho Haque — Software Engineer",
    description: "React · Next.js · TypeScript. Production dashboards, real-time systems, CI/CD.",
    type: "website",
  },
  twitter: { card: "summary", title: "Pantho Haque — Software Engineer" },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${shareTechMono.variable} ${orbitron.variable} ${vt323.variable}`}>
      <body className="antialiased">
        {/* Apply the saved color preset before first paint to avoid a flash */}
        <script dangerouslySetInnerHTML={{ __html: PRE_PAINT_SCRIPT }} />
        {children}
      </body>
    </html>
  );
}
