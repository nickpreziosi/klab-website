import { getTranslations } from "next-intl/server";
import { getAllInternationalArticles } from "@/sanity/queries/articles";
import { urlForSized } from "@/sanity/lib/image";
import { NewsView } from "@/ui/news/views/NewsView/NewsView";

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

interface NewsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    category?: string | string[];
    page?: string;
    lang?: string | string[];
  }>;
}

export default async function NewsPage({ params, searchParams }: NewsPageProps) {
  const { locale } = await params;
  const resolvedParams = await searchParams;

  const categoryParam = resolvedParams.category;
  const selectedCategories = Array.isArray(categoryParam)
    ? categoryParam
    : categoryParam
      ? [categoryParam]
      : [];

  const langParam = resolvedParams.lang;
  const selectedLanguages: string[] = langParam
    ? Array.isArray(langParam)
      ? langParam
      : [langParam]
    : [];

  const  internationalArticles = await
    getAllInternationalArticles();

  const mappedInternational = internationalArticles.flatMap((article) => {
    // When languages are selected, skip articles that don't have any of them
    if (
      selectedLanguages.length > 0 &&
      !article.localizations?.some((l) => selectedLanguages.includes(l.language))
    ) {
      return [];
    }

    // Pick display localization:
    // 1. First matching selected language (if filter active)
    // 2. Locale language
    // 3. English
    // 4. First available
    const preferredLangs =
      selectedLanguages.length > 0
        ? [...selectedLanguages, locale, "en"]
        : [locale, "en"];

    const localization =
      preferredLangs.reduce<(typeof article.localizations)[number] | undefined>(
        (found, lang) => found ?? article.localizations?.find((l) => l.language === lang),
        undefined
      ) ?? article.localizations?.[0];

    if (!localization) return [];

    return [
      {
        slug: article.slug.current,
        title: localization.title,
        excerpt: localization.excerpt || "",
        category: article.category || "Uncategorized",
        date: formatDate(article.publishedAt),
        readTime: article.readTime || "5 min read",
        image: localization.image
          ? urlForSized(localization.image, { width: 500, quality: 75 })
          : undefined,
        youtubeId: extractYouTubeId(article.embedLink),
        embedLink: article.embedLink || undefined,
        author: article.author || undefined,
        authorRole: article.authorRole || undefined,
        lang: localization.language,
      },
    ];
  });

  const allArticles = [...mappedInternational];

  let filteredArticles = allArticles;
  if (selectedCategories.length > 0) {
    filteredArticles = filteredArticles.filter((article) =>
      selectedCategories.includes(article.category)
    );
  }

  const allCategories = Array.from(new Set(allArticles.map((article) => article.category))).sort();

  const t = await getTranslations("newsPage");
  return (
    <NewsView
      articles={filteredArticles}
      allCategories={allCategories}
      selectedCategories={selectedCategories}
      articlesPerPage={ARTICLES_PER_PAGE}
      showNewsCards={false}
      heroTitle={t("heroTitleKlab")}
      heroSubtitle=""
      breadcrumbCurrent={t("breadcrumbKlab")}
      emptyStateMessage={t("emptyStateKlab")}
      showExploreRootsCta={true}
      showLanguageFilter={true}
      selectedLanguages={selectedLanguages}
    />
  );
}
