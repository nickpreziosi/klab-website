"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getTextDirection, type Locale } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import Button from "@/ui/shared/components/button/button";
import { cn } from "@/ui/shared/utils/utils";
import {
  ADDON_SPHERE_PRODUCTS,
  type AddonSphereProduct,
} from "./addon-sphere-products";
import styles from "./nav-addon-spheres.module.css";

type PlaybackMode = "idle" | "playing" | "paused";

const SPHERE_VIDEO_SCALE = 1.32;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement,
  scale: number,
) {
  const vw = video.videoWidth;
  const vh = video.videoHeight;
  const cw = canvas.width;
  const ch = canvas.height;
  if (!vw || !vh || !cw || !ch) return false;

  const videoAspect = vw / vh;
  const canvasAspect = cw / ch;
  let dw: number;
  let dh: number;
  if (videoAspect > canvasAspect) {
    dh = ch;
    dw = ch * videoAspect;
  } else {
    dw = cw;
    dh = cw / videoAspect;
  }
  dw *= scale;
  dh *= scale;
  ctx.drawImage(video, 0, 0, vw, vh, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  return true;
}

/**
 * Logos / chrome are siblings — they never wait on video.
 * Idle + playing clips both stay mounted with preload while this sphere is open.
 * `mediaEnabled` delays video work until marks have painted (navbar cache → instant).
 */
export function IdleSphereVideo({
  idleSrc,
  playingSrc,
  idlePoster,
  mode,
  onEnded,
  mediaEnabled = true,
}: {
  idleSrc: string;
  playingSrc: string;
  idlePoster?: string;
  mode: PlaybackMode;
  onEnded?: () => void;
  mediaEnabled?: boolean;
}) {
  const idleRef = useRef<HTMLVideoElement>(null);
  const playingRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sphereRef = useRef<HTMLSpanElement>(null);
  const onEndedRef = useRef(onEnded);
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  onEndedRef.current = onEnded;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mediaEnabled) setReady(false);
  }, [mediaEnabled]);

  useEffect(() => {
    if (!mediaEnabled || !mounted || prefersReducedMotion()) return;
    idleRef.current?.load();
    playingRef.current?.load();
  }, [mounted, idleSrc, playingSrc, mediaEnabled]);

  useEffect(() => {
    const idle = idleRef.current;
    const playing = playingRef.current;
    const canvas = canvasRef.current;
    const sphere = sphereRef.current;
    if (!mediaEnabled || !mounted || !idle || !playing || !canvas || !sphere) return;
    if (prefersReducedMotion()) return;

    const activeVideo = mode === "idle" ? idle : playing;
    const otherVideo = mode === "idle" ? playing : idle;

    otherVideo.pause();
    if (mode === "idle") {
      playing.currentTime = 0;
    }

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let painted = false;
    let running = true;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = sphere.clientWidth;
      const height = sphere.clientHeight;
      if (!width || !height) return;
      const nextWidth = Math.round(width * dpr);
      const nextHeight = Math.round(height * dpr);
      if (canvas.width !== nextWidth) canvas.width = nextWidth;
      if (canvas.height !== nextHeight) canvas.height = nextHeight;
    };

    const paint = () => {
      if (activeVideo.readyState < HTMLMediaElement.HAVE_CURRENT_DATA || activeVideo.seeking) {
        return;
      }
      if (drawCover(ctx, activeVideo, canvas, SPHERE_VIDEO_SCALE) && !painted) {
        painted = true;
        setReady(true);
      }
    };

    const tick = () => {
      if (!running) return;
      resize();
      paint();
      raf = requestAnimationFrame(tick);
    };

    const restartBeforeEnd = () => {
      if (mode !== "idle") return;
      if (!idle.duration || !Number.isFinite(idle.duration)) return;
      if (idle.currentTime >= idle.duration - 0.08) {
        idle.currentTime = 0.04;
      }
    };

    const handleEnded = () => {
      if (mode === "playing") onEndedRef.current?.();
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
        activeVideo.pause();
        return;
      }
      running = true;
      if (mode !== "paused") activeVideo.play().catch(() => {});
      raf = requestAnimationFrame(tick);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(sphere);
    idle.addEventListener("timeupdate", restartBeforeEnd);
    playing.addEventListener("ended", handleEnded);
    document.addEventListener("visibilitychange", onVisibility);

    activeVideo.muted = mode !== "playing";
    if (mode === "paused") {
      activeVideo.pause();
      resize();
      paint();
    } else {
      activeVideo.play().catch(() => {});
      raf = requestAnimationFrame(tick);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      idle.removeEventListener("timeupdate", restartBeforeEnd);
      playing.removeEventListener("ended", handleEnded);
      document.removeEventListener("visibilitychange", onVisibility);
      activeVideo.pause();
    };
  }, [mode, mounted, idleSrc, playingSrc, mediaEnabled]);

  return (
    <span ref={sphereRef} className={styles.sphere} aria-hidden>
      {idlePoster ? (
        <img
          className={styles.spherePoster}
          src={idlePoster}
          alt=""
          decoding="async"
        />
      ) : null}
      <canvas
        ref={canvasRef}
        className={styles.sphereCanvas}
        data-ready={ready ? "true" : undefined}
      />
      {mediaEnabled && mounted && !prefersReducedMotion()
        ? createPortal(
            <>
              <video
                ref={idleRef}
                className={styles.sphereVideoSource}
                src={idleSrc}
                poster={idlePoster}
                muted
                playsInline
                preload="auto"
                disablePictureInPicture
                aria-hidden
              />
              <video
                ref={playingRef}
                className={styles.sphereVideoSource}
                src={playingSrc}
                muted={mode !== "playing"}
                playsInline
                preload="auto"
                disablePictureInPicture
                aria-hidden
              />
            </>,
            document.body,
          )
        : null}
    </span>
  );
}

