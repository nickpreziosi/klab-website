"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import styles from "./video-player.module.css";

const YOUTUBE_EMBED_HOST = /youtube\.com|youtube-nocookie\.com/i;

/** IFrame API player states — use these instead of `YT.PlayerState` in render (global `YT` loads async). */
const YT_PLAYER_STATE = {
  PLAYING: 1,
  BUFFERING: 3,
} as const;

export function isYouTubeEmbedUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return YOUTUBE_EMBED_HOST.test(u.hostname) && u.pathname.includes("/embed/");
  } catch {
    return false;
  }
}

function loadYouTubeIframeAPI(): Promise<typeof YT> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("SSR"));
  }
  const w = window as Window & { YT?: typeof YT };
  if (w.YT?.Player) return Promise.resolve(w.YT);

  return new Promise((resolve, reject) => {
    let settled = false;
    const finish = () => {
      if (settled || !w.YT?.Player) return;
      settled = true;
      clearInterval(poll);
      resolve(w.YT);
    };

    const wAny = window as Window & { onYouTubeIframeAPIReady?: () => void };
    const prev = wAny.onYouTubeIframeAPIReady;
    wAny.onYouTubeIframeAPIReady = () => {
      prev?.();
      finish();
    };

    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      s.async = true;
      s.onerror = () => reject(new Error("YouTube script failed"));
      document.head.appendChild(s);
    }

    const poll = setInterval(finish, 50);
    setTimeout(() => {
      clearInterval(poll);
      if (!settled) {
        if (w.YT?.Player) finish();
        else reject(new Error("YouTube API timeout"));
      }
    }, 15000);
  });
}

export function getYouTubeVideoId(embedUrl: string): string | null {
  try {
    const u = new URL(embedUrl);
    const m = u.pathname.match(/\/embed\/([^/?]+)/);
    return m?.[1] ?? null;
  } catch {
    return null;
  }
}

interface YouTubeIframeEmbedProps {
  embedUrl: string;
  skipAnimation: boolean;
  title: string;
}

export default function YouTubeIframeEmbed({ embedUrl, skipAnimation, title }: YouTubeIframeEmbedProps) {
  const t = useTranslations("common");
  const rawId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const hostId = `yt-${rawId}`;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const timeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [playerState, setPlayerState] = useState<number | undefined>(undefined);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const videoId = getYouTubeVideoId(embedUrl);

  const clearTimeInterval = useCallback(() => {
    if (timeIntervalRef.current) {
      clearInterval(timeIntervalRef.current);
      timeIntervalRef.current = null;
    }
  }, []);

  const syncTime = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    try {
      setCurrentTime(p.getCurrentTime());
      const d = p.getDuration();
      if (d && !Number.isNaN(d)) setDuration(d);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!videoId) return;

    let cancelled = false;

    loadYouTubeIframeAPI()
      .then((YT) => {
        if (cancelled) return;
        new YT.Player(hostId, {
          videoId,
          width: "100%",
          height: "100%",
          host: "https://www.youtube-nocookie.com",
          playerVars: {
            autoplay: 1,
            playsinline: 1,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            iv_load_policy: 3,
            fs: 0,
            disablekb: 0,
          },
          events: {
            onReady: (e) => {
              const p = e.target;
              playerRef.current = p;
              try {
                setDuration(p.getDuration());
              } catch {
                /* ignore */
              }
            },
            onStateChange: (e) => {
              setPlayerState(e.data);
              if (e.data === YT_PLAYER_STATE.PLAYING) {
                clearTimeInterval();
                timeIntervalRef.current = setInterval(syncTime, 250);
              } else {
                clearTimeInterval();
                syncTime();
              }
            },
          },
        });
      })
      .catch(() => {
        /* leave player empty */
      });

    return () => {
      cancelled = true;
      clearTimeInterval();
      try {
        playerRef.current?.destroy();
      } catch {
        /* ignore */
      }
      playerRef.current = null;
    };
  }, [videoId, hostId]); // syncTime/clearTimeInterval read refs — stable player mount

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const isPlaying = playerState === YT_PLAYER_STATE.PLAYING;
  const isBuffering = playerState === YT_PLAYER_STATE.BUFFERING;

  const togglePlay = () => {
    const p = playerRef.current;
    if (!p) return;
    try {
      if (isPlaying) p.pauseVideo();
      else p.playVideo();
    } catch {
      /* ignore */
    }
  };

  const toggleFullscreen = async () => {
    const el = wrapperRef.current;
    if (!el) return;
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await el.requestFullscreen();
    } catch {
      /* ignore */
    }
  };

  const seek = (value: number) => {
    const p = playerRef.current;
    if (!p || !duration) return;
    try {
      p.seekTo(value * duration, true);
      setCurrentTime(value * duration);
    } catch {
      /* ignore */
    }
  };

  const progressRaw = duration > 0 ? currentTime / duration : 0;
  const progress = Number.isFinite(progressRaw) ? progressRaw : 0;

  if (!videoId) {
    return null;
  }

  return (
    <motion.div
      key="youtube-api"
      initial={{ opacity: skipAnimation ? 1 : 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: skipAnimation ? 0 : 0.5 }}
      className={styles.youtubeRoot}
      ref={wrapperRef}
    >
      <div id={hostId} className={styles.youtubeHost} title={title} />
      <div className={styles.youtubeHoverChrome}>
        <div className={styles.youtubeHoverBar}>
          <button
            type="button"
            className={styles.youtubeIconButton}
            onClick={togglePlay}
            aria-label={isPlaying || isBuffering ? t("pauseVideo") : t("playVideo")}
          >
            {isPlaying || isBuffering ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <label className={styles.youtubeSeekWrap}>
            <span className={styles.visuallyHidden}>{t("seekVideo")}</span>
            <input
              type="range"
              className={styles.youtubeSeek}
              min={0}
              max={1}
              step={0.001}
              value={progress}
              onChange={(e) => seek(Number(e.target.value))}
              disabled={!duration}
            />
          </label>
          <button
            type="button"
            className={styles.youtubeIconButton}
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? t("exitFullscreen") : t("enterFullscreen")}
          >
            {isFullscreen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
