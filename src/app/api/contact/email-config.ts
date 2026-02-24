/** Base URL for email assets. Set SITE_URL in .env (e.g. https://www.k-lab.ai for production). */
const SITE_URL = process.env.SITE_URL ?? "https://www.k-lab.ai";

/** Single banner image for sales email header (when using one composite image). */
export const EMAIL_HEADER_BANNER_URL = `${SITE_URL}/images/klab-email-banner.png`;
