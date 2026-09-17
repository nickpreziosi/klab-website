import { BRAND_PRODUCT_SLUG, type BrandTechId } from "./brand-logos";

export type AddonSphereId = BrandTechId;

export type AddonSphereProduct = {
  id: AddonSphereId;
  name: string;
  /** Product page. Omit when the product has no standalone page (no Explore). */
  href?: string;
  idleVideo: string;
  /** First-frame still for the idle clip — shown until video/canvas is ready. */
  idlePoster: string;
  playingVideo: string;
  product: (typeof BRAND_PRODUCT_SLUG)[BrandTechId];
  /** Public raster mark for spheres (not ProductLogo) — paints immediately from cache. */
  logoSrc: string;
  /** White on video for most spheres; K Talk's clip is light so it uses the dark mark. */
  logoVariant: "white" | "dark";
  playIcon: string;
  hideAddons?: boolean;
  darkControls?: boolean;
};

export function addonSphereLogoSrc(product: AddonSphereProduct): string {
  return product.logoSrc;
}

const retainedLogoPreloads: HTMLImageElement[] = [];
const retainedLogoLinks: HTMLLinkElement[] = [];
const retainedVideoPreloads: HTMLVideoElement[] = [];
let logoPreloadPromise: Promise<void> | null = null;

/**
 * Warm logo HTTP cache first. Returns a promise that settles when every mark
 * (and play icon) has loaded or errored — call video preload only after this.
 */
export function preloadAddonSphereLogos(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (logoPreloadPromise) return logoPreloadPromise;

  const pending: Promise<void>[] = [];

  for (const product of ADDON_SPHERE_PRODUCTS) {
    const href = addonSphereLogoSrc(product);

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = href;
    document.head.appendChild(link);
    retainedLogoLinks.push(link);

    const img = new Image();
    img.decoding = "sync";
    img.fetchPriority = "high";
    img.src = href;
    retainedLogoPreloads.push(img);
    pending.push(
      img.decode?.().catch(() => undefined) ??
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
            return;
          }
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        }),
    );

    const play = new Image();
    play.decoding = "async";
    play.src = product.playIcon;
    retainedLogoPreloads.push(play);
    pending.push(
      new Promise<void>((resolve) => {
        if (play.complete) {
          resolve();
          return;
        }
        play.addEventListener("load", () => resolve(), { once: true });
        play.addEventListener("error", () => resolve(), { once: true });
      }),
    );

    const poster = new Image();
    poster.decoding = "async";
    poster.src = product.idlePoster;
    retainedLogoPreloads.push(poster);
  }

  logoPreloadPromise = Promise.all(pending).then(() => undefined);
  return logoPreloadPromise;
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

/** Logos first (high priority), then sphere videos — avoids starving mark fetches. */
export function preloadAddonSphereAssets() {
  void preloadAddonSphereLogos().then(() => {
    preloadAddonSphereVideos();
  });
}

export const ADDON_SPHERE_PRODUCTS: AddonSphereProduct[] = [
  {
    id: "krails",
    name: "K Rails",
    href: "/krails",
    idleVideo: "/videos/krails-idle.mp4",
    idlePoster: "/images/home-addons/poster-krails-idle.webp",
    playingVideo: "/videos/krails-sphere-loop.mp4",
    product: BRAND_PRODUCT_SLUG.krails,
    logoSrc: "/images/home-addons/logo-krails.webp",
    logoVariant: "white",
    playIcon: "/images/home-addons/play.svg",
    hideAddons: true,
  },
  {
    id: "krisk",
    name: "K Risk",
    idleVideo: "/videos/krisk-idle.mp4",
    idlePoster: "/images/home-addons/poster-krisk-idle.webp",
    playingVideo: "/videos/krisk-loop.mp4",
    product: BRAND_PRODUCT_SLUG.krisk,
    logoSrc: "/images/home-addons/logo-krisk.webp",
    logoVariant: "white",
    playIcon: "/images/home-addons/play.svg",
  },
  {
    id: "kleads",
    name: "K Leads",
    idleVideo: "/videos/kleads-idle.mp4",
    idlePoster: "/images/home-addons/poster-kleads-idle.webp",
    playingVideo: "/videos/kleads-loop.mp4",
    product: BRAND_PRODUCT_SLUG.kleads,
    logoSrc: "/images/home-addons/logo-kleads.webp",
    logoVariant: "white",
    playIcon: "/images/home-addons/play.svg",
  },
  {
    id: "ktalk",
    name: "K Talk",
    idleVideo: "/videos/ktalk-idle.mp4",
    idlePoster: "/images/home-addons/poster-ktalk-idle.webp",
    playingVideo: "/videos/ktalk-loop.mp4",
    product: BRAND_PRODUCT_SLUG.ktalk,
    logoSrc: "/images/home-addons/logo-ktalk.webp",
    logoVariant: "dark",
    playIcon: "/images/home-addons/play-black.svg",
    darkControls: true,
  },
];
