export const DEFAULT_ARTICLE_IMAGE_POSITION = "top";

export const ARTICLE_IMAGE_POSITION_OPTIONS = [
  { title: "Top", value: "top" },
  { title: "Center", value: "center" },
  { title: "Bottom", value: "bottom" },
] as const;

export type ArticleImagePosition = (typeof ARTICLE_IMAGE_POSITION_OPTIONS)[number]["value"];

export function resolveArticleImagePosition(
  position?: string | null
): ArticleImagePosition {
  const trimmed = position?.trim();
  if (trimmed === "center" || trimmed === "bottom" || trimmed === "top") {
    return trimmed;
  }
  return DEFAULT_ARTICLE_IMAGE_POSITION;
}
