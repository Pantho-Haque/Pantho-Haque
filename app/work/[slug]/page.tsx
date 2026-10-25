import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseFileView } from "@/components/views";
import { caseFiles, getContent, getExposure } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return caseFiles(await getContent()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = caseFiles(await getContent()).find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.name, description: p.tagline, alternates: { canonical: `/work/${p.slug}` }, openGraph: { title: p.name, description: p.tagline, url: `/work/${p.slug}` } };
}

export default async function CaseFile({ params }: Props) {
  const { slug } = await params;
  const { content, exposure } = (await getExposure("main"))!;
  return CaseFileView({ c: content, x: exposure, slug }) ?? notFound();
}
