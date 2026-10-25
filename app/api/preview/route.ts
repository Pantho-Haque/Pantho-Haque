import { cookies, draftMode } from "next/headers";
import { redirect } from "next/navigation";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SLUG = /^[a-z0-9](?:[a-z0-9-]{0,40}[a-z0-9])?$/;

// Opened from the Control Room's "Preview draft": /api/preview?token=<uuid>&slug=<exposure>.
// The token only unlocks that one draft (RLS checks it).
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const token = q.get("token") ?? "", slug = q.get("slug") ?? "main";
  if (!UUID.test(token)) return new Response("Invalid preview token", { status: 400 });
  if (!SLUG.test(slug)) return new Response("Invalid exposure", { status: 400 });
  (await draftMode()).enable();
  (await cookies()).set("preview_token", token, { httpOnly: true, secure: true, sameSite: "lax", path: "/" });
  redirect(slug === "main" ? "/" : `/for/${slug}`);
}
