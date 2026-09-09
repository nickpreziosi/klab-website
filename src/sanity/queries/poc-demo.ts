import { groq } from "next-sanity";
import { client } from "../client";
import type { ResourceAsset, ResourceAssetType, ResourceCollection } from "@/ui/resource-library/types";

type PocLocalization = {
  language?: string;
  title?: string;
  description?: string | null;
};

type PocQueryResult = {
  _id: string;
  youtubeUrl?: string | null;
  downloadFilename?: string | null;
  originalUrl?: string | null;
  originalFilename?: string | null;
  originalMime?: string | null;
  posterUrl?: string | null;
  localizations?: PocLocalization[] | null;
};

const pocDocumentsQuery = groq`
  *[_type == "poc"] | order(order asc, _createdAt desc) {
    _id,
    youtubeUrl,
    downloadFilename,
    "originalUrl": original.asset->url,
    "originalFilename": original.asset->originalFilename,
    "originalMime": original.asset->mimeType,
    "posterUrl": poster.asset->url,
    localizations[] {
      language,
      title,
      description
    }
  }
`;

function pickLocalization(localizations: PocLocalization[] | null | undefined, locale: string) {
  if (!localizations?.length) return null;
  return (
    localizations.find((item) => item.language === locale) ??
    localizations.find((item) => item.language === "en") ??
    localizations[0]
  );
}

function withDownloadParam(url: string, filename: string | null): string {
  if (!filename) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}dl=${encodeURIComponent(filename)}`;
}

export function pocAssetType(mimeType: string | null | undefined): ResourceAssetType {
  const mime = mimeType?.toLowerCase() ?? "";
  if (mime.startsWith("video/")) return "video";
  if (mime.startsWith("image/")) return "image";
  return "document";
}

export async function getPocDocuments(locale: string): Promise<ResourceCollection[]> {
  const results = await client.fetch<PocQueryResult[]>(pocDocumentsQuery);

  return results.flatMap((doc) => {
    const localization = pickLocalization(doc.localizations, locale);
    const title = localization?.title?.trim();
    if (!title) return [];

    const filename =
      doc.downloadFilename?.trim() || doc.originalFilename?.trim() || null;
    const href = doc.originalUrl ? withDownloadParam(doc.originalUrl, filename) : "";
    const youtubeUrl = doc.youtubeUrl?.trim() || undefined;
    const type = pocAssetType(doc.originalMime);
    const resolvedType: ResourceAssetType =
      type === "document" && youtubeUrl && !doc.originalMime ? "video" : type;

    const asset: ResourceAsset = {
      id: `${doc._id}-file`,
      type: resolvedType,
      href,
      filename: filename ?? "download",
      title,
      previewSrc: doc.posterUrl ?? undefined,
      youtubeUrl,
    };

    if (!asset.href && !asset.youtubeUrl && !asset.previewSrc) {
      return [
        {
          id: doc._id,
          title,
          description: localization?.description?.trim() || undefined,
          assets: [],
        },
      ];
    }

    return [
      {
        id: doc._id,
        title,
        description: localization?.description?.trim() || undefined,
        assets: [asset],
      },
    ];
  });
}
