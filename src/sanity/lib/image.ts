import createImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from "../env";

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};

const DEFAULT_QUALITY = 80;

/** Build Sanity image URL with size hints and optional quality/format for optimized delivery */
export function urlForSized(
  source: SanityImageSource,
  options: {
    width?: number;
    height?: number;
    /** 1–100; default 80 for smaller payloads */
    quality?: number;
    /** Use "webp" for smaller files; omit to keep original format */
    format?: "webp" | "jpg" | "png";
  } = {}
): string {
  let img = builder.image(source);
  if (options.width) img = img.width(options.width);
  if (options.height) img = img.height(options.height);
  const quality = options.quality ?? DEFAULT_QUALITY;
  img = img.quality(quality);
  if (options.format) img = img.format(options.format);
  return img.url();
}
