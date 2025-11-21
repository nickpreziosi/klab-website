import { groq } from "next-sanity";
import { client } from "../client";

export interface SanityArticle {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  image?: {
    asset: {
      _ref?: string;
      _type?: string;
    };
    caption?: string;
    alt?: string;
  };
  embedLink?: string;
  body?: Array<{
    _type: string;
    [key: string]: unknown;
  }>; // Portable text blocks
  author?: string;
  authorRole?: string;
  category?: string;
  readTime?: string;
  excerpt?: string;
  gallery?: Array<{
    asset: {
      _ref?: string;
      _type?: string;
    };
    caption?: string;
    alt?: string;
  }>;
}

// Query to get all articles with pagination
export const articlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    image {
      asset
    },
    embedLink,
    author,
    authorRole,
    category,
    readTime,
    excerpt
  }
`;

// Query to get a single article by slug
export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    image {
      asset,
      caption,
      alt
    },
    embedLink,
    body,
    author,
    authorRole,
    category,
    readTime,
    excerpt,
    gallery[] {
      asset,
      caption,
      alt
    }
  }
`;

// Fetch all articles
export async function getAllArticles(): Promise<SanityArticle[]> {
  return await client.fetch<SanityArticle[]>(articlesQuery);
}

// Fetch article by slug
export async function getArticleBySlug(slug: string): Promise<SanityArticle | null> {
  return await client.fetch<SanityArticle | null>(articleBySlugQuery, { slug });
}
