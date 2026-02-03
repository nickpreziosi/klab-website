"use client";

import { motion } from "framer-motion";
import { KlabLogo } from "@/ui/shared/components/klab-logo/klab-logo";
import styles from "./company-section-title.module.css";

interface CompanySectionTitleProps {
  title: string;
  inView: boolean;
  className?: string;
}

export default function CompanySectionTitle({
  title,
  inView,
  className,
}: CompanySectionTitleProps) {
  return (
    <motion.header
      className={`${styles.titleSection} ${className ?? ""}`.trim()}
      initial={{ opacity: 0, y: -16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <KlabLogo color="orange" format="default" height={48} />
      <span className={styles.divider} aria-hidden />
      <h2 className={styles.title}>{title}</h2>
    </motion.header>
  );
}
