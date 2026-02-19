"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import NewsCard from "@/ui/news/components/newsCard/news-card";
import { Pagination } from "@/ui/shared/components/pagination/pagination";
import NewsCardSkeleton from "@/ui/news/components/newsCardSkeleton/news-card-skeleton";
import { ContactLink } from "@/ui/contact/components/contact-link/contact-link";
import NewsFilters from "./NewsFilters";
import styles from "./NewsView.module.css";

export interface NewsViewArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image?: string;
  youtubeId?: string;
  author?: string;
  authorRole?: string;
}

export interface NewsViewProps {
  articles: NewsViewArticle[];
  allCategories: string[];
  selectedCategories: string[];
  articlesPerPage: number;
  /** When true, shows KEO / KLab card links (main news page only). */
  showNewsCards?: boolean;
  /** Hero title (e.g. "News & Insights", "KEO World News", "KLab News"). */
  heroTitle?: string;
  /** Hero subtitle; omit or pass empty to hide. */
  heroSubtitle?: string;
  /** Breadcrumb current segment; when set, breadcrumb is "News" / this label. */
  breadcrumbCurrent?: string;
  /** Custom message when there are no articles (e.g. KLab empty state). */
  emptyStateMessage?: string;
  /** When false, hide the articles section (main news page: cards only). */
  showArticles?: boolean;
}

export function NewsView({
  articles,
  allCategories,
  selectedCategories,
  articlesPerPage,
  showNewsCards = true,
  showArticles = true,
  heroTitle = "News & Insights",
  heroSubtitle = "Stay updated with the latest developments in fintech and AI",
  breadcrumbCurrent,
  emptyStateMessage,
}: NewsViewProps) {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const rawPage = searchParams.get("page") ?? "1";
    const parsed = Number(rawPage);
    const page = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
    setCurrentPage(page);
  }, [searchParams]);

  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const safePage = Math.max(1, Math.min(totalPages, currentPage));
  const startIndex = (safePage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = articles.slice(startIndex, endIndex);

  const hasNoResults = articles.length === 0;

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <motion.div
            className={styles.gradientOrb1}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 1.2 }}
          />
          <motion.div
            className={styles.gradientOrb2}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          />
        </div>
        <div className={styles.heroContent}>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {heroTitle}
          </motion.h1>
          {breadcrumbCurrent ? (
            <motion.nav
              className={styles.breadcrumb}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              aria-label="Breadcrumb"
            >
              <Link href="/news" className={styles.breadcrumbLink}>
                News
              </Link>
              <span className={styles.breadcrumbSeparator}>/</span>
              <span className={styles.breadcrumbCurrent}>{breadcrumbCurrent}</span>
            </motion.nav>
          ) : null}
          {heroSubtitle ? (
            <motion.p
              className={styles.heroSubtitle}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {heroSubtitle}
            </motion.p>
          ) : null}
        </div>
      </section>

      {showNewsCards && (
        <section className={styles.cardsSection}>
          <div className={styles.cardsGrid}>
            <ContactLink
              icon={
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 1.5C4.358 1.5 1.5 4.358 1.5 7.5C1.5 10.642 4.358 13.5 7.5 13.5C10.642 13.5 13.5 10.642 13.5 7.5C13.5 4.358 10.642 1.5 7.5 1.5ZM7.5 2.5C10.09 2.5 12.5 4.91 12.5 7.5C12.5 10.09 10.09 12.5 7.5 12.5C4.91 12.5 2.5 10.09 2.5 7.5C2.5 4.91 4.91 2.5 7.5 2.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              }
              title="Our Present"
              description="Stay up to date with the latest from KLab with product updates, company news, and industry insights."
              href={`/${locale}/news/klab`}
              buttonText="View KLab news"
            />
            <ContactLink
              icon={
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 2.5C3 2.22386 3.22386 2 3.5 2H11.5C11.7761 2 12 2.22386 12 2.5V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM3.5 1C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V2.5C13 1.67157 12.3284 1 11.5 1H3.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              }
              title="Our Past"
              description="Explore news and insights from KEO World, including our history and the foundation that led to KLab."
              href={`/${locale}/news/keo`}
              buttonText="View KEO news"
            />
          </div>
        </section>
      )}

      {showArticles && (
        <section className={styles.articlesSection}>
          <NewsFilters categories={allCategories} selectedCategories={selectedCategories} />

          {hasNoResults ? (
            <motion.div
              className={styles.noResults}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.noResultsIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className={styles.noResultsTitle}>No articles found</h3>
              <p className={styles.noResultsText}>
                {emptyStateMessage ??
                  (selectedCategories.length > 0
                    ? "Try adjusting your filters to find what you're looking for."
                    : "Check back soon for new content.")}
              </p>
            </motion.div>
          ) : (
            <>
              <div className={styles.articlesGrid}>
                {isLoading
                  ? Array.from({ length: articlesPerPage }).map((_, index) => (
                      <NewsCardSkeleton key={index} />
                    ))
                  : currentArticles.map((article, index) => (
                      <NewsCard key={article.slug} article={article} index={index} />
                    ))}
              </div>
              {!isLoading && totalPages > 1 && <Pagination totalPages={totalPages} />}
            </>
          )}
        </section>
      )}
    </main>
  );
}
