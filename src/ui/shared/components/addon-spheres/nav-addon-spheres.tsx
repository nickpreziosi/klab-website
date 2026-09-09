"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ComponentProps } from "react";
import { createPortal } from "react-dom";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getTextDirection, type Locale } from "@/i18n/routing";
import { ProductLogo } from "@k-lab/components";
import { ArrowRight } from "lucide-react";
import Button from "@/ui/shared/components/button/button";
import { cn } from "@/ui/shared/utils/utils";
import { ADDON_SPHERE_PRODUCTS } from "./addon-sphere-products";
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

export function IdleSphereVideo({
  idleSrc,
  playingSrc,
  mode,
  onEnded,
}: {
  idleSrc: string;
  playingSrc: string;
  mode: PlaybackMode;
  onEnded?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sphereRef = useRef<HTMLSpanElement>(null);
  const onEndedRef = useRef(onEnded);
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const src = mode === "idle" ? idleSrc : playingSrc;
  onEndedRef.current = onEnded;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const sphere = sphereRef.current;
    if (!mounted || !video || !canvas || !sphere) return;
    if (prefersReducedMotion()) return;

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
      if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA || video.seeking) return;
      if (drawCover(ctx, video, canvas, SPHERE_VIDEO_SCALE) && !painted) {
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
      if (!video.duration || !Number.isFinite(video.duration)) return;
      if (video.currentTime >= video.duration - 0.08) {
        video.currentTime = 0.04;
      }
    };

    const handleEnded = () => {
      if (mode === "playing") onEndedRef.current?.();
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
        video.pause();
        return;
      }
      running = true;
      if (mode !== "paused") video.play().catch(() => {});
      raf = requestAnimationFrame(tick);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(sphere);
    video.addEventListener("timeupdate", restartBeforeEnd);
    video.addEventListener("ended", handleEnded);
    document.addEventListener("visibilitychange", onVisibility);

    video.muted = mode !== "playing";
    if (mode === "paused") {
      video.pause();
      resize();
      paint();
    } else {
      video.play().catch(() => {});
      raf = requestAnimationFrame(tick);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      video.removeEventListener("timeupdate", restartBeforeEnd);
      video.removeEventListener("ended", handleEnded);
      document.removeEventListener("visibilitychange", onVisibility);
      video.pause();
    };
  }, [src, mode, mounted]);

  return (
    <span ref={sphereRef} className={styles.sphere} aria-hidden>
      <canvas
        ref={canvasRef}
        className={styles.sphereCanvas}
        data-ready={ready ? "true" : undefined}
      />
      {mounted && !prefersReducedMotion()
        ? createPortal(
            <video
              ref={videoRef}
              className={styles.sphereVideoSource}
              src={src}
              muted={mode !== "playing"}
              playsInline
              autoPlay={mode !== "paused"}
              preload="auto"
              disablePictureInPicture
              aria-hidden
            />,
            document.body,
          )
        : null}
    </span>
  );
}

/** ProductLogo imgs default to async decode and sit in a height:0/opacity:0 panel, so the browser skips the request until the menu finishes opening. */
function DropdownProductLogo(props: ComponentProps<typeof ProductLogo>) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const img = ref.current?.querySelector("img");
    if (!img) return;
    img.loading = "eager";
    img.fetchPriority = "high";
    img.decoding = "sync";
    const src = img.getAttribute("src");
    if (!src) return;
    img.removeAttribute("src");
    img.setAttribute("src", src);
  }, [props.product, props.variant]);

  return (
    <span ref={ref} className={styles.productLogoHost}>
      <ProductLogo {...props} />
    </span>
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
                  mode={productMode}
                  onEnded={() => {
                    setActiveId(null);
                    setMode("idle");
                  }}
                />
                <DropdownProductLogo
                  product={product.product}
                  variant={product.logoVariant}
                  className={styles.productLogo}
                  wrapperClassName={styles.productLogoWrap}
                  aria-hidden
                />
                <span className={styles.play} aria-hidden>
                  <img src={product.playIcon} alt="" />
                </span>
                <span className={styles.pause} aria-hidden>
                  <span className={styles.pauseBar} />
                  <span className={styles.pauseBar} />
                </span>
                <span className={styles.listen}>{tAddons("addonsClickToListen")}</span>
              </button>
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
