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
    // 404 globale con layout del sito: vedi src/app/global-not-found.tsx
    globalNotFound: true,
  },
};

export default nextConfig;
