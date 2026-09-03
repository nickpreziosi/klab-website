"use client";

import { useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Download, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import Button from "@/ui/shared/components/button/button";
import { prepareEmbedSrc } from "@/ui/shared/utils/youtube-embed";
import { BLUR_PLACEHOLDER } from "@/ui/shared/constants/blur-placeholder";
import type { ResourceAsset } from "@/ui/resource-library/types";
import lightboxStyles from "@/ui/resource-library/components/resource-lightbox/resource-lightbox.module.css";
import styles from "./resource-video-card.module.css";

const FALLBACK_POSTER = "/images/krails.webp";

type ResourceVideoCardProps = {
  asset: ResourceAsset;
};

export function ResourceVideoCard({ asset }: ResourceVideoCardProps) {
  const t = useTranslations("resourceLibrary");
  const [playing, setPlaying] = useState(false);
  const poster = asset.previewSrc || FALLBACK_POSTER;
  const label = asset.title ?? asset.filename;
  const canPlay = Boolean(asset.youtubeUrl);

  return (
    <>
      <article className={styles.card}>
        <div className={styles.posterWrap}>
          <Image
            src={poster}
            alt={label}
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            className={styles.poster}
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />
          {canPlay ? (
            <button
              type="button"
              className={styles.playOverlay}
              onClick={() => setPlaying(true)}
              aria-label={t("playVideo")}
            >
              <svg
                className={styles.playIcon}
                width="72"
                height="72"
                viewBox="0 0 101 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M37.875 73.225L73.225 50.5L37.875 27.775V73.225ZM50.5 101C43.5142 101 36.9492 99.6744 30.805 97.0231C24.6608 94.3719 19.3162 90.7738 14.7712 86.2288C10.2262 81.6837 6.62812 76.3392 3.97688 70.195C1.32562 64.0508 0 57.4858 0 50.5C0 43.5142 1.32562 36.9492 3.97688 30.805C6.62812 24.6608 10.2262 19.3162 14.7712 14.7712C19.3162 10.2262 24.6608 6.62812 30.805 3.97688C36.9492 1.32562 43.5142 0 50.5 0C57.4858 0 64.0508 1.32562 70.195 3.97688C76.3392 6.62812 81.6837 10.2262 86.2288 14.7712C90.7738 19.3162 94.3719 24.6608 97.0231 30.805C99.6744 36.9492 101 43.5142 101 50.5C101 57.4858 99.6744 64.0508 97.0231 70.195C94.3719 76.3392 90.7738 81.6837 86.2288 86.2288C81.6837 90.7738 76.3392 94.3719 70.195 97.0231C64.0508 99.6744 57.4858 101 50.5 101Z"
                  fill="white"
                />
              </svg>
            </button>
          ) : null}
        </div>
        <div className={styles.body}>
          <div className={styles.meta}>
            <h3 className={styles.title}>{label}</h3>
            <p className={styles.type}>{t("fileTypeVideo")}</p>
          </div>
          <div className={styles.actions}>
            {canPlay ? (
              <Button
                variant="accent-brand"
                size="sm"
                icon={<Play />}
                iconPosition="left"
                onClick={() => setPlaying(true)}
              >
                {t("playVideo")}
              </Button>
            ) : null}
            {asset.href ? (
              <Button
                asChild
                variant="accent-brand-outline"
                size="sm"
                icon={<Download />}
                iconPosition="left"
              >
                <a href={asset.href} download={asset.filename}>
                  {t("downloadFile")}
                </a>
              </Button>
            ) : null}
          </div>
        </div>
      </article>

      {canPlay && asset.youtubeUrl ? (
        <Dialog.Root open={playing} onOpenChange={setPlaying} modal>
          <Dialog.Portal>
            <Dialog.Overlay className={lightboxStyles.overlay} />
            <Dialog.Content
              className={lightboxStyles.content}
              onPointerDownOutside={() => setPlaying(false)}
              onEscapeKeyDown={() => setPlaying(false)}
            >
              <VisuallyHidden>
                <Dialog.Title>{label}</Dialog.Title>
              </VisuallyHidden>
              <div className={lightboxStyles.figure}>
                <div className={lightboxStyles.imageWrap}>
                  <iframe
                    className={styles.embed}
                    src={playing ? prepareEmbedSrc(asset.youtubeUrl) : undefined}
                    title={label}
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
