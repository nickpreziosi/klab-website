import createImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from "../env";

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};

/** Build Sanity image URL with size hints for optimized delivery */
export function urlForSized(
  source: SanityImageSource,
  options: { width?: number; height?: number }
): string {
  let img = builder.image(source);
  if (options.width) img = img.width(options.width);
  if (options.height) img = img.height(options.height);
  return img.url();
}
