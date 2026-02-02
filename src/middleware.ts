import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  DEFAULT_LOCALE,
  isSupportedLocale,
  LOCALE_COOKIE_NAME,
  type Locale,
} from "@/app/lib/i18n";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API, studio, static assets, and Next internals
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/studio") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".") // static files
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  // Already has a supported locale prefix
  if (firstSegment && isSupportedLocale(firstSegment)) {
    return NextResponse.next();
  }

  // Prefer saved locale from cookie when redirecting (e.g. / -> /es if user chose es)
  const preferred = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  const locale: Locale =
    preferred && isSupportedLocale(preferred) ? preferred : DEFAULT_LOCALE;

  const newPath = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(new URL(newPath, request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|mp4|pdf|js|json)$).*)"],
};
