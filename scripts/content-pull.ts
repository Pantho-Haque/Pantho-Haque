// Saves the live (published) content to content.fallback.json, the snapshot the site uses when Supabase is unreachable.
// Usage: pnpm content:pull   (needs SUPABASE_URL and SUPABASE_ANON_KEY in .env.local)
import { writeFileSync } from "node:fs";

const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error("Missing SUPABASE_URL or SUPABASE_ANON_KEY. Run `pnpm env:pull` first.");
  process.exit(1);
}
const res = await fetch(`${url}/rest/v1/content_versions?select=id,data,created_at&status=eq.published&order=id.desc&limit=1`, {
  headers: { apikey: key },
});
if (!res.ok) {
  console.error(`Supabase answered ${res.status}: ${await res.text()}`);
  process.exit(1);
}
const [row] = (await res.json()) as { id: number; data: unknown; created_at: string }[];
if (!row) {
  console.error("Nothing published yet. Publish once from the Control Room, then run this again.");
  process.exit(1);
}
writeFileSync(new URL("../content.fallback.json", import.meta.url), JSON.stringify(row.data, null, 2) + "\n");
console.log(`Saved v${row.id} (published ${row.created_at}) to content.fallback.json. Commit it.`);
