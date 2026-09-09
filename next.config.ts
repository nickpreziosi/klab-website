import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const PRODUCT_SLUGS = "krails|kleads|ktalk|krisk";
const LOCALES = "en|es|pt|ar";

const nextConfig: NextConfig = {
  transpilePackages: ["@k-lab/components"],
  async redirects() {
    return [
      {
        source: `/:locale(${LOCALES})/technologies/:slug(${PRODUCT_SLUGS})`,
        destination: "/:locale/:slug",
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
