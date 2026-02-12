import { getArticleBySlug } from "@/sanity/queries/articles";
import { urlFor, urlForSized } from "@/sanity/lib/image";
import { toHTML } from "@portabletext/to-html";
import { ArticleView } from "@/ui/news/views/ArticleView/ArticleView";
import { ArticleNotFoundView } from "@/ui/news/views/ArticleNotFoundView/ArticleNotFoundView";

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
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return <ArticleNotFoundView />;
  }

  const imageUrl = article.image
    ? urlForSized(article.image, { width: 1200, height: 600 })
    : undefined;
  const formattedDate = formatDate(article.publishedAt);

  const galleryImageUrls: Array<{ url: string; caption?: string; alt?: string }> =
    article.gallery
      ?.map((galleryImage): { url: string; caption?: string; alt?: string } | null => {
        if (!galleryImage?.asset) return null;
        return {
          url: urlForSized(galleryImage, { width: 1200 }),
          caption: galleryImage.caption,
          alt: galleryImage.alt,
        };
      })
      .filter((item): item is { url: string; caption?: string; alt?: string } => item !== null) ||
    [];

  const bodyHTML = article.body
    ? toHTML(article.body, {
        components: {
          types: {
            image: ({
              value,
            }: {
              value: { asset?: { _ref: string }; alt?: string; caption?: string };
            }) => {
              if (!value?.asset) return "";
              const imgUrl = urlForSized(value as { asset: { _ref: string } }, {
                width: 800,
                height: 600,
              });
              const alt = value.alt || "Article image";
              const caption = value.caption ? `<figcaption>${value.caption}</figcaption>` : "";
              return `<figure style="margin: 24px 0;"><img src="${imgUrl}" alt="${alt}" style="width: 100%; height: auto; border-radius: var(--rounded-app);" />${caption}</figure>`;
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
      article={article}
      imageUrl={imageUrl}
      formattedDate={formattedDate}
      galleryImageUrls={galleryImageUrls}
      bodyHTML={bodyHTML}
    />
  );
}
