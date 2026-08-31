"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useLocale } from "next-intl";
import { getTextDirection, type Locale } from "@/i18n/routing";
import type { HomeKrailsTranslations } from "@/ui/home/types";
import { withBrandLtr } from "@/ui/home/utils/with-brand-ltr";
import styles from "./home-faq.module.css";

const ENTRANCE_EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: ENTRANCE_EASE },
  },
};

type HomeFaqProps = {
  translations: HomeKrailsTranslations;
  skipAnimation?: boolean;
};

export function HomeFaq({ translations, skipAnimation = false }: HomeFaqProps) {
  const locale = useLocale() as Locale;
  const dir = getTextDirection(locale);

  return (
    <motion.section
      id="home-faq"
      className={styles.section}
      dir={dir}
      aria-labelledby="home-faq-heading"
      initial={skipAnimation ? false : "hidden"}
      whileInView={skipAnimation ? undefined : "visible"}
      animate={skipAnimation ? "visible" : undefined}
      viewport={skipAnimation ? undefined : { once: true, amount: 0.2 }}
      variants={fadeUp}
    >
      <h2 id="home-faq-heading" className={styles.srOnly}>
        {translations.faqTitle}
      </h2>
      <Accordion.Root
        type="single"
        collapsible
        className={styles.accordion}
      >
        {translations.faqItems.map((item) => (
          <Accordion.Item key={item.id} value={item.id} className={styles.item}>
            <Accordion.Header className={styles.header}>
              <Accordion.Trigger className={styles.trigger}>
                <span className={styles.question}>
                  {withBrandLtr(item.question, styles.brandLtr)}
                </span>
                <span className={styles.icon} aria-hidden>
                  <Plus className={styles.plus} size={22} strokeWidth={2} />
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className={styles.content}>
              <p className={styles.answer}>{withBrandLtr(item.answer, styles.brandLtr)}</p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </motion.section>
  );
}
