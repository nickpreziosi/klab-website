"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import styles from "./krails-hero.module.css";
import HeroText from "@/ui/shared/components/hero-text/hero-text";

interface KRailsHeroProps {
  heading: string;
  subheading: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  buttonTwoText?: string;
  buttonTwoHref?: string;
  children?: ReactNode; // For the transformed content (HTML, iframe, etc.)
  skipAnimation?: boolean;
}

export default function KRailsHero({
  heading,
  subheading,
  description,
  buttonText,
  buttonHref,
  children,
  buttonTwoText,
  buttonTwoHref,
  skipAnimation = false,
}: KRailsHeroProps) {
  return (
    <section className={styles.heroSection}>
      <div className={styles.contentWrapper}>
        {/* Left side - Text content */}
        <div className={styles.heroTextContainer}>
          <HeroText
            maxWidth="900px"
            text={heading}
            subtitle={description}
            subheader={subheading}
            buttonText={buttonText}
            buttonHref={buttonHref}
            buttonTwoText={buttonTwoText}
            buttonTwoHref={buttonTwoHref}
            skipAnimation={skipAnimation}
          ></HeroText>
        </div>

        {/* Right side - 3D transformed content container */}
        <motion.div style={{ display: "none" }} className={styles.transformedContainer}>
          <div className={styles.perspectiveWrapper}>
            <div className={styles.transformedContent}>
              <motion.div
                className={styles.imageContainer}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className={styles.gradientOverlay} />

                <div className={styles.blackOverlay} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
