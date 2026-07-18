import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "gkmxlvqfvdcztiepbmee.supabase.co",
      },
      {
        protocol: "https",
        hostname: "api.microlink.io",
      },
    ],
    qualities: [25, 50, 75, 90, 100],
  },
};

export default nextConfig;
