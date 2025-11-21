import Link from "next/link";
import { getArticleBySlug } from "@/sanity/queries/articles";
import { urlFor } from "@/sanity/lib/image";
import ArticleClient from "./article-client";
import styles from "./page.module.css";

// Helper function to format date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

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

  const imageUrl = article.image ? urlFor(article.image).url() : undefined;
  const formattedDate = formatDate(article.publishedAt);

  return (
    <ArticleClient
      article={article}
      imageUrl={imageUrl}
      formattedDate={formattedDate}
    />
  );
}
