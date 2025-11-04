"use client";

import { motion } from "framer-motion";
import { use } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";

// Article type for strong typing of article data
type Article = {
  title: string;
  category: string;
  date: string;
  readTime: string;
  image?: string;
  author: string;
  authorRole?: string;
  content: string;
};

// Mock article data (in a real app, this would come from a CMS or database)
const articlesData: Record<string, Article> = {
  "keo-rails-launches-blockchain-payment-platform": {
    title: "KEO Rails Launches Revolutionary Blockchain Payment Platform",
    category: "Product Launch",
    date: "2024-03-15",
    readTime: "5 min read",
    image: "/blockchain-payment-platform.jpg",
    author: "Sarah Chen",
    authorRole: "CEO",
    content: `
      <p>Today marks a pivotal moment in the evolution of B2B payments. KEO Rails is proud to announce the launch of our revolutionary blockchain-based payment platform, designed to eliminate the friction, delays, and excessive costs that have plagued traditional payment systems for decades.</p>

      <h2>The Problem We're Solving</h2>
      <p>Traditional payment rails were built for a different era. They're slow, expensive, and opaque. Cross-border transactions can take days to settle, with fees eating into margins and uncertainty creating cash flow challenges for businesses of all sizes.</p>

      <p>Our research shows that the average B2B payment takes 3-5 business days to settle domestically and up to 10 days internationally. During this time, capital is locked up, opportunities are missed, and businesses are forced to maintain larger cash reserves than necessary.</p>

      <h2>Our Solution</h2>
      <p>KEO Rails leverages blockchain technology to create a payment infrastructure that's instant, transparent, and cost-effective. By utilizing stablecoins and smart contracts, we've built a system that settles transactions in seconds, not days, with fees that are a fraction of traditional payment processors.</p>

      <h3>Key Features:</h3>
      <ul>
        <li><strong>Instant Settlement:</strong> Transactions settle in seconds, unlocking capital and improving cash flow</li>
        <li><strong>Self-Custody Wallets:</strong> Maintain complete control over your funds with enterprise-grade security</li>
        <li><strong>Cross-Border Simplicity:</strong> Send payments globally with the same ease as domestic transfers</li>
        <li><strong>Transparent Pricing:</strong> No hidden fees, no surprise charges, just straightforward, competitive rates</li>
        <li><strong>Smart Contract Automation:</strong> Programmable payments that execute automatically based on predefined conditions</li>
      </ul>

      <h2>Built for Enterprise</h2>
      <p>We understand that enterprise adoption requires more than just innovative technology. It requires robust security, regulatory compliance, and seamless integration with existing systems. KEO Rails has been built from the ground up with these requirements in mind.</p>

      <p>Our platform includes comprehensive API documentation, dedicated integration support, and compliance tools that ensure you meet all regulatory requirements in your jurisdiction. We've also implemented multi-signature wallets, role-based access controls, and real-time monitoring to provide the security and oversight that enterprises demand.</p>

      <h2>Early Adopter Success</h2>
      <p>During our beta phase, early adopters have seen remarkable results. One manufacturing company reduced their payment processing costs by 73% while improving settlement times from 5 days to under 1 minute. A logistics provider eliminated $2.3M in working capital requirements by leveraging instant settlement.</p>

      <blockquote>"KEO Rails has transformed how we manage payments. The speed and cost savings are game-changing, but what really impressed us was the level of control and transparency we now have over our payment flows." - CFO, Fortune 500 Manufacturing Company</blockquote>

      <h2>What's Next</h2>
      <p>This launch is just the beginning. Over the coming months, we'll be rolling out additional features including integrated lending solutions, advanced treasury management tools, and expanded currency support. Our vision is to create a comprehensive financial infrastructure that empowers businesses to move money as easily as they move data.</p>

      <p>We're excited to partner with forward-thinking businesses ready to embrace the future of payments. If you're interested in learning more or joining our platform, we'd love to hear from you.</p>
    `,
  },
  "enterprise-adoption-stablecoins-2024": {
    title: "Enterprise Adoption of Stablecoins Reaches All-Time High",
    category: "Industry Insights",
    date: "2024-03-10",
    readTime: "4 min read",
    image: "/stablecoin-enterprise-adoption.jpg",
    author: "Michael Torres",
    authorRole: "Head of Research",
    content: `
      <p>The enterprise adoption of stablecoins has reached unprecedented levels in 2024, with major corporations across industries embracing digital currencies for cross-border payments, treasury management, and supply chain finance.</p>

      <h2>The Stablecoin Advantage</h2>
      <p>Stablecoins offer the speed and efficiency of blockchain technology while maintaining price stability through their peg to fiat currencies. This combination has made them increasingly attractive to enterprises seeking to modernize their payment infrastructure without exposing themselves to cryptocurrency volatility.</p>

      <h2>Key Adoption Drivers</h2>
      <p>Several factors are driving this surge in enterprise adoption:</p>
      <ul>
        <li>Regulatory clarity in major markets</li>
        <li>Improved infrastructure and custody solutions</li>
        <li>Demonstrated cost savings and efficiency gains</li>
        <li>Growing network effects as more businesses join</li>
      </ul>

      <h2>Looking Ahead</h2>
      <p>As regulatory frameworks continue to evolve and technology matures, we expect stablecoin adoption to accelerate further. The question is no longer if enterprises will adopt stablecoins, but when and how quickly.</p>
    `,
  },
};

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const article = articlesData[slug];

  if (!article) {
    return (
      <main className={styles.main}>
        <div className={styles.notFound}>
          <h1>Article Not Found</h1>
          <Link href="/news" className={styles.backLink}>
            ← Back to News
          </Link>
        </div>
      </main>
    );
  }

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
        </div>

        <div className={styles.heroContent}>
          <motion.div
            className={styles.breadcrumb}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/news" className={styles.breadcrumbLink}>
              News
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>{article.category}</span>
          </motion.div>

          <motion.div
            className={styles.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {article.category}
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
            <div className={styles.author}>
              <div className={styles.authorAvatar}>
                {article.author.charAt(0)}
              </div>
              <div className={styles.authorInfo}>
                <div className={styles.authorName}>{article.author}</div>
                <div className={styles.authorRole}>{article.authorRole}</div>
              </div>
            </div>
            <div className={styles.metaDivider}>•</div>
            <time className={styles.date}>{article.date}</time>
            <div className={styles.metaDivider}>•</div>
            <span className={styles.readTime}>{article.readTime}</span>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <motion.section
        className={styles.imageSection}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className={styles.imageContainer}>
          <Image
            width={500}
            height={500}
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            className={styles.image}
          />
        </div>
      </motion.section>

      {/* Article Content */}
      <motion.article
        className={styles.article}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </motion.article>

      {/* Back to News */}
      <motion.div
        className={styles.backSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Link href="/news" className={styles.backButton}>
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
          <span>Back to News</span>
        </Link>
      </motion.div>
    </main>
  );
}
