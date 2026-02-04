import { notFound } from "next/navigation";

/**
 * Catch-all for unknown routes under [locale].
 * Triggers the localized not-found page ([locale]/not-found.tsx).
 */
export default function LocaleCatchAllPage() {
  notFound();
}
