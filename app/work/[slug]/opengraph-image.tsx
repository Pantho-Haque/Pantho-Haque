import { caseFiles, getContent } from "@/lib/content";
import { ogCard, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Project case file";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await getContent();
  const p = caseFiles(c).find((x) => x.slug === slug);
  if (!p) return ogCard({ kicker: "Case file", title: c.profile.name, lines: [c.profile.headline] });
  return ogCard({ kicker: `Case file · ${p.stack.slice(0, 3).join(" · ")}`, title: p.name, lines: [p.tagline], stat: p.metrics[0] });
}
