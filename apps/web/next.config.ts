import type { NextConfig } from "next";
import "@repo/env";
const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ["@repo/ui"],
};

export default nextConfig;
