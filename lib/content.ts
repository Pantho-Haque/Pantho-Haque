import { cache } from "react";
import { cookies, draftMode } from "next/headers";
import { notFound } from "next/navigation";
import fallback from "@/content.fallback.json";
import type { Content, ExposureMeta, Project, Section } from "@/types/content";

const FALLBACK = fallback as unknown as Content;
const MAIN: ExposureMeta = { slug: "main", company: "", role: "", showPreparedFor: false };
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
// Fail the Vercel build loudly instead of shipping a sitemap and social cards with no domain.
if (!SITE_URL && process.env.VERCEL) throw new Error("NEXT_PUBLIC_SITE_URL is not set. Add it in Vercel → Settings → Environment Variables.");

const SLUG = /^[a-z0-9](?:[a-z0-9-]{0,40}[a-z0-9])?$/;
const UUID = /^[0-9a-f-]{36}$/i;
type Row = { slug: string; company: string; role: string; show_prepared: boolean; published?: Content | null; published_at?: string | null };
export type Exposure = { content: Content; exposure: ExposureMeta };

const meta = (r: Row): ExposureMeta => ({ slug: r.slug, company: r.company, role: r.role, showPreparedFor: r.show_prepared });

/** One exposure ("main" = the public site), from Supabase:
 *  - draft mode with a matching preview token: that exposure's draft, uncached;
 *  - otherwise the published copy, cached under "content" and "content:<slug>" (cleared by /api/revalidate).
 *  null = no such live exposure (404). Missing env or a failed request: main from content.fallback.json. */
export const getExposure = cache(async (slug: string): Promise<Exposure | null> => {
  if (!SLUG.test(slug)) return null;
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return { content: FALLBACK, exposure: MAIN };
  try {
    let token: string | undefined;
    try {
      if ((await draftMode()).isEnabled) token = (await cookies()).get("preview_token")?.value;
    } catch {
      // no request scope (generateStaticParams, sitemap at build): published content only
    }
    if (token && UUID.test(token)) {
      const h = { apikey: key, "x-preview-token": token, "x-exposure": slug };
      const [d, m] = await Promise.all([
        fetch(`${url}/rest/v1/exposure_drafts?select=slug,data&slug=eq.${slug}&preview_token=eq.${token}`, { headers: h, cache: "no-store" }),
        fetch(`${url}/rest/v1/exposures?select=slug,company,role,show_prepared&slug=eq.${slug}`, { headers: h, cache: "no-store" }),
      ]);
      if (d.ok && m.ok) {
        const [draft] = (await d.json()) as { data: Content }[];
        const [row] = (await m.json()) as Row[];
        if (draft && row) return { content: draft.data, exposure: meta(row) };
      }
    }
    const res = await fetch(
      `${url}/rest/v1/exposures?select=slug,company,role,show_prepared,published,published_at&slug=eq.${slug}&published=not.is.null`,
      { headers: { apikey: key, "x-exposure": slug }, cache: "force-cache", next: { tags: ["content", `content:${slug}`] } },
    );
    if (!res.ok) throw new Error(`content ${res.status}`);
    const [row] = (await res.json()) as Row[];
    if (!row?.published) return slug === "main" ? { content: FALLBACK, exposure: MAIN } : null;
    return { content: { ...row.published, meta: { publishedAt: row.published_at ?? "" } }, exposure: meta(row) };
  } catch {
    return { content: FALLBACK, exposure: MAIN };
  }
});

/** The exposure for a /for/<slug> URL, or a 404 ("main" lives at "/"). */
export async function exposureFor(slug: string): Promise<Exposure> {
  const e = slug === "main" ? null : await getExposure(slug);
  if (!e) notFound();
  return e;
}

/** Main's content (the public site). */
export const getContent = async (): Promise<Content> => (await getExposure("main"))!.content;

/** "2026-10-25", or "" when unknown. */
export const updatedOn = (c: Content) => c.meta?.publishedAt?.slice(0, 10) ?? "";

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
