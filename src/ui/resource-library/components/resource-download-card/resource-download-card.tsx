"use client";

import { useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Download, FileText, Film, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import Button from "@/ui/shared/components/button/button";
import { prepareEmbedSrc } from "@/ui/shared/utils/youtube-embed";
import { BLUR_PLACEHOLDER } from "@/ui/shared/constants/blur-placeholder";
import type { ResourceAsset } from "@/ui/resource-library/types";
import lightboxStyles from "@/ui/resource-library/components/resource-lightbox/resource-lightbox.module.css";
import styles from "./resource-download-card.module.css";

const FALLBACK_POSTER = "/images/krails.webp";

export type ResourceDownloadItem = {
  id: string;
  title: string;
  description?: string;
  asset?: ResourceAsset;
};

type ResourceDownloadCardProps = {
  item: ResourceDownloadItem;
  priority?: boolean;
};

export function ResourceDownloadCard({ item, priority = false }: ResourceDownloadCardProps) {
  const t = useTranslations("resourceLibrary");
  const [playing, setPlaying] = useState(false);
  const asset = item.asset;
  const poster = asset?.previewSrc || FALLBACK_POSTER;
  const canPlay = Boolean(asset?.youtubeUrl);
  const canDownload = Boolean(asset?.href);
  const showPoster = Boolean(asset?.previewSrc || asset?.type === "video" || canPlay);
  const FallbackIcon = asset?.type === "video" ? Film : FileText;

  return (
    <>
      <article className={styles.card}>
        <div className={styles.preview}>
          {showPoster ? (
            <Image
              src={poster}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={styles.poster}
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              priority={priority}
            />
          ) : (
            <span className={styles.fallback} aria-hidden>
              <FallbackIcon className={styles.fallbackIcon} strokeWidth={1.5} />
            </span>
          )}
          {canPlay ? (
            <button
              type="button"
              className={styles.playOverlay}
              onClick={() => setPlaying(true)}
              aria-label={t("playVideo")}
            >
              <Play className={styles.playIcon} aria-hidden />
            </button>
          ) : null}
        </div>

        <div className={styles.body}>
          <div className={styles.copy}>
            <h2 className={styles.title}>{item.title}</h2>
            {item.description ? (
              <p className={styles.description}>{item.description}</p>
            ) : null}
          </div>

          <div className={styles.actions}>
            {canPlay ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                icon={<Play aria-hidden />}
                iconPosition="left"
                iconSize="size-3"
                onClick={() => setPlaying(true)}
              >
                {t("playVideo")}
              </Button>
            ) : null}
            {canDownload && asset ? (
              <Button
                asChild
                variant="accent-brand"
                size="sm"
                icon={<Download aria-hidden />}
                iconPosition="left"
                iconSize="size-3"
              >
                <a href={asset.href} download={asset.filename}>
                  {t("downloadFile")}
                </a>
              </Button>
            ) : null}
          </div>
        </div>
      </article>

      {canPlay && asset?.youtubeUrl ? (
        <Dialog.Root open={playing} onOpenChange={setPlaying} modal>
          <Dialog.Portal>
            <Dialog.Overlay className={lightboxStyles.overlay} />
            <Dialog.Content
              className={lightboxStyles.content}
              onPointerDownOutside={() => setPlaying(false)}
              onEscapeKeyDown={() => setPlaying(false)}
            >
              <VisuallyHidden>
                <Dialog.Title>{item.title}</Dialog.Title>
              </VisuallyHidden>
              <div className={lightboxStyles.figure}>
                <div className={lightboxStyles.imageWrap}>
                  <iframe
                    className={styles.embed}
                    src={playing ? prepareEmbedSrc(asset.youtubeUrl) : undefined}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
              <Dialog.Close asChild>
                <button type="button" className={lightboxStyles.close} aria-label={t("close")}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      ) : null}
    </>
  );
}
