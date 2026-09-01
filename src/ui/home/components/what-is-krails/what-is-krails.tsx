"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { getTextDirection, type Locale } from "@/i18n/routing";
import type { HomeKrailsTranslations } from "@/ui/home/types";
import { withBrandLtr } from "@/ui/home/utils/with-brand-ltr";
import { ADDON_SPHERE_PRODUCTS } from "@/ui/shared/components/addon-spheres/addon-sphere-products";
import { ProductLogo } from "@k-lab/components";
import { cn } from "@/ui/shared/utils/utils";
import styles from "./what-is-krails.module.css";

const DASHBOARD_GIF = "/images/krails-what-is-dashboard.gif";
const KRAILS_SPHERE = ADDON_SPHERE_PRODUCTS.find((product) => product.id === "krails")!;

const ENTRANCE_EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: ENTRANCE_EASE },
  },
};

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

type WhatIsKrailsProps = {
  translations: HomeKrailsTranslations;
  skipAnimation?: boolean;
};

export function WhatIsKrails({ translations, skipAnimation = false }: WhatIsKrailsProps) {
  const locale = useLocale() as Locale;
  const dir = getTextDirection(locale);
  const [mode, setMode] = useState<PlaybackMode>("idle");
  const playing = mode === "playing";

  const toggleClip = () => {
    if (mode === "playing") {
      setMode("paused");
      return;
    }
    setMode("playing");
  };

  return (
    <section className={styles.section} dir={dir}>
      <motion.div
        className={styles.inner}
        initial={skipAnimation ? false : "hidden"}
        whileInView={skipAnimation ? undefined : "visible"}
        animate={skipAnimation ? "visible" : undefined}
        viewport={skipAnimation ? undefined : { once: true, amount: 0.25 }}
        variants={fadeUp}
      >
        <div className={styles.frame}>
        <div className={styles.layout}>
          <div className={styles.card}>
            <div className={styles.headingRow}>
              <h2 className={styles.heading}>
                <span className={styles.prefix}>{translations.whatIsPrefix}</span>
                <span className={styles.logoRow}>
                  <span className={styles.logoWrap} dir="ltr">
                    <ProductLogo product="k-rails" alt="K Rails" className={styles.logo} />
                  </span>
                  <span className={styles.mark} aria-hidden>
                    {translations.whatIsQuestionMark}
                  </span>
                </span>
              </h2>
              <button
                type="button"
                className={styles.clip}
                aria-label={playing ? `Pause ${KRAILS_SPHERE.name}` : `Play ${KRAILS_SPHERE.name}`}
                onClick={toggleClip}
              >
                <SphereVideo
                  idleSrc={KRAILS_SPHERE.idleVideo}
                  playingSrc={KRAILS_SPHERE.playingVideo}
                  mode={mode}
                  onEnded={() => setMode("idle")}
                />
                <span className={styles.play} aria-hidden>
                  <img src={KRAILS_SPHERE.playIcon} alt="" />
                </span>
                <span className={styles.pause} aria-hidden>
                  <span className={styles.pauseBar} />
                  <span className={styles.pauseBar} />
                </span>
              </button>
            </div>
            <div className={styles.body}>
              <p>{withBrandLtr(translations.whatIsBody1, styles.brandLtr)}</p>
              <p>{withBrandLtr(translations.whatIsBody2, styles.brandLtr)}</p>
            </div>
          </div>

          <img
            src={DASHBOARD_GIF}
            alt={translations.whatIsImageAlt}
            className={styles.mediaImage}
            decoding="async"
          />
        </div>
        </div>
      </motion.div>
    </section>
  );
}
