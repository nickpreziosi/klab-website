import { BRAND_LOGO_SRC, BRAND_PRODUCT_SLUG, type BrandTechId } from "./brand-logos";

export type AddonSphereId = BrandTechId;

export type AddonSphereProduct = {
  id: AddonSphereId;
  name: string;
  /** Product page. Omit when the product has no standalone page (no Explore). */
  href?: string;
  idleVideo: string;
  playingVideo: string;
  product: (typeof BRAND_PRODUCT_SLUG)[BrandTechId];
  /** White on video for most spheres; K Talk's clip is light so it uses the dark mark. */
  logoVariant: "white" | "dark";
  playIcon: string;
  hideAddons?: boolean;
  darkControls?: boolean;
};

export function addonSphereLogoSrc(product: AddonSphereProduct): string {
  const marks = BRAND_LOGO_SRC[product.id];
  return product.logoVariant === "dark" ? marks.dark : marks.white;
}

const retainedLogoPreloads: HTMLImageElement[] = [];
const retainedLogoLinks: HTMLLinkElement[] = [];
const retainedVideoPreloads: HTMLVideoElement[] = [];

/** Warm logo HTTP cache on page load (async decode — marks stay independent of video). */
export function preloadAddonSphereLogos() {
  if (typeof window === "undefined") return;
  if (retainedLogoPreloads.length > 0) return;
  for (const product of ADDON_SPHERE_PRODUCTS) {
    const href = addonSphereLogoSrc(product);

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = href;
    document.head.appendChild(link);
    retainedLogoLinks.push(link);

    const img = new Image();
    img.decoding = "async";
    img.src = href;
    retainedLogoPreloads.push(img);

    const play = new Image();
    play.decoding = "async";
    play.src = product.playIcon;
    retainedLogoPreloads.push(play);
  }
}

/** Keep idle + playing clips buffering so the menu never cold-starts media. */
export function preloadAddonSphereVideos() {
  if (typeof document === "undefined") return;
  if (retainedVideoPreloads.length > 0) return;
  for (const product of ADDON_SPHERE_PRODUCTS) {
    for (const src of [product.idleVideo, product.playingVideo]) {
      const video = document.createElement("video");
      video.preload = "auto";
      video.muted = true;
      video.playsInline = true;
      video.src = src;
      video.load();
      retainedVideoPreloads.push(video);
    }
  }
}

export const ADDON_SPHERE_PRODUCTS: AddonSphereProduct[] = [
  {
    id: "krails",
    name: "K Rails",
    href: "/krails",
    idleVideo: "/videos/krails-idle.mp4",
    playingVideo: "/videos/krails-sphere-loop.mp4",
    product: BRAND_PRODUCT_SLUG.krails,
    logoVariant: "white",
    playIcon: "/images/home-addons/play.svg",
    hideAddons: true,
  },
  {
    id: "krisk",
    name: "K Risk",
    idleVideo: "/videos/krisk-idle.mp4",
    playingVideo: "/videos/krisk-loop.mp4",
    product: BRAND_PRODUCT_SLUG.krisk,
    logoVariant: "white",
    playIcon: "/images/home-addons/play.svg",
  },
  {
    id: "kleads",
    name: "K Leads",
    idleVideo: "/videos/kleads-idle.mp4",
    playingVideo: "/videos/kleads-loop.mp4",
    product: BRAND_PRODUCT_SLUG.kleads,
    logoVariant: "white",
    playIcon: "/images/home-addons/play.svg",
  },
  {
    id: "ktalk",
    name: "K Talk",
    idleVideo: "/videos/ktalk-idle.mp4",
    playingVideo: "/videos/ktalk-loop.mp4",
    product: BRAND_PRODUCT_SLUG.ktalk,
    logoVariant: "dark",
    playIcon: "/images/home-addons/play-black.svg",
    darkControls: true,
  },
];
