import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const response = await fetch("https://api.github.com/users/pantho-haque",{
      headers: {
        Accept: "application/vnd.github+json",
        Authorization:
          "Bearer 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",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch GitHub user data");
    }
    
    const userData = await response.json();
    return res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching GitHub user data:", error);
    return res.status(500).json({ message: "Failed to fetch GitHub user data" });
  }
}
