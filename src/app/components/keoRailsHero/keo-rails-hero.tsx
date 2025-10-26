"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import styles from "./keo-rails-hero.module.css";
import Link from "next/link";
import Image from "next/image";

interface KeoRailsHeroProps {
  heading: string;
  subheading: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  children?: ReactNode; // For the transformed content (HTML, iframe, etc.)
}

export default function KeoRailsHero({
  heading,
  subheading,
  description,
  buttonText,
  buttonHref,
  children,
}: KeoRailsHeroProps) {
  return (
    <section className={styles.heroSection}>
      <div className={styles.contentWrapper}>
        {/* Left side - Text content */}
        <motion.div
          className={styles.textContent}
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <h1 className={styles.heading}>{heading}</h1>
          <h2 className={styles.subheading}>{subheading}</h2>
          <p className={styles.description}>{description}</p>
          <Link href={buttonHref}>
            <button className={styles.ctaButton}>{buttonText}</button>
          </Link>
        </motion.div>

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
              <div className={styles.imageContainer}>
                <Image
                  src="/keo-invoice.jpg"
                  alt="KEO Rails Invoice Management Interface"
                  fill
                  className={styles.interfaceImage}
                  priority
                />
                <div className={styles.blackOverlay} />
                <div className={styles.gradientOverlay} />
              </div>

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
