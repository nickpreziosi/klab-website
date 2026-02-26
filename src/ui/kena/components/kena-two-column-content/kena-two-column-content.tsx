"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./kena-two-column-content.module.css";

interface KenaTwoColumnContentProps {
  leftContent: string;
  rightContent: string;
  skipAnimation?: boolean;
}

export default function KenaTwoColumnContent({
  leftContent,
  rightContent,
  skipAnimation = false,
}: KenaTwoColumnContentProps) {
  const [shouldAnimate, setShouldAnimate] = useState(skipAnimation);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (skipAnimation) return;
    if (isInView) {
      setShouldAnimate(true);
    }
  }, [isInView, skipAnimation]);

  const leftVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      x: -40,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1],
        delay: 0.2,
      },
    },
  };

  const rightVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      x: 40,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1],
        delay: 0.4,
      },
    },
  };

  return (
    <div ref={ref} className={styles.container}>
      <motion.div
        className={styles.leftColumn}
        variants={{
          hidden: {
            opacity: 0,
            filter: "blur(10px)",
            x: -40,
          },
          visible: {
            opacity: 1,
            filter: "blur(0px)",
            x: 0,
            transition: {
              duration: 0.8,
              ease: [0.25, 0.4, 0.25, 1],
              delay: 0.2,
            },
          },
        }}
        initial={skipAnimation ? "visible" : "hidden"}
        animate={shouldAnimate ? "visible" : "hidden"}
      >
        <h3 className={styles.leftHeading}>{leftContent}</h3>
      </motion.div>
      <motion.div
        className={styles.rightColumn}
        variants={{
          hidden: {
            opacity: 0,
            filter: "blur(10px)",
            x: 40,
          },
          visible: {
            opacity: 1,
            filter: "blur(0px)",
            x: 0,
            transition: {
              duration: 0.8,
              ease: [0.25, 0.4, 0.25, 1],
              delay: 0.4,
            },
          },
        }}
        initial={skipAnimation ? "visible" : "hidden"}
        animate={shouldAnimate ? "visible" : "hidden"}
      >
        <p className={styles.rightText}>{rightContent}</p>
      </motion.div>
    </div>
  );
}
