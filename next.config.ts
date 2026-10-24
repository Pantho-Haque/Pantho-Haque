import type { NextConfig } from "next";

// Content images come from Domino (built-in files at /cdn) and from Vercel Blob (Control Room uploads).
const domino = process.env.DOMINO_URL ? new URL(process.env.DOMINO_URL) : null;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      ...(domino ? [{ protocol: domino.protocol.replace(":", "") as "http" | "https", hostname: domino.hostname, pathname: "/cdn/**" }] : []),
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com", pathname: "/**" },
    ],
    formats: ["image/webp"],
    minimumCacheTTL: 2678400, // 31 days
    qualities: [75],
  },
};

export default nextConfig;
