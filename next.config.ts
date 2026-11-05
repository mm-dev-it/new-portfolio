import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    root: __dirname,
  },
  experimental: {
    // 404 unica per i due root layout ((current) e (v2)): vedi src/app/global-not-found.tsx
    globalNotFound: true,
  },
};

export default nextConfig;
