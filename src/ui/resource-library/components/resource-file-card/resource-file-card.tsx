"use client";

import { Download, FileArchive, FileText, Film } from "lucide-react";
import { useTranslations } from "next-intl";
import Button from "@/ui/shared/components/button/button";
import type { ResourceAsset, ResourceAssetType } from "@/ui/resource-library/types";
import styles from "./resource-file-card.module.css";

const FILE_ICONS = {
  document: FileText,
  archive: FileArchive,
  video: Film,
} as const;

type ResourceFileCardProps = {
  asset: ResourceAsset;
};

function typeLabelKey(
  type: ResourceAssetType
): "fileTypeDocument" | "fileTypeVideo" | "fileTypeArchive" {
  if (type === "video") return "fileTypeVideo";
  if (type === "archive") return "fileTypeArchive";
  return "fileTypeDocument";
}

export function ResourceFileCard({ asset }: ResourceFileCardProps) {
  const t = useTranslations("resourceLibrary");
  const Icon = asset.type === "image" ? FileText : FILE_ICONS[asset.type];
  const label = asset.title ?? asset.filename;

  return (
    <article className={styles.card}>
      <span className={styles.iconWell} aria-hidden>
        <Icon className={styles.icon} strokeWidth={1.75} />
      </span>
      <div className={styles.meta}>
        <h3 className={styles.title}>{label}</h3>
        <p className={styles.type}>{t(typeLabelKey(asset.type))}</p>
      </div>
      {asset.href ? (
        <Button asChild variant="accent-brand-outline" size="sm" icon={<Download />} iconPosition="left">
          <a href={asset.href} download={asset.filename}>
            {t("downloadFile")}
          </a>
        </Button>
      ) : null}
    </article>
  );
}
