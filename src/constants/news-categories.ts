/**
 * Canonical category keys (slugs) stored in Sanity and in URL filters.
 * Mirrors the distinct categories used on `/news/keo` (KEO `article` documents).
 * Labels: next-intl `newsCategories.<key>`.
 */
export const NEWS_CATEGORY_KEYS = [
  "awards-recognition",
  "company-updates",
  "events-announcements",
  "interviews-insights",
  "technology-innovation",
  "uncategorized",
] as const;

export type NewsCategoryKey = (typeof NEWS_CATEGORY_KEYS)[number];

/** KEO historically stored these English labels; map to slug keys. */
export const LEGACY_KEO_CATEGORY_TO_KEY: Record<string, NewsCategoryKey> = {
  "Awards & Recognition": "awards-recognition",
  "Company Updates": "company-updates",
  "Events & Announcements": "events-announcements",
  "Interviews & Insights": "interviews-insights",
  "Technology & Innovation": "technology-innovation",
};

export function isNewsCategoryKey(value: string): value is NewsCategoryKey {
  return (NEWS_CATEGORY_KEYS as readonly string[]).includes(value);
}

/**
 * Resolves stored category (slug or legacy KEO label) to a canonical slug for
 * filters, cards, and translations.
 */
export function toCanonicalNewsCategoryKey(raw: string | undefined | null): NewsCategoryKey | string {
  if (!raw?.trim()) return "uncategorized";
  const t = raw.trim();
  if (isNewsCategoryKey(t)) return t;
  return LEGACY_KEO_CATEGORY_TO_KEY[t] ?? t;
}

/** Selectable categories in Sanity (no "Uncategorized"; missing/legacy data still maps to `uncategorized` in app). */
export type NewsCategorySelectableKey = Exclude<NewsCategoryKey, "uncategorized">;

export const SANITY_NEWS_CATEGORY_OPTIONS: { title: string; value: NewsCategorySelectableKey }[] = [
  { title: "Awards & Recognition", value: "awards-recognition" },
  { title: "Company Updates", value: "company-updates" },
  { title: "Events & Announcements", value: "events-announcements" },
  { title: "Interviews & Insights", value: "interviews-insights" },
  { title: "Technology & Innovation", value: "technology-innovation" },
];
