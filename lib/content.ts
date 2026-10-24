import { cache } from "react";
import { cookies, draftMode } from "next/headers";
import fallback from "@/content.fallback.json";
import type { Content, Project, Section } from "@/types/content";

type Row = { id: number; data: Content; created_at: string };

const FALLBACK = fallback as unknown as Content;
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
// Fail the Vercel build loudly instead of shipping a sitemap and social cards with no domain.
if (!SITE_URL && process.env.VERCEL) throw new Error("NEXT_PUBLIC_SITE_URL is not set. Add it in Vercel → Settings → Environment Variables.");

/** Published content from Supabase, cached under the "content" tag (cleared by /api/revalidate).
 *  In draft mode with a preview token: the matching draft, uncached.
 *  Any failure or missing env: the committed snapshot in content.fallback.json. */
export const getContent = cache(async (): Promise<Content> => {
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return FALLBACK;
  try {
    const base = `${url}/rest/v1/content_versions?select=id,data,created_at`;
    let res: Response;
    let token: string | undefined;
    try {
      if ((await draftMode()).isEnabled) token = (await cookies()).get("preview_token")?.value;
    } catch {
      // no request scope (generateStaticParams, sitemap at build): published content only
    }
    if (token) {
      res = await fetch(`${base}&preview_token=eq.${encodeURIComponent(token)}&limit=1`, {
        headers: { apikey: key, "x-preview-token": token },
        cache: "no-store",
      });
    } else {
      res = await fetch(`${base}&status=eq.published&order=id.desc&limit=1`, {
        headers: { apikey: key },
        cache: "force-cache",
        next: { tags: ["content"] },
      });
    }
    if (!res.ok) throw new Error(`content ${res.status}`);
    const [row] = (await res.json()) as Row[];
    if (!row?.data) return FALLBACK;
    return { ...row.data, meta: { version: row.id, publishedAt: row.created_at } };
  } catch {
    return FALLBACK;
  }
});

export const visibleSections = (c: Content) => c.sections.filter((s) => !s.hidden);
export const caseFiles = (c: Content) => c.projects.filter((p) => p.featured);
export const projectsSectionId = (c: Content) => c.sections.find((s) => s.type === "projects")?.id ?? "work";

/** First number in the bold lead of a highlight: "**Cut delivery ~30%** by…" → "~30%", "**Opened to 3 regions**" → "3 regions". */
export function gainOf(h: string) {
  const lead = /\*\*(.+?)\*\*/.exec(h)?.[1] ?? h;
  return /~?\d[\d,.]*(?:%|\+|x\b|\s[a-z]+)?/i.exec(lead)?.[0] ?? "";
}

const norm = (s: string) => s.toLowerCase().replace(/\.js$/, "").replace(/\s+/g, "");

/** Where a skill shows up: featured/other projects by stack, timeline entries by tags. */
export function usedIn(skill: string, c: Content): { name: string; slug?: string }[] {
  const k = norm(skill);
  const out: { name: string; slug?: string }[] = c.projects
    .filter((p: Project) => p.stack.some((s) => norm(s) === k))
    .map((p) => ({ name: p.name, slug: p.featured ? p.slug : undefined }));
  c.sections.forEach((s: Section) => {
    if (s.type === "timeline") s.items.forEach((it) => it.tags.some((t) => norm(t) === k) && out.push({ name: `${it.org} · ${it.title}` }));
  });
  return out;
}
