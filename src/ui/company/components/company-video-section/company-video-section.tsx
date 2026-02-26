"use client";

import { motion } from "framer-motion";
import styles from "./company-video-section.module.css";
import Image from "next/image";
import { Dialog } from "radix-ui";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

interface CompanyVideoSectionProps {
  label?: string;
  heading?: string;
  videoTitle?: string;
  videoThumbnail?: string;
  bottomHeading?: string;
  bottomDescription?: string;
  onPlayClick?: () => void;
}

const DialogDemo = ({ onPlay }: { onPlay?: () => void }) => {
  const t = useTranslations("common");
  const [open, setOpen] = useState(false);
  const [contentReady, setContentReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open && onPlay) onPlay();
  }, [open, onPlay]);

  // close when clicking anywhere inside the content except the video
  const handleContentPointerDown = (e: React.PointerEvent) => {
    const target = e.target as Node;
    if (videoRef.current && videoRef.current.contains(target)) {
      // click inside video element (rare, typically won't bubble), ignore
      return;
    }
    // close whenever clicking inside content but outside video
    setOpen(false);
  };

  // reset contentReady when dialog opens/closes so entrance animation waits on load
  // We delay clearing `contentReady` until after the close animation finishes so
  // the exit animation can run while the content still reports loaded.
  const resetTimerRef = useRef<number | null>(null);
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      // clear any existing timer
      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
      }
      // wait slightly longer than the CSS close duration before clearing
      resetTimerRef.current = window.setTimeout(() => {
        setContentReady(false);
        resetTimerRef.current = null;
      }, 260);
    } else {
      // If opening, ensure any pending reset is cleared
      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
        resetTimerRef.current = null;
      }
    }
  };

  // Prefer clearing contentReady when the close animation finishes by listening to
  // the animationend event on the content node. This is more robust than relying
  // on a hard timeout. Keep the timeout as a fallback.
  useEffect(() => {
    const node = contentRef.current;
    if (!node) return;
    const onAnimEnd = (e: Event) => {
      const anim = e as AnimationEvent;
      // Only react to the contentHide animation
      if (anim.animationName === "contentHide") {
        if (resetTimerRef.current) {
          window.clearTimeout(resetTimerRef.current);
          resetTimerRef.current = null;
        }
        setContentReady(false);
      }
    };
    node.addEventListener("animationend", onAnimEnd as EventListener);
    return () => node.removeEventListener("animationend", onAnimEnd as EventListener);
    // contentRef is a mutable ref and doesn't need to be in deps
  }, []);

  // Close on Escape key as a secondary safety (Radix should handle this, but ensure we close when controlled)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Pause and cleanup native video when dialog closes; attempt to autoplay when opened.
  useEffect(() => {
    if (!videoRef.current) return;
    const vid = videoRef.current;
    if (!open) {
      // pause and remove source to stop network activity
      try {
        vid.pause();
        // remove src if set
        if (vid.currentSrc) {
          vid.removeAttribute("src");
          // reload to release resource
          vid.load();
        }
      } catch {}
      return;
    }

    // when opening, if there's a source already present try to play (may be blocked)
    try {
      vid.play().catch(() => {});
    } catch {}
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <button className={styles.playButton} aria-label={t("playVideo")}>
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
              fill="currentColor"
            />
          </svg>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay} />
        <Dialog.Title className={styles.dialogTitle}>Hear From KLab&apos;s Founder</Dialog.Title>
        <Dialog.Content
          className={styles.dialogContent}
          ref={contentRef}
          data-loaded={contentReady}
          // also close when pointer down happens outside the content (Radix handles overlay),
          // and handle clicks inside content via our handler to close when clicking outside video
          onPointerDown={(e) => handleContentPointerDown(e)}
        >
          {/* Native HTML video element */}
          <video
            src="/videos/keo-home-main.mp4"
            ref={videoRef}
            className={styles.videoEmbed}
            controls
            playsInline
            muted
            onLoadedData={() => {
              if (open) setContentReady(true);
            }}
          >
            <track kind="captions" srcLang="en" label="English" />
          </video>

          <Dialog.Close asChild>
            <button aria-label={t("closeVideo")} className={styles.dialogCloseButton}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default function CompanyVideoSection({
  label = "Discover the vision.",
  heading = "Hear from KLab's founder",
  videoTitle = "KLab",
  videoThumbnail = "",
  bottomHeading = "What we stand for",
  bottomDescription = "A concise overview of the product vision and core design principles. Hear why these choices matter, what problems the platform addresses, and how teams can integrate and move forward.",
  onPlayClick,
}: CompanyVideoSectionProps) {
  const t = useTranslations("common");
  // onPlayClick will be passed through to DialogDemo which calls it when dialog opens

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Top Two-Column Layout */}
        <div className={styles.topSection}>
          {/* Left Column - Text Content */}
          <motion.div
            className={styles.textColumn}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className={styles.label}>{label}</p>
            <h2 className={styles.heading}>{heading}</h2>
          </motion.div>

          {/* Right Column - Video Player */}
          <motion.div
            className={styles.videoColumn}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className={styles.videoCard}>
              <div className={styles.videoContainer}>
                <motion.div
                  className={styles.textColumnMobile}
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <p className={styles.label}>{label}</p>
                  <h2 className={styles.heading}>{heading}</h2>
                </motion.div>
                <Image
                  className={styles.thumbnailImage}
                  src={videoThumbnail || "/images/keo-video.webp"}
                  alt={videoTitle || t("videoThumbnailAlt")}
                  fill
                  style={{ objectFit: "contain" }}
                />
                <DialogDemo onPlay={onPlayClick}></DialogDemo>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section - Centered Text */}
        <motion.div
          className={styles.bottomSection}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <h3 className={styles.bottomHeading}>{bottomHeading}</h3>
          <p className={styles.bottomDescription}>{bottomDescription}</p>
        </motion.div>
      </div>
    </section>
  );
}
