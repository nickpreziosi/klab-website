"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ResourceAsset } from "@/ui/resource-library/types";
import styles from "./resource-asset-grid.module.css";

type ResourceAssetGridProps = {
  images: ResourceAsset[];
  personName?: string;
  priorityCount?: number;
  onOpen: (index: number) => void;
};

export function ResourceAssetGrid({
  images,
  personName,
  priorityCount = 0,
  onOpen,
}: ResourceAssetGridProps) {
  const t = useTranslations("resourceLibrary");

  return (
    <ul className={styles.grid}>
      {images.map((image, index) => {
        const alt = personName
          ? t("photoAlt", { name: personName, number: index + 1 })
          : image.filename;
        const preview = image.previewSrc ?? image.href;

        return (
          <li key={image.id} className={styles.item}>
            <button
              type="button"
              className={styles.tile}
              onClick={() => onOpen(index)}
              aria-label={t("viewPhoto")}
            >
              <Image
                src={preview}
                alt={alt}
                fill
                priority={index < priorityCount}
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className={styles.image}
              />
            </button>
            {image.href ? (
              <a
                href={image.href}
                download={image.filename}
                className={styles.download}
                aria-label={t("downloadPhoto")}
                onClick={(event) => event.stopPropagation()}
              >
                <Download aria-hidden strokeWidth={2} />
              </a>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
