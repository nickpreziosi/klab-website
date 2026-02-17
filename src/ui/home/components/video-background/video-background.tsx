"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import styles from "./video-background.module.css";
import Image from "next/image";
import { BLUR_PLACEHOLDER } from "@/ui/shared/constants/blur-placeholder";

interface VideoPlayerProps {
  videoUrl?: string;
  posterUrl?: string;
  fadeDurationMs?: number;
  /** When true, skip entrance animations (e.g. locale switch). */
  skipAnimation?: boolean;
}

export default function VideoPlayer({
  videoUrl,
  posterUrl,
  fadeDurationMs = 300,
  skipAnimation = false,
}: VideoPlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visible, setVisible] = useState(skipAnimation);
  const [mediaVisible, setMediaVisible] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // useInView to defer loading until the component is near/inside viewport
  const isInView = useInView(containerRef, { margin: "200px" });

  useEffect(() => {
    if (skipAnimation) return;
    requestAnimationFrame(() => setVisible(true));
  }, [skipAnimation]);

  useEffect(() => {
    if (!isInView) return;
    if (!videoUrl) return;
    const vid = videoRef.current;
    if (!vid) return;

    // Re-initialize when videoUrl changes (e.g. theme switch)
    const previousUrl = vid.dataset?.initializedUrl;
    if (previousUrl === videoUrl) return;

    setIsLoaded(false);
    setMediaVisible(false);

    // set attributes and prepare for fade
    vid.muted = true;
    vid.loop = true;
    vid.playsInline = true;
    vid.preload = "metadata";

    // prepare style for fade-in (skip transition when skipAnimation)
    vid.style.opacity = skipAnimation ? "1" : "0";
    vid.style.transition = `opacity ${skipAnimation ? 0 : fadeDurationMs}ms ease`;
    vid.style.willChange = "opacity";

    // attach source and load
    vid.src = videoUrl as string;
    vid.dataset.initializedUrl = videoUrl;

    const onCanPlay = () => {
      requestAnimationFrame(() => {
        vid.style.opacity = "1";
        setMediaVisible(true);
        setIsLoaded(true);
      });
    };

    vid.addEventListener("canplay", onCanPlay);

    // attempt to start playback (muted autoplay should work in most browsers)
    vid.load();
    const playPromise = vid.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise.catch(() => {
        // autoplay might be blocked; we'll still wait for canplay event
      });
    }

    return () => {
      vid.pause();
      vid.removeEventListener("canplay", onCanPlay);
      vid.removeAttribute("data-initialized-url");
      vid.removeAttribute("src");
      vid.load();
    };
  }, [isInView, videoUrl, fadeDurationMs, skipAnimation]);

  return (
    <div className={styles.backgroundVideo}>
      <motion.video
        ref={(el) => {
          containerRef.current = el as HTMLElement | null;
          videoRef.current = el as HTMLVideoElement | null;
        }}
        className={styles.videoEmbedObjectFitCover}
        initial={{ opacity: skipAnimation ? 1 : 0 }}
        animate={{ opacity: mediaVisible ? 1 : 0 }}
        transition={{ duration: skipAnimation ? 0 : 0.75, ease: "easeInOut" }}
        aria-hidden={!mediaVisible}
        playsInline
        muted
        loop
      />

      {/* Poster shown until player reports loaded. We keep it mounted and fade it out */}
      <motion.div
        className={`${styles.poster} ${visible ? styles.posterEnter : ""}`}
        initial={{ opacity: skipAnimation ? 1 : 0, y: skipAnimation ? 0 : 8 }}
        animate={{ opacity: isLoaded ? 0 : 1, y: visible ? 0 : 8 }}
        transition={{ duration: skipAnimation ? 0 : 0.25, ease: "easeInOut" }}
      >
        <Image
          fetchPriority="high"
          priority
          src={posterUrl ?? "/images/kena-video.webp"}
          alt="KENA AI Visualization"
          fill
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
      </motion.div>

      <div aria-hidden className={styles.overlay}></div>
    </div>
  );
}
