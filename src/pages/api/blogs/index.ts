// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const response = await fetch(
      "https://api.github.com/repos/pantho-haque/personalnotes/git/trees/main?recursive=1",
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization:
            "Bearer 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",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    const data = await response.json();
    res.status(200).json(data.tree ?? data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
