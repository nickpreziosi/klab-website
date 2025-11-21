# Article Population Scripts

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

   (The required dependencies are already in package.json)

2. **Get your Sanity API token:**
   - Go to https://sanity.io/manage
   - Select your project (mp87vpva)
   - Go to API → Tokens
   - Create a new token with **Editor** permissions
   - Copy the token

3. **Set the environment variable:**

   Create a `.env` file in the project root (same directory as `package.json`):
   ```
   SANITY_API_TOKEN=your-actual-token-here
   ```

   **Note:** `.env` is already in `.gitignore`, so it won't be committed to git.

   Alternatively, you can set it temporarily in your terminal:
   ```bash
   export SANITY_API_TOKEN="your-token-here"
   ```

## Method 1: Using JSON File (Recommended)

1. **Create `scripts/articles.json`** based on `articles.json.example`
2. **Populate it with article data** from keoworld.com/blog
3. **Run the script:**
   ```bash
   npx tsx scripts/populate-articles-from-json.ts
   ```

### Article JSON Structure

```json
{
  "title": "Article Title",
  "excerpt": "Brief summary (appears on listing page)",
  "content": "<p>Full HTML content</p>",
  "imageUrl": "https://example.com/image.jpg",
  "videoUrl": "https://www.youtube.com/watch?v=...", // Optional
  "publishedDate": "2024-01-15T00:00:00.000Z",
  "category": "Company Updates", // Optional
  "author": "Author Name", // Optional
  "authorRole": "CEO" // Optional
}
```

### Categories

- Interviews & Insights
- Company Updates
- Press Release
- Technology & Innovation
- Events & Announcements
- Social Media Highlights
- Video Features
- Awards & Recognition

## Notes

- **Read time** is automatically calculated based on word count (200 words/minute)
- **Images** are automatically uploaded to Sanity
- **Videos** can be YouTube URLs (will be converted to embed format) or direct video URLs
- **HTML content** is converted to Portable Text format
- If category is not provided, it defaults to "Company Updates"

## Troubleshooting

- Make sure `SANITY_API_TOKEN` is set correctly
- Check that image URLs are accessible (not behind authentication)
- Verify the JSON structure matches the example
- For video sources other than YouTube/Vimeo, you may need to upload videos directly to Sanity
