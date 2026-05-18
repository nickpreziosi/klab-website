"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import VideoPlayer from "@/ui/shared/components/video-player/video-player";
import CompanySectionTitle from "@/ui/company/components/company-section-title/company-section-title";
import styles from "./company-brand-section.module.css";

const VIDEO_ID = "4Ija5IffsgA";
const VIDEO = `https://www.youtube.com/embed/${VIDEO_ID}`;
const POSTER = "/images/klab-promo.webp";

type CompanyBrandSectionProps = {
  skipAnimation?: boolean;
};

export default function CompanyBrandSection({ skipAnimation = false }: CompanyBrandSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const effectiveInView = skipAnimation || inView;
  const t = useTranslations("companyBrand");

  return (
    <section
      ref={ref}
      id="our-brand"
      className={styles.section}
      aria-label={t("promoVideoSectionLabel")}
    >
      <motion.div
        className={styles.container}
        initial={skipAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        whileInView={skipAnimation ? undefined : { opacity: 1, y: 0 }}
        animate={skipAnimation ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div className={styles.header}>
          <CompanySectionTitle
            title={t("title")}
            inView={effectiveInView}
            skipAnimation={skipAnimation}
          />
        </motion.div>
        <motion.div
          className={styles.videoWrap}
          initial={skipAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={skipAnimation ? undefined : { opacity: 1, y: 0 }}
          animate={skipAnimation ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <VideoPlayer
            videoUrl={VIDEO}
            posterUrl={POSTER}
            skipAnimation={skipAnimation}
            variant="phone"
            posterAlt={t("promoVideoPosterAlt")}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