/**
 * Public WebP marks from /images/home-addons (not ProductLogo).
 * Plain <img> so paint is a cache hit and we can gate video start.
 */
function SphereProductLogo({
  product,
  className,
  onReady,
}: {
  product: AddonSphereProduct;
  className?: string;
  onReady?: () => void;
}) {
  const ref = useRef<HTMLImageElement>(null);
  const notified = useRef(false);

  const notify = () => {
    if (notified.current) return;
    notified.current = true;
    onReady?.();
  };

  useLayoutEffect(() => {
    notified.current = false;
    const img = ref.current;
    if (!img) return;
    if (img.complete && img.naturalWidth > 0) {
      notify();
      return;
    }
    const onLoad = () => notify();
    const onError = () => notify();
    img.addEventListener("load", onLoad);
    img.addEventListener("error", onError);
    return () => {
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.logoSrc]);

  return (
    <img
      ref={ref}
      src={product.logoSrc}
      alt=""
      aria-hidden
      className={className}
      width={160}
      height={40}
      decoding="sync"
      loading="eager"
      fetchPriority="high"
    />
  );
}

type NavAddonSpheresProps = {
  onLinkClick?: () => void;
  headerTitle?: string;
};

export function NavAddonSpheres({ onLinkClick, headerTitle }: NavAddonSpheresProps) {
  const locale = useLocale() as Locale;
  const dir = getTextDirection(locale);
  const tAddons = useTranslations("homeKrails");
  const tShowcase = useTranslations("technologiesShowcase");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mode, setMode] = useState<PlaybackMode>("idle");
  const [logosReadyCount, setLogosReadyCount] = useState(0);
  const [logosWaitTimedOut, setLogosWaitTimedOut] = useState(false);
  const mediaEnabled =
    logosWaitTimedOut || logosReadyCount >= ADDON_SPHERE_PRODUCTS.length;

  const markLogoReady = () => setLogosReadyCount((count) => count + 1);

  useEffect(() => {
    const id = window.setTimeout(() => setLogosWaitTimedOut(true), 600);
    return () => window.clearTimeout(id);
  }, []);

  const toggleProduct = (id: string) => {
    if (activeId === id && mode === "playing") {
      setMode("paused");
      return;
    }
    if (activeId === id && mode === "paused") {
      setMode("playing");
      return;
    }
    setActiveId(id);
    setMode("playing");
  };

  return (
    <div className={styles.wrapper}>
      {headerTitle ? <h3 className={styles.headerTitle}>{headerTitle}</h3> : null}
      <div className={styles.products}>
        {ADDON_SPHERE_PRODUCTS.map((product) => {
          const productMode = activeId === product.id ? mode : "idle";
          const playing = productMode === "playing";
          return (
            <div key={product.id} className={styles.item}>
              <button
                type="button"
                className={cn(styles.product, product.id === "ktalk" && styles.ktalk)}
                data-playing={playing ? "true" : undefined}
                aria-label={playing ? `Pause ${product.name}` : `Play ${product.name}`}
                onClick={() => toggleProduct(product.id)}
              >
                {!product.hideAddons ? (
                  <>
                    <span className={styles.pillSm} aria-hidden />
                    <span className={styles.plusSm} aria-hidden>
                      <img
                        src="/images/home-addons/plus-circle-sm.svg"
                        alt=""
                        width={16}
                        height={16}
                      />
                      <span className={styles.plusBarVSm} />
                      <span className={styles.plusBarHSm} />
                    </span>
                    <span className={styles.pillSmLabel} dir={dir}>
                      {tAddons("addonsEyebrow")}
                    </span>
                  </>
                ) : null}
                <IdleSphereVideo
                  idleSrc={product.idleVideo}
                  playingSrc={product.playingVideo}
                  idlePoster={product.idlePoster}
                  mode={productMode}
                  mediaEnabled={mediaEnabled}
                  onEnded={() => {
                    setActiveId(null);
                    setMode("idle");
                  }}
                />
                <SphereProductLogo
                  product={product}
                  className={styles.productLogo}
                  onReady={markLogoReady}
                />
                <span className={styles.play} aria-hidden>
                  <img src={product.playIcon} alt="" decoding="async" />
                </span>
                <span className={styles.pause} aria-hidden>
                  <span className={styles.pauseBar} />
                  <span className={styles.pauseBar} />
                </span>
                <span className={styles.listen}>{tAddons("addonsClickToListen")}</span>
              </button>
              {product.href ? (
                <Button
                  asChild
                  variant="accent-brand-outline"
                  size="sm"
                  className={styles.explore}
                  iconPosition="end"
                  iconSize="size-3"
                  icon={<ArrowRight className="rtlFlipH" />}
                >
                  <Link href={product.href} onClick={onLinkClick}>
                    {tAddons("addonsExplore")}
                  </Link>
                </Button>
              ) : null}
              <span className={styles.description} role="tooltip">
                {tShowcase(`technologies.${product.id}`)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
