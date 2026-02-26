/** Base URL for email assets. Set NEXT_PUBLIC_SITE_URL in .env (e.g. https://www.k-lab.ai for production). */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.k-lab.ai";

/** Single banner image for sales email header (when using one composite image). */
export const EMAIL_HEADER_BANNER_URL = `${SITE_URL}/images/klab-email-banner.png`;

/**
 * "From" addresses for contact form emails. We authenticate as klab.services@k-lab.ai (Send As)
 * but send from these shared mailbox addresses. Override via env if needed.
 */
export const CAREERS_FROM = process.env.CAREERS_FROM_EMAIL ?? "Careers <careers@k-lab.ai>";
export const SALES_FROM = process.env.SALES_FROM_EMAIL ?? "Sales <sales@k-lab.ai>";
export const SUPPORT_FROM = process.env.SUPPORT_FROM_EMAIL ?? "Support <support@k-lab.ai>";
