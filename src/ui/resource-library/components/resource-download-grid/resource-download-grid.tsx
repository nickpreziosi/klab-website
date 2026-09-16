"use client";

import {
  ResourceDownloadCard,
  type ResourceDownloadItem,
} from "@/ui/resource-library/components/resource-download-card/resource-download-card";
import styles from "./resource-download-grid.module.css";

type ResourceDownloadGridProps = {
  items: ResourceDownloadItem[];
};

export function ResourceDownloadGrid({ items }: ResourceDownloadGridProps) {
  return (
    <ul className={styles.grid}>
      {items.map((item, index) => (
        <li key={item.id} className={styles.item}>
          <ResourceDownloadCard item={item} priority={index === 0} />
        </li>
      ))}
    </ul>
  );
}
