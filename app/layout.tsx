import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { Chakra_Petch, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AchievementToast, Trackima } from "@/components/client";
import { getContent, SITE_URL } from "@/lib/content";
import "@/styles/app.css";

const display = Chakra_Petch({ weight: ["500", "600", "700"], subsets: ["latin"], variable: "--font-display" });
const body = IBM_Plex_Sans({ weight: ["400", "500", "600"], subsets: ["latin"], variable: "--font-body" });
const mono = IBM_Plex_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-mono" });

export async function generateMetadata(): Promise<Metadata> {
  const { seo, profile } = await getContent();
  return {
    metadataBase: SITE_URL ? new URL(SITE_URL) : undefined,
    title: { default: seo.title, template: `%s · ${profile.name}` },
    description: seo.description,
    authors: [{ name: profile.name, url: SITE_URL }],
    openGraph: { title: seo.title, description: seo.description, type: "website", url: "/" },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
    alternates: { canonical: "/" },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { isEnabled: preview } = await draftMode();
  const trackima = process.env.NEXT_PUBLIC_TRACKIMA_SITE;
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        {preview && (
          <div className="preview-flag" role="status">
            <span>Preview · unpublished draft</span>
            <a href="/api/preview/exit">Exit preview</a>
          </div>
        )}
        {children}
        <AchievementToast />
        <SpeedInsights sampleRate={0.5} />
        {trackima && <Trackima site={trackima} />}
      </body>
    </html>
  );
}
