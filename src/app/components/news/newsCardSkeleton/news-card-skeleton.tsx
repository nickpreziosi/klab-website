import styles from "./news-card-skeleton.module.css"

export default function NewsCardSkeleton() {
  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <div className={styles.skeleton} />
      </div>

      <div className={styles.content}>
        <div className={`${styles.skeleton} ${styles.title}`} />
        <div className={`${styles.skeleton} ${styles.textLine}`} />
        <div className={`${styles.skeleton} ${styles.textLine}`} />
        <div className={`${styles.skeleton} ${styles.textLineShort}`} />

        <div className={styles.meta}>
          <div className={styles.author}>
            <div className={`${styles.skeleton} ${styles.avatar}`} />
            <div className={styles.authorInfo}>
              <div className={`${styles.skeleton} ${styles.authorName}`} />
              <div className={`${styles.skeleton} ${styles.authorRole}`} />
            </div>
          </div>

          <div className={styles.metaRight}>
            <div className={`${styles.skeleton} ${styles.readTime}`} />
          </div>
        </div>
      </div>
    </article>
  )
}
