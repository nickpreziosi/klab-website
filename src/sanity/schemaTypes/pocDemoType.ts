import { defineField, defineType } from "sanity";

export const POC_DEMO_DOCUMENT_ID = "pocDemo";

export const pocDemoType = defineType({
  name: "pocDemo",
  title: "POC demo",
  type: "document",
  fields: [
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      description: "Optional. If empty, the page shows a poster and download only.",
    }),
    defineField({
      name: "original",
      title: "Original video",
      type: "file",
      options: {
        accept: "video/mp4",
      },
    }),
    defineField({
      name: "poster",
      title: "Poster",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { youtubeUrl: "youtubeUrl" },
    prepare({ youtubeUrl }) {
      return {
        title: "K Rails demo",
        subtitle: youtubeUrl ? "YouTube playback enabled" : "Download / poster only",
      };
    },
  },
});
