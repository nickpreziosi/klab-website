"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { getAllArticles } from "@/sanity/queries/articles";
import { urlFor } from "@/sanity/lib/image";
import NewsCard from "../components/news/newsCard/news-card";
import NewsPagination from "../components/news/newsPagination/news-pagination";
import NewsCardSkeleton from "../components/news/newsCardSkeleton/news-card-skeleton";
import styles from "./page.module.css";

const ARTICLES_PER_PAGE = 6;

// Helper function to extract YouTube ID from embed link
function extractYouTubeId(embedLink?: string): string | undefined {
  if (!embedLink) return undefined;
  const match = embedLink.match(
    /(?:youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/live\/)([^&\n?#]+)/,
  );
  return match ? match[1] : undefined;
}

// Helper function to format date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

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

export default function NewsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Read page from URL and update when search params change
  useEffect(() => {
    const rawPage = searchParams.get("page") ?? "1";
    const parsed = Number(rawPage);
    const page = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
    setCurrentPage(page);
  }, [searchParams]);

  // Fetch articles from Sanity
  useEffect(() => {
    async function fetchArticles() {
      setIsLoading(true);
      try {
        const sanityArticles = await getAllArticles();

        // Transform Sanity articles to match expected format
        const transformedArticles = sanityArticles.map((article) => ({
          slug: article.slug.current,
          title: article.title,
          excerpt: article.excerpt || "",
          category: article.category || "Uncategorized",
          date: formatDate(article.publishedAt),
          readTime: article.readTime || "5 min read",
          image: article.image ? urlFor(article.image).url() : undefined,
          youtubeId: extractYouTubeId(article.embedLink),
          embedLink: article.embedLink || undefined,
          author: article.author || undefined,
          authorRole: article.authorRole || undefined,
        }));

        setArticles(transformedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchArticles();
  }, []);

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const safePage = Math.max(1, Math.min(totalPages, currentPage));
  const startIndex = (safePage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
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
            ? Array.from({ length: ARTICLES_PER_PAGE }).map((_, index) => (
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
