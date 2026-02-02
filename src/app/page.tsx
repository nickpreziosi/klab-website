import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/app/lib/i18n";

/**
 * Root path has no page content; middleware redirects / to /en (or preferred locale).
 * This file exists so any stale build/cache resolving app/page.tsx does not fail.
 * If a request reaches here, redirect to default locale.
 */
export default function RootPage() {
  redirect(`/${DEFAULT_LOCALE}`);
}
