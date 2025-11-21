import { getAllArticles } from "@/sanity/queries/articles";
import { urlFor } from "@/sanity/lib/image";
import NewsClient from "./news-client";

const ARTICLES_PER_PAGE = 6;

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

export default async function NewsPage() {
  // Fetch articles on the server
  const sanityArticles = await getAllArticles();

  // Transform Sanity articles to match expected format
  const articles: Article[] = sanityArticles.map((article) => ({
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

  return <NewsClient articles={articles} articlesPerPage={ARTICLES_PER_PAGE} />;
}
