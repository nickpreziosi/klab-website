"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./video-player.module.css";
import Image from "next/image";

interface VideoPlayerProps {
  videoUrl?: string;
  posterUrl?: string;
}

export default function VideoPlayer({ videoUrl, posterUrl }: VideoPlayerProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isClicked, setIsClicked] = useState(false);

  const handlePlayButtonClick = () => {
    setIsClicked(true);
  };

  useEffect(() => {
    if (isInView) {
      setShouldAnimate(true);
    }
  }, [isInView]);

  const containerVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      y: 40,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.4, 0.25, 1],
        delay: 0.4,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={styles.container}
      variants={{
        hidden: {
          opacity: 0,
          filter: "blur(10px)",
          y: 40,
        },
        visible: {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          transition: {
            duration: 1,
            ease: [0.25, 0.4, 0.25, 1],
            delay: 0.4,
          },
        },
      }}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
    >
      <div className={styles.videoWrapper}>
        {!isClicked && (
          <>
            <Image
              fetchPriority="high"
              priority
              src="/kena-video.jpg"
              alt="KENA AI Visualization"
              className={styles.poster}
              width={1080}
              height={720}
            ></Image>
            <button
              onClick={handlePlayButtonClick}
              className={styles.playButton}
              aria-label="Play video"
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
          </>
        )}
        {isClicked && (
          <iframe
            className={styles.videoEmbed}
            src={videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </motion.div>
  );
}
