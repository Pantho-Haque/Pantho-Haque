import { getContent } from "@/lib/content";
import { ogCard, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Pantho Haque, software engineer";

export default async function Image() {
  const { profile: p } = await getContent();
  return ogCard({
    kicker: `Case file · ${p.available ? "Open to work" : p.location}`,
    title: p.name,
    lines: [p.headline, p.proof.replace(/\*\*/g, "").slice(0, 110) + (p.proof.length > 110 ? "…" : "")],
  });
}
