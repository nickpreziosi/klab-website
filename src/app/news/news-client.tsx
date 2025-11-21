"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import NewsCard from "../components/news/newsCard/news-card";
import NewsPagination from "../components/news/newsPagination/news-pagination";
import NewsCardSkeleton from "../components/news/newsCardSkeleton/news-card-skeleton";
import styles from "./page.module.css";

interface Article {
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

interface NewsClientProps {
  articles: Article[];
  articlesPerPage: number;
}

export default function NewsClient({
  articles,
  articlesPerPage,
}: NewsClientProps) {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);

  // Read page from URL and update when search params change
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

  return (
    <main className={styles.main}>
      {/* Hero Section */}
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

      {/* Articles Grid */}
      <section className={styles.articlesSection}>
        <div className={styles.articlesGrid}>
          {isLoading
            ? Array.from({ length: articlesPerPage }).map((_, index) => (
                <NewsCardSkeleton key={index} />
              ))
            : currentArticles.map((article, index) => (
                <NewsCard key={article.slug} article={article} index={index} />
              ))}
        </div>

        {/* Pagination (driven by URL ?page=) */}
        {!isLoading && <NewsPagination totalPages={totalPages} />}
      </section>
    </main>
  );
}
