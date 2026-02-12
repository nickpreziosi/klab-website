/**
 * Shown while [locale] routes load. Uses landing orange background to prevent
 * dark flash before 404 (or other content) renders.
 */
import styles from "./loading.module.css";

export default function LocaleLoading() {
  return <div className={styles.page} aria-hidden="true" />;
}
