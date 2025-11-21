import { getAllArticles } from "@/sanity/queries/articles";
import { urlFor } from "@/sanity/lib/image";
import NewsClient from "./news-client";

const ARTICLES_PER_PAGE = 6;

interface NewsPageProps {
  searchParams: Promise<{ category?: string | string[]; page?: string }>;
}

// Helper function to extract YouTube ID from embed link
function extractYouTubeId(embedLink?: string): string | undefined {
  if (!embedLink) return undefined;
  const match = embedLink.match(
    /(?:youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/live\/)([^&\n?#]+)/,
  );
  return match ? match[1] : undefined;
}

// Helper function to format date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image?: string;
  youtubeId?: string;
  author?: string;
  authorRole?: string;
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams;

  // Get category filter from URL params (can be string or array)
  const categoryParam = params.category;
  const selectedCategories = Array.isArray(categoryParam)
    ? categoryParam
    : categoryParam
      ? [categoryParam]
      : [];

  // Fetch articles on the server
  const sanityArticles = await getAllArticles();

  // Transform Sanity articles to match expected format
  const allArticles: Article[] = sanityArticles.map((article) => ({
    slug: article.slug.current,
    title: article.title,
    excerpt: article.excerpt || "",
    category: article.category || "Uncategorized",
    date: formatDate(article.publishedAt),
    readTime: article.readTime || "5 min read",
    image: article.image ? urlFor(article.image).url() : undefined,
    youtubeId: extractYouTubeId(article.embedLink),
    embedLink: article.embedLink || undefined,
    author: article.author || undefined,
    authorRole: article.authorRole || undefined,
  }));

  // Filter articles by selected categories
  const filteredArticles =
    selectedCategories.length > 0
      ? allArticles.filter((article) =>
          selectedCategories.includes(article.category),
        )
      : allArticles;

  // Get all unique categories for the selector
  const allCategories = Array.from(
    new Set(allArticles.map((article) => article.category)),
  ).sort();

  return (
    <NewsClient
      articles={filteredArticles}
      allCategories={allCategories}
      selectedCategories={selectedCategories}
      articlesPerPage={ARTICLES_PER_PAGE}
    />
  );
}
