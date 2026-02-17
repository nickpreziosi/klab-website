/**
 * Base URL for absolute links in email templates (e.g. logo image).
 * Uses SITE_URL for production/custom domains, or VERCEL_URL for Vercel deployments.
 */
const baseUrl =
  process.env.SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://klab-website.vercel.app");

export const EMAIL_LOGO_URL = `${baseUrl}/logos/keo-logo.png`;
