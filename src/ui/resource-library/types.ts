export type ResourceAssetType = "image" | "document" | "video" | "archive";

export type ResourceAsset = {
  id: string;
  type: ResourceAssetType;
  href: string;
  filename: string;
  title?: string;
  previewSrc?: string;
  youtubeUrl?: string;
};

export type ResourceCollection = {
  id: string;
  title: string;
  description?: string;
  zipHref?: string;
  zipFilename?: string;
  personName?: string;
  priorityCount?: number;
  assets: ResourceAsset[];
};

export function splitResourceAssets(assets: ResourceAsset[]): {
  images: ResourceAsset[];
  videos: ResourceAsset[];
  files: ResourceAsset[];
} {
  const images: ResourceAsset[] = [];
  const videos: ResourceAsset[] = [];
  const files: ResourceAsset[] = [];
  for (const asset of assets) {
    if (asset.type === "image") {
      images.push(asset);
    } else if (asset.type === "video") {
      videos.push(asset);
    } else {
      files.push(asset);
    }
  }
  return { images, videos, files };
}
