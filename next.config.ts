import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  transpilePackages: ["@k-lab/components"],
  productionBrowserSourceMaps: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days for remote images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "vumbnail.com",
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.lottie$/,
      type: "asset/resource",
    });

    return config;
  },
};

export default withNextIntl(nextConfig);
