import { getAllArticles } from "@/sanity/queries/articles";
import { urlFor } from "@/sanity/lib/image";
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
  searchParams: Promise<{
    category?: string | string[];
    language?: string | string[];
    page?: string;
  }>;
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams;

  const categoryParam = params.category;
  const selectedCategories = Array.isArray(categoryParam)
    ? categoryParam
    : categoryParam
      ? [categoryParam]
      : [];

  const languageParam = params.language;
  const selectedLanguages = Array.isArray(languageParam)
    ? languageParam
    : languageParam
      ? [languageParam]
      : [];

  const sanityArticles = await getAllArticles();

  const allArticles = sanityArticles.map((article) => ({
    slug: article.slug.current,
    title: article.title,
    excerpt: article.excerpt || "",
    category: article.category || "Uncategorized",
    date: formatDate(article.publishedAt),
    readTime: article.readTime || "5 min read",
    image: article.image ? urlFor(article.image).url() : undefined,
    youtubeId: extractYouTubeId(article.embedLink),
    author: article.author || undefined,
    authorRole: article.authorRole || undefined,
    language: article.language || "en",
  }));

  let filteredArticles = allArticles;

  if (selectedLanguages.length > 0) {
    filteredArticles = filteredArticles.filter((article) =>
      selectedLanguages.includes(article.language || "en")
    );
  }

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
      selectedLanguages={selectedLanguages}
      articlesPerPage={ARTICLES_PER_PAGE}
    />
  );
}
