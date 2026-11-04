import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: path.join(__dirname, "../.."),
  // A receipt photo may be up to 5 MB; the API enforces the real limit.
  experimental: { serverActions: { bodySizeLimit: "6mb" } },
  async headers() {
    return [
      // A tracking URL is the only key to its page, so it must not leak to other sites.
      { source: "/t/:path*", headers: [{ key: "Referrer-Policy", value: "no-referrer" }] },
    ];
  },
};

export default nextConfig;
