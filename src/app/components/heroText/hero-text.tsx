"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./hero-text.module.css";

interface HeroTextProps {
  text: string;
  subtitle?: string;
  className?: string;
  buttonText?: string;
  buttonHref?: string;
  onButtonClick?: () => void;
}

export default function HeroText({
  text,
  subtitle,
  className = "",
  buttonText,
  buttonHref,
  onButtonClick,
}: HeroTextProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1500);
  }, []);

  // Split text into words for staggered animation
  const words = text.split(" ");

  const ButtonComponent = buttonHref ? motion(Link) : motion.button;

  return (
    <div className={`${styles.mainTextContainer} ${className}`}>
      <motion.h1
        className={styles.mainHeading}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
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
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
            className={styles.word}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.h1>
      {subtitle && (
        <motion.p
          className={styles.mainText}
          initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
          animate={
            isLoaded
              ? { opacity: 1, filter: "blur(0px)", y: 0 }
              : { opacity: 0, filter: "blur(10px)", y: 10 }
          }
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {subtitle}
        </motion.p>
      )}
      {buttonText && (
        <ButtonComponent
          className={styles.contactButton}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={{
            hidden: {
              opacity: 0,
              filter: "blur(10px)",
              y: 10,
            },
            visible: {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              transition: {
                delay: 0.8,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
          onClick={onButtonClick}
          {...(buttonHref && { href: buttonHref })}
        >
          {buttonText}
        </ButtonComponent>
      )}
    </div>
  );
}
