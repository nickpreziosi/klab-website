"use client";

import { Download, FileArchive, FileText, Film } from "lucide-react";
import { useTranslations } from "next-intl";
import Button from "@/ui/shared/components/button/button";
import type { PressAsset, PressAssetType } from "@/ui/press/data/press-collections";
import styles from "./press-file-card.module.css";

const FILE_ICONS = {
  document: FileText,
  archive: FileArchive,
  video: Film,
} as const;

type PressFileCardProps = {
  asset: PressAsset;
};

function typeLabelKey(type: PressAssetType): "fileTypeDocument" | "fileTypeVideo" | "fileTypeArchive" {
  if (type === "video") return "fileTypeVideo";
  if (type === "archive") return "fileTypeArchive";
  return "fileTypeDocument";
}

export function PressFileCard({ asset }: PressFileCardProps) {
  const t = useTranslations("press");
  const Icon = asset.type === "image" ? FileText : FILE_ICONS[asset.type];
  const label = asset.titleKey ? t(asset.titleKey) : asset.filename;

  return (
    <article className={styles.card}>
      <span className={styles.iconWell} aria-hidden>
        <Icon className={styles.icon} strokeWidth={1.75} />
      </span>
      <div className={styles.meta}>
        <h3 className={styles.title}>{label}</h3>
        <p className={styles.type}>{t(typeLabelKey(asset.type))}</p>
      </div>
      <Button asChild variant="accent-brand-outline" size="sm" icon={<Download />} iconPosition="left">
        <a href={asset.href} download={asset.filename}>
          {t("downloadFile")}
        </a>
      </Button>
    </article>
  );
}
