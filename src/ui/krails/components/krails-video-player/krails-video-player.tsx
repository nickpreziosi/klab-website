"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { getTextDirection, type Locale } from "@/i18n/routing";
import { cn } from "@/ui/shared/utils/utils";
import videoStyles from "@/ui/shared/components/video-player/video-player.module.css";
import { prepareEmbedSrc } from "@/ui/shared/utils/youtube-embed";
import styles from "./krails-video-player.module.css";

const LOOP_VIDEO_SRC = "/videos/krails-loop.mp4";
const PLAY_ICON_SRC = "/images/krails-video-play.svg";

function PlayIcon() {
  return (
    <span className={styles.playWrap} aria-hidden>
      <img src={PLAY_ICON_SRC} alt="" width={67} height={60} className={styles.playIcon} />
    </span>
  );
}

export type KRailsVideoChoiceId = "fi" | "gov";

export interface KRailsVideoPlayerProps {
  fiVideoUrl: string;
  govVideoUrl: string;
  posterUrl: string;
  posterAlt: string;
  fiLabel: string;
  govLabel: string;
  fiPlayAria: string;
  govPlayAria: string;
  choicePrompt: string;
  skipAnimation?: boolean;
}

export default function KRailsVideoPlayer({
  fiVideoUrl,
  govVideoUrl,
  posterUrl,
  posterAlt,
  fiLabel,
  govLabel,
  fiPlayAria,
  govPlayAria,
  choicePrompt,
  skipAnimation = false,
}: KRailsVideoPlayerProps) {
  const t = useTranslations("common");
  const locale = useLocale() as Locale;
  const dir = getTextDirection(locale);
  const [shouldAnimate, setShouldAnimate] = useState(skipAnimation);
  const ref = useRef(null);
  const loopVideoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const effectiveShouldAnimate = skipAnimation || shouldAnimate;
  const [activeChoice, setActiveChoice] = useState<KRailsVideoChoiceId | null>(null);

  const videoUrl = activeChoice === "gov" ? govVideoUrl : fiVideoUrl;

  useEffect(() => {
    if (skipAnimation) return;
    if (isInView) {
      setShouldAnimate(true);
    }
  }, [isInView, skipAnimation]);

  const showPoster = activeChoice === null;

  useEffect(() => {
    const vid = loopVideoRef.current;
    if (!vid || !showPoster) return;

    if (skipAnimation || isInView) {
      const playPromise = vid.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    } else {
      vid.pause();
    }
  }, [showPoster, skipAnimation, isInView]);

  return (
    <motion.div
      ref={ref}
      dir={dir}
      className={cn(videoStyles.container, styles.playerShell)}
      variants={{
        hidden: {
          opacity: 0,
          filter: "blur(10px)",
          y: 40,
          boxShadow: "none",
        },
        visible: {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          boxShadow: "var(--shadow-black)",
          transition: {
            duration: 0.5,
            ease: [0.25, 0.4, 0.25, 1],
            delay: 0.2,
          },
        },
      }}
      initial={skipAnimation ? "visible" : "hidden"}
      animate={effectiveShouldAnimate ? "visible" : "hidden"}
    >
      {showPoster && (
        <h2 className={styles.choiceTitle}>{choicePrompt}</h2>
      )}
      <div
        className={cn(
          videoStyles.videoWrapper,
          activeChoice !== null && styles.videoStagePlaying,
        )}
      >
        <AnimatePresence>
          {showPoster && (
            <motion.div
              key="poster"
              initial={{ opacity: skipAnimation ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: skipAnimation ? 0 : 0.45 }}
              className={cn(videoStyles.posterContainer, styles.posterRoot)}
            >
              <video
                ref={loopVideoRef}
                className={styles.posterVideo}
                src={LOOP_VIDEO_SRC}
                poster={posterUrl}
                aria-label={posterAlt}
                muted
                loop
                playsInline
                preload="auto"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeChoice !== null && (
            <motion.iframe
              key={activeChoice}
              initial={{ opacity: skipAnimation ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: skipAnimation ? 0 : 0.45 }}
              className={styles.videoEmbed}
              src={prepareEmbedSrc(videoUrl)}
              title={t("videoPlayerTitle")}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          )}
        </AnimatePresence>

        <div
          className={cn(
            styles.choiceDock,
            !showPoster && styles.choiceDockCompact,
            showPoster && styles.dockStack,
          )}
        >
          {showPoster ? (
            <div className={styles.initialSplit}>
              <button
                type="button"
                className={styles.halfChoice}
                aria-label={fiPlayAria}
                onClick={() => setActiveChoice("fi")}
              >
                <span className={styles.choiceLabel}>{fiLabel}</span>
                <PlayIcon />
              </button>
              <button
                type="button"
                className={styles.halfChoice}
                aria-label={govPlayAria}
                onClick={() => setActiveChoice("gov")}
              >
                <span className={styles.choiceLabel}>{govLabel}</span>
                <PlayIcon />
              </button>
            </div>
          ) : (
            <div className={styles.choiceDockInner}>
              <button
                type="button"
                className={cn(styles.choiceSplit, activeChoice === "fi" && styles.choiceSplitActive)}
                aria-label={fiPlayAria}
                aria-pressed={activeChoice === "fi"}
                onClick={() => setActiveChoice("fi")}
              >
                <span className={styles.choiceLabel}>{fiLabel}</span>
              </button>
              <button
                type="button"
                className={cn(styles.choiceSplit, activeChoice === "gov" && styles.choiceSplitActive)}
                aria-label={govPlayAria}
                aria-pressed={activeChoice === "gov"}
                onClick={() => setActiveChoice("gov")}
              >
                <span className={styles.choiceLabel}>{govLabel}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
