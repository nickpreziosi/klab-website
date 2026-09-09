import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";

const PUBLIC_PRODUCT_SLUGS = ["krails", "kleads", "ktalk", "krisk"] as const;

type PublicProductSlug = (typeof PUBLIC_PRODUCT_SLUGS)[number];

function isPublicProductSlug(slug: string): slug is PublicProductSlug {
  return (PUBLIC_PRODUCT_SLUGS as readonly string[]).includes(slug);
}

type Props = { params: Promise<{ locale: string; slug: string }> };

/** Legacy `/technologies/:slug` URLs — send visitors to `/krails`, `/kleads`, etc. */
export default async function LegacyTechnologyPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  if (!isPublicProductSlug(slug)) {
    notFound();
  }
  redirect({ href: `/${slug}`, locale });
}
