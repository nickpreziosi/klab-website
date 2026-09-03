import { groq } from "next-sanity";
import { client } from "../client";
import { POC_DEMO_DOCUMENT_ID } from "../schemaTypes/pocDemoType";

export type PocDemoAsset = {
  youtubeUrl: string | null;
  originalUrl: string | null;
  originalFilename: string | null;
  posterUrl: string | null;
};

const pocDemoQuery = groq`
  *[_type == "pocDemo" && _id == $id][0] {
    youtubeUrl,
    "originalUrl": original.asset->url,
    "originalFilename": original.asset->originalFilename,
    "posterUrl": poster.asset->url
  }
`;

function withDownloadParam(url: string, filename: string | null): string {
  const separator = url.includes("?") ? "&" : "?";
  const dl = encodeURIComponent(filename || "k-rails-demo-web-v5.mp4");
  return `${url}${separator}dl=${dl}`;
}

export async function getPocDemo(): Promise<PocDemoAsset | null> {
  const result = await client.fetch<{
    youtubeUrl?: string | null;
    originalUrl?: string | null;
    originalFilename?: string | null;
    posterUrl?: string | null;
  } | null>(pocDemoQuery, { id: POC_DEMO_DOCUMENT_ID });

  if (!result) return null;

  const originalUrl = result.originalUrl
    ? withDownloadParam(result.originalUrl, result.originalFilename ?? null)
    : null;

  return {
    youtubeUrl: result.youtubeUrl?.trim() || null,
    originalUrl,
    originalFilename: result.originalFilename ?? null,
    posterUrl: result.posterUrl ?? null,
  };
}
