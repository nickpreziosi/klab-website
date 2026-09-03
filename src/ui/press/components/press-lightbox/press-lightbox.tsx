"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import Button from "@/ui/shared/components/button/button";
import type { PressAsset } from "@/ui/press/data/press-collections";
import styles from "./press-lightbox.module.css";

type PressLightboxProps = {
  images: PressAsset[];
  index: number | null;
  personName?: string;
  onIndexChange: (index: number | null) => void;
};

export function PressLightbox({ images, index, personName, onIndexChange }: PressLightboxProps) {
  const t = useTranslations("press");
  const open = index !== null && images[index] != null;
  const current = open && index !== null ? images[index] : null;
  const canGoPrev = index !== null && index > 0;
  const canGoNext = index !== null && index < images.length - 1;

  const goPrev = useCallback(() => {
    if (index === null || index <= 0) return;
    onIndexChange(index - 1);
  }, [index, onIndexChange]);

  const goNext = useCallback(() => {
    if (index === null || index >= images.length - 1) return;
    onIndexChange(index + 1);
  }, [index, images.length, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, goPrev, goNext]);

  const alt =
    current && personName && index !== null
      ? t("photoAlt", { name: personName, number: index + 1 })
      : (current?.filename ?? "");

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onIndexChange(null);
      }}
      modal
    >
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content
          className={styles.content}
          onPointerDownOutside={() => onIndexChange(null)}
          onEscapeKeyDown={() => onIndexChange(null)}
        >
          <VisuallyHidden>
            <Dialog.Title>{alt}</Dialog.Title>
          </VisuallyHidden>

          {images.length > 1 ? (
            <button
              type="button"
              className={`${styles.navButton} ${styles.navPrev}`}
              onClick={goPrev}
              disabled={!canGoPrev}
              aria-label={t("previousImage")}
            >
              <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          ) : null}

          {current ? (
            <div className={styles.figure}>
              <div className={styles.imageWrap}>
                <Image
                  src={current.href}
                  alt={alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className={styles.image}
                />
              </div>
              <div className={styles.caption}>
                <span className={styles.filename}>{current.filename}</span>
                <Button
                  asChild
                  variant="accent-brand"
                  size="sm"
                  icon={<Download />}
                  iconPosition="left"
                >
                  <a href={current.href} download={current.filename}>
                    {t("downloadPhoto")}
                  </a>
                </Button>
              </div>
            </div>
          ) : null}

          {images.length > 1 ? (
            <button
              type="button"
              className={`${styles.navButton} ${styles.navNext}`}
              onClick={goNext}
              disabled={!canGoNext}
              aria-label={t("nextImage")}
            >
              <svg
                className="rtlFlipH"
                width="24"
                height="24"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          ) : null}

          <Dialog.Close asChild>
            <button type="button" className={styles.close} aria-label={t("close")}>
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
  );
}
