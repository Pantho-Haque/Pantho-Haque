import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseFileView } from "@/components/views";
import { caseFiles, exposureFor, getExposure } from "@/lib/content";

type Props = { params: Promise<{ slug: string; project: string }> };

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, project } = await params;
  const e = await getExposure(slug);
  const p = e && caseFiles(e.content).find((x) => x.slug === project);
  return p ? { title: p.name, description: p.tagline } : {};
}

export default async function ExposureCaseFile({ params }: Props) {
  const { slug, project } = await params;
  const { content, exposure } = await exposureFor(slug);
  return CaseFileView({ c: content, x: exposure, slug: project, base: `/for/${slug}` }) ?? notFound();
}
