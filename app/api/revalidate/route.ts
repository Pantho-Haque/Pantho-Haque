import { revalidateTag } from "next/cache";

const SLUG = /^[a-z0-9](?:[a-z0-9-]{0,40}[a-z0-9])?$/;

// Called by Domino after a publish. Body { "slugs": ["acme-k7q2"] } refreshes just those exposures;
// no body refreshes everything under the "content" tag.
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  const slugs: string[] = Array.isArray(body?.slugs) ? body.slugs.filter((s: unknown) => typeof s === "string" && SLUG.test(s)) : [];
  if (slugs.length) for (const s of slugs) revalidateTag(`content:${s}`, { expire: 0 });
  else revalidateTag("content", { expire: 0 });
  return Response.json({ revalidated: slugs.length ? slugs : "all", at: Date.now() });
}
