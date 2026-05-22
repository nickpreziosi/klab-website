"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import styles from "./kena-cta-section.module.css";
import Button from "@/ui/shared/components/button/button";
import type { KenaTranslations } from "@/ui/kena/views/KenaView/KenaView";

export default function KenaCtaSection({
  translations,
  skipAnimation = false,
}: {
  translations: KenaTranslations;
  skipAnimation?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const effectiveInView = skipAnimation || isInView;

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.container}>
        <motion.div
          initial={
            skipAnimation ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }
          }
          animate={effectiveInView ? { opacity: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.content}
        >
          <h2 className={styles.heading}>{translations.ctaHeading}</h2>

          <motion.div
            className={styles.ctaButton}
            initial={
              skipAnimation ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }
            }
            animate={effectiveInView ? { opacity: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              href="/contact/sales"
              iconPosition="right"
              variant="accent-brand"
              icon={
                <svg
                  className="rtlFlipH"
                  width="15"
                  height="15"
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
              }
            >
              {translations.ctaButton}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
