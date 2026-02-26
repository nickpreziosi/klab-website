import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
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
  // Prevent Sanity packages from being bundled in client components
  serverExternalPackages: ["sanity", "next-sanity", "@sanity/image-url", "@sanity/client"],
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.lottie$/,
      type: "asset/resource",
    });

    // Externalize Sanity packages for client-side builds to prevent bundling issues
    if (!isServer) {
      const originalExternals = config.externals;
      const externalsFunction = (
        { request }: { request?: string },
        callback: (err?: Error | null, result?: string) => void
      ) => {
        // Externalize 'sanity' and related packages
        if (
          request === "sanity" ||
          (request && request.startsWith("sanity/")) ||
          request === "next-sanity" ||
          (request && request.startsWith("next-sanity/")) ||
          request === "@sanity/client" ||
          (request && request.startsWith("@sanity/"))
        ) {
          return callback(undefined, `commonjs ${request}`);
        }
        callback();
      };

      if (Array.isArray(originalExternals)) {
        config.externals = [...originalExternals, externalsFunction];
      } else if (typeof originalExternals === "function") {
        config.externals = [originalExternals, externalsFunction];
      } else if (originalExternals) {
        config.externals = [originalExternals, externalsFunction];
      } else {
        config.externals = externalsFunction;
      }
    }

    return config;
  },
};

export default withNextIntl(nextConfig);
