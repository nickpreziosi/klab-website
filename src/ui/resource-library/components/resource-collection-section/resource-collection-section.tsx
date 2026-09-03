"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import Button from "@/ui/shared/components/button/button";
import {
  splitResourceAssets,
  type ResourceCollection,
} from "@/ui/resource-library/types";
import { ResourceAssetGrid } from "@/ui/resource-library/components/resource-asset-grid/resource-asset-grid";
import { ResourceFileCard } from "@/ui/resource-library/components/resource-file-card/resource-file-card";
import { ResourceVideoCard } from "@/ui/resource-library/components/resource-video-card/resource-video-card";
import { ResourceLightbox } from "@/ui/resource-library/components/resource-lightbox/resource-lightbox";
import styles from "./resource-collection-section.module.css";

type ResourceCollectionSectionProps = {
  collection: ResourceCollection;
};

export function ResourceCollectionSection({ collection }: ResourceCollectionSectionProps) {
  const t = useTranslations("resourceLibrary");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { images, videos, files } = splitResourceAssets(collection.assets);

  return (
    <section className={styles.section} aria-labelledby={`${collection.id}-heading`}>
      <header className={styles.header}>
        <div className={styles.headingBlock}>
          <h2 id={`${collection.id}-heading`} className={styles.name}>
            {collection.title}
          </h2>
          {collection.description ? <p className={styles.role}>{collection.description}</p> : null}
          {collection.assets.length > 0 ? (
            <p className={styles.count}>{t("assetCount", { count: collection.assets.length })}</p>
          ) : null}
        </div>
        {collection.zipHref ? (
          <Button
            asChild
            variant="accent-brand-outline"
            size="md"
            icon={<Download />}
            iconPosition="left"
          >
            <a href={collection.zipHref} download={collection.zipFilename}>
              {t("downloadAll")}
            </a>
          </Button>
        ) : null}
      </header>

      {images.length > 0 ? (
        <ResourceAssetGrid
          images={images}
          personName={collection.personName}
          priorityCount={collection.priorityCount}
          onOpen={setLightboxIndex}
        />
      ) : null}

      {videos.length > 0 ? (
        <ul className={styles.fileList}>
          {videos.map((asset) => (
            <li key={asset.id}>
              <ResourceVideoCard asset={asset} />
            </li>
          ))}
        </ul>
      ) : null}

      {files.length > 0 ? (
        <ul className={styles.fileList}>
          {files.map((asset) => (
            <li key={asset.id}>
              <ResourceFileCard asset={asset} />
            </li>
          ))}
        </ul>
      ) : null}

      <ResourceLightbox
        images={images}
        index={lightboxIndex}
        personName={collection.personName}
        onIndexChange={setLightboxIndex}
      />
    </section>
  );
}
