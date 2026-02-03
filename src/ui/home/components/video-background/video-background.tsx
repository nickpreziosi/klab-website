"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import styles from "./video-background.module.css";
import Image from "next/image";

interface VideoPlayerProps {
  videoUrl?: string;
  posterUrl?: string;
  fadeDurationMs?: number;
}

export default function VideoPlayer({
  videoUrl,
  posterUrl,
  fadeDurationMs = 300,
}: VideoPlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);
  const [mediaVisible, setMediaVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // useInView to defer loading until the component is near/inside viewport
  const isInView = useInView(containerRef, { margin: "200px" });

  useEffect(() => {
    // trigger entrance animation on mount
    requestAnimationFrame(() => setVisible(true));
  }, []);

  useEffect(() => {
    if (!isInView) return;
    if (!videoUrl) return;
    const vid = videoRef.current;
    if (!vid) return;

    // If the source is already set, avoid re-initializing
    if (vid.dataset?.initialized) return;

    // set attributes and prepare for fade
    vid.muted = true;
    vid.loop = true;
    vid.playsInline = true;
    vid.preload = "metadata";

    // prepare style for fade-in
    vid.style.opacity = "0";
    vid.style.transition = `opacity ${fadeDurationMs}ms ease`;
    vid.style.willChange = "opacity";

    // attach source and load
    vid.src = videoUrl as string;
    // mark initialized to avoid duplicate work
    vid.dataset.initialized = "1";

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
      try {
        delete vid.dataset.initialized;
      } catch {}
    };
  }, [isInView, videoUrl, fadeDurationMs]);

  return (
    <div className={styles.backgroundVideo}>
      <motion.video
        ref={(el) => {
          containerRef.current = el as HTMLElement | null;
          videoRef.current = el as HTMLVideoElement | null;
        }}
        className={styles.videoEmbedObjectFitCover}
        initial={{ opacity: 0 }}
        animate={{ opacity: mediaVisible ? 1 : 0 }}
        transition={{ duration: 0.75, ease: "easeInOut" }}
        aria-hidden={!mediaVisible}
        playsInline
        muted
        loop
      />

      {/* Poster shown until player reports loaded. We keep it mounted and fade it out */}
      <motion.div
        className={`${styles.poster} ${visible ? styles.posterEnter : ""}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: isLoaded ? 0 : 1, y: visible ? 0 : 8 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        <Image
          fetchPriority="high"
          priority
          src={posterUrl ?? "/kena-video.jpg"}
          alt="KENA AI Visualization"
          fill
        />
      </motion.div>

      <div aria-hidden className={styles.overlay}></div>
    </div>
  );
}
