"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getTextDirection, type Locale } from "@/i18n/routing";
import { ProductLogo } from "@k-lab/components";
import { ArrowRight } from "lucide-react";
import Button from "@/ui/shared/components/button/button";
import { cn } from "@/ui/shared/utils/utils";
import { ADDON_SPHERE_PRODUCTS } from "./addon-sphere-products";
import styles from "./addon-sphere-row.module.css";

type PlaybackMode = "idle" | "playing" | "paused";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function SphereVideo({
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
  const idleRef = useRef<HTMLVideoElement>(null);
  const playingRef = useRef<HTMLVideoElement>(null);
  const onEndedRef = useRef(onEnded);
  const [playingReady, setPlayingReady] = useState(false);

  onEndedRef.current = onEnded;

  useEffect(() => {
    const idle = idleRef.current;
    if (!idle) return;
    if (prefersReducedMotion()) return;
    idle.play().catch(() => {});
  }, [idleSrc]);

  useEffect(() => {
    const video = playingRef.current;
    if (!video) return;

    if (mode !== "playing") {
      setPlayingReady(false);
      video.pause();
      if (mode === "idle") video.currentTime = 0;
      return;
    }

    if (prefersReducedMotion()) return;

    let cancelled = false;
    const showWhenReady = () => {
      if (cancelled) return;
      setPlayingReady(true);
      video.muted = false;
      video.play().catch(() => {});
    };
    const handleEnded = () => onEndedRef.current?.();

    video.addEventListener("ended", handleEnded);
    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      showWhenReady();
    } else {
      video.addEventListener("canplay", showWhenReady);
      video.muted = false;
      video.play().catch(() => {});
    }

    return () => {
      cancelled = true;
      video.removeEventListener("canplay", showWhenReady);
      video.removeEventListener("ended", handleEnded);
    };
  }, [mode, playingSrc]);

  return (
    <span
      className={styles.sphere}
      data-playing={mode === "playing" && playingReady ? "true" : undefined}
      aria-hidden
    >
      <video
        ref={idleRef}
        className={styles.sphereVideo}
        src={idleSrc}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
      />
      <video
        ref={playingRef}
        className={cn(styles.sphereVideo, styles.sphereVideoPlaying)}
        src={playingSrc}
        playsInline
        preload="auto"
        data-ready={playingReady ? "true" : undefined}
      />
    </span>
  );
}

type AddonSphereRowProps = {
  className?: string;
  onExploreClick?: () => void;
};

export function AddonSphereRow({ className, onExploreClick }: AddonSphereRowProps) {
  const locale = useLocale() as Locale;
  const dir = getTextDirection(locale);
  const tAddons = useTranslations("homeKrails");
  const tShowcase = useTranslations("technologiesShowcase");
  const [activeName, setActiveName] = useState<string | null>(null);
  const [mode, setMode] = useState<PlaybackMode>("idle");

  const toggleProduct = (name: string) => {
    if (activeName === name && mode === "playing") {
      setMode("paused");
      return;
    }
    if (activeName === name && mode === "paused") {
      setMode("playing");
      return;
    }
    setActiveName(name);
    setMode("playing");
  };

  return (
    <div className={cn(styles.products, className)} dir="ltr">
      {ADDON_SPHERE_PRODUCTS.map((product) => {
        const productMode = activeName === product.name ? mode : "idle";
        const playing = productMode === "playing";
        return (
          <div key={product.name} className={styles.item}>
            <button
              type="button"
              className={cn(styles.product, product.id === "ktalk" && styles.ktalk)}
              aria-label={playing ? `Pause ${product.name}` : `Play ${product.name}`}
              onClick={() => toggleProduct(product.name)}
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
              <SphereVideo
                idleSrc={product.idleVideo}
                playingSrc={product.playingVideo}
                mode={productMode}
                onEnded={() => {
                  setActiveName(null);
                  setMode("idle");
                }}
              />
              <ProductLogo
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
                <Link href={product.href} onClick={onExploreClick}>
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
  );
}
