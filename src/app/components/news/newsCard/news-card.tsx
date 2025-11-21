"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./news-card.module.css";
import Image from "next/image";

// Helper function to extract YouTube ID from embed link
function extractYouTubeId(embedLink?: string): string | undefined {
  if (!embedLink) return undefined;
  const match = embedLink.match(
    /(?:youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/live\/)([^&\n?#]+)/,
  );
  return match ? match[1] : undefined;
}

// Helper function to check if we can get a thumbnail for a video URL
function canGetThumbnail(embedLink?: string): boolean {
  if (!embedLink) return false;
  // YouTube - we can get thumbnails
  if (extractYouTubeId(embedLink)) return true;
  // Vimeo - we can try to get thumbnails
  if (embedLink.includes("vimeo.com")) return true;
  // For other services (Wix, direct MP4, etc.), we can't easily get thumbnails
  return false;
}

// Helper function to get Vimeo thumbnail
function getVimeoThumbnail(embedLink: string): string | undefined {
  const match = embedLink.match(/vimeo\.com\/(\d+)/);
  if (match) {
    return `https://vumbnail.com/${match[1]}.jpg`;
  }
  return undefined;
}

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
    embedLink?: string;
    author?: string;
    authorRole?: string;
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
          ) : article.embedLink && canGetThumbnail(article.embedLink) ? (
            <>
              {/* Vimeo or other services with thumbnail support */}
              {getVimeoThumbnail(article.embedLink) ? (
                <>
                  <Image
                    width={500}
                    height={281}
                    src={getVimeoThumbnail(article.embedLink)!}
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
              ) : null}
            </>
          ) : article.embedLink ? (
            <>
              {/* Direct video playback for videos without thumbnail support */}
              <video
                className={styles.video}
                src={article.embedLink}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
              />
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
          <div>
            <h2 className={styles.title}>{article.title}</h2>
            <p className={styles.excerpt}>{article.excerpt}</p>
          </div>

          <div className={styles.meta}>
            {article.author && (
              <div className={styles.author}>
                <div className={styles.authorAvatar}>
                  {article.author.charAt(0)}
                </div>
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>{article.author}</div>
                  {article.authorRole && (
                    <div className={styles.authorRole}>
                      {article.authorRole}
                    </div>
                  )}
                </div>
              </div>
            )}

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
