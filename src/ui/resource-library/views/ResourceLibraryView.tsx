"use client";

import SectionHeader from "@/ui/shared/components/section-header/section-header";
import { useSkipAnimationOnLocaleSwitch } from "@/ui/shared/providers/skip-animation-on-locale-switch/skip-animation-on-locale-switch";
import { ResourceCollectionSection } from "@/ui/resource-library/components/resource-collection-section/resource-collection-section";
import type { ResourceCollection } from "@/ui/resource-library/types";
import styles from "./ResourceLibraryView.module.css";

type ResourceLibraryViewProps = {
  heading: string;
  subtitle?: string;
  collections: ResourceCollection[];
  emptyMessage?: string;
};

export function ResourceLibraryView({
  heading,
  subtitle,
  collections,
  emptyMessage,
}: ResourceLibraryViewProps) {
  const skipAnimation = useSkipAnimationOnLocaleSwitch();

  return (
    <main className={styles.page}>
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <SectionHeader
            heading={heading}
            subtitle={subtitle}
            align="center"
            animateOnce
            skipAnimation={skipAnimation}
          />
          {collections.length > 0 ? (
            <div className={styles.collections}>
              {collections.map((collection) => (
                <ResourceCollectionSection key={collection.id} collection={collection} />
              ))}
            </div>
          ) : emptyMessage ? (
            <p className={styles.empty}>{emptyMessage}</p>
          ) : null}
        </div>
      </section>
    </main>
  );
}
