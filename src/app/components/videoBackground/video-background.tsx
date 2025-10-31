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
  // container ref where the Vimeo Player will insert the iframe or where a native <video> may mount
  const containerRef = useRef<HTMLElement | null>(null);
  const playerRef = useRef<InstanceType<typeof Player> | null>(null);
  const [mediaVisible, setMediaVisible] = useState(false);

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
        setMediaVisible(true);
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

  // If a relative/local video path is provided (e.g. "/video.mp4" or ends with .mp4), render a native <video>
  // We'll use a separate effect to initialize and listen for its loaded/canplay event.
  const isLocalVideo =
    !!videoUrl && /(^\/|\.(mp4|webm|ogg))(\?.*)?$/.test(videoUrl);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!isLocalVideo) return;
    if (!isInView) return;
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
  }, [isLocalVideo, isInView, videoUrl, fadeDurationMs]);

  return (
    <div className={styles.backgroundVideo}>
      {/* media container: either a Vimeo iframe (Player creates it inside this div) or a native <video> */}
      {isLocalVideo ? (
        <motion.video
          // attach both refs so the effects can use containerRef (for in-view) and videoRef (for video control)
          ref={(el) => {
            // keep the original containerRef for useInView and Vimeo fallback
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
      ) : (
        <motion.div
          ref={(el) => {
            containerRef.current = el as HTMLElement | null;
          }}
          className={styles.videoEmbedObjectFitCover}
          initial={{ opacity: 0 }}
          animate={{ opacity: mediaVisible ? 1 : 0 }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          aria-hidden={!mediaVisible}
        />
      )}

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
