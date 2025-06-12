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
            "Bearer " + process.env.NEXT_GITHUB_TOKEN,
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
