import { BRAND_PRODUCT_SLUG, type BrandTechId } from "./brand-logos";

export type AddonSphereId = BrandTechId;

export type AddonSphereProduct = {
  id: AddonSphereId;
  name: string;
  href: string;
  idleVideo: string;
  playingVideo: string;
  product: (typeof BRAND_PRODUCT_SLUG)[BrandTechId];
  /** White on video for most spheres; K Talk's clip is light so it uses the dark mark. */
  logoVariant: "white" | "dark";
  playIcon: string;
  hideAddons?: boolean;
  darkControls?: boolean;
};

export function preloadAddonSphereVideos() {
  if (typeof document === "undefined") return;
  for (const product of ADDON_SPHERE_PRODUCTS) {
    const video = document.createElement("video");
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    video.src = product.idleVideo;
  }
}

export const ADDON_SPHERE_PRODUCTS: AddonSphereProduct[] = [
  {
    id: "krails",
    name: "K Rails",
    href: "/technologies/krails",
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
    href: "/technologies/krisk",
    idleVideo: "/videos/krisk-idle.mp4",
    playingVideo: "/videos/krisk-loop.mp4",
    product: BRAND_PRODUCT_SLUG.krisk,
    logoVariant: "white",
    playIcon: "/images/home-addons/play.svg",
  },
  {
    id: "kleads",
    name: "K Leads",
    href: "/technologies/kleads",
    idleVideo: "/videos/kleads-idle.mp4",
    playingVideo: "/videos/kleads-loop.mp4",
    product: BRAND_PRODUCT_SLUG.kleads,
    logoVariant: "white",
    playIcon: "/images/home-addons/play.svg",
  },
  {
    id: "ktalk",
    name: "K Talk",
    href: "/technologies/ktalk",
    idleVideo: "/videos/ktalk-idle.mp4",
    playingVideo: "/videos/ktalk-loop.mp4",
    product: BRAND_PRODUCT_SLUG.ktalk,
    logoVariant: "dark",
    playIcon: "/images/home-addons/play-black.svg",
    darkControls: true,
  },
];
