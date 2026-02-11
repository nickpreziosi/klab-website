import Link from "next/link";
import styles from "./company-video.module.css";

export const CompanyVideo = () => {
  return (
    <div className={styles.content}>
      <section className={styles.section}>
        <div className={styles.text}>
          <div className={styles.textContainer}>
            <p className={styles.textParagraph}>Discover the vision.</p>
            <h2 className={styles.textHeader}>Hear from KEO&apos;s founder:</h2>
          </div>
        </div>
        <Link href="/" className={styles.videoContainer}>
          <iframe
            className={styles.video}
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Ivd6J240bNs?si=dPVvc7HT30XoZQq1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </Link>
      </section>
    </div>
  );
};
