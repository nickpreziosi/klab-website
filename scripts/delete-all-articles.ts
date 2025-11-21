/**
 * Script to delete all articles from Sanity
 *
 * Usage: npx tsx scripts/delete-all-articles.ts
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
  console.log("\nPlease set your Sanity API token in .env file");
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

async function deleteAllArticles() {
  try {
    console.log("Fetching all articles from Sanity...\n");

    // Fetch all articles
    const articles = await client.fetch(`*[_type == "article"]`);

    if (articles.length === 0) {
      console.log("No articles found in Sanity.");
      return;
    }

    console.log(`Found ${articles.length} articles to delete.\n`);

    // Delete each article
    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      try {
        await client.delete(article._id);
        console.log(`✓ Deleted: ${article.title || article._id} (${i + 1}/${articles.length})`);
      } catch (error: any) {
        console.error(`✗ Error deleting ${article._id}:`, error.message);
      }
    }

    console.log(`\n✓ All articles deleted!`);
  } catch (error: any) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

// Run the script
deleteAllArticles().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
