"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import styles from "./keo-rails-hero.module.css";
import HeroText from "../heroText/hero-text";
import KeoDashboard from "../keoDashboard/keo-dashboard";
import Image from "next/image";

interface KeoRailsHeroProps {
  heading: string;
  subheading: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  buttonTwoText?: string;
  buttonTwoHref?: string;
  children?: ReactNode; // For the transformed content (HTML, iframe, etc.)
}

export default function KeoRailsHero({
  heading,
  subheading,
  description,
  buttonText,
  buttonHref,
  children,
  buttonTwoText,
  buttonTwoHref,
}: KeoRailsHeroProps) {
  return (
    <section className={styles.heroSection}>
      <div className={styles.contentWrapper}>
        {/* Left side - Text content */}
        <HeroText
          maxWidth="900px"
          text={heading}
          subtitle={description}
          subheader={subheading}
          buttonText={buttonText}
          buttonHref={buttonHref}
          buttonTwoText={buttonTwoText}
          buttonTwoHref={buttonTwoHref}
        ></HeroText>

        {/* Right side - 3D transformed content container */}
        <motion.div
          className={styles.transformedContainer}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{
            duration: 1,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className={styles.perspectiveWrapper}>
            <div className={styles.transformedContent}>
              <motion.div
                className={styles.imageContainer}
                initial={{
                  opacity: 0,
                  scale: 0.95,
                  filter: "blur(10px)",
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  scale: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  },
                }}
              >
                <KeoDashboard />
                <div className={styles.gradientOverlay} />

                <div className={styles.blackOverlay} />
              </motion.div>

              <div style={{ display: "none" }}>
                {children || (
                  // Placeholder content if no children provided
                  <div className={styles.placeholder}>
                    <div className={styles.placeholderContent}>
                      {/* Placeholder UI elements */}
                      <div className={styles.placeholderHeader} />
                      <div className={styles.placeholderBody}>
                        <div className={styles.placeholderSidebar}>
                          {[...Array(8)].map((_, i) => (
                            <div key={i} className={styles.placeholderItem} />
                          ))}
                        </div>
                        <div className={styles.placeholderMain}>
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className={styles.placeholderCard} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
