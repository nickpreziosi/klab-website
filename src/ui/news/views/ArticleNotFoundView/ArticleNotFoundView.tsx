"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./ArticleNotFoundView.module.css";

export function ArticleNotFoundView() {
  const t = useTranslations("newsPage");
  return (
    <main className={styles.main}>
      <div className={styles.notFound}>
        <h1>{t("articleNotFoundTitle")}</h1>
        <Link href="/news" className={styles.backLink}>
          {t("backToNews")}
        </Link>
      </div>
    </main>
  );
}
