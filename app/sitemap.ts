import type { MetadataRoute } from "next";
import { caseFiles, getContent, SITE_URL } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const c = await getContent();
  const lastModified = c.meta?.publishedAt;
  return [
    { url: SITE_URL, lastModified, priority: 1 },
    ...caseFiles(c).map((p) => ({ url: `${SITE_URL}/work/${p.slug}`, lastModified, priority: 0.8 })),
  ];
}
