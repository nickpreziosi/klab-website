"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useInView } from "framer-motion";
import styles from "./video-player.module.css";
import Image from "next/image";
import { BLUR_PLACEHOLDER } from "@/ui/shared/constants/blur-placeholder";

interface VideoPlayerProps {
  videoUrl: string;
  posterUrl: string;
  /** When true, skip entrance animations (e.g. locale switch). */
  skipAnimation?: boolean;
}

export default function VideoPlayer({ videoUrl, posterUrl, skipAnimation = false }: VideoPlayerProps) {
  const t = useTranslations("common");
  const [shouldAnimate, setShouldAnimate] = useState(skipAnimation);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const effectiveShouldAnimate = skipAnimation || shouldAnimate;
  const [isClicked, setIsClicked] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // consider a URL local if it looks like a relative path or points to a static video file
  const isLocalVideo =
    /^(\.\/|\.\.\/|\/)/.test(videoUrl) || /\.(mp4|webm|ogg|mov)(\?|$)/i.test(videoUrl);

  const handlePlayButtonClick = () => {
    setIsClicked(true);
    // reset ready when initiating a new play request
    setVideoReady(false);
  };

  useEffect(() => {
    if (skipAnimation) return;
    if (isInView) {
      setShouldAnimate(true);
    }
  }, [isInView, skipAnimation]);

  return (
    <motion.div
      ref={ref}
      className={styles.container}
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
      <div className={styles.videoWrapper}>
        <AnimatePresence>
          {/* Poster: show until iframe is mounted (external) OR until local video signals ready */}
          {(!isClicked || (isLocalVideo ? !videoReady : !isClicked)) && (
            <motion.div
              initial={{ opacity: skipAnimation ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: skipAnimation ? 0 : 0.5 }}
              key="poster"
              className={styles.posterContainer}
            >
              <Image
                fetchPriority="high"
                priority
                src={posterUrl}
                alt={t("kenaVisualizationAlt")}
                className={styles.poster}
                fill
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
              />
              <button
                onClick={handlePlayButtonClick}
                className={styles.playButton}
                aria-label={t("playVideo")}
              >
                <svg
                  className={styles.playIcon}
                  width="101"
                  height="101"
                  viewBox="0 0 101 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M37.875 73.225L73.225 50.5L37.875 27.775V73.225ZM50.5 101C43.5142 101 36.9492 99.6744 30.805 97.0231C24.6608 94.3719 19.3162 90.7738 14.7712 86.2288C10.2262 81.6837 6.62812 76.3392 3.97688 70.195C1.32562 64.0508 0 57.4858 0 50.5C0 43.5142 1.32562 36.9492 3.97688 30.805C6.62812 24.6608 10.2262 19.3162 14.7712 14.7712C19.3162 10.2262 24.6608 6.62812 30.805 3.97688C36.9492 1.32562 43.5142 0 50.5 0C57.4858 0 64.0508 1.32562 70.195 3.97688C76.3392 6.62812 81.6837 10.2262 86.2288 14.7712C90.7738 19.3162 94.3719 24.6608 97.0231 30.805C99.6744 36.9492 101 43.5142 101 50.5C101 57.4858 99.6744 64.0508 97.0231 70.195C94.3719 76.3392 90.7738 81.6837 86.2288 86.2288C81.6837 90.7738 76.3392 94.3719 70.195 97.0231C64.0508 99.6744 57.4858 101 50.5 101Z"
                    fill="white"
                  />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {/* External iframe: mount immediately on click */}
          {!isLocalVideo && isClicked && (
            <motion.iframe
              key="iframe"
              initial={{ opacity: skipAnimation ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: skipAnimation ? 0 : 0.5 }}
              className={styles.videoEmbed}
              src={videoUrl}
              title={t("videoPlayerTitle")}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></motion.iframe>
          )}

          {/* Local video element: mount on click, reveal when canplay/canplaythrough */}
          {isLocalVideo && isClicked && (
            <motion.video
              key="video"
              ref={videoRef}
              className={styles.videoEmbed}
              initial={{ opacity: skipAnimation ? 1 : 0 }}
              animate={{ opacity: videoReady ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: skipAnimation ? 0 : 0.5 }}
              src={videoUrl}
              playsInline
              controls
              autoPlay
              onCanPlay={() => {
                setVideoReady(true);
                // try to play (should be allowed since user initiated)
                try {
                  videoRef.current?.play();
                } catch {
                  /* ignore */
                }
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
