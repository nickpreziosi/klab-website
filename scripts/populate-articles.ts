/**
 * Script to populate Sanity with articles from keoworld.com/blog
 *
 * Usage: npx tsx scripts/populate-articles.ts
 *
 * Make sure you have SANITY_API_TOKEN set in your environment variables
 */

import { createClient } from "@sanity/client";
import { PortableTextBlock } from "@portabletext/types";

// Sanity client configuration
const client = createClient({
  projectId: "mp87vpva",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Categories mapping
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

// Helper function to calculate read time (average reading speed: 200 words per minute)
function calculateReadTime(content: string): string {
  const words = content.split(/\s+/).filter((word) => word.length > 0).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

// Helper function to convert HTML to Portable Text blocks
function htmlToPortableText(html: string): PortableTextBlock[] {
  // This is a simplified converter - you may need to enhance it based on actual HTML structure
  const blocks: PortableTextBlock[] = [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Process paragraphs
  doc.querySelectorAll("p").forEach((p) => {
    const text = p.textContent || "";
    if (text.trim()) {
      blocks.push({
        _type: "block",
        _key: Math.random().toString(36).substring(7),
        style: "normal",
        children: [
          {
            _type: "span",
            text: text,
            marks: [],
          },
        ],
        markDefs: [],
      });
    }
  });

  // Process headings
  doc.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((heading) => {
    const text = heading.textContent || "";
    if (text.trim()) {
      const level = heading.tagName.toLowerCase();
      blocks.push({
        _type: "block",
        _key: Math.random().toString(36).substring(7),
        style: level === "h1" ? "h2" : level === "h2" ? "h2" : "h3",
        children: [
          {
            _type: "span",
            text: text,
            marks: [],
          },
        ],
        markDefs: [],
      });
    }
  });

  // Process lists
  doc.querySelectorAll("ul, ol").forEach((list) => {
    const items: PortableTextBlock[] = [];
    list.querySelectorAll("li").forEach((li) => {
      const text = li.textContent || "";
      if (text.trim()) {
        items.push({
          _type: "block",
          _key: Math.random().toString(36).substring(7),
          style: "normal",
          listItem: list.tagName === "UL" ? "bullet" : "number",
          children: [
            {
              _type: "span",
              text: text,
              marks: [],
            },
          ],
          markDefs: [],
        });
      }
    });
    blocks.push(...items);
  });

  // Process blockquotes
  doc.querySelectorAll("blockquote").forEach((quote) => {
    const text = quote.textContent || "";
    if (text.trim()) {
      blocks.push({
        _type: "block",
        _key: Math.random().toString(36).substring(7),
        style: "blockquote",
        children: [
          {
            _type: "span",
            text: text,
            marks: [],
          },
        ],
        markDefs: [],
      });
    }
  });

  return blocks.length > 0 ? blocks : [
    {
      _type: "block",
      _key: Math.random().toString(36).substring(7),
      style: "normal",
      children: [
        {
          _type: "span",
          text: html.replace(/<[^>]*>/g, ""), // Fallback: strip HTML tags
          marks: [],
        },
      ],
      markDefs: [],
    },
  ];
}

// Helper function to determine category based on content
function determineCategory(title: string, content: string): Category {
  const lowerTitle = title.toLowerCase();
  const lowerContent = content.toLowerCase();

  if (lowerTitle.includes("interview") || lowerContent.includes("interview")) {
    return "Interviews & Insights";
  }
  if (lowerTitle.includes("award") || lowerContent.includes("award") || lowerContent.includes("recognition")) {
    return "Awards & Recognition";
  }
  if (lowerTitle.includes("video") || lowerContent.includes("video") || lowerContent.includes("watch")) {
    return "Video Features";
  }
  if (lowerTitle.includes("press") || lowerContent.includes("press release") || lowerContent.includes("announcement")) {
    return "Press Release";
  }
  if (lowerTitle.includes("event") || lowerContent.includes("event") || lowerContent.includes("announcement")) {
    return "Events & Announcements";
  }
  if (lowerTitle.includes("technology") || lowerTitle.includes("innovation") || lowerContent.includes("technology") || lowerContent.includes("innovation")) {
    return "Technology & Innovation";
  }
  if (lowerTitle.includes("update") || lowerContent.includes("company update") || lowerContent.includes("we're")) {
    return "Company Updates";
  }
  if (lowerContent.includes("social") || lowerContent.includes("twitter") || lowerContent.includes("linkedin")) {
    return "Social Media Highlights";
  }

  // Default fallback
  return "Company Updates";
}

// Helper function to extract YouTube ID from URL
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

// Helper function to upload image to Sanity
async function uploadImageToSanity(imageUrl: string): Promise<string | null> {
  try {
    // Download the image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      console.warn(`Failed to fetch image: ${imageUrl}`);
      return null;
    }

    const buffer = await response.arrayBuffer();
    const asset = await client.assets.upload("image", Buffer.from(buffer), {
      filename: imageUrl.split("/").pop() || "image.jpg",
    });

    return asset._id;
  } catch (error) {
    console.error(`Error uploading image ${imageUrl}:`, error);
    return null;
  }
}

// Main function to populate articles
async function populateArticles() {
  try {
    console.log("Fetching articles from keoworld.com/blog...");

    // Fetch the blog page
    const response = await fetch("https://www.keoworld.com/blog");
    if (!response.ok) {
      throw new Error(`Failed to fetch blog page: ${response.statusText}`);
    }

    const html = await response.text();

    // Parse HTML - you'll need to adjust selectors based on actual HTML structure
    // This is a template - you may need to inspect the actual HTML structure
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Extract articles - adjust selectors based on actual structure
    const articleElements = doc.querySelectorAll("article, .article, .blog-post, [class*='post']");

    if (articleElements.length === 0) {
      console.log("No articles found. You may need to adjust the selectors.");
      console.log("Please inspect the HTML structure and update the script.");
      return;
    }

    console.log(`Found ${articleElements.length} articles`);

    for (let i = 0; i < articleElements.length; i++) {
      const articleEl = articleElements[i];

      try {
        // Extract article data - adjust these selectors based on actual HTML
        const title = articleEl.querySelector("h1, h2, h3, .title, [class*='title']")?.textContent?.trim() || "";
        const excerpt = articleEl.querySelector(".excerpt, .summary, [class*='excerpt'], [class*='summary'], p")?.textContent?.trim() || "";
        const imageUrl = articleEl.querySelector("img")?.getAttribute("src") || articleEl.querySelector("img")?.getAttribute("data-src") || "";
        const link = articleEl.querySelector("a")?.getAttribute("href") || "";
        const fullLink = link.startsWith("http") ? link : `https://www.keoworld.com${link}`;

        if (!title) {
          console.warn(`Skipping article ${i + 1}: No title found`);
          continue;
        }

        console.log(`Processing article ${i + 1}: ${title}`);

        // Fetch full article content if link is available
        let fullContent = "";
        let videoUrl = "";
        let publishedDate = new Date().toISOString();

        if (fullLink && fullLink !== "https://www.keoworld.com") {
          try {
            const articleResponse = await fetch(fullLink);
            if (articleResponse.ok) {
              const articleHtml = await articleResponse.text();
              const articleDoc = parser.parseFromString(articleHtml, "text/html");

              // Extract content
              const contentEl = articleDoc.querySelector(".content, .post-content, article, [class*='content']");
              fullContent = contentEl?.textContent || articleDoc.body.textContent || "";

              // Extract video
              const videoEl = articleDoc.querySelector("video, iframe[src*='youtube'], iframe[src*='vimeo']");
              if (videoEl) {
                videoUrl = videoEl.getAttribute("src") || videoEl.getAttribute("data-src") || "";
              }

              // Extract date
              const dateEl = articleDoc.querySelector("time, .date, [class*='date']");
              if (dateEl) {
                const dateText = dateEl.getAttribute("datetime") || dateEl.textContent || "";
                if (dateText) {
                  const parsedDate = new Date(dateText);
                  if (!isNaN(parsedDate.getTime())) {
                    publishedDate = parsedDate.toISOString();
                  }
                }
              }
            }
          } catch (error) {
            console.warn(`Failed to fetch full article content for ${title}:`, error);
          }
        }

        // Determine category
        const category = determineCategory(title, fullContent || excerpt);

        // Calculate read time
        const readTime = calculateReadTime(fullContent || excerpt);

        // Convert content to Portable Text
        const body = fullContent ? htmlToPortableText(fullContent) : [
          {
            _type: "block",
            _key: Math.random().toString(36).substring(7),
            style: "normal",
            children: [
              {
                _type: "span",
                text: excerpt,
                marks: [],
              },
            ],
            markDefs: [],
          },
        ];

        // Upload image if available
        let imageAssetId: string | undefined;
        if (imageUrl) {
          const fullImageUrl = imageUrl.startsWith("http") ? imageUrl : `https://www.keoworld.com${imageUrl}`;
          const uploadedId = await uploadImageToSanity(fullImageUrl);
          if (uploadedId) {
            imageAssetId = uploadedId;
          }
        }

        // Prepare embed link (YouTube or other video)
        let embedLink: string | undefined;
        if (videoUrl) {
          const youtubeId = extractYouTubeId(videoUrl);
          if (youtubeId) {
            embedLink = `https://www.youtube.com/embed/${youtubeId}`;
          } else if (videoUrl.includes("vimeo")) {
            embedLink = videoUrl;
          } else {
            // For other video sources, you may need to handle differently
            embedLink = videoUrl;
          }
        }

        // Create article in Sanity
        const article = {
          _type: "article",
          title: title,
          slug: {
            _type: "slug",
            current: title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, ""),
          },
          publishedAt: publishedDate,
          excerpt: excerpt,
          category: category,
          readTime: readTime,
          body: body,
          ...(imageAssetId && {
            image: {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: imageAssetId,
              },
            },
          }),
          ...(embedLink && { embedLink: embedLink }),
        };

        const created = await client.create(article);
        console.log(`✓ Created article: ${title} (${created._id})`);

        // Add a small delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Error processing article ${i + 1}:`, error);
      }
    }

    console.log("\n✓ All articles processed!");
  } catch (error) {
    console.error("Error populating articles:", error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  populateArticles();
}

export { populateArticles };
