import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /**
   * ============================================
   * Firebase Hosting – Static Export Settings
   * ============================================
   *
   * We are deploying this app to Firebase Hosting (static hosting),
   * not running a Node.js server.
   *
   * Therefore:
   * - We must generate a fully static build.
   * - No Next.js server-side image optimization.
   *
   * If in the future we move to Cloud Run / SSR / App Engine,
   * these settings may need to be removed.
   */

  // Required for static hosting (Firebase does not run a Next.js server)
  // This tells Next.js to generate a fully static site in the "out" folder.
  output: "export",

  // Recommended for static export.
  // Ensures each route becomes a folder with index.html,
  // which works better with Firebase Hosting rewrites.
  trailingSlash: true,

  images: {
    /**
     * Next.js Image Optimization requires a running Node server.
     * Since Firebase Hosting is static, we must disable optimization.
     *
     * Images will still work, but without automatic resizing optimization.
     * If server-side hosting is added later, this can be removed.
     */
    unoptimized: true,

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
  serverExternalPackages: [
    "sanity",
    "next-sanity",
    "@sanity/image-url",
    "@sanity/client"
  ],

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
