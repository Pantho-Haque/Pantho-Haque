// Asks the live site to drop its cached content, the same call Domino makes after each publish.
// Usage: pnpm revalidate   (needs NEXT_PUBLIC_SITE_URL and REVALIDATE_SECRET in .env.local)
const site = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
const secret = process.env.REVALIDATE_SECRET;
if (!site || !secret) {
  console.error("Set NEXT_PUBLIC_SITE_URL and REVALIDATE_SECRET in .env.local first.");
  process.exit(1);
}
const res = await fetch(`${site}/api/revalidate`, { method: "POST", headers: { authorization: `Bearer ${secret}` } });
console.log(res.ok ? `Revalidated ${site}` : `Failed: ${res.status} ${await res.text()}`);
process.exit(res.ok ? 0 : 1);

export {};
