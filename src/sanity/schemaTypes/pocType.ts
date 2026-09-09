import { defineField, defineType } from "sanity";
import { SUPPORTED_LANGUAGES } from "./internationalArticleType";

export const pocType = defineType({
  name: "poc",
  title: "POC",
  type: "document",
  fields: [
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      description: "Optional. If empty, videos show a poster and download only.",
    }),
    defineField({
      name: "original",
      title: "File",
      type: "file",
    }),
    defineField({
      name: "poster",
      title: "Poster",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "downloadFilename",
      title: "Download filename",
      type: "string",
      description:
        "Optional. Overrides the uploaded file name for downloads (e.g. k-rails-gov-poc-portuguese.mp4).",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first.",
    }),
    defineField({
      name: "localizations",
      title: "Localizations",
      description:
        "Add one entry per language. Each entry holds the translated title and description.",
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
              name: "description",
              type: "text",
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
      downloadFilename: "downloadFilename",
    },
    prepare({
      localizations,
      downloadFilename,
    }: {
      localizations?: Array<{ language?: string; title?: string }>;
      downloadFilename?: string;
    }) {
      const enTitle = localizations?.find((l) => l.language === "en")?.title;
      const firstTitle = localizations?.[0]?.title;
      const displayTitle = enTitle ?? firstTitle ?? "(No title)";
      const langCount = localizations?.length ?? 0;
      const filename = downloadFilename ? ` · ${downloadFilename}` : "";
      return {
        title: displayTitle,
        subtitle: `${langCount} language${langCount !== 1 ? "s" : ""}${filename}`,
      };
    },
  },
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
