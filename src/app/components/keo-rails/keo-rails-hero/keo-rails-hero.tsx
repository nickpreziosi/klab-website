"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import styles from "./keo-rails-hero.module.css";
import HeroText from "@/app/components/ui/hero-text/hero-text";
import KeoDashboard from "@/app/components/keo-rails/keo-rails-dashboard/keo-dashboard";

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
          ></HeroText>
        </div>

        {/* Right side - 3D transformed content container */}
        <motion.div className={styles.transformedContainer}>
          <div className={styles.perspectiveWrapper}>
            <div className={styles.transformedContent}>
              <motion.div
                className={styles.imageContainer}
                style={{ transformStyle: "preserve-3d" }}
              >
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
