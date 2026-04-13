import {
  isNewsCategoryKey,
  toCanonicalNewsCategoryKey,
  type NewsCategoryKey,
} from "@/constants/news-categories";

type TranslateNewsCategories = (key: NewsCategoryKey) => string;

/**
 * Maps a stored category (slug, legacy KEO label, or unknown string) to a localized label.
 */
export function translateNewsCategory(
  t: TranslateNewsCategories,
  category: string | undefined | null
): string {
  const canonical = toCanonicalNewsCategoryKey(category);
  if (isNewsCategoryKey(canonical)) {
    return t(canonical);
  }
  return canonical;
}
