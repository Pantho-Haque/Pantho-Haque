import { revalidateTag } from "next/cache";

// Called by Domino after every publish. Clears the "content" tag so the next visitor gets fresh pages.
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  revalidateTag("content", { expire: 0 });
  return Response.json({ revalidated: true, at: Date.now() });
}
