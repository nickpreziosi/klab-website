import { getTranslations } from "next-intl/server";
import { getAllArticles } from "@/sanity/queries/articles";
import { urlForSized } from "@/sanity/lib/image";
import { NewsView } from "@/ui/news/views/NewsView/NewsView";
import { formatReadTimeWithUnit } from "@/ui/news/utils/read-time";
import { toCanonicalNewsCategoryKey } from "@/constants/news-categories";

const ARTICLES_PER_PAGE = 6;

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function extractYouTubeId(embedLink?: string): string | undefined {
  if (!embedLink) return undefined;
  const match = embedLink.match(
    /(?:youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/live\/)([^&\n?#]+)/
  );
  return match ? match[1] : undefined;
}

interface NewsKeoPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    category?: string | string[];
    page?: string;
  }>;
}

export default async function NewsKeoPage({ params, searchParams }: NewsKeoPageProps) {
  const { locale } = await params;
  const resolvedParams = await searchParams;

  const categoryParam = resolvedParams.category;
  const selectedCategories = Array.isArray(categoryParam)
    ? categoryParam
    : categoryParam
      ? [categoryParam]
      : [];

  const sanityArticles = await getAllArticles();
  const t = await getTranslations("newsPage");
  const minutesLabel = t("readTimeMinutes");

  const allArticles = sanityArticles.map((article) => ({
    slug: article.slug.current,
    title: article.title,
    excerpt: article.excerpt || "",
    category: String(toCanonicalNewsCategoryKey(article.category)),
    date: formatDate(article.publishedAt),
    readTime: formatReadTimeWithUnit(article.readTime, minutesLabel) ?? "",
    image: article.image ? urlForSized(article.image, { width: 500, quality: 75 }) : undefined,
    youtubeId: extractYouTubeId(article.embedLink),
    embedLink: article.embedLink || undefined,
    author: article.author || undefined,
    authorRole: article.authorRole || undefined,
  }));

  let filteredArticles = allArticles;

  if (selectedCategories.length > 0) {
    filteredArticles = filteredArticles.filter((article) =>
      selectedCategories.includes(article.category)
    );
  }

  const allCategories = Array.from(new Set(allArticles.map((article) => article.category))).sort();

  return (
    <NewsView
      articles={filteredArticles}
      allCategories={allCategories}
      selectedCategories={selectedCategories}
      articlesPerPage={ARTICLES_PER_PAGE}
      showNewsCards={false}
      heroTitle={t("heroTitleKeo")}
      heroSubtitle=""
      breadcrumbCurrent={t("breadcrumbKeo")}
      emptyStateMessage={t("emptyStateKeo")}
      showExploreRootsCta={false}
      contentDirection={locale === "ar" ? "rtl" : "ltr"}
      articlesContentDirection="ltr"
      articleHrefBase="/news/keo"
    />
  );
}
