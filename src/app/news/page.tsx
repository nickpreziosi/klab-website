"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NewsCard from "../components/news/newsCard/news-card";
import NewsPagination from "../components/news/newsPagination/news-pagination";
import NewsCardSkeleton from "../components/news/newsCardSkeleton/news-card-skeleton";
import styles from "./page.module.css";

// Mock articles data
const articles = [
  {
    slug: "keo-rails-launches-blockchain-payment-platform",
    title: "KEO Rails Launches Revolutionary Blockchain Payment Platform",
    excerpt:
      "Transforming B2B payments with instant settlement and zero friction transactions across borders.",
    category: "Product Launch",
    date: "2024-03-15",
    readTime: "5 min read",
    image: "/blockchain-payment-platform.jpg",
    author: "Sarah Chen",
    authorRole: "CEO",
  },
  {
    slug: "enterprise-adoption-stablecoins-2024",
    title: "Enterprise Adoption of Stablecoins Reaches All-Time High",
    excerpt:
      "Major corporations are embracing stablecoin payments for faster, more efficient cross-border transactions.",
    category: "Industry Insights",
    date: "2024-03-10",
    readTime: "4 min read",
    image: "/stablecoin-enterprise-adoption.jpg",
    author: "Michael Torres",
    authorRole: "Head of Research",
  },
  {
    slug: "self-custody-wallets-security-guide",
    title: "The Complete Guide to Self-Custody Wallets for Enterprises",
    excerpt:
      "Understanding the security benefits and implementation strategies for enterprise-grade self-custody solutions.",
    category: "Education",
    date: "2024-03-05",
    readTime: "8 min read",
    image: "/digital-wallet-security.jpg",
    author: "David Kim",
    authorRole: "Chief Security Officer",
  },
  {
    slug: "keo-rails-series-a-funding",
    title: "KEO Rails Secures $50M Series A to Accelerate Global Expansion",
    excerpt:
      "Leading venture capital firms back our vision to revolutionize the global payments infrastructure.",
    category: "Company News",
    date: "2024-02-28",
    readTime: "3 min read",
    image: "/startup-funding-announcement.jpg",
    author: "Sarah Chen",
    authorRole: "CEO",
  },
  {
    slug: "blockchain-payments-vs-traditional-banking",
    title:
      "Blockchain Payments vs Traditional Banking: A Comprehensive Comparison",
    excerpt:
      "Analyzing the cost, speed, and security advantages of blockchain-based payment systems.",
    category: "Analysis",
    date: "2024-02-20",
    readTime: "6 min read",
    image: "/blockchain-vs-traditional-banking.jpg",
    author: "Jennifer Park",
    authorRole: "Product Manager",
  },
  {
    slug: "cross-border-payments-future",
    title: "The Future of Cross-Border Payments: Trends to Watch in 2024",
    excerpt:
      "Exploring emerging technologies and regulatory changes shaping the future of international transactions.",
    category: "Industry Insights",
    date: "2024-02-15",
    readTime: "7 min read",
    image: "/global-payments-network.jpg",
    author: "Michael Torres",
    authorRole: "Head of Research",
  },
  {
    slug: "keo-rails-partnership-major-banks",
    title:
      "KEO Rails Partners with Major Banks to Bridge Traditional and Digital Finance",
    excerpt:
      "Strategic partnerships enable seamless integration between traditional banking and blockchain infrastructure.",
    category: "Partnerships",
    date: "2024-02-10",
    readTime: "4 min read",
    image: "/banking-partnership-handshake.jpg",
    author: "Sarah Chen",
    authorRole: "CEO",
  },
  {
    slug: "smart-contracts-b2b-payments",
    title: "How Smart Contracts Are Revolutionizing B2B Payment Terms",
    excerpt:
      "Automated payment execution and programmable money are transforming business relationships.",
    category: "Technology",
    date: "2024-02-05",
    readTime: "5 min read",
    image: "/smart-contracts-automation.jpg",
    author: "Alex Rivera",
    authorRole: "Lead Engineer",
  },
  {
    slug: "regulatory-compliance-blockchain-payments",
    title: "Navigating Regulatory Compliance in Blockchain Payments",
    excerpt:
      "Understanding the evolving regulatory landscape and ensuring compliance in digital payment systems.",
    category: "Compliance",
    date: "2024-01-30",
    readTime: "6 min read",
    image: "/regulatory-compliance-legal.jpg",
    author: "Rachel Martinez",
    authorRole: "Chief Compliance Officer",
  },
];

const ARTICLES_PER_PAGE = 6;

export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentPage]);

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
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
            Stay updated with the latest developments in blockchain payments and
            digital finance
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

        {/* Pagination */}
        <NewsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </section>
    </main>
  );
}
