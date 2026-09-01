export type BrandTechId = "krails" | "kleads" | "krisk" | "ktalk";

export const BRAND_PRODUCT_SLUG = {
  krails: "k-rails",
  kleads: "k-leads",
  krisk: "k-risk",
  ktalk: "k-talk",
} as const;

export const BRAND_LOGO_SRC = {
  krails: {
    dark: "/logos/k-rails/klab_sub_brands_krails_dark.svg",
    white: "/logos/k-rails/klab_sub_brands_krails_light.svg",
  },
  kleads: {
    dark: "/logos/k-leads/klab_sub_brands_kleads_dark.svg",
    white: "/logos/k-leads/klab_sub_brands_kleads_light.svg",
  },
  krisk: {
    dark: "/logos/k-risk/klab_sub_brands_krisk_dark.svg",
    white: "/logos/k-risk/klab_sub_brands_krisk_light.svg",
  },
  ktalk: {
    dark: "/logos/k-talk/klab_sub_brands_ktalk_dark.svg",
    white: "/logos/k-talk/klab_sub_brands_ktalk_light.svg",
  },
  klab: {
    dark: "/logos/k-lab/klab_full_logo_dark.svg",
    white: "/logos/k-lab/klab_full_logo_light.svg",
    iconDark: "/logos/k-lab/klab_logomark_dark.svg",
    iconWhite: "/logos/k-lab/klab_logomark_light.svg",
  },
} as const;

export function isBrandTechId(id: string): id is BrandTechId {
  return id in BRAND_PRODUCT_SLUG;
}

export function brandLogoPreloadUrls(): string[] {
  return [
    BRAND_LOGO_SRC.klab.dark,
    BRAND_LOGO_SRC.klab.white,
    BRAND_LOGO_SRC.klab.iconDark,
    BRAND_LOGO_SRC.klab.iconWhite,
    BRAND_LOGO_SRC.krails.dark,
    BRAND_LOGO_SRC.krails.white,
    BRAND_LOGO_SRC.kleads.dark,
    BRAND_LOGO_SRC.kleads.white,
    BRAND_LOGO_SRC.krisk.dark,
    BRAND_LOGO_SRC.krisk.white,
    BRAND_LOGO_SRC.ktalk.dark,
    BRAND_LOGO_SRC.ktalk.white,
  ];
}
