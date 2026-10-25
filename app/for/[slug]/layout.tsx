import type { Metadata } from "next";
import { exposureFor, getExposure } from "@/lib/content";

// Exposures: one tailored copy of the site per company, at an unguessable /for/<slug>.
// Built on the first visit and cached until Domino publishes that exposure again. Never indexed.
type Props = { children: React.ReactNode; params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const e = await getExposure((await params).slug);
  const p = e?.content.profile;
  return {
    robots: { index: false, follow: false },
    ...(p && { title: { absolute: `${p.name} · ${e.exposure.role || p.headline}` }, description: p.proof.replace(/\*\*/g, "") }),
    alternates: { canonical: null },
  };
}

export default async function ExposureLayout({ children, params }: Props) {
  await exposureFor((await params).slug);
  return children;
}
