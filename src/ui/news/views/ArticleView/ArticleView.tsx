"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
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

export interface ClientArticle {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  image?: { asset?: { _ref?: string; _type?: string }; caption?: string; alt?: string };
  embedLink?: string;
  body?: Array<{ _type: string; [key: string]: unknown }>;
  author?: string;
  authorRole?: string;
  category?: string;
  readTime?: string;
  excerpt?: string;
  gallery?: Array<{ asset?: { _ref?: string; _type?: string }; caption?: string; alt?: string }>;
}

export interface GalleryImageUrl {
  url: string;
  thumbnailUrl: string;
  caption?: string;
  alt?: string;
}

export interface ArticleViewProps {
  article: ClientArticle;
  imageUrl?: string;
  formattedDate: string;
  galleryImageUrls: GalleryImageUrl[];
  bodyHTML?: string;
  /** `rtl` for Arabic on international articles; KEO articles should use `ltr`. */
  contentDirection?: "ltr" | "rtl";
  /** Listing route for breadcrumb + “back” (KLab: `/news`, KEO: `/news/keo`). */
  newsListingHref?: string;
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
}: ArticleViewProps) {
  const t = useTranslations("newsPage");
  const tCategory = useTranslations("newsCategories");
  const categoryLabel = translateNewsCategory(tCategory, article.category);
  const readTimeDisplay = formatReadTimeWithUnit(article.readTime, t("readTimeMinutes"));
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

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

      {galleryImageUrls.length > 0 && (
        <motion.section
          className={styles.gallerySection}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className={styles.galleryContainer}>
            <h2 className={styles.galleryTitle}>Gallery</h2>
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
          </div>
        </motion.section>
      )}

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
                <Dialog.Title>{t("galleryImageAlt", { number: (selectedImageIndex ?? 0) + 1 })}</Dialog.Title>
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
