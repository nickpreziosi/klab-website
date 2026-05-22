import { type SchemaTypeDefinition } from "sanity";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [],
};

import { defineField, defineType } from "sanity";
import { SANITY_NEWS_CATEGORY_OPTIONS } from "@/constants/news-categories";
import { GalleryInput } from "../components/GalleryInput";

export const articleType = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
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
      name: "embedLink",
      type: "string",
    }),
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block" }],
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
      name: "excerpt",
      type: "text",
    }),
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Español", value: "es" },
        ],
        layout: "radio",
      },
      initialValue: "en",
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      components: { input: GalleryInput },
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
  ],
});
