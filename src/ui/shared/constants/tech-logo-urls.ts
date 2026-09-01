import { brandLogoPreloadUrls } from "@/ui/shared/components/addon-spheres/brand-logos";

/**
 * All technology logo URLs (light + dark) for preloading in document head.
 * Kept in a non–"use client" module so server components can import it.
 */
export const TECH_LOGO_PRELOAD_URLS: string[] = [
  ...brandLogoPreloadUrls(),
  "/logos/kena-logo-light.svg",
  "/logos/kena-logo-dark.svg",
  "/logos/kabl-logo-light.svg",
  "/logos/kabl-logo-dark.svg",
  "/logos/kcard-logo-light.svg",
  "/logos/kcard-logo-dark.svg",
  "/logos/kbpm-logo-light.svg",
  "/logos/kbpm-logo-dark.svg",
  "/logos/kim-logo-light.svg",
  "/logos/kim-logo-dark.svg",
  "/logos/kaxis-logo-light.svg",
  "/logos/kaxis-logo-dark.svg",
  "/logos/kai-logo-light.svg",
  "/logos/kai-logo-dark.svg",
];
