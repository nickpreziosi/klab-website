import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const LOCALES = "en|es|pt|ar";
const REMOVED_PRODUCT_SLUGS = "kleads|ktalk|krisk";

const nextConfig: NextConfig = {
  transpilePackages: ["@k-lab/components"],
  async redirects() {
    return [
      {
        source: `/:locale(${LOCALES})/technologies/krails`,
        destination: "/:locale/krails",
        permanent: true,
      },
      {
        source: `/:locale(${LOCALES})/technologies/:slug(${REMOVED_PRODUCT_SLUGS})`,
        destination: "/:locale",
        permanent: true,
      },
      {
        source: `/:locale(${LOCALES})/:slug(${REMOVED_PRODUCT_SLUGS})`,
        destination: "/:locale",
        permanent: true,
      },
    ];
  },
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
      {
        protocol: "https",
        hostname: "*.mzstatic.com",
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
