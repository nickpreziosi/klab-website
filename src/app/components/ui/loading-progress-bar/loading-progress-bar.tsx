"use client";

import {
  motion,
  AnimatePresence,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { LoaderPinwheel } from "lucide-react";
import styles from "./loading-progress-bar.module.css";
import { KlabLogo } from "@/app/components/ui/klab-logo/klab-logo";

export function LoadingProgressBar() {
  const [targetProgress, setTargetProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isCompleteRef = useRef(false);

  const progressMotion = useMotionValue(0);
  const smoothProgress = useSpring(progressMotion, {
    stiffness: 80,
    damping: 25,
    mass: 0.3,
  });

  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      setDisplayProgress(Math.round(latest));
    });
    return unsubscribe;
  }, [smoothProgress]);

  useEffect(() => {
    progressMotion.set(targetProgress);
  }, [targetProgress, progressMotion]);

  useEffect(() => {
    setIsLoading(true);
    setTargetProgress(0);
    progressMotion.set(0);
    isCompleteRef.current = false;

    let animationFrame: number;
    let lastProgress = 0;

    const updateProgress = () => {
      if (isCompleteRef.current) return;

      let newProgress = lastProgress;

      // Initial load
      if (newProgress === 0) {
        newProgress = 15;
      }

      // Check document ready state
      if (document.readyState === "loading") {
        newProgress = Math.max(newProgress, 25);
      } else if (document.readyState === "interactive") {
        newProgress = Math.max(newProgress, 50);
      } else if (document.readyState === "complete") {
        newProgress = 100;
        isCompleteRef.current = true;
        setTargetProgress(100);
        setTimeout(() => setIsLoading(false), 600);
        return;
      }

      // Track navigation timing
      const navigation = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;

      if (navigation) {
        if (navigation.domContentLoadedEventEnd > 0) {
          newProgress = Math.max(newProgress, 70);
        }

        if (navigation.domComplete > 0) {
          newProgress = Math.max(newProgress, 90);
        }

        if (navigation.loadEventEnd > 0) {
          newProgress = 100;
          isCompleteRef.current = true;
          setTargetProgress(100);
          setTimeout(() => setIsLoading(false), 600);
          return;
        }
      }

      if (newProgress < 95 && newProgress === lastProgress) {
        newProgress = Math.min(95, lastProgress + 2);
      }

      // Update if progress changed
      if (newProgress !== lastProgress) {
        lastProgress = newProgress;
        setTargetProgress(newProgress);
      }

      // Continue checking
      animationFrame = requestAnimationFrame(updateProgress);
    };

    updateProgress();

    const handleLoad = () => {
      if (!isCompleteRef.current) {
        isCompleteRef.current = true;
        setTargetProgress(100);
        setTimeout(() => setIsLoading(false), 600);
      }
    };

    window.addEventListener("load", handleLoad);

    if (document.readyState === "complete") {
      handleLoad();
    }

    const safetyTimeout = setTimeout(() => {
      if (!isCompleteRef.current) {
        isCompleteRef.current = true;
        setTargetProgress(100);
        setTimeout(() => setIsLoading(false), 600);
      }
    }, 5000);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("load", handleLoad);
      clearTimeout(safetyTimeout);
    };
  }, [pathname, searchParams, progressMotion]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className={styles.container}>
            <motion.div className={styles.spinnerContainer}>
              <motion.div
                className={styles.spinner}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={styles.spinnerSvg}
                >
                  <LoaderPinwheel
                    color="var(--accent-color)"
                    size={256}
                    strokeWidth={1}
                    className={styles.loaderIcon}
                  />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: displayProgress / 100,
                  scale: 0.8 + (displayProgress / 100) * 0.2,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={styles.logoCenter}
              >
                <KlabLogo color="orange" format="default" width={200} height={200} />
              </motion.div>
            </motion.div>

            {/* Progress Percentage */}
            <motion.div
              className={styles.percentage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <motion.span
                key={Math.floor(displayProgress / 10)}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
              >
                {displayProgress}%
              </motion.span>
            </motion.div>

            {/* Progress Bar Container */}
            <motion.div
              className={styles.progressBarContainer}
              initial={{ opacity: 0, scaleX: 0.8 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              {/* Background track */}
              <div className={styles.progressTrack} />

              <motion.div
                className={styles.progressFill}
                style={{ width: `${displayProgress}%` }}
              />

              {/* Shimmer effect */}
              <motion.div
                className={styles.shimmer}
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                style={{ width: `${displayProgress}%` }}
              />

              {/* Glow effect */}
              <motion.div
                className={styles.progressGlow}
                style={{ width: `${displayProgress}%` }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Loading text */}
            <motion.div
              className={styles.loadingText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0, duration: 0.3 }}
            >
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                Loading
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              >
                .
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.4,
                }}
              >
                .
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
              >
                .
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
