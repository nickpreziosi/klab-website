import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getArticleSlugs, getInternationalArticleSlugs } from "@/sanity/queries/articles";

// Revalidate sitemap periodically so new articles appear
export const revalidate = 3600; // 1 hour

const BASE_URL = "https://k-lab.ai";

const STATIC_PATHS = [
  "",
  "company",
  "press",
  "poc",
  "manuals",
  "foundation",
  "contact",
  "contact/sales",
  "contact/careers",
  "contact/support",
  "news",
  "news/keo",
  "technologies/kabl",
  "technologies/kena",
  "technologies/kim",
  "technologies/kai",
  "technologies/krails",
  "technologies/kaxis",
  "technologies/kcard",
  "technologies/kleads",
  "technologies/kbpm",
  "technologies/krisk",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [keoArticleSlugs, klabArticleSlugs] = await Promise.all([
    getArticleSlugs(),
    getInternationalArticleSlugs(),
  ]);

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      const pathSegment = path ? `/${path}` : "";
      entries.push({
        url: `${BASE_URL}/${locale}${pathSegment}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
      });
    }

    for (const slug of klabArticleSlugs) {
      entries.push({
        url: `${BASE_URL}/${locale}/news/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }

    for (const slug of keoArticleSlugs) {
      entries.push({
        url: `${BASE_URL}/${locale}/news/keo/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
