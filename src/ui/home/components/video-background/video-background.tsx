"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import styles from "./video-background.module.css";
import Image from "next/image";
import { BLUR_PLACEHOLDER } from "@/ui/shared/constants/blur-placeholder";

interface VideoPlayerProps {
  videoUrl: string;
  posterUrl: string;
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
  const [mediaVisible, setMediaVisible] = useState(skipAnimation);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Safari can lay out the fixed background wrong on first paint (~200px left). Force correct
  // position/size from the visual viewport after mount and on resize.
  useEffect(() => {
    if (!portalTarget || !wrapperRef.current) return;

    const applyViewportPosition = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const vv = typeof window !== "undefined" && window.visualViewport;
      const w = vv ? vv.width : window.innerWidth;
      const left = vv ? vv.offsetLeft : 0;
      wrapper.style.left = `${left}px`;
      wrapper.style.width = `${w}px`;
      wrapper.style.transform = "none";
    };

    const runAfterLayout = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(applyViewportPosition);
      });
    };

    runAfterLayout();
    window.visualViewport?.addEventListener("resize", runAfterLayout);
    window.visualViewport?.addEventListener("scroll", runAfterLayout);
    window.addEventListener("resize", runAfterLayout);

    return () => {
      window.visualViewport?.removeEventListener("resize", runAfterLayout);
      window.visualViewport?.removeEventListener("scroll", runAfterLayout);
      window.removeEventListener("resize", runAfterLayout);
    };
  }, [portalTarget]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsLoaded(true);
      setMediaVisible(false);
      return;
    }

    const vid = videoRef.current;
    if (!vid) return;

    const previousUrl = vid.dataset.initializedUrl;
    if (previousUrl === videoUrl) return;

    setIsLoaded(false);
    setMediaVisible(false);

    vid.muted = true;
    vid.loop = true;
    vid.playsInline = true;
    vid.preload = "auto";
    vid.style.opacity = skipAnimation ? "1" : "0";
    vid.style.transition = `opacity ${skipAnimation ? 0 : fadeDurationMs}ms ease`;
    vid.src = videoUrl;
    vid.dataset.initializedUrl = videoUrl;

    const onCanPlay = () => {
      requestAnimationFrame(() => {
        vid.style.opacity = "1";
        setMediaVisible(true);
        setIsLoaded(true);
      });
    };

    vid.addEventListener("canplay", onCanPlay);
    vid.load();
    const playPromise = vid.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise.catch(() => {
        /* muted autoplay can still be blocked; canplay will reveal the frame */
      });
    }

    return () => {
      vid.pause();
      vid.removeEventListener("canplay", onCanPlay);
      vid.removeAttribute("data-initialized-url");
      vid.removeAttribute("src");
      vid.load();
    };
  }, [videoUrl, fadeDurationMs, skipAnimation, prefersReducedMotion]);

  const content = (
    <div ref={wrapperRef} className={styles.backgroundVideo}>
      {!prefersReducedMotion && (
        <motion.video
          ref={videoRef}
          className={styles.video}
          initial={{ opacity: skipAnimation ? 1 : 0 }}
          animate={{ opacity: mediaVisible ? 1 : 0 }}
          transition={{ duration: skipAnimation ? 0 : 0.75, ease: "easeInOut" }}
          aria-hidden
          playsInline
          muted
          loop
          autoPlay
        />
      )}

      <motion.div
        className={styles.poster}
        initial={{ opacity: skipAnimation ? 1 : 0, y: skipAnimation ? 0 : 8 }}
        animate={{ opacity: isLoaded && !prefersReducedMotion ? 0 : 1, y: 0 }}
        transition={{ duration: skipAnimation ? 0 : 0.25, ease: "easeInOut" }}
      >
        <Image
          fetchPriority="high"
          priority
          src={posterUrl}
          alt=""
          fill
          sizes="100vw"
          className={styles.backgroundImage}
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
      </motion.div>

      <div aria-hidden className={styles.overlay}></div>
    </div>
  );

  // Portal into body so position:fixed is always relative to the viewport (avoids Safari
  // mis-positioning when an ancestor has transform/filter or when the containing block is wrong).
  if (portalTarget) {
    return createPortal(content, portalTarget);
  }
  return content;
}
