import { notFound, permanentRedirect } from "next/navigation";
import {
  getArticleBySlug,
  getInternationalArticleBySlug,
} from "@/sanity/queries/articles";
import { urlForSized } from "@/sanity/lib/image";
import { ArticleView } from "@/ui/news/views/ArticleView/ArticleView";
import { formatArticleDate, portableBodyToHtml } from "@/lib/news/article-portable-body";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;

  // KLab: `internationalArticle` only at `/news/[slug]`.
  const intlArticle = await getInternationalArticleBySlug(slug);
  if (intlArticle) {
    const localization = intlArticle.localizations?.find((l) => l.language === locale);
    if (!localization) {
      notFound();
    }

    const imageUrl = localization.image
      ? urlForSized(localization.image, { width: 1200, height: 600, quality: 80 })
      : undefined;
    const formattedDate = formatArticleDate(intlArticle.publishedAt);

    const galleryImageUrls =
      intlArticle.gallery
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

    const bodyHTML = portableBodyToHtml(localization.body);

    const article = {
      _id: intlArticle._id,
      title: localization.title,
      slug: intlArticle.slug,
      publishedAt: intlArticle.publishedAt,
      image: localization.image,
      embedLink: intlArticle.embedLink,
      body: localization.body,
      author: intlArticle.author,
      authorRole: intlArticle.authorRole,
      category: intlArticle.category,
      readTime: intlArticle.readTime,
      excerpt: localization.excerpt,
      gallery: intlArticle.gallery,
    };

    return (
      <ArticleView
        article={article}
        imageUrl={imageUrl}
        formattedDate={formattedDate}
        galleryImageUrls={galleryImageUrls}
        bodyHTML={bodyHTML}
        contentDirection={locale === "ar" ? "rtl" : "ltr"}
        galleryPasswordEnabled={!!intlArticle.galleryPassword}
        slug={slug}
      />
    );
  }

  // Legacy `/news/[slug]` for KEO articles → canonical `/news/keo/[slug]`.
  const keoArticle = await getArticleBySlug(slug);
  if (keoArticle) {
    permanentRedirect(`/${locale}/news/keo/${slug}`);
  }

  notFound();
}
