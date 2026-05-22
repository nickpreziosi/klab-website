import { urlForSized } from "@/sanity/lib/image";
import { toHTML } from "@portabletext/to-html";

export function formatArticleDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

const portableImageToHtml = ({
  value,
}: {
  value: { asset?: { _ref: string }; alt?: string; caption?: string };
}) => {
  if (!value?.asset) return "";
  const source = value as { asset: { _ref: string } };
  const widths = [400, 800, 1200];
  const srcSet = widths
    .map(
      (w) =>
        `${urlForSized(source, {
          width: w,
          height: Math.round((600 / 800) * w),
          quality: w <= 400 ? 75 : 80,
          format: "webp",
        })} ${w}w`
    )
    .join(", ");
  const defaultSrc = urlForSized(source, {
    width: 800,
    height: 600,
    quality: 80,
    format: "webp",
  });
  const alt = value.alt || "Article image";
  const caption = value.caption ? `<figcaption>${value.caption}</figcaption>` : "";
  return `<figure style="margin: 24px 0;"><img src="${defaultSrc}" srcset="${srcSet}" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px" alt="${alt}" style="width: 100%; height: auto; border-radius: var(--rounded-app);" loading="lazy" decoding="async" />${caption}</figure>`;
};

const portableLinkMark = ({
  value,
  children,
}: {
  value?: { href?: string };
  children?: string;
}) => {
  const href = value?.href || "#";
  const target = href.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : "";
  return `<a href="${href}"${target} style="color: hsl(var(--foreground)); text-decoration: underline; opacity: 0.8;">${children || ""}</a>`;
};

const bodyToHtmlComponents = {
  types: {
    image: portableImageToHtml,
  },
  marks: {
    link: portableLinkMark,
  },
};

export function portableBodyToHtml(
  body: Array<{ _type: string; [key: string]: unknown }> | undefined
): string | undefined {
  if (!body?.length) return undefined;
  return toHTML(body, {
    components: bodyToHtmlComponents,
  });
}
