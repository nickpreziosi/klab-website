"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import styles from "./video-background.module.css";
import Image from "next/image";
import Player, { type VimeoEmbedParameters } from "@vimeo/player";

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
  // container ref where the Vimeo Player will insert the iframe
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<InstanceType<typeof Player> | null>(null);
  const [iframeVisible, setIframeVisible] = useState(false);

  // useInView to defer loading until the component is near/inside viewport
  const isInView = useInView(containerRef, { margin: "200px" });

  useEffect(() => {
    // trigger entrance animation on mount
    requestAnimationFrame(() => setVisible(true));

    // only initialize the player once the container is visible
    if (!isInView) return;
    if (!containerRef.current) return;
    if (playerRef.current) return;

    // build the player using the container element; Player will create the iframe for us
    // Prefer passing a numeric id to match the Player types; fall back to a default id
    let vidId: number | undefined;
    if (videoUrl) {
      const m = videoUrl.match(/(\d{6,})/);
      if (m) vidId = parseInt(m[1], 10);
    }
    if (!vidId) vidId = 1119375393;

    const options: VimeoEmbedParameters = {
      id: vidId,
      autoplay: true,
      loop: true,
      background: true,
      muted: true,
    };

    const player = new Player(containerRef.current as HTMLElement, options);
    playerRef.current = player;

    // prepare iframe styling for a smooth fade once it is created
    const prepareIframe = () => {
      const iframe = containerRef.current?.querySelector(
        "iframe"
      ) as HTMLIFrameElement | null;
      if (iframe) {
        iframe.style.opacity = "0";
        iframe.style.transition = `opacity ${fadeDurationMs}ms ease`;
        iframe.style.willChange = "opacity";
      }
    };

    // attempt to prepare immediately (some players create iframe synchronously)
    prepareIframe();

    // Observe the container for an iframe being added asynchronously and prepare it
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const n of Array.from(m.addedNodes)) {
          if (
            n instanceof HTMLIFrameElement ||
            (n.nodeType === 1 && (n as Element).tagName === "IFRAME")
          ) {
            prepareIframe();
            // if player already loaded, ensure iframe fades in
            const iframe = containerRef.current?.querySelector(
              "iframe"
            ) as HTMLIFrameElement | null;
            if (iframe && playerRef.current) {
              requestAnimationFrame(() => {
                iframe.style.opacity = "1";
              });
            }
          }
        }
      }
    });
    observer.observe(containerRef.current, { childList: true, subtree: true });

    player.on("loaded", () => {
      // simultaneously show iframe and hide poster for a crossfade
      requestAnimationFrame(() => {
        setIframeVisible(true);
        setIsLoaded(true);
      });
    });

    player.on("error", (error: unknown) => {
      console.error("Vimeo player error:", error);
    });

    return () => {
      try {
        player.destroy();
      } catch {
        // ignore
      }
      observer.disconnect();
      playerRef.current = null;
    };
  }, [isInView, videoUrl, fadeDurationMs]);

  return (
    <div className={styles.backgroundVideo}>
      {/* iframe container animated via motion on its wrapper */}
      <motion.div
        ref={containerRef}
        className={styles.videoEmbedObjectFitCover}
        initial={{ opacity: 0 }}
        animate={{ opacity: iframeVisible ? 1 : 0 }}
        transition={{ duration: 0.75, ease: "easeInOut" }}
        aria-hidden={!iframeVisible}
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
          style={{ pointerEvents: isLoaded ? "none" : "auto" }}
        />
      </motion.div>

      <div aria-hidden className={styles.overlay}></div>
    </div>
  );
}
