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

  // Pre-process gallery image URLs to avoid importing urlFor in client component
  const galleryImageUrls: Array<{
    url: string;
    caption?: string;
    alt?: string;
  }> =
    article.gallery
      ?.map(
        (
          galleryImage,
        ): { url: string; caption?: string; alt?: string } | null => {
          if (!galleryImage?.asset) return null;
          return {
            url: urlFor(galleryImage).url(),
            caption: galleryImage.caption,
            alt: galleryImage.alt,
          };
        },
      )
      .filter(
        (item): item is { url: string; caption?: string; alt?: string } =>
          item !== null,
      ) || [];

  // Pre-process PortableText body to convert image blocks to URLs
  // This avoids importing Sanity packages in the client component
  const processedBody = article.body
    ? article.body.map((block) => {
        if (
          block._type === "image" &&
          "asset" in block &&
          block.asset &&
          typeof block.asset === "object" &&
          "_ref" in block.asset
        ) {
          const imageBlock = block as unknown as {
            asset: { _ref: string; _type?: string };
            alt?: string;
            caption?: string;
          };
          return {
            ...block,
            url: urlFor(imageBlock).url(),
          };
        }
        return block;
      })
    : undefined;

  return (
    <ArticleClient
      article={article}
      imageUrl={imageUrl}
      formattedDate={formattedDate}
      galleryImageUrls={galleryImageUrls}
      processedBody={processedBody}
    />
  );
}
