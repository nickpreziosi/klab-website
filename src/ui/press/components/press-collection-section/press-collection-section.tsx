"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import Button from "@/ui/shared/components/button/button";
import {
  splitPressAssets,
  type PressCollection,
} from "@/ui/press/data/press-collections";
import { PressAssetGrid } from "@/ui/press/components/press-asset-grid/press-asset-grid";
import { PressFileCard } from "@/ui/press/components/press-file-card/press-file-card";
import { PressLightbox } from "@/ui/press/components/press-lightbox/press-lightbox";
import styles from "./press-collection-section.module.css";

type PressCollectionSectionProps = {
  collection: PressCollection;
};

export function PressCollectionSection({ collection }: PressCollectionSectionProps) {
  const t = useTranslations("press");
  const tStaff = useTranslations("companyStaff");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { images, files } = splitPressAssets(collection.assets);
  const heading = collection.person ? collection.person.name : t(collection.titleKey);
  const subtitle = collection.person
    ? tStaff(`employees.${collection.person.titleKey}.position`)
    : collection.descriptionKey
      ? t(collection.descriptionKey)
      : null;

  return (
    <section className={styles.section} aria-labelledby={`${collection.id}-heading`}>
      <header className={styles.header}>
        <div className={styles.headingBlock}>
          <h2 id={`${collection.id}-heading`} className={styles.name}>
            {heading}
          </h2>
          {subtitle ? <p className={styles.role}>{subtitle}</p> : null}
          <p className={styles.count}>{t("assetCount", { count: collection.assets.length })}</p>
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
        <PressAssetGrid
          images={images}
          personName={collection.person?.name}
          priorityCount={collection.id === "jayHeller" ? 4 : 0}
          onOpen={setLightboxIndex}
        />
      ) : null}

      {files.length > 0 ? (
        <ul className={styles.fileList}>
          {files.map((asset) => (
            <li key={asset.id}>
              <PressFileCard asset={asset} />
            </li>
          ))}
        </ul>
      ) : null}

      <PressLightbox
        images={images}
        index={lightboxIndex}
        personName={collection.person?.name}
        onIndexChange={setLightboxIndex}
      />
    </section>
  );
}
