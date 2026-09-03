import type { ResourceAsset, ResourceCollection } from "@/ui/resource-library/types";

export type PressAssetType = ResourceAsset["type"];
export type PressAsset = ResourceAsset;
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
  assets: ResourceAsset[];
};

function imageAssets(slug: string, count: number): ResourceAsset[] {
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

export function toResourceCollections(
  collections: PressCollection[],
  resolve: {
    title: (collection: PressCollection) => string;
    description: (collection: PressCollection) => string | undefined;
  }
): ResourceCollection[] {
  return collections.map((collection) => ({
    id: collection.id,
    title: resolve.title(collection),
    description: resolve.description(collection),
    zipHref: collection.zipHref,
    zipFilename: collection.zipFilename,
    personName: collection.person?.name,
    priorityCount: collection.id === "jayHeller" ? 4 : 0,
    assets: collection.assets,
  }));
}
