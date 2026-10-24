import { cookies, draftMode } from "next/headers";
import { redirect } from "next/navigation";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Opened from the Control Room's "Preview draft". The token only unlocks that one draft row (RLS checks it).
export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token") ?? "";
  if (!UUID.test(token)) return new Response("Invalid preview token", { status: 400 });
  (await draftMode()).enable();
  (await cookies()).set("preview_token", token, { httpOnly: true, secure: true, sameSite: "lax", path: "/" });
  redirect("/");
}
