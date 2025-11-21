/**
 * Helper script to extract article data from keoworld.com/blog
 *
 * This script can be run in a browser console or with Node.js (requires cheerio)
 *
 * Usage in browser console:
 * 1. Go to https://www.keoworld.com/blog
 * 2. Open browser console (F12)
 * 3. Paste and run this script
 * 4. Copy the JSON output
 * 5. Save it as scripts/articles.json
 */

// Browser version - paste this into browser console on keoworld.com/blog
(function extractArticles() {
  const articles = [];

  // Adjust these selectors based on the actual HTML structure
  // You may need to inspect the page and update these
  const articleSelectors = [
    'article',
    '.article',
    '.blog-post',
    '.post',
    '[class*="post"]',
    '[class*="article"]',
  ];

  let articleElements = [];
  for (const selector of articleSelectors) {
    articleElements = document.querySelectorAll(selector);
    if (articleElements.length > 0) break;
  }

  if (articleElements.length === 0) {
    console.log('No articles found. Please inspect the page structure and update the selectors.');
    return;
  }

  console.log(`Found ${articleElements.length} articles`);

  articleElements.forEach((el, index) => {
    try {
      // Extract title
      const titleEl = el.querySelector('h1, h2, h3, .title, [class*="title"]');
      const title = titleEl?.textContent?.trim() || '';

      // Extract excerpt/summary
      const excerptEl = el.querySelector('.excerpt, .summary, .description, p');
      const excerpt = excerptEl?.textContent?.trim() || '';

      // Extract image
      const imgEl = el.querySelector('img');
      const imageUrl = imgEl?.src || imgEl?.getAttribute('data-src') || '';

      // Extract link
      const linkEl = el.querySelector('a');
      const link = linkEl?.href || linkEl?.getAttribute('href') || '';

      // Extract date
      const dateEl = el.querySelector('time, .date, [class*="date"]');
      const dateText = dateEl?.getAttribute('datetime') || dateEl?.textContent || '';

      if (!title) {
        console.warn(`Skipping article ${index + 1}: No title found`);
        return;
      }

      articles.push({
        title: title,
        excerpt: excerpt,
        content: '', // Will need to be filled from full article page
        imageUrl: imageUrl,
        link: link, // Store link to fetch full content later
        publishedDate: dateText || new Date().toISOString(),
        category: '', // Will be auto-determined
      });

      console.log(`Extracted: ${title}`);
    } catch (error) {
      console.error(`Error extracting article ${index + 1}:`, error);
    }
  });

  // Output JSON
  console.log('\n=== COPY THIS JSON ===\n');
  console.log(JSON.stringify(articles, null, 2));
  console.log('\n=== END OF JSON ===\n');

  // Also copy to clipboard if possible
  if (navigator.clipboard) {
    navigator.clipboard.writeText(JSON.stringify(articles, null, 2))
      .then(() => console.log('✓ JSON copied to clipboard!'))
      .catch(() => console.log('Could not copy to clipboard'));
  }

  return articles;
})();
