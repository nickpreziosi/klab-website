"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./ArticleView.module.css";
import Button from "@/ui/shared/components/button/button";
import { BLUR_PLACEHOLDER } from "@/ui/shared/constants/blur-placeholder";
import { formatReadTimeWithUnit } from "@/ui/news/utils/read-time";
import { translateNewsCategory } from "@/ui/news/utils/news-category";

interface GalleryImage {
  url: string;
  thumbnailUrl: string;
  alt?: string;
  caption?: string;
}

interface ArticleData {
  title: string;
  author?: string | null;
  authorRole?: string | null;
  embedLink?: string | null;
  image?: { alt?: string | null; caption?: string | null } | null;
  category?: string | null;
  readTime?: string | null;
}

interface ArticleViewProps {
  article: ArticleData;
  imageUrl?: string;
  formattedDate: string;
  galleryImageUrls: GalleryImage[];
  bodyHTML?: string | null;
  contentDirection?: "ltr" | "rtl";
  newsListingHref?: string;
  galleryPasswordEnabled?: boolean;
  slug?: string;
}

function isYouTubeOrVimeo(embedLink?: string): boolean {
  if (!embedLink) return false;
  return (
    embedLink.includes("youtube.com") ||
    embedLink.includes("youtu.be") ||
    embedLink.includes("vimeo.com")
  );
}

