import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

/**
 * Root path has no page content; middleware redirects / to default (or preferred locale).
 * This file exists so any stale build/cache resolving app/page.tsx does not fail.
 * If a request reaches here, redirect to default locale.
 */
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
