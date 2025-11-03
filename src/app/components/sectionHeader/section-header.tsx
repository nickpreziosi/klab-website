"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./section-header.module.css";

interface SectionHeaderProps {
  white?: boolean;
  highlight?: string[];
  size?: string;
  heading: string;
  secondHeading?: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  animateOnce?: boolean;
}

export default function SectionHeader({
  white,
  highlight,
  size,
  heading,
  secondHeading,
  subtitle,
  align = "left",
  animateOnce = true,
}: SectionHeaderProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: animateOnce, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      setShouldAnimate(true);
    } else if (!animateOnce) {
      setShouldAnimate(false);
    }
  }, [isInView, animateOnce]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      y: 20,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  const subtitleVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      y: 20,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1],
        delay: 0.3,
      },
    },
  };

  const headingWords = heading.split(/(\ |\.)/).filter(Boolean);
  const secondHeadingWords = secondHeading
    ? secondHeading.split(/(\ |\.)/).filter(Boolean)
    : [];

  return (
    <div ref={ref} className={styles.container} data-align={align}>
      <motion.h2
        style={{
          justifyContent: align === "center" ? "center" : "flex-start",
        }}
        className={`${styles.heading} ${styles[`text${size}`]}`}
        variants={containerVariants}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
      >
        {headingWords.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            variants={{
              hidden: {
                opacity: 0,
                filter: "blur(10px)",
                y: 20,
              },
              visible: {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.25, 0.4, 0.25, 1],
                },
              },
            }}
            className={`${styles.word} ${
              highlight?.includes(word) && styles.highlight
            } ${white && styles.white}`}
          >
            {word}
          </motion.span>
        ))}
      </motion.h2>

      {secondHeading && (
        <motion.h2
          style={{
            justifyContent: align === "center" ? "center" : "flex-start",
          }}
          className={styles.heading}
          variants={containerVariants}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
        >
          {secondHeadingWords.map((word, index) => (
            <motion.span
              key={`second-${word}-${index}`}
              variants={{
                hidden: {
                  opacity: 0,
                  filter: "blur(10px)",
                  y: 20,
                },
                visible: {
                  opacity: 1,
                  filter: "blur(0px)",
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.25, 0.4, 0.25, 1],
                  },
                },
              }}
              className={`${styles.word} ${
                highlight?.includes(word) && styles.highlight
              } ${white && styles.white}`}
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>
      )}

      {subtitle && (
        <motion.p
          className={`${styles.subtitle} ${white && styles.white}`}
          variants={{
            hidden: {
              opacity: 0,
              filter: "blur(10px)",
              y: 20,
            },
            visible: {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              transition: {
                duration: 0.8,
                ease: [0.25, 0.4, 0.25, 1],
                delay: 0.3,
              },
            },
          }}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
