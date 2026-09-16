"use client";

import SectionHeader from "@/ui/shared/components/section-header/section-header";
import { useSkipAnimationOnLocaleSwitch } from "@/ui/shared/providers/skip-animation-on-locale-switch/skip-animation-on-locale-switch";
import { ResourceDownloadGrid } from "@/ui/resource-library/components/resource-download-grid/resource-download-grid";
import type { ResourceDownloadItem } from "@/ui/resource-library/components/resource-download-card/resource-download-card";
import type { ResourceCollection } from "@/ui/resource-library/types";
import styles from "./ResourceDownloadLibraryView.module.css";

type ResourceDownloadLibraryViewProps = {
  heading: string;
  subtitle?: string;
  collections?: ResourceCollection[];
  items?: ResourceDownloadItem[];
  emptyMessage?: string;
};

function collectionsToItems(collections: ResourceCollection[]): ResourceDownloadItem[] {
  return collections.map((collection) => ({
    id: collection.id,
    title: collection.title,
    description: collection.description,
    asset: collection.assets[0],
  }));
}

export function ResourceDownloadLibraryView({
  heading,
  subtitle,
  collections = [],
  items,
  emptyMessage,
}: ResourceDownloadLibraryViewProps) {
  const skipAnimation = useSkipAnimationOnLocaleSwitch();
  const resolvedItems = items ?? collectionsToItems(collections);

  return (
    <main className={styles.page}>
      <section className={styles.section}>
        <div className={styles.container}>
          <SectionHeader
            heading={heading}
            subtitle={subtitle}
            align="center"
            animateOnce
            skipAnimation={skipAnimation}
          />
          {resolvedItems.length > 0 ? (
            <ResourceDownloadGrid items={resolvedItems} />
          ) : emptyMessage ? (
            <p className={styles.empty}>{emptyMessage}</p>
          ) : null}
        </div>
      </section>
    </main>
  );
}
