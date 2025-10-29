"use client";

import { motion } from "framer-motion";
import styles from "./company-video-section.module.css";
import Image from "next/image";
import { AspectRatio, Dialog } from "radix-ui";
import { useEffect, useRef, useState } from "react";

interface CompanyVideoSectionProps {
  label?: string;
  heading?: string;
  videoTitle?: string;
  videoThumbnail?: string;
  bottomHeading?: string;
  bottomDescription?: string;
  onPlayClick?: () => void;
}

const DialogDemo = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className={styles.playButton} aria-label="Play video">
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
      <Dialog.Content className={styles.dialogContent}>
        <iframe
          className={styles.videoEmbed}
          src="https://player.vimeo.com/video/1119375393?badge=0&amp;autoplay=1&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
          title="Video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>

        <Dialog.Close asChild>
          <button className={styles.dialogCloseButton} aria-label="Close">
            CLOSE
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default function CompanyVideoSection({
  label = "Discover the vision.",
  heading = "Hear from KEO's founder",
  videoTitle = "KEO",
  videoThumbnail = "",
  bottomHeading = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  bottomDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vulputate quis erat lacinia efficitur. Nulla semper vulputate justo nec ornare.",
  onPlayClick,
}: CompanyVideoSectionProps) {
  const handlePlayClick = () => {
    if (onPlayClick) {
      onPlayClick();
    } else {
      console.log("[v0] Play button clicked");
    }
  };

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
                  src="/keo-video.jpg"
                  alt={videoTitle}
                  layout="fill"
                  objectFit="cover"
                />
                <DialogDemo></DialogDemo>
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
