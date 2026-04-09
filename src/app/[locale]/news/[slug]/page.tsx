import { notFound } from "next/navigation";
import { getArticleBySlug, getInternationalArticleBySlug } from "@/sanity/queries/articles";
import { urlForSized } from "@/sanity/lib/image";
import { toHTML } from "@portabletext/to-html";
import { ArticleView } from "@/ui/news/views/ArticleView/ArticleView";

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
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { slug } = await params;
  const { lang } = await searchParams;

  // Try regular article first, then international article
  const regularArticle = await getArticleBySlug(slug);

  if (regularArticle) {
    const imageUrl = regularArticle.image
      ? urlForSized(regularArticle.image, { width: 1200, height: 600, quality: 80 })
      : undefined;
    const formattedDate = formatDate(regularArticle.publishedAt);

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
        .filter((item): item is { url: string; thumbnailUrl: string; caption?: string; alt?: string } => item !== null) ?? [];

    const bodyHTML = regularArticle.body
      ? toHTML(regularArticle.body, {
          components: {
            types: {
              image: ({
                value,
              }: {
                value: { asset?: { _ref: string }; alt?: string; caption?: string };
              }) => {
                if (!value?.asset) return "";
                const source = value as { asset: { _ref: string } };
                const widths = [400, 800, 1200];
                const srcSet = widths
                  .map(
                    (w) =>
                      `${urlForSized(source, {
                        width: w,
                        height: Math.round((600 / 800) * w),
                        quality: w <= 400 ? 75 : 80,
                        format: "webp",
                      })} ${w}w`
                  )
                  .join(", ");
                const defaultSrc = urlForSized(source, {
                  width: 800,
                  height: 600,
                  quality: 80,
                  format: "webp",
                });
                const alt = value.alt || "Article image";
                const caption = value.caption ? `<figcaption>${value.caption}</figcaption>` : "";
                return `<figure style="margin: 24px 0;"><img src="${defaultSrc}" srcset="${srcSet}" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px" alt="${alt}" style="width: 100%; height: auto; border-radius: var(--rounded-app);" loading="lazy" decoding="async" />${caption}</figure>`;
              },
            },
            marks: {
              link: ({ value, children }: { value?: { href?: string }; children?: string }) => {
                const href = value?.href || "#";
                const target = href.startsWith("http")
                  ? ' target="_blank" rel="noopener noreferrer"'
                  : "";
                return `<a href="${href}"${target} style="color: hsl(var(--foreground)); text-decoration: underline; opacity: 0.8;">${children || ""}</a>`;
              },
            },
          },
        })
      : undefined;

    return (
      <ArticleView
        article={regularArticle}
        imageUrl={imageUrl}
        formattedDate={formattedDate}
        galleryImageUrls={galleryImageUrls}
        bodyHTML={bodyHTML}
      />
    );
  }

  // Try international article
  const intlArticle = await getInternationalArticleBySlug(slug);
  if (!intlArticle) {
    notFound();
  }

  // Pick the requested language localization, fall back to English, then first available
  const selectedLang = lang ?? "en";
  const localization =
    intlArticle.localizations?.find((l) => l.language === selectedLang) ??
    intlArticle.localizations?.find((l) => l.language === "en") ??
    intlArticle.localizations?.[0];

  if (!localization) {
    notFound();
  }

  const imageUrl = localization.image
    ? urlForSized(localization.image, { width: 1200, height: 600, quality: 80 })
    : undefined;
  const formattedDate = formatDate(intlArticle.publishedAt);

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
      .filter((item): item is { url: string; thumbnailUrl: string; caption?: string; alt?: string } => item !== null) ?? [];

  const bodyHTML = localization.body
    ? toHTML(localization.body, {
        components: {
          types: {
            image: ({
              value,
            }: {
              value: { asset?: { _ref: string }; alt?: string; caption?: string };
            }) => {
              if (!value?.asset) return "";
              const source = value as { asset: { _ref: string } };
              const widths = [400, 800, 1200];
              const srcSet = widths
                .map(
                  (w) =>
                    `${urlForSized(source, {
                      width: w,
                      height: Math.round((600 / 800) * w),
                      quality: w <= 400 ? 75 : 80,
                      format: "webp",
                    })} ${w}w`
                )
                .join(", ");
              const defaultSrc = urlForSized(source, {
                width: 800,
                height: 600,
                quality: 80,
                format: "webp",
              });
              const alt = value.alt || "Article image";
              const caption = value.caption ? `<figcaption>${value.caption}</figcaption>` : "";
              return `<figure style="margin: 24px 0;"><img src="${defaultSrc}" srcset="${srcSet}" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px" alt="${alt}" style="width: 100%; height: auto; border-radius: var(--rounded-app);" loading="lazy" decoding="async" />${caption}</figure>`;
            },
          },
          marks: {
            link: ({ value, children }: { value?: { href?: string }; children?: string }) => {
              const href = value?.href || "#";
              const target = href.startsWith("http")
                ? ' target="_blank" rel="noopener noreferrer"'
                : "";
              return `<a href="${href}"${target} style="color: hsl(var(--foreground)); text-decoration: underline; opacity: 0.8;">${children || ""}</a>`;
            },
          },
        },
      })
    : undefined;

  // Map the international article + selected localization to the ClientArticle shape
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
    />
  );
}
