import { defineField, defineType } from "sanity";
import { SANITY_NEWS_CATEGORY_OPTIONS } from "@/constants/news-categories";

export const SUPPORTED_LANGUAGES = [
  { title: "English", value: "en" },
  { title: "Español", value: "es" },
  { title: "Português", value: "pt" },
  { title: "العربية", value: "ar" },
] as const;

export const internationalArticleType = defineType({
  name: "internationalArticle",
  title: "International Article",
  type: "document",
  fields: [
    // --- Global fields (shared across all languages) ---
    defineField({
      name: "slug",
      type: "slug",
      description: "Unique URL identifier for this article.",
      options: {
        source: (doc: Record<string, unknown>) => {
          const locs = doc.localizations as Array<{ title?: string }> | undefined;
          return locs?.find((l) => l.title)?.title ?? "";
        },
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "embedLink",
      type: "string",
      title: "Embed Link",
      description: "YouTube or other video embed URL.",
    }),
    defineField({
      name: "author",
      type: "string",
    }),
    defineField({
      name: "authorRole",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: SANITY_NEWS_CATEGORY_OPTIONS.map(({ title, value }) => ({ title, value })),
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Read time (minutes)",
      type: "string",
      description:
        "Estimated length in minutes. Enter digits only (e.g. 5). The site appends the word “Minutes” in the visitor’s language.",
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          fields: [
            defineField({
              name: "caption",
              type: "string",
              title: "Image Caption",
            }),
            defineField({
              name: "alt",
              type: "string",
              title: "Alt Text",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "galleryPassword",
      title: "Gallery Password",
      type: "string",
      description:
        "Optional. If set, the gallery will be hidden behind a password prompt on the article page.",
    }),
    // --- Language-specific content ---
    defineField({
      name: "localizations",
      title: "Localizations",
      description:
        "Add one entry per language. Each entry holds the translated title, excerpt, and body for that language.",
      type: "array",
      of: [
        {
          type: "object",
          title: "Localization",
          fields: [
            defineField({
              name: "language",
              title: "Language",
              type: "string",
              options: {
                list: SUPPORTED_LANGUAGES.map((l) => ({ title: l.title, value: l.value })),
                layout: "dropdown",
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "image",
              type: "image",
              fields: [
                defineField({
                  name: "caption",
                  type: "string",
                  title: "Image Caption",
                }),
                defineField({
                  name: "alt",
                  type: "string",
                  title: "Alt Text",
                }),
              ],
            }),
            defineField({
              name: "excerpt",
              type: "text",
            }),
            defineField({
              name: "body",
              type: "array",
              of: [{ type: "block" }],
            }),
          ],
          preview: {
            select: {
              language: "language",
              title: "title",
            },
            prepare({ language, title }: { language?: string; title?: string }) {
              const lang = SUPPORTED_LANGUAGES.find((l) => l.value === language);
              return {
                title: title ?? "(No title)",
                subtitle: lang ? lang.title : language ?? "Unknown language",
              };
            },
          },
        },
      ],
      validation: (rule) =>
        rule.custom((localizations: Array<{ language?: string }> | undefined) => {
          if (!localizations || localizations.length === 0) return true;
          const langs = localizations.map((l) => l.language).filter(Boolean);
          const unique = new Set(langs);
          if (unique.size !== langs.length) return "Each language may only appear once.";
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      localizations: "localizations",
      publishedAt: "publishedAt",
    },
    prepare({
      localizations,
      publishedAt,
    }: {
      localizations?: Array<{ language?: string; title?: string }>;
      publishedAt?: string;
    }) {
      const enTitle = localizations?.find((l) => l.language === "en")?.title;
      const firstTitle = localizations?.[0]?.title;
      const displayTitle = enTitle ?? firstTitle ?? "(No title)";
      const langCount = localizations?.length ?? 0;
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString() : "";
      return {
        title: displayTitle,
        subtitle: `${langCount} language${langCount !== 1 ? "s" : ""} · ${date}`,
      };
    },
  },
});
