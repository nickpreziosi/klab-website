export type PressAssetType = "image" | "document" | "video" | "archive";

export type PressAsset = {
  id: string;
  type: PressAssetType;
  href: string;
  filename: string;
  titleKey?: string;
  previewSrc?: string;
};

export type PressCollection = {
  id: string;
  titleKey: string;
  descriptionKey?: string;
  zipHref?: string;
  zipFilename?: string;
  person?: {
    name: string;
    titleKey: string;
  };
  assets: PressAsset[];
};

function imageAssets(slug: string, count: number): PressAsset[] {
  return Array.from({ length: count }, (_, index) => {
    const number = index + 1;
    const filename = `${slug}-${number}.jpg`;
    const href = `/press/collections/${slug}/${filename}`;
    return {
      id: `${slug}-${number}`,
      type: "image" as const,
      href,
      filename,
      previewSrc: href,
    };
  });
}

export const PRESS_COLLECTIONS: PressCollection[] = [
  {
    id: "jayHeller",
    titleKey: "collections.jayHeller",
    zipHref: "/press/collections/jay-heller.zip",
    zipFilename: "jay-heller.zip",
    person: {
      name: "Jay Heller",
      titleKey: "jayHeller",
    },
    assets: imageAssets("jay-heller", 6),
  },
  {
    id: "paoloFidanza",
    titleKey: "collections.paoloFidanza",
    zipHref: "/press/collections/paolo-fidanza.zip",
    zipFilename: "paolo-fidanza.zip",
    person: {
      name: "Paolo Fidanza",
      titleKey: "paoloFidanza",
    },
    assets: imageAssets("paolo-fidanza", 4),
  },
];

export function splitPressAssets(assets: PressAsset[]): {
  images: PressAsset[];
  files: PressAsset[];
} {
  const images: PressAsset[] = [];
  const files: PressAsset[] = [];
  for (const asset of assets) {
    if (asset.type === "image") {
      images.push(asset);
    } else {
      files.push(asset);
    }
  }
  return { images, files };
}
