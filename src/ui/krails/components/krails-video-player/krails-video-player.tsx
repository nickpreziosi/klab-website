"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useInView } from "framer-motion";
import Image from "next/image";
import { BLUR_PLACEHOLDER } from "@/ui/shared/constants/blur-placeholder";
import { cn } from "@/ui/shared/utils/utils";
import videoStyles from "@/ui/shared/components/video-player/video-player.module.css";
import { prepareEmbedSrc } from "@/ui/shared/utils/youtube-embed";
import styles from "./krails-video-player.module.css";

const PLAY_TRIANGLE_PATH =
  "M37.875 73.225L73.225 50.5L37.875 27.775V73.225ZM50.5 101C43.5142 101 36.9492 99.6744 30.805 97.0231C24.6608 94.3719 19.3162 90.7738 14.7712 86.2288C10.2262 81.6837 6.62812 76.3392 3.97688 70.195C1.32562 64.0508 0 57.4858 0 50.5C0 43.5142 1.32562 36.9492 3.97688 30.805C6.62812 24.6608 10.2262 19.3162 14.7712 14.7712C19.3162 10.2262 24.6608 6.62812 30.805 3.97688C36.9492 1.32562 43.5142 0 50.5 0C57.4858 0 64.0508 1.32562 70.195 3.97688C76.3392 6.62812 81.6837 10.2262 86.2288 14.7712C90.7738 19.3162 94.3719 24.6608 97.0231 30.805C99.6744 36.9492 101 43.5142 101 50.5C101 57.4858 99.6744 64.0508 97.0231 70.195C94.3719 76.3392 90.7738 81.6837 86.2288 86.2288C81.6837 90.7738 76.3392 94.3719 70.195 97.0231C64.0508 99.6744 57.4858 101 50.5 101Z";

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
  const [shouldAnimate, setShouldAnimate] = useState(skipAnimation);
  const ref = useRef(null);
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

  return (
    <motion.div
      ref={ref}
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
              <Image
                fetchPriority="high"
                priority
                src={posterUrl}
                alt={posterAlt}
                className={styles.posterImage}
                fill
                sizes="(max-width: 768px) 100vw, min(100vw, 1440px)"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
              />
              <div className={styles.posterScrim} aria-hidden />
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
                <span className={styles.playWrapPrimary}>
                  <span className={styles.playButtonPrimary} aria-hidden>
                    <svg
                      className={styles.playIconPrimary}
                      width="101"
                      height="101"
                      viewBox="0 0 101 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d={PLAY_TRIANGLE_PATH} fill="white" />
                    </svg>
                  </span>
                </span>
              </button>
              <div className={styles.splitDivider} aria-hidden />
              <button
                type="button"
                className={styles.halfChoice}
                aria-label={govPlayAria}
                onClick={() => setActiveChoice("gov")}
              >
                <span className={styles.choiceLabel}>{govLabel}</span>
                <span className={styles.playWrapPrimary}>
                  <span className={styles.playButtonPrimary} aria-hidden>
                    <svg
                      className={styles.playIconPrimary}
                      width="101"
                      height="101"
                      viewBox="0 0 101 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d={PLAY_TRIANGLE_PATH} fill="white" />
                    </svg>
                  </span>
                </span>
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
                <span className={styles.playWrapPrimary}>
                  <span className={styles.playButtonPrimary} aria-hidden>
                    <svg
                      className={styles.playIconPrimary}
                      width="101"
                      height="101"
                      viewBox="0 0 101 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d={PLAY_TRIANGLE_PATH} fill="white" />
                    </svg>
                  </span>
                </span>
              </button>
              <button
                type="button"
                className={cn(styles.choiceSplit, activeChoice === "gov" && styles.choiceSplitActive)}
                aria-label={govPlayAria}
                aria-pressed={activeChoice === "gov"}
                onClick={() => setActiveChoice("gov")}
              >
                <span className={styles.choiceLabel}>{govLabel}</span>
                <span className={styles.playWrapPrimary}>
                  <span className={styles.playButtonPrimary} aria-hidden>
                    <svg
                      className={styles.playIconPrimary}
                      width="101"
                      height="101"
                      viewBox="0 0 101 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d={PLAY_TRIANGLE_PATH} fill="white" />
                    </svg>
                  </span>
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
