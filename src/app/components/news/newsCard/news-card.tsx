"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./news-card.module.css";
import Image from "next/image";

interface NewsCardProps {
  article: {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    image?: string;
    youtubeId?: string;
    author: string;
    authorRole: string;
  };
  index: number;
}

export default function NewsCard({ article, index }: NewsCardProps) {
  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link href={`/news/${article.slug}`} className={styles.link}>
        <div className={styles.imageContainer}>
          {article.youtubeId ? (
            <>
              <Image
                width={500}
                height={281}
                src={`https://img.youtube.com/vi/${article.youtubeId}/hqdefault.jpg`}
                alt={article.title}
                className={styles.image}
                unoptimized
              />
              <div className={styles.playBadge} aria-hidden>
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 44 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="22" cy="22" r="22" fill="rgba(0,0,0,0.5)" />
                  <path
                    d="M18 14L30 22L18 30V14Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="0"
                  />
                </svg>
              </div>
            </>
          ) : (
            <>
              <Image
                width={500}
                height={500}
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                className={styles.image}
              />
            </>
          )}

          <div className={styles.category}>{article.category}</div>
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>{article.title}</h2>
          <p className={styles.excerpt}>{article.excerpt}</p>

          <div className={styles.meta}>
            <div className={styles.author}>
              <div className={styles.authorAvatar}>
                {article.author.charAt(0)}
              </div>
              <div className={styles.authorInfo}>
                <div className={styles.authorName}>{article.author}</div>
                <div className={styles.authorRole}>{article.authorRole}</div>
              </div>
            </div>

            <div className={styles.metaRight}>
              <time className={styles.date}>{article.date}</time>
              <span className={styles.divider}>•</span>
              <span className={styles.readTime}>{article.readTime}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
