"use client";

import { motion, AnimatePresence, animate, useMotionValue } from "framer-motion";
import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import styles from "./loading-progress-bar.module.css";
import { KlabLogo } from "@/ui/shared/components/klab-logo/klab-logo";
import { useHomeAnimation } from "@/ui/home/providers/home-animation-provider";

const DURATION_S = 1;

/** Bar + number: smooth ease-out */
const BAR_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Logo: slightly overshooty / “springy” feel in 1s (stays aligned with the bar) */
const ROTATE_EASE: [number, number, number, number] = [0.34, 1.12, 0.32, 1];

/**
 * Shimmer after the ~1s beat. Easing matched to klab-promo sweep: quick build,
 * long soft settle (emphasized decelerate — common in the reference clip).
 */
const SHIMMER_DELAY_S = 0.7;

const SHIMMER_DURATION_S = 0.74;

const EXIT_MS = 380;

/** Emphasized decelerate — reads closer to the promo glint than symmetric ease-in-out */
const SHIMMER_EASE: [number, number, number, number] = [0.33, 0, 0.2, 1];

const SHIMMER_LAYER_TRANSITION = {
  delay: SHIMMER_DELAY_S,
  duration: SHIMMER_DURATION_S,
  ease: SHIMMER_EASE,
} as const;

/** Must match `<KlabLogo … width={LOGO_PX} height={LOGO_PX} />` so the mask clips 1:1 with the logo box */
const LOGO_PX = 228;

export function LoadingProgressBar() {
  const t = useTranslations("common");
  const homeAnimation = useHomeAnimation();
  const skipAnimation = homeAnimation?.hasAnimated ?? false;
  const setHasAnimated = homeAnimation?.setHasAnimated;
  const markLoadingProgressFinished = homeAnimation?.markLoadingProgressFinished;
  const resetLoadingProgressFinished = homeAnimation?.resetLoadingProgressFinished;

  const [isLoading, setIsLoading] = useState(!skipAnimation);

  const pathname = usePathname();
  const cancelledRef = useRef(false);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shimmerCompleteOnceRef = useRef(false);

  const pct = useMotionValue(0);
  const [displayPct, setDisplayPct] = useState(0);

  useEffect(() => {
    return pct.on("change", (v) => setDisplayPct(Math.round(v)));
  }, [pct]);

  useLayoutEffect(() => {
    if (!isLoading) return;

    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, [isLoading]);

  useEffect(() => {
    if (skipAnimation) return;

    cancelledRef.current = false;
    shimmerCompleteOnceRef.current = false;
    resetLoadingProgressFinished?.();
    setIsLoading(true);
    pct.set(0);

    const controls = animate(pct, 100, {
      duration: DURATION_S,
      ease: BAR_EASE,
    });

    return () => {
      cancelledRef.current = true;
      controls.stop();
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }
    };
  }, [pathname, skipAnimation, resetLoadingProgressFinished]);

  useEffect(() => {
    if (skipAnimation) {
      markLoadingProgressFinished?.();
    }
  }, [skipAnimation, markLoadingProgressFinished]);

  const dismiss = () => {
    if (cancelledRef.current) return;
    setIsLoading(false);
    markLoadingProgressFinished?.();
    setHasAnimated?.();
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className={styles.container}>
            <div className={styles.spinnerContainer}>
              <div className={styles.logoWrap} style={{ width: LOGO_PX, height: LOGO_PX }}>
                <motion.div
                  key={pathname}
                  className={styles.logoScale}
                  initial={{ scale: 1 }}
                  animate={{ scale: 0.8 }}
                  transition={{ duration: DURATION_S, ease: ROTATE_EASE }}
                >
                  <motion.div
                    className={styles.logoCenter}
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: DURATION_S, ease: ROTATE_EASE }}
                  >
                    <KlabLogo color="orange" format="default" width={LOGO_PX} height={LOGO_PX} />
                  </motion.div>

                  <motion.div
                    className={styles.logoShimmerMask}
                    aria-hidden
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: SHIMMER_DELAY_S,
                      duration: 0.06,
                      ease: "linear",
                    }}
                  >
                    <motion.div
                      className={styles.logoShimmerSweep}
                      initial={{ x: -154, y: 154 }}
                      animate={{ x: 154, y: -154 }}
                      transition={{
                        delay: SHIMMER_DELAY_S,
                        duration: SHIMMER_DURATION_S,
                        ease: SHIMMER_EASE,
                      }}
                      onAnimationComplete={() => {
                        if (cancelledRef.current || shimmerCompleteOnceRef.current) return;
                        shimmerCompleteOnceRef.current = true;
                        exitTimerRef.current = setTimeout(dismiss, EXIT_MS);
                      }}
                    >
                      <motion.div
                        className={styles.logoShimmerGlow}
                        initial={{ opacity: 0.52 }}
                        animate={{ opacity: 0.82 }}
                        transition={SHIMMER_LAYER_TRANSITION}
                      />
                      <motion.div
                        className={styles.logoShimmerCore}
                        initial={{ opacity: 0.88 }}
                        animate={{ opacity: 0.38 }}
                        transition={SHIMMER_LAYER_TRANSITION}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            <motion.div
              className={styles.percentage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.25 }}
            >
              {displayPct}%
            </motion.div>

            <div className={styles.progressBarContainer}>
              <div className={styles.progressTrack} />

              <motion.div
                className={styles.progressFill}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: DURATION_S, ease: BAR_EASE }}
              />
            </div>

            <p className={styles.loadingText}>{t("loadingProgress")}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
