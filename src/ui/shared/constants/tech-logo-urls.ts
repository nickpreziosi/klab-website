import { brandLogoPreloadUrls } from "@/ui/shared/components/addon-spheres/brand-logos";
import {
  ADDON_SPHERE_PRODUCTS,
  addonSphereLogoSrc,
} from "@/ui/shared/components/addon-spheres/addon-sphere-products";

/**
 * All technology logo URLs (light + dark) for preloading in document head.
 * Kept in a non–"use client" module so server components can import it.
 * K Rails dropdown marks go first so the browser does not drop them when
 * the preload list is long.
 */
export const TECH_LOGO_PRELOAD_URLS: string[] = [
  ...new Set([
    ...ADDON_SPHERE_PRODUCTS.map(addonSphereLogoSrc),
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
  ]),
];
