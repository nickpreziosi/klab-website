import type { Metadata } from "next";
import "./globals.css";
import { Sora } from "next/font/google";
import { ConditionalShell } from "@/app/components/ui/conditional-shell/conditional-shell";
import { LocaleProvider } from "@/app/components/ui/locale-context/locale-context";
import { SmoothAnchorScroll } from "@/app/components/ui/smooth-anchor-scroll/smooth-anchor-scroll";
import Head from "./head";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={sora.className} lang="en">
      <head>
        <Head></Head>
      </head>

      <body>
        <LocaleProvider>
          <SmoothAnchorScroll />
          <ConditionalShell>{children}</ConditionalShell>
        </LocaleProvider>
      </body>
    </html>
  );
}
