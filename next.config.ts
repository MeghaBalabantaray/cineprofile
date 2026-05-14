import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"]
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000
  }
};

export default nextConfig;