export function ArticleView({
  article,
  imageUrl,
  formattedDate,
  galleryImageUrls,
  bodyHTML,
  contentDirection = "ltr",
  newsListingHref = "/news",
  galleryPasswordEnabled = false,
  slug,
}: ArticleViewProps) {
  const t = useTranslations("newsPage");
  const tCategory = useTranslations("newsCategories");
  const categoryLabel = translateNewsCategory(tCategory, article.category);
  const readTimeDisplay = formatReadTimeWithUnit(article.readTime, t("readTimeMinutes"));
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [galleryUnlocked, setGalleryUnlocked] = useState(!galleryPasswordEnabled);
  const [galleryDialogOpen, setGalleryDialogOpen] = useState(false);
  const [galleryPassword, setGalleryPassword] = useState("");
  const [galleryShowPassword, setGalleryShowPassword] = useState(false);
  const [galleryError, setGalleryError] = useState<string | null>(null);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const galleryDialogRef = useRef<HTMLDialogElement>(null);

  const selectedImage = selectedImageIndex !== null ? galleryImageUrls[selectedImageIndex] : null;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: selectedImageIndex ?? 0,
    loop: false,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (emblaApi && selectedImageIndex !== null) {
      emblaApi.scrollTo(selectedImageIndex);
    }
  }, [emblaApi, selectedImageIndex]);

  useEffect(() => {
    if (selectedImageIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && canScrollPrev) {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight" && canScrollNext) {
        event.preventDefault();
        scrollNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, canScrollPrev, canScrollNext, scrollPrev, scrollNext]);

  const handleImageClick = (index: number) => setSelectedImageIndex(index);
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) setSelectedImageIndex(null);
  };

  useEffect(() => {
    if (!galleryPasswordEnabled || !slug) return;
    try {
      if (localStorage.getItem(`article-gallery:${slug}`) === "true") {
        setGalleryUnlocked(true);
      }
    } catch {
      // ignore
    }
  }, [galleryPasswordEnabled, slug]);

  useEffect(() => {
    const ref = galleryDialogRef.current;
    if (!ref) return;
    if (galleryDialogOpen && !ref.open) ref.showModal();
    if (!galleryDialogOpen && ref.open) ref.close();
  }, [galleryDialogOpen]);

  const closeGalleryDialog = useCallback(() => {
    setGalleryDialogOpen(false);
    setGalleryError(null);
  }, []);

  const handleGallerySubmit = useCallback(async () => {
    setGalleryLoading(true);
    setGalleryError(null);
    try {
      const res = await fetch("/api/article-gallery-unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, password: galleryPassword }),
      });
      if (res.ok) {
        try {
          if (slug) localStorage.setItem(`article-gallery:${slug}`, "true");
        } catch {
          /* ignore */
        }
        setGalleryUnlocked(true);
        setGalleryDialogOpen(false);
        setGalleryPassword("");
      } else {
        const msg =
          res.status === 401 ? t("galleryPasswordErrorInvalid") : t("galleryPasswordErrorGeneric");
        setGalleryError(msg);
        setTimeout(() => setGalleryError(null), 3000);
      }
    } catch {
      setGalleryError(t("galleryPasswordErrorNetwork"));
      setTimeout(() => setGalleryError(null), 3000);
    } finally {
      setGalleryLoading(false);
    }
  }, [slug, galleryPassword, t]);

  // Preload first gallery image for lightbox so it's ready when user opens dialog
  const firstGalleryImageUrl = galleryImageUrls[0]?.url;
  useEffect(() => {
    if (!firstGalleryImageUrl) return;
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = firstGalleryImageUrl;
    document.head.appendChild(link);
    return () => link.remove();
  }, [firstGalleryImageUrl]);

  return (
    <main className={styles.main} dir={contentDirection}>
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <motion.div
            className={styles.gradientOrb1}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 1.2 }}
          />
        </div>
        <div className={styles.heroContent}>
          <motion.div
            className={styles.breadcrumb}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href={newsListingHref} className={styles.breadcrumbLink}>
              News
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>{categoryLabel}</span>
          </motion.div>
          <motion.div
            className={styles.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {categoryLabel}
          </motion.div>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {article.title}
          </motion.h1>
          <motion.div
            className={styles.meta}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {article.author && (
              <>
                <div className={styles.author}>
                  <div className={styles.authorAvatar}>{article.author.charAt(0)}</div>
                  <div className={styles.authorInfo}>
                    <div className={styles.authorName}>{article.author}</div>
                    {article.authorRole && (
                      <div className={styles.authorRole}>{article.authorRole}</div>
                    )}
                  </div>
                </div>
                <div className={styles.metaDivider}>•</div>
              </>
            )}
            <time className={styles.date}>{formattedDate}</time>
            {readTimeDisplay ? (
              <>
                <div className={styles.metaDivider}>•</div>
                <span className={styles.readTime}>{readTimeDisplay}</span>
              </>
            ) : null}
          </motion.div>
        </div>
      </section>

      <motion.section
        className={styles.imageSection}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {article.embedLink ? (
          isYouTubeOrVimeo(article.embedLink) ? (
            <div className={styles.videoWrapper}>
              <iframe
                title={article.title}
                className={styles.video}
                src={`${article.embedLink}?rel=0&modestbranding=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          ) : (
            <div className={styles.videoWrapper}>
              <video className={styles.video} controls playsInline preload="metadata">
                <source src={article.embedLink} type="video/mp4" />
                <source src={article.embedLink} type="video/webm" />
                <source src={article.embedLink} type="video/ogg" />
                <track kind="captions" srcLang="en" label="English" />
                Your browser does not support the video tag.
              </video>
            </div>
          )
        ) : imageUrl ? (
          <>
            <div className={styles.imageContainer}>
              <Image
                width={1200}
                height={600}
                src={imageUrl}
                alt={article.image?.alt || article.title}
                className={styles.image}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                priority
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
              />
            </div>
            {article.image?.caption && (
              <p className={styles.imageCaption}>{article.image.caption}</p>
            )}
          </>
        ) : null}
      </motion.section>

      <motion.article
        className={styles.article}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className={styles.content}>
          {bodyHTML ? <div dangerouslySetInnerHTML={{ __html: bodyHTML }} /> : null}
        </div>
      </motion.article>

      {(galleryImageUrls.length > 0 || galleryPasswordEnabled) && (
        <motion.section
          className={styles.gallerySection}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className={styles.galleryContainer}>
            <h2 className={styles.galleryTitle}>Gallery</h2>
            {!galleryUnlocked ? (
              <div className={styles.galleryGate}>
                <div className={styles.galleryGateLockBack} aria-hidden="true">
                  <div className={styles.galleryGateLockWrap}>
                    <svg
                      className={styles.galleryGateLockSvg}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1zm2-3a2 2 0 1 1 4 0v3h-4V7z"
                      />
                    </svg>
                  </div>
                </div>
                <div className={styles.galleryGateContent}>
                  <p className={styles.galleryGateMessage}>{t("galleryLocked")}</p>
                  <Button
                    variant="accent-brand"
                    size="lg"
                    onClick={() => setGalleryDialogOpen(true)}
                  >
                    {t("galleryGateButton")}
                  </Button>
                </div>
              </div>
            ) : (
              <div className={styles.galleryGrid}>
                {galleryImageUrls.map((galleryImage, index) => {
                  if (!galleryImage) return null;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.05 }}
                    >
                      <button
                        className={styles.galleryItem}
                        onClick={() => handleImageClick(index)}
                        type="button"
                      >
                        <Image
                          src={galleryImage.thumbnailUrl}
                          alt={galleryImage.alt || t("galleryImageAlt", { number: index + 1 })}
                          width={400}
                          height={300}
                          className={styles.galleryImage}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                        />
                        {galleryImage.caption && (
                          <div className={styles.galleryCaption}>{galleryImage.caption}</div>
                        )}
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.section>
      )}

      <dialog
        ref={galleryDialogRef}
        onCancel={closeGalleryDialog}
        onClick={(e) => {
          if (e.target === galleryDialogRef.current) closeGalleryDialog();
        }}
        className={styles.galleryDialog}
        aria-labelledby="gallery-pwd-title"
        aria-describedby="gallery-pwd-desc"
      >
        <div
          className={styles.galleryDialogPanel}
          onClick={(e) => e.stopPropagation()}
          role="document"
        >
          <div className={styles.galleryDialogCard}>
            <button
              type="button"
              className={styles.galleryDialogClose}
              onClick={closeGalleryDialog}
              aria-label={t("galleryCloseDialog")}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className={styles.galleryDialogIcon} aria-hidden="true">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div className={styles.galleryDialogHeader}>
              <h2 id="gallery-pwd-title" className={styles.galleryDialogTitle}>
                {t("galleryPasswordTitle")}
              </h2>
              <p id="gallery-pwd-desc" className={styles.galleryDialogDesc}>
                {t("galleryPasswordDescription")}
              </p>
            </div>
            <form
              className={styles.galleryDialogForm}
              onSubmit={(e) => {
                e.preventDefault();
                handleGallerySubmit();
              }}
            >
              <div className={styles.galleryDialogPwdWrap}>
                <input
                  id="gallery-pwd-input"
                  type={galleryShowPassword ? "text" : "password"}
                  value={galleryPassword}
                  onChange={(e) => setGalleryPassword(e.target.value)}
                  placeholder={t("galleryPasswordLabel")}
                  autoComplete="current-password"
                  aria-invalid={galleryError ? "true" : "false"}
                  className={`${styles.galleryDialogInput}${galleryError ? ` ${styles.galleryDialogInputError}` : ""}`}
                />
                <button
                  type="button"
                  className={styles.galleryDialogToggle}
                  onClick={() => setGalleryShowPassword((s) => !s)}
                  aria-pressed={galleryShowPassword}
                  aria-label={
                    galleryShowPassword ? t("galleryHidePassword") : t("galleryShowPassword")
                  }
                >
                  {galleryShowPassword ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M13.3536 2.35355C13.5488 2.15829 13.5488 1.84171 13.3536 1.64645C13.1583 1.45118 12.8417 1.45118 12.6464 1.64645L10.6828 3.61012C9.70652 3.21671 8.63759 3 7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C0.902945 9.08812 2.02314 10.1861 3.36061 10.9323L1.64645 12.6464C1.45118 12.8417 1.45118 13.1583 1.64645 13.3536C1.84171 13.5488 2.15829 13.5488 2.35355 13.3536L4.31723 11.3899C5.29348 11.7833 6.36241 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C14.0971 5.9119 12.9769 4.81391 11.6394 4.06771L13.3536 2.35355ZM9.90428 4.38861C9.15332 4.1361 8.34759 4 7.5 4C4.80285 4 2.52952 5.37816 1.09622 7.50001C1.87284 8.6497 2.89609 9.58106 4.09974 10.1931L9.90428 4.38861ZM5.09572 10.6114L10.9003 4.80685C12.1039 5.41894 13.1272 6.35031 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11C6.65241 11 5.84668 10.8639 5.09572 10.6114Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <Button
                type="submit"
                variant="accent-brand"
                size="lg"
                disabled={galleryLoading}
                loading={galleryLoading}
                className={styles.galleryDialogSubmit}
              >
                {galleryLoading ? t("galleryUnlockingButton") : t("galleryUnlockButton")}
              </Button>
              <div className={styles.galleryDialogMeta} aria-live="polite">
                {galleryError ? (
                  <span className={styles.galleryDialogError}>{galleryError}</span>
                ) : (
                  <span>{t("galleryPasswordHint")}</span>
                )}
              </div>
            </form>
          </div>
        </div>
      </dialog>

      {selectedImageIndex !== null && selectedImage && (
        <Dialog.Root
          open={true}
          onOpenChange={(open) => {
            if (!open) handleOpenChange(false);
          }}
          modal={true}
        >
          <Dialog.Portal>
            <Dialog.Overlay className={styles.dialogOverlay} />
            <Dialog.Content
              className={styles.dialogContent}
              onPointerDownOutside={() => handleOpenChange(false)}
              onEscapeKeyDown={() => handleOpenChange(false)}
            >
              <VisuallyHidden>
                <Dialog.Title>
                  {t("galleryImageAlt", { number: (selectedImageIndex ?? 0) + 1 })}
                </Dialog.Title>
              </VisuallyHidden>
              {galleryImageUrls.length > 1 && (
                <button
                  className={`${styles.carouselNavButton} ${styles.carouselNavButtonPrev}`}
                  onClick={scrollPrev}
                  disabled={!canScrollPrev}
                  aria-label={t("previousImage")}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
              <div className={styles.dialogCarousel} ref={emblaRef}>
                <div className={styles.dialogCarouselContainer}>
                  {galleryImageUrls.map((galleryImage, index) => {
                    if (!galleryImage) return null;
                    return (
                      <div key={index} className={styles.dialogCarouselSlide}>
                        <div className={styles.dialogImageContainer}>
                          <div className={styles.dialogImageWrapper}>
                            <Image
                              src={galleryImage.url}
                              alt={galleryImage.alt || t("galleryImageAlt", { number: index + 1 })}
                              fill
                              sizes="(max-width: 768px) 100vw, 1200px"
                              className={styles.dialogImage}
                            />
                          </div>
                          {galleryImage.caption && (
                            <div className={styles.dialogCaption}>{galleryImage.caption}</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {galleryImageUrls.length > 1 && (
                <button
                  className={`${styles.carouselNavButton} ${styles.carouselNavButtonNext}`}
                  onClick={scrollNext}
                  disabled={!canScrollNext}
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
              )}
              <Dialog.Close asChild>
                <button className={styles.dialogClose} aria-label={t("close")}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}

      <motion.div
        className={styles.backSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Button
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 10H4M4 10L10 16M4 10L10 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          href={newsListingHref}
          variant="outline"
          iconPosition="start"
        >
          {t("backToNews")}
        </Button>
      </motion.div>
    </main>
  );
}
