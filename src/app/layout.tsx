import type { Metadata } from "next";
import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { resolveDocumentLocale } from "@/i18n/document-locale";
import "./globals.css";
import { Sora } from "next/font/google";
import { SmoothAnchorScroll } from "@/ui/shared/components/smooth-anchor-scroll/smooth-anchor-scroll";
import { HomeAnimationProvider } from "@/ui/home/providers/home-animation-provider";
import { ThemeProvider } from "@/ui/shared/providers/theme-provider";
import { Toaster } from "@/ui/shared/components/toaster/toaster";
import { SkipAnimationForPathProvider } from "@/ui/shared/providers/skip-animation-for-path-provider/skip-animation-for-path-provider";
import { getTextDirection } from "@/i18n/routing";
import Head from "./head";

const sora = Sora({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "K Lab — Programmable Trust for Institutional Money Movement",
  description:
    "K Lab builds programmable infrastructure that determines whether money should move — and proves it did. Configurable, permissioned, and enforceable for FIs, governments, and private capital.",
  // Follows the browser/OS color scheme, not the in-app theme.
  icons: {
    icon: [
      {
        url: "/ico/favicon-grey.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/ico/favicon-white.ico",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieTheme = cookieStore?.get?.("theme")?.value ?? null;
  const initialTheme =
    cookieTheme === "light" || cookieTheme === "dark"
      ? (cookieTheme as "light" | "dark")
      : undefined;

  const locale = await resolveDocumentLocale();
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const dir = getTextDirection(locale);

  return (
    <html className={sora.className} lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <Head></Head>
      </head>

      <body>
        <ThemeProvider initialTheme={initialTheme}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <SkipAnimationForPathProvider>
              <SmoothAnchorScroll />
              <HomeAnimationProvider>{children}</HomeAnimationProvider>
              <Toaster />
            </SkipAnimationForPathProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
