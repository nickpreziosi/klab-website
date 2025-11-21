/**
 * Script to populate Sanity with articles from a JSON file
 *
 * Usage:
 * 1. Create articles.json with article data
 * 2. Create .env.local with SANITY_API_TOKEN
 * 3. npx tsx scripts/populate-articles-from-json.ts
 */

import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";

// Load environment variables from .env
try {
  const envPath = path.join(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, "utf-8");
    envFile.split("\n").forEach((line) => {
      const match = line.match(/^([^=:#]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^["']|["']$/g, "");
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    });
  }
} catch (error) {
  // Ignore errors loading .env
}

// Check for API token
if (!process.env.SANITY_API_TOKEN) {
  console.error("\n❌ Error: SANITY_API_TOKEN is not set!");
  console.log("\nPlease set your Sanity API token:");
  console.log("1. Create a .env file in the project root");
  console.log("2. Add: SANITY_API_TOKEN=your-token-here");
  console.log("\nOr set it in your terminal:");
  console.log("  export SANITY_API_TOKEN='your-token-here'");
  console.log("\nGet your token from: https://sanity.io/manage → Your Project → API → Tokens");
  process.exit(1);
}

// Sanity client configuration
const client = createClient({
  projectId: "mp87vpva",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Categories
const CATEGORIES = [
  "Interviews & Insights",
  "Company Updates",
  "Press Release",
  "Technology & Innovation",
  "Events & Announcements",
  "Social Media Highlights",
  "Video Features",
  "Awards & Recognition",
] as const;

type Category = (typeof CATEGORIES)[number];

interface ArticleData {
  title: string;
  slug?: string | { _type: string; current: string };
  excerpt?: string;
  content?: string; // HTML content
  body?: any[]; // Portable Text blocks
  imageUrl?: string;
  image?: {
    _type?: string;
    asset?: {
      url?: string;
      _ref?: string;
      _type?: string;
    };
    caption?: string;
    alt?: string;
  };
  videoUrl?: string;
  embedLink?: string;
  link?: string; // URL to fetch article from
  publishedDate?: string;
  publishedAt?: string;
  category?: Category;
  author?: string;
  authorRole?: string;
  readTime?: string;
}

// Helper function to calculate read time
function calculateReadTime(content: string): string {
  // Remove HTML tags for word count
  const text = content.replace(/<[^>]*>/g, " ");
  const words = text.split(/\s+/).filter((word) => word.length > 0).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

// Helper function to convert HTML to Portable Text blocks
function htmlToPortableText(html: string): any[] {
  const blocks: any[] = [];

  if (!html || !html.trim()) {
    return blocks;
  }

  // Process all paragraphs first - get ALL of them
  const paragraphRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  const paragraphs = [...html.matchAll(paragraphRegex)];

  for (const paraMatch of paragraphs) {
    let text = paraMatch[1];
    // Remove nested tags but preserve text
    text = text
      .replace(/<strong[^>]*>(.*?)<\/strong>/gi, "$1") // Preserve strong text
      .replace(/<em[^>]*>(.*?)<\/em>/gi, "$1") // Preserve em text
      .replace(/<a[^>]*>(.*?)<\/a>/gi, "$1") // Preserve link text
      .replace(/<[^>]*>/g, "") // Remove all other tags
      .trim();

    if (text && text.length > 0) {
      blocks.push({
        _type: "block",
        _key: generateKey(),
        style: "normal",
        children: [{ _type: "span", text: text, marks: [] }],
        markDefs: [],
      });
    }
  }

  // Process all headings
  const headingRegex = /<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi;
  const headings = [...html.matchAll(headingRegex)];

  for (const headingMatch of headings) {
    const level = headingMatch[1].toLowerCase();
    let text = headingMatch[2].replace(/<[^>]*>/g, "").trim();

    if (text && text.length > 0) {
      const style = level === "h1" || level === "h2" ? "h2" : "h3";
      blocks.push({
        _type: "block",
        _key: generateKey(),
        style: style,
        children: [{ _type: "span", text: text, marks: [] }],
        markDefs: [],
      });
    }
  }

  // Process all blockquotes
  const blockquoteRegex = /<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi;
  const blockquotes = [...html.matchAll(blockquoteRegex)];

  for (const quoteMatch of blockquotes) {
    let text = quoteMatch[1].replace(/<[^>]*>/g, "").trim();
    if (text && text.length > 0) {
      blocks.push({
        _type: "block",
        _key: generateKey(),
        style: "blockquote",
        children: [{ _type: "span", text: text, marks: [] }],
        markDefs: [],
      });
    }
  }

  // Process all lists
  const listRegex = /<(ul|ol)[^>]*>([\s\S]*?)<\/\1>/gi;
  const lists = [...html.matchAll(listRegex)];

  for (const listMatch of lists) {
    const listType = listMatch[1].toLowerCase();
    const listContent = listMatch[2];
    const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
    const listItems = [...listContent.matchAll(liRegex)];

    for (const liMatch of listItems) {
      let text = liMatch[1].replace(/<[^>]*>/g, "").trim();
      if (text && text.length > 0) {
        blocks.push({
          _type: "block",
          _key: generateKey(),
          style: "normal",
          listItem: listType === "ul" ? "bullet" : "number",
          children: [{ _type: "span", text: text, marks: [] }],
          markDefs: [],
        });
      }
    }
  }

  // Process divs that might contain text (fallback for content not in standard tags)
  if (blocks.length === 0) {
    // Try to extract text from divs
    const divRegex = /<div[^>]*>([\s\S]*?)<\/div>/gi;
    const divs = [...html.matchAll(divRegex)];

    for (const divMatch of divs) {
      let text = divMatch[1]
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/<[^>]*>/g, "")
        .trim();

      // Only add if it's substantial text (more than 50 chars) and doesn't look like navigation
      if (text && text.length > 50 && !text.match(/^(home|about|contact|menu|navigation)/i)) {
        blocks.push({
          _type: "block",
          _key: generateKey(),
          style: "normal",
          children: [{ _type: "span", text: text, marks: [] }],
          markDefs: [],
        });
      }
    }
  }

  // Final fallback: if still no blocks, extract all text
  if (blocks.length === 0) {
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (text && text.length > 0) {
      // Split into paragraphs by double newlines or long text
      const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);
      for (const para of paragraphs) {
        if (para.trim().length > 0) {
          blocks.push({
            _type: "block",
            _key: generateKey(),
            style: "normal",
            children: [{ _type: "span", text: para.trim(), marks: [] }],
            markDefs: [],
          });
        }
      }
    }
  }

  return blocks;
}

function generateKey(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Helper function to determine category based on content
function determineCategory(title: string, content: string): Category {
  const lowerTitle = title.toLowerCase();
  const lowerContent = content.toLowerCase();

  if (lowerTitle.includes("interview") || lowerContent.includes("interview")) {
    return "Interviews & Insights";
  }
  if (lowerTitle.includes("award") || lowerContent.includes("award") || lowerContent.includes("recognition") || lowerContent.includes("honored")) {
    return "Awards & Recognition";
  }
  if (lowerTitle.includes("video") || lowerContent.includes("video") || lowerContent.includes("watch") || lowerTitle.includes("interview")) {
    return "Video Features";
  }
  if (lowerTitle.includes("press") || lowerContent.includes("press release") || lowerContent.includes("announce")) {
    return "Press Release";
  }
  if (lowerTitle.includes("event") || lowerContent.includes("event") || lowerContent.includes("launch") || lowerContent.includes("celebrate")) {
    return "Events & Announcements";
  }
  if (lowerTitle.includes("technology") || lowerTitle.includes("innovation") || lowerContent.includes("technology") || lowerContent.includes("innovation") || lowerContent.includes("blockchain")) {
    return "Technology & Innovation";
  }
  if (lowerTitle.includes("update") || lowerContent.includes("company update") || lowerContent.includes("partnership")) {
    return "Company Updates";
  }
  if (lowerContent.includes("social") || lowerContent.includes("twitter") || lowerContent.includes("linkedin")) {
    return "Social Media Highlights";
  }

  // Default fallback
  return "Company Updates";
}

// Helper function to extract YouTube ID
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/watch\?v=)([^&\n?#]+)/,
    /youtube\.com\/.*[?&]v=([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Helper function to scrape article content from URL
async function scrapeArticle(url: string): Promise<{
  content: string;
  excerpt: string;
  imageUrl?: string;
  videoUrl?: string;
  author?: string;
  authorRole?: string;
  publishedDate?: string;
}> {
  try {
    console.log(`  Fetching article from: ${url}`);
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();

    // Extract content - try multiple strategies to get FULL content
    let content = "";

    // Strategy 1: Look for article tag - get ALL content from article
    const articleContentMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
    if (articleContentMatch) {
      let articleHtml = articleContentMatch[1];

      // First, try to find ALL divs and get the one with most paragraphs/text
      const allDivs = [...articleHtml.matchAll(/<div[^>]*>([\s\S]*?)<\/div>/gi)];
      let bestContent = "";
      let maxParaCount = 0;
      let maxTextLength = 0;

      for (const divMatch of allDivs) {
        const divContent = divMatch[1];
        const paraCount = (divContent.match(/<p[^>]*>/gi) || []).length;
        const textLength = divContent.replace(/<[^>]*>/g, "").trim().length;

        // Prefer divs with many paragraphs and substantial text
        // Skip divs that look like navigation, headers, footers
        const lowerContent = divContent.toLowerCase();
        const isNavigation = lowerContent.includes('nav') || lowerContent.includes('menu') ||
                            lowerContent.includes('header') || lowerContent.includes('footer') ||
                            lowerContent.includes('sidebar') || lowerContent.includes('widget');

        if (!isNavigation && paraCount > maxParaCount) {
          bestContent = divContent;
          maxParaCount = paraCount;
          maxTextLength = textLength;
        } else if (!isNavigation && paraCount === maxParaCount && textLength > maxTextLength) {
          bestContent = divContent;
          maxTextLength = textLength;
        }
      }

      // If we found good content, use it; otherwise use entire article
      if (bestContent && maxParaCount > 5) {
        content = bestContent;
      } else {
        // Use entire article content - it might be structured differently
        content = articleHtml;
      }
    }

    // Strategy 2: Look for main content divs anywhere in page
    if (!content || content.length < 300) {
      const mainContentRegex = /<div[^>]*(?:class|id)="[^"]*(?:content|post-content|entry-content|article-content|post-body|rich-text|article-body|text|body|main-content)[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
      const mainContentMatches = [...html.matchAll(mainContentRegex)];

      if (mainContentMatches.length > 0) {
        let largestContent = "";
        let maxParaCount = 0;
        for (const match of mainContentMatches) {
          const matchContent = match[1];
          const paraCount = (matchContent.match(/<p[^>]*>/gi) || []).length;
          // Prefer content with more paragraphs
          if (paraCount > maxParaCount || (paraCount === maxParaCount && matchContent.length > largestContent.length)) {
            largestContent = matchContent;
            maxParaCount = paraCount;
          }
        }
        if (largestContent.length > content.length) {
          content = largestContent;
        }
      }
    }

    // Strategy 3: Look for main tag
    if (!content || content.length < 300) {
      const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
      if (mainMatch) {
        const mainContent = mainMatch[1];
        // Try to find content div within main
        const mainContentDiv = mainContent.match(/<div[^>]*(?:class|id)="[^"]*(?:content|article|post)[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
        if (mainContentDiv && mainContentDiv[1].length > content.length) {
          content = mainContentDiv[1];
        } else if (mainContent.length > content.length) {
          content = mainContent;
        }
      }
    }

    // Strategy 4: Look for section with article content
    if (!content || content.length < 300) {
      const sectionMatch = html.match(/<section[^>]*(?:class|id)="[^"]*(?:content|article|post)[^"]*"[^>]*>([\s\S]*?)<\/section>/i);
      if (sectionMatch && sectionMatch[1].length > content.length) {
        content = sectionMatch[1];
      }
    }

    // Strategy 5: If we have article tag content but it's still short, try to get ALL paragraphs from it
    if (content && articleContentMatch) {
      const allParagraphs = [...articleContentMatch[1].matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)];
      if (allParagraphs.length > (content.match(/<p[^>]*>/gi) || []).length) {
        // Reconstruct content from all paragraphs found in article
        let reconstructedContent = "";
        for (const paraMatch of allParagraphs) {
          const paraText = paraMatch[1].replace(/<[^>]*>/g, "").trim();
          if (paraText.length > 20) { // Only include substantial paragraphs
            reconstructedContent += `<p>${paraMatch[1]}</p>`;
          }
        }
        if (reconstructedContent.length > content.length) {
          content = reconstructedContent;
          console.log(`  Reconstructed content from all paragraphs: ${reconstructedContent.replace(/<[^>]*>/g, "").length} chars`);
        }
      }
    }

    // Extract excerpt/description
    const excerptMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
    const excerpt = excerptMatch ? excerptMatch[1] : "";

    // Extract ALL images - be more thorough
    let imageUrl: string | undefined;
    const allImages: string[] = [];

    // Strategy 1: Meta tags for featured image (highest priority)
    const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
    const twitterImageMatch = html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i);

    if (ogImageMatch) {
      imageUrl = ogImageMatch[1];
      allImages.push(imageUrl);
    } else if (twitterImageMatch) {
      imageUrl = twitterImageMatch[1];
      allImages.push(imageUrl);
    }

    // Strategy 2: Look for featured/hero images in HTML
    const featuredImgMatch = html.match(/<img[^>]*(?:class|id)="[^"]*(?:featured|hero|cover|header|banner|main-image)[^"]*"[^>]*src=["']([^"']+)["']/i);
    if (featuredImgMatch) {
      const imgSrc = featuredImgMatch[1];
      if (!imageUrl) imageUrl = imgSrc;
      allImages.push(imgSrc);
    }

    // Strategy 3: Extract ALL images from content
    if (content) {
      // Match img tags with src attribute
      const imgMatches = [...content.matchAll(/<img[^>]*src=["']([^"']+)["']/gi)];
      // Also match data-src (lazy loading)
      const dataSrcMatches = [...content.matchAll(/<img[^>]*data-src=["']([^"']+)["']/gi)];
      // Also match srcset
      const srcsetMatches = [...content.matchAll(/<img[^>]*srcset=["']([^"']+)["']/gi)];

      for (const match of imgMatches) {
        const imgSrc = match[1];
        if (imgSrc && !imgSrc.includes('data:') && !imgSrc.includes('placeholder') && !imgSrc.includes('icon') && !imgSrc.includes('logo')) {
          const fullUrl = imgSrc.startsWith("http") ? imgSrc : new URL(imgSrc, url).href;
          if (!allImages.includes(fullUrl)) {
            allImages.push(fullUrl);
          }
        }
      }

      for (const match of dataSrcMatches) {
        const imgSrc = match[1];
        if (imgSrc && !imgSrc.includes('data:') && !imgSrc.includes('placeholder')) {
          const fullUrl = imgSrc.startsWith("http") ? imgSrc : new URL(imgSrc, url).href;
          if (!allImages.includes(fullUrl)) {
            allImages.push(fullUrl);
          }
        }
      }

      // Extract from srcset (first URL)
      for (const match of srcsetMatches) {
        const srcset = match[1];
        const firstUrl = srcset.split(',')[0].trim().split(' ')[0];
        if (firstUrl && !firstUrl.includes('data:')) {
          const fullUrl = firstUrl.startsWith("http") ? firstUrl : new URL(firstUrl, url).href;
          if (!allImages.includes(fullUrl)) {
            allImages.push(fullUrl);
          }
        }
      }
    }

    // Strategy 4: Look for images in the entire HTML (not just content area)
    const allHtmlImgMatches = [...html.matchAll(/<img[^>]*src=["']([^"']+)["']/gi)];
    for (const match of allHtmlImgMatches) {
      const imgSrc = match[1];
      if (imgSrc && !imgSrc.includes('data:') && !imgSrc.includes('placeholder') && !imgSrc.includes('icon') && !imgSrc.includes('logo') && imgSrc.length > 10) {
        const fullUrl = imgSrc.startsWith("http") ? imgSrc : new URL(imgSrc, url).href;
        if (!allImages.includes(fullUrl)) {
          allImages.push(fullUrl);
        }
      }
    }

    // Choose best image: prefer larger images (check dimensions or file size indicators)
    if (!imageUrl && allImages.length > 0) {
      // Prefer images that look like featured images (contain certain keywords or are larger)
      const featuredKeywords = ['featured', 'hero', 'cover', 'header', 'main', 'banner'];
      for (const img of allImages) {
        const lowerImg = img.toLowerCase();
        if (featuredKeywords.some(keyword => lowerImg.includes(keyword))) {
          imageUrl = img;
          break;
        }
      }
      // If no featured keyword match, use first image
      if (!imageUrl) {
        imageUrl = allImages[0];
      }
    }

    // Log found images for debugging
    if (allImages.length > 0) {
      console.log(`  Found ${allImages.length} image(s)`);
    }

    // Extract video - check both iframes and video tags
    let videoUrl: string | undefined;
    const iframeMatch = html.match(/<iframe[^>]*src=["']([^"']+)["']/i);
    const videoTagMatch = html.match(/<video[^>]*src=["']([^"']+)["']/i);
    if (iframeMatch) {
      videoUrl = iframeMatch[1];
    } else if (videoTagMatch) {
      videoUrl = videoTagMatch[1];
    }

    // Extract publish date - try multiple formats
    let publishedDate: string | undefined;

    // Try meta tags first
    const dateMetaMatch = html.match(/<meta[^>]*property=["']article:published_time["'][^>]*content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]*name=["']publish-date["'][^>]*content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]*property=["']article:published["'][^>]*content=["']([^"']+)["']/i);

    if (dateMetaMatch) {
      publishedDate = dateMetaMatch[1];
    } else {
      // Try to find date in content - look for time tags or date patterns
      const timeMatch = html.match(/<time[^>]*datetime=["']([^"']+)["']/i) ||
        html.match(/<time[^>]*>([^<]+)<\/time>/i);
      if (timeMatch) {
        publishedDate = timeMatch[1];
      } else {
        // Look for date patterns in text
        const datePatterns = [
          /(?:Published|Posted|Date)[\s:]*([A-Z][a-z]+\s+\d{1,2},?\s+\d{4})/i,
          /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/,
          /([A-Z][a-z]+\s+\d{1,2},?\s+\d{4})/,
        ];

        for (const pattern of datePatterns) {
          const match = html.match(pattern);
          if (match) {
            try {
              const date = new Date(match[1]);
              if (!isNaN(date.getTime())) {
                publishedDate = date.toISOString();
                break;
              }
            } catch (e) {
              // Continue to next pattern
            }
          }
        }
      }
    }

    // Extract author (if available)
    const authorMatch = html.match(/<meta[^>]*property=["']article:author["'][^>]*content=["']([^"']+)["']/i) ||
      html.match(/<span[^>]*class=["'][^"]*author[^"]*["'][^>]*>([^<]+)</i) ||
      html.match(/<div[^>]*class=["'][^"]*author[^"]*["'][^>]*>([^<]+)</i);
    const author = authorMatch ? authorMatch[1].trim() : undefined;

    // If content is too short, try extracting from the entire page more aggressively
    if (!content || content.replace(/<[^>]*>/g, "").trim().length < 1000) {
      console.log(`  Content too short (${content.replace(/<[^>]*>/g, "").trim().length} chars), trying alternative extraction...`);

      // Try to find any large text blocks in the entire HTML
      const allDivs = [...html.matchAll(/<div[^>]*>([\s\S]*?)<\/div>/gi)];
      let largestTextBlock = "";
      let largestParaCount = 0;

      for (const divMatch of allDivs) {
        const divContent = divMatch[1];
        const textOnly = divContent.replace(/<[^>]*>/g, " ").trim();
        const paraCount = (divContent.match(/<p[^>]*>/gi) || []).length;

        // Skip navigation, headers, footers
        const lowerContent = divContent.toLowerCase();
        const isNavigation = lowerContent.includes('nav') || lowerContent.includes('menu') ||
                            lowerContent.includes('header') || lowerContent.includes('footer') ||
                            lowerContent.includes('sidebar') || lowerContent.includes('widget') ||
                            lowerContent.includes('button') || lowerContent.includes('link');

        // Look for divs with substantial text content and many paragraphs
        if (!isNavigation && textOnly.length > 1000 && paraCount > 5) {
          if (paraCount > largestParaCount || (paraCount === largestParaCount && textOnly.length > largestTextBlock.replace(/<[^>]*>/g, "").length)) {
            largestTextBlock = divContent;
            largestParaCount = paraCount;
          }
        }
      }

      if (largestTextBlock && largestTextBlock.replace(/<[^>]*>/g, "").trim().length > content.replace(/<[^>]*>/g, "").trim().length) {
        content = largestTextBlock;
        console.log(`  Found larger content block: ${largestTextBlock.replace(/<[^>]*>/g, "").trim().length} chars, ${largestParaCount} paragraphs`);
      }
    }

    // Clean up content - remove scripts, styles, navigation, but keep all paragraphs and content
    content = content
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<nav[\s\S]*?<\/nav>/gi, "")
      .replace(/<header[\s\S]*?<\/header>/gi, "")
      .replace(/<footer[\s\S]*?<\/footer>/gi, "")
      .replace(/<aside[\s\S]*?<\/aside>/gi, "")
      // Remove common non-content elements but preserve article content
      .replace(/<div[^>]*class="[^"]*(?:sidebar|navigation|menu|footer|header|social|share|comments|widget)[^"]*"[^>]*>[\s\S]*?<\/div>/gi, "")
      .replace(/<div[^>]*id="[^"]*(?:sidebar|navigation|menu|footer|header|social|share|comments|widget)[^"]*"[^>]*>[\s\S]*?<\/div>/gi, "")
      // Remove empty divs
      .replace(/<div[^>]*>\s*<\/div>/gi, "")
      // Remove forms
      .replace(/<form[\s\S]*?<\/form>/gi, "")
      // Remove buttons and links that are not content
      .replace(/<a[^>]*class="[^"]*(?:button|btn|link|nav)[^"]*"[^>]*>[\s\S]*?<\/a>/gi, "");

    // Log content length for debugging
    const contentLength = content.replace(/<[^>]*>/g, "").trim().length;
    const paragraphCount = (content.match(/<p[^>]*>/gi) || []).length;
    console.log(`  Extracted ${contentLength} characters, ${paragraphCount} paragraphs`);

    // Normalize image URLs
    if (imageUrl && !imageUrl.startsWith("http")) {
      imageUrl = new URL(imageUrl, url).href;
    }
    if (videoUrl && !videoUrl.startsWith("http")) {
      videoUrl = new URL(videoUrl, url).href;
    }

    return {
      content: content || "",
      excerpt: excerpt || "",
      imageUrl,
      videoUrl,
      author,
      publishedDate,
    };
  } catch (error) {
    console.error(`  Error scraping article:`, error);
    return { content: "", excerpt: "", imageUrl: undefined, videoUrl: undefined, publishedDate: undefined };
  }
}

// Helper function to upload image to Sanity
async function uploadImageToSanity(imageUrl: string): Promise<string | null> {
  try {
    // Try multiple times with different approaches for SSL issues
    let response: Response | null = null;
    let lastError: Error | null = null;

    // Try with standard fetch first
    try {
      response = await fetch(imageUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      });
    } catch (fetchError: any) {
      lastError = fetchError;
      // If SSL error, try with https agent that accepts self-signed certs
      if (fetchError.code === 'UNABLE_TO_VERIFY_LEAF_SIGNATURE' || fetchError.message.includes('certificate')) {
        console.warn(`  SSL certificate issue with ${imageUrl}, skipping...`);
        return null;
      }
      throw fetchError;
    }

    if (!response || !response.ok) {
      console.warn(`  Failed to fetch image: ${imageUrl} (${response?.status || 'unknown'})`);
      return null;
    }

    const buffer = await response.arrayBuffer();
    const filename = imageUrl.split("/").pop()?.split("?")[0] || "image.jpg";

    const asset = await client.assets.upload("image", Buffer.from(buffer), {
      filename: filename,
    });

    return asset._id;
  } catch (error: any) {
    // Don't fail the entire process if one image fails
    if (error.code === 'UNABLE_TO_VERIFY_LEAF_SIGNATURE' || error.message?.includes('certificate')) {
      console.warn(`  SSL certificate issue with ${imageUrl}, skipping...`);
    } else {
      console.warn(`  Error uploading image ${imageUrl}:`, error.message || error);
    }
    return null;
  }
}

// Main function
async function populateArticles() {
  // Try test-article.json first, then fall back to articles.json
  let jsonPath = path.join(process.cwd(), "scripts", "test-article.json");
  if (!fs.existsSync(jsonPath)) {
    jsonPath = path.join(process.cwd(), "scripts", "articles.json");
  }

  if (!fs.existsSync(jsonPath)) {
    console.error(`Error: ${jsonPath} not found.`);
    console.log("\nPlease create articles.json with the following structure:");
    console.log(JSON.stringify(
      [
        {
          title: "Article Title",
          excerpt: "Article excerpt/summary",
          content: "<p>Article content in HTML format</p>",
          imageUrl: "https://example.com/image.jpg",
          videoUrl: "https://www.youtube.com/watch?v=...", // Optional
          publishedDate: "2024-01-15T00:00:00.000Z", // ISO date string
          category: "Company Updates", // Optional, will be auto-determined if not provided
          author: "Author Name", // Optional
          authorRole: "Author Role", // Optional
        },
      ],
      null,
      2
    ));
    process.exit(1);
  }

  const articlesData: ArticleData[] = JSON.parse(
    fs.readFileSync(jsonPath, "utf-8")
  );

  console.log(`Found ${articlesData.length} articles to process\n`);

  for (let i = 0; i < articlesData.length; i++) {
    const data = articlesData[i];

    try {
      if (!data.title) {
        console.warn(`Skipping article ${i + 1}: No title provided`);
        continue;
      }

      console.log(`Processing ${i + 1}/${articlesData.length}: ${data.title}`);

      // Handle slug - can be string or object
      let slugValue: { _type: string; current: string };
      if (typeof data.slug === "string") {
        slugValue = {
          _type: "slug",
          current: data.slug,
        };
      } else if (data.slug && typeof data.slug === "object" && "current" in data.slug) {
        slugValue = {
          _type: "slug",
          current: data.slug.current,
        };
      } else {
        // Generate slug from title
        slugValue = {
          _type: "slug",
          current: data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, ""),
        };
      }

      // Scrape article content if link is provided
      let articleContent = data.content || "";
      let articleExcerpt = data.excerpt || "";
      let articleImageUrl = data.imageUrl;
      let articleImageCaption: string | undefined;
      let articleVideoUrl = data.videoUrl;
      let articleAuthor = data.author;
      let articleAuthorRole = data.authorRole;
      let articlePublishedDate = data.publishedAt || data.publishedDate;
      
      // Ensure date is properly formatted
      if (articlePublishedDate) {
        try {
          const parsedDate = new Date(articlePublishedDate);
          if (!isNaN(parsedDate.getTime())) {
            articlePublishedDate = parsedDate.toISOString();
          } else {
            articlePublishedDate = undefined;
          }
        } catch (e) {
          articlePublishedDate = undefined;
        }
      }

      // Handle new image format (image.asset.url)
      if (data.image?.asset?.url) {
        articleImageUrl = data.image.asset.url;
        articleImageCaption = data.image.caption;
      }

      if (data.link && !data.content && !data.body) {
        const scraped = await scrapeArticle(data.link);
        articleContent = scraped.content || articleContent;
        articleExcerpt = scraped.excerpt || articleExcerpt;
        articleImageUrl = scraped.imageUrl || articleImageUrl;
        articleVideoUrl = scraped.videoUrl || articleVideoUrl;
        articleAuthor = scraped.author || articleAuthor;
        // Use scraped date if available, otherwise keep the one from JSON
        if (scraped.publishedDate) {
          try {
            const parsedDate = new Date(scraped.publishedDate);
            if (!isNaN(parsedDate.getTime())) {
              articlePublishedDate = parsedDate.toISOString();
              console.log(`  Found publish date: ${articlePublishedDate}`);
            }
          } catch (e) {
            // Keep original date if parsing fails
          }
        }
      }

      // Use provided body if available, otherwise convert HTML
      let body: any[];
      if (data.body && Array.isArray(data.body)) {
        // Use provided Portable Text body - ensure all blocks have required fields
        body = data.body.map((block: any, index: number) => {
          // Ensure _key exists
          if (!block._key) {
            block._key = block._key || generateKey();
          }
          // Ensure children have proper structure
          if (block.children && Array.isArray(block.children)) {
            block.children = block.children.map((child: any) => {
              if (!child._type) child._type = "span";
              if (!child.marks) child.marks = [];
              return child;
            });
          }
          // Ensure markDefs exists
          if (!block.markDefs) block.markDefs = [];
          // Ensure style exists for blocks
          if (!block.style && block._type === "block") {
            block.style = "normal";
          }
          return block;
        });
        console.log(`  Using provided Portable Text body (${body.length} blocks)`);
      } else {
        // Calculate read time from content
        const readTime = calculateReadTime(articleContent || articleExcerpt);

        // Convert HTML to Portable Text
        body = articleContent
          ? htmlToPortableText(articleContent)
          : articleExcerpt
          ? [
              {
                _type: "block",
                _key: generateKey(),
                style: "normal",
                children: [{ _type: "span", text: articleExcerpt, marks: [] }],
                markDefs: [],
              },
            ]
          : [];
      }

      // Calculate read time
      const readTime = data.readTime || calculateReadTime(articleContent || articleExcerpt || JSON.stringify(body));

      // Upload image if provided
      let imageAssetId: string | undefined;
      let imageStructure: any = undefined;
      
      if (articleImageUrl) {
        console.log(`  Uploading image from: ${articleImageUrl}`);
        const uploadedId = await uploadImageToSanity(articleImageUrl);
        if (uploadedId) {
          imageAssetId = uploadedId;
          console.log(`  ✓ Image uploaded (ID: ${uploadedId})`);
        } else {
          console.warn(`  ⚠ Image upload failed, but continuing without image`);
        }
        
        // Build proper image structure with caption (even if upload failed, we'll try to use the URL directly)
        if (uploadedId) {
          imageStructure = {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: uploadedId,
            },
          };
          
          // Add caption if provided
          if (articleImageCaption) {
            imageStructure.caption = articleImageCaption;
          }
        }
      }
      
      // Also check if image was already provided with _ref (already uploaded)
      if (data.image?.asset?._ref && !imageStructure) {
        imageStructure = {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: data.image.asset._ref,
          },
        };
        if (data.image.caption) {
          imageStructure.caption = data.image.caption;
        }
        console.log(`  Using existing image reference: ${data.image.asset._ref}`);
      }

      // Process video URL
      let embedLink: string | undefined;
      if (articleVideoUrl) {
        const youtubeId = extractYouTubeId(articleVideoUrl);
        if (youtubeId) {
          embedLink = `https://www.youtube.com/embed/${youtubeId}`;
        } else if (articleVideoUrl.includes("vimeo")) {
          embedLink = articleVideoUrl;
        } else {
          // For other video sources, store as-is
          embedLink = articleVideoUrl;
        }
      }

      // Determine category
      const category = data.category || determineCategory(data.title, articleContent || articleExcerpt);

      // Create article
      const article: any = {
        _type: "article",
        title: data.title,
        slug: slugValue,
        publishedAt: articlePublishedDate || new Date().toISOString(),
        excerpt: articleExcerpt || data.excerpt || "",
        category: category,
        readTime: readTime,
        body: body,
        ...(imageStructure && { image: imageStructure }),
        ...(embedLink && { embedLink: embedLink }),
        ...(data.embedLink && data.embedLink !== "" && { embedLink: data.embedLink }),
        ...(articleAuthor && { author: articleAuthor }),
        ...(articleAuthorRole && articleAuthorRole !== "" && { authorRole: articleAuthorRole }),
      };

      // Debug logging
      console.log(`  Date: ${article.publishedAt}`);
      console.log(`  Body blocks: ${body.length}`);
      console.log(`  Image: ${imageStructure ? "Yes" : "No"}`);
      console.log(`  Excerpt: ${article.excerpt ? "Yes" : "No"}`);

      const created = await client.create(article);
      console.log(`  ✓ Created article (ID: ${created._id})\n`);

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`  ✗ Error processing article ${i + 1}:`, error);
      console.log("");
    }
  }

  console.log("✓ All articles processed!");
}

// Run the script
populateArticles().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
