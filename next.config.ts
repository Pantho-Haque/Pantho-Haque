import createNextIntlPlugin from "next-intl/plugin";
import { NextConfig } from "next";

const nextIntlPlugin = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
    ],
    qualities: [25, 50, 75, 100],
  },
  async rewrites() {
    return [
      {
        source: "/api-proxy/:path*",
        destination: process.env.NEXT_API_BASE_URL + "/:path*", // Proxy to API
      },
    ];
  },
};

export default nextIntlPlugin(nextConfig);
