"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Button from "@/ui/shared/components/button/button";
import CompanySectionTitle from "@/ui/company/components/company-section-title/company-section-title";
import styles from "./klab-foundation-section.module.css";

const QUOTE_KEYS = ["quote1", "quote2", "quote3", "quote4"] as const;

export default function KlabFoundationSection({ skipAnimation = false }: { skipAnimation?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const effectiveInView = skipAnimation || inView;
  const t = useTranslations("klabFoundation");

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <CompanySectionTitle title={t("title")} inView={effectiveInView} skipAnimation={skipAnimation} />
        </div>

        <motion.div
          className={styles.content}
          initial={skipAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={skipAnimation ? undefined : { opacity: 1, y: 0 }}
          animate={skipAnimation ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h3 className={styles.quote}>
            {QUOTE_KEYS.map((key, i) => (
              <span key={key} className={styles.quoteLine}>
                <span className={styles.quoteLineBar} aria-hidden />
                <span className={styles.quoteLineText}>{t(key)}</span>
              </span>
            ))}
          </h3>
          <Button asChild variant="accent-brand" size="lg" iconPosition="right" icon={
              <svg
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
                />
              </svg>
            }
          >
            <Link href="/foundation">{t("learnMore")}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
