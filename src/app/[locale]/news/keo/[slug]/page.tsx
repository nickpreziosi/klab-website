import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/sanity/queries/articles";
import { urlForSized } from "@/sanity/lib/image";
import { ArticleView } from "@/ui/news/views/ArticleView/ArticleView";
import { formatArticleDate, portableBodyToHtml } from "@/lib/news/article-portable-body";

export default async function KeoArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;

  const regularArticle = await getArticleBySlug(slug);
  if (!regularArticle) {
    notFound();
  }

  const imageUrl = regularArticle.image
    ? urlForSized(regularArticle.image, { width: 1200, height: 600, quality: 80 })
    : undefined;
  const formattedDate = formatArticleDate(regularArticle.publishedAt);

  const galleryImageUrls =
    regularArticle.gallery
      ?.map((galleryImage): { url: string; thumbnailUrl: string; caption?: string; alt?: string } | null => {
        if (!galleryImage?.asset) return null;
        return {
          url: urlForSized(galleryImage, { width: 1200, quality: 80 }),
          thumbnailUrl: urlForSized(galleryImage, { width: 400, quality: 75 }),
          caption: galleryImage.caption,
          alt: galleryImage.alt,
        };
      })
      .filter((item): item is { url: string; thumbnailUrl: string; caption?: string; alt?: string } => item !== null) ??
    [];

  const bodyHTML = portableBodyToHtml(regularArticle.body);

  return (
    <ArticleView
      article={regularArticle}
      imageUrl={imageUrl}
      formattedDate={formattedDate}
      galleryImageUrls={galleryImageUrls}
      bodyHTML={bodyHTML}
      contentDirection="ltr"
      newsListingHref="/news/keo"
    />
  );
}
