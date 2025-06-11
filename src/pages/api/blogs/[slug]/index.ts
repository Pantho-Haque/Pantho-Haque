import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { slug } = req.query;
  
  try {
    const response = await fetch(
      `https://api.github.com/repos/Pantho-Haque/PersonalNotes/git/blobs/${slug}`,
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
    res.status(200).json(data.content ?? data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog content" });
  }
}
