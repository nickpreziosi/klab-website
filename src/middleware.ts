import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // Redirect disabled routes to homepage to avoid catch-all + notFound() performance bug
  if (pathname.includes("/litepapers") || pathname.includes("/landing-page")) {
    const locale = routing.locales.find((loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`) ?? routing.defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|studio|_next|_vercel|.*\\..*).*)",
  ],
};
