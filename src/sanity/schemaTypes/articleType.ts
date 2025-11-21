import { type SchemaTypeDefinition } from "sanity";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [],
};

import { defineField, defineType } from "sanity";

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
      type: "string",
    }),
    defineField({
      name: "readTime",
      type: "string",
    }),
    defineField({
      name: "excerpt",
      type: "text",
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
  ],
});
