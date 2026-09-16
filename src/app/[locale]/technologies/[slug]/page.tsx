import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";

type Props = { params: Promise<{ locale: string; slug: string }> };

/** Legacy `/technologies/:slug` — krails keeps a product page; others redirect home. */
export default async function LegacyTechnologyPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  if (slug === "krails") {
    redirect({ href: "/krails", locale });
  }
  if (slug === "kleads" || slug === "ktalk" || slug === "krisk") {
    redirect({ href: "/", locale });
  }
  notFound();
}
