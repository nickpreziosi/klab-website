"use client";

import { useTranslations } from "next-intl";
import SectionHeader from "@/ui/shared/components/section-header/section-header";
import { useSkipAnimationOnLocaleSwitch } from "@/ui/shared/providers/skip-animation-on-locale-switch/skip-animation-on-locale-switch";
import { PRESS_COLLECTIONS } from "@/ui/press/data/press-collections";
import { PressCollectionSection } from "@/ui/press/components/press-collection-section/press-collection-section";
import styles from "./PressView.module.css";

export function PressView() {
  const t = useTranslations("press");
  const skipAnimation = useSkipAnimationOnLocaleSwitch();

  return (
    <main className={styles.page}>
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <SectionHeader
            heading={t("heading")}
            subtitle={t("subtitle")}
            align="center"
            animateOnce
            skipAnimation={skipAnimation}
          />
          <div className={styles.collections}>
            {PRESS_COLLECTIONS.map((collection) => (
              <PressCollectionSection key={collection.id} collection={collection} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
