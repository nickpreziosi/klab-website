import type { Metadata } from "next";
import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import { Sora } from "next/font/google";
import { SmoothAnchorScroll } from "@/ui/shared/components/smooth-anchor-scroll/smooth-anchor-scroll";
import { HomeAnimationProvider } from "@/ui/home/providers/home-animation-provider";
import { ThemeProvider } from "@/ui/shared/providers/theme-provider";
import { Toaster } from "@/ui/shared/components/toaster/toaster";
import { routing } from "@/i18n/routing";
import Head from "./head";

const LOCALE_COOKIE_NAME = "locale-preference";

const sora = Sora({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KLab",
  description:
    "KLab develops the technology that automates risk, payments, and financial operations — all in one intelligent platform.",
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

  const localeCookie = cookieStore?.get?.(LOCALE_COOKIE_NAME)?.value?.trim();
  const locale: (typeof routing.locales)[number] =
    localeCookie && routing.locales.includes(localeCookie as (typeof routing.locales)[number])
      ? (localeCookie as (typeof routing.locales)[number])
      : routing.defaultLocale;
  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <html className={sora.className} lang={locale} suppressHydrationWarning>
      <head>
        <Head></Head>
      </head>

      <body>
        <ThemeProvider initialTheme={initialTheme}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <SmoothAnchorScroll />
            <HomeAnimationProvider>{children}</HomeAnimationProvider>
            <Toaster />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
