"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import NewsCard from "@/ui/news/components/newsCard/news-card";
import NewsPagination from "@/ui/news/components/newsPagination/news-pagination";
import NewsCardSkeleton from "@/ui/news/components/newsCardSkeleton/news-card-skeleton";
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
  selectedLanguages: string[];
  articlesPerPage: number;
}

export function NewsView({
  articles,
  allCategories,
  selectedCategories,
  selectedLanguages,
  articlesPerPage,
}: NewsViewProps) {
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
  const hasFilters = selectedCategories.length > 0 || selectedLanguages.length > 0;

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
            News & Insights
          </motion.h1>
          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Stay updated with the latest developments in fintech and AI
          </motion.p>
        </div>
      </section>

      <section className={styles.articlesSection}>
        <NewsFilters
          categories={allCategories}
          selectedCategories={selectedCategories}
          selectedLanguages={selectedLanguages}
        />

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
              {hasFilters
                ? "Try adjusting your filters to find what you're looking for."
                : "Check back soon for new content."}
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
            {!isLoading && totalPages > 1 && <NewsPagination totalPages={totalPages} />}
          </>
        )}
      </section>
    </main>
  );
}
