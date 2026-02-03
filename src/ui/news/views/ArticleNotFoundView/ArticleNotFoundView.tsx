"use client";

import Link from "next/link";
import styles from "./ArticleNotFoundView.module.css";

export function ArticleNotFoundView() {
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
