"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { getTextDirection, type Locale } from "@/i18n/routing";
import type { HomeKrailsTranslations } from "@/ui/home/types";
import { withBrandLtr } from "@/ui/home/utils/with-brand-ltr";
import { cn } from "@/ui/shared/utils/utils";
import styles from "./home-addons.module.css";

type AddonProduct = {
  name: string;
  href: string;
  idleVideo: string;
  playingVideo: string;
  logo: string;
  playIcon: string;
  className: string;
};

const PRODUCTS: AddonProduct[] = [
  {
    name: "K Risk",
    href: "/technologies/krisk",
    idleVideo: "/videos/krisk-idle.mp4",
    playingVideo: "/videos/krisk-loop.mp4",
    logo: "/logos/krisk-logo-light.svg",
    playIcon: "/images/home-addons/play.svg",
    className: styles.krisk,
  },
  {
    name: "K Leads",
    href: "/technologies/kleads",
    idleVideo: "/videos/kleads-idle.mp4",
    playingVideo: "/videos/kleads-loop.mp4",
    logo: "/logos/kleads-logo-light.svg",
    playIcon: "/images/home-addons/play.svg",
    className: styles.kleads,
  },
  {
    name: "K Talk",
    href: "/technologies/ktalk",
    idleVideo: "/videos/ktalk-idle.mp4",
    playingVideo: "/videos/ktalk-loop.mp4",
    logo: "/logos/ktalk-logo-dark.svg",
    playIcon: "/images/home-addons/play-black.svg",
    className: styles.ktalk,
  },
];

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

type HomeAddonsProps = {
  translations: HomeKrailsTranslations;
  skipAnimation?: boolean;
};

export function HomeAddons({ translations }: HomeAddonsProps) {
  const locale = useLocale() as Locale;
  const dir = getTextDirection(locale);
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
    <section
      className={styles.section}
      dir={dir}
      aria-labelledby="home-addons-heading"
    >
      <div className={styles.top}>
        <div className={styles.visual} dir="ltr">
          <div className={styles.dashStack}>
            <div className={styles.mockupBoard}>
              <div className={styles.glowBack} aria-hidden />
              <img
                src="/images/home-addons/dashboard-back.png"
                alt=""
                className={styles.dashBack}
                decoding="async"
              />
              <div className={styles.glowFront} aria-hidden />
              <img
                src="/images/home-addons/dashboard-front.png"
                alt={translations.addonsDashAlt}
                className={styles.dashFront}
                decoding="async"
              />
              <span className={styles.leaderLeftWrap} aria-hidden>
                <img
                  src="/images/home-addons/leader-left.svg"
                  alt=""
                  className={styles.leaderLeft}
                />
              </span>
              <span className={styles.leaderRightWrap} aria-hidden>
                <img
                  src="/images/home-addons/leader-right.svg"
                  alt=""
                  className={styles.leaderRight}
                />
              </span>
            </div>

            <div className={styles.callouts}>
              <div className={cn(styles.callout, styles.calloutLeft)} dir={dir}>
                <ul>
                  <li>{translations.addonsCallout1}</li>
                  <li>{translations.addonsCallout2}</li>
                </ul>
              </div>
              <div className={cn(styles.callout, styles.calloutRight)} dir={dir}>
                <ul>
                  <li>{translations.addonsCallout3}</li>
                  <li>{translations.addonsCallout4}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.pillLg}>
            <span className={styles.plusLg} aria-hidden>
              <img src="/images/home-addons/plus-circle-lg.svg" alt="" width={30} height={30} />
              <span className={styles.plusBarVLg} />
              <span className={styles.plusBarHLg} />
            </span>
            <span className={styles.eyebrow} dir={dir}>
              {translations.addonsEyebrow}
            </span>
          </div>
          <h2 id="home-addons-heading" className={styles.title}>
            <span className={styles.titleLine}>{translations.addonsTitleLine1}</span>
            <span className={styles.titleLine}>
              {withBrandLtr(translations.addonsTitleLine2, styles.brandLtr)}
            </span>
          </h2>
          <div className={styles.body}>
            <p className={styles.bodyLead}>
              {withBrandLtr(translations.addonsBodyLead, styles.brandLtr)}
            </p>
            <p className={styles.bodyRest}>
              {withBrandLtr(translations.addonsBody, styles.brandLtr)}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.products} dir="ltr">
        {PRODUCTS.map((product) => {
          const productMode = activeName === product.name ? mode : "idle";
          const playing = productMode === "playing";
          return (
            <Link
              key={product.name}
              href={product.href}
              className={cn(styles.product, product.className)}
              aria-label={playing ? `Pause ${product.name}` : `Play ${product.name}`}
              onClick={(event) => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                toggleProduct(product.name);
              }}
            >
              <span className={styles.pillSm} aria-hidden />
              <span className={styles.plusSm} aria-hidden>
                <img src="/images/home-addons/plus-circle-sm.svg" alt="" width={16} height={16} />
                <span className={styles.plusBarVSm} />
                <span className={styles.plusBarHSm} />
              </span>
              <span className={styles.pillSmLabel} dir={dir}>
                {translations.addonsEyebrow}
              </span>
              <SphereVideo
                idleSrc={product.idleVideo}
                playingSrc={product.playingVideo}
                mode={productMode}
                onEnded={() => {
                  setActiveName(null);
                  setMode("idle");
                }}
              />
              <img
                src={product.logo}
                alt=""
                className={styles.productLogo}
                decoding="async"
              />
              <span className={styles.play} aria-hidden>
                <img src={product.playIcon} alt="" />
              </span>
              <span className={styles.pause} aria-hidden>
                <span className={styles.pauseBar} />
                <span className={styles.pauseBar} />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
