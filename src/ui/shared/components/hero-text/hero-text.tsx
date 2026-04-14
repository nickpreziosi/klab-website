"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./hero-text.module.css";
import Button from "@/ui/shared/components/button/button";
import { ArrowDownIcon } from "lucide-react";

interface HeroTextProps {
  maxWidth?: string;
  text: string;
  subheader?: string;
  subtitle?: string;
  className?: string;
  buttonText?: string;
  buttonHref?: string;
  buttonTwoText?: string;
  buttonTwoHref?: string;
  center?: boolean;
  onButtonClick?: () => void;
  onButtonTwoClick?: () => void;
  /** When true, skip entrance animations (e.g. locale switch). */
  skipAnimation?: boolean;
}

export default function HeroText({
  maxWidth,
  text,
  subheader,
  subtitle,
  className = "",
  buttonText,
  buttonHref,
  buttonTwoText,
  buttonTwoHref,
  center,
  onButtonClick,
  onButtonTwoClick,
  skipAnimation = false,
}: HeroTextProps) {
  const [isLoaded, setIsLoaded] = useState(skipAnimation);

  useEffect(() => {
    if (skipAnimation) return;
    const id = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(id);
  }, [skipAnimation]);

  // Split text into words for staggered animation
  const words = text.split(" ");

  const ButtonComponent = buttonHref ? motion.create(Link) : motion.button;
  const ButtonComponentTwo = buttonTwoHref ? motion.create(Link) : motion.button;

  return (
    <div
      style={{ maxWidth: maxWidth ? maxWidth : "100%" }}
      className={`${styles.mainTextContainer} ${className}`}
    >
      <motion.h1
        style={{
          justifyContent: center ? "center" : "flex-start",
        }}
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
        initial={skipAnimation ? "visible" : "hidden"}
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
      {subheader && (
        <motion.h2
          className={styles.subheader}
          initial={
            skipAnimation
              ? { opacity: 1, filter: "blur(0px)", y: 0 }
              : { opacity: 0, filter: "blur(10px)", y: 10 }
          }
          animate={
            isLoaded
              ? { opacity: 1, filter: "blur(0px)", y: 0 }
              : { opacity: 0, filter: "blur(10px)", y: 10 }
          }
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {subheader}
        </motion.h2>
      )}
      {subtitle && (
        <motion.p
          className={styles.mainText}
          initial={
            skipAnimation
              ? { opacity: 1, filter: "blur(0px)", y: 0 }
              : { opacity: 0, filter: "blur(10px)", y: 10 }
          }
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
        <motion.div
          className={styles.buttonGroup}
          initial={skipAnimation ? "visible" : "hidden"}
          animate={isLoaded ? "visible" : "hidden"}
          variants={{
            hidden: {
              opacity: 0,
              filter: "blur(10px)",
            },
            visible: {
              opacity: 1,
              filter: "blur(0px)",

              transition: {
                delay: 0.6,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
          onClick={onButtonClick}
          {...(buttonHref && { href: buttonHref })}
        >
          {buttonTwoText && (
            <Button onClick={onButtonTwoClick} href={buttonTwoHref} variant="secondary" size="lg">
              {buttonTwoText}
              <ArrowDownIcon className={styles.arrowIcon} />
            </Button>
          )}
          <Button
            onClick={onButtonClick}
            href={buttonHref}
            variant="accent-brand"
            size="lg"
            iconPosition="right"
          >
            {buttonText}
            <svg
              className="rtlFlipH"
              width="20"
              height="20"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </Button>
        </motion.div>
      )}
    </div>
  );
}
