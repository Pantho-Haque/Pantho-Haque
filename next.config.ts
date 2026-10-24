import type { NextConfig } from "next";

// All content images live in Vercel Blob (uploaded through Domino's Control Room).

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com", pathname: "/**" },
    ],
    formats: ["image/webp"],
    minimumCacheTTL: 2678400, // 31 days
    qualities: [75],
  },
};

export default nextConfig;
