import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "nguyenhung.io",
      },
      {
        protocol: "https",
        hostname: "nguyenhung-io-prod.s3.vn-hcm-1.vietnix.cloud",
      },
    ],
  },
};

export default nextConfig;
