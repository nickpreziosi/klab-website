import type { Metadata } from "next";
import "./globals.css";
import { Sora } from "next/font/google";
import { SmoothAnchorScroll } from "@/ui/shared/components/smooth-anchor-scroll/smooth-anchor-scroll";
import { LandingAnimationProvider } from "@/ui/landing-page/providers/landing-animation-provider";
import { HomeAnimationProvider } from "@/ui/home/providers/home-animation-provider";
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
    <html className={sora.className} lang="en" suppressHydrationWarning>
      <head>
        <Head></Head>
      </head>

      <body>
        <SmoothAnchorScroll />
        <LandingAnimationProvider>
          <HomeAnimationProvider>{children}</HomeAnimationProvider>
        </LandingAnimationProvider>
      </body>
    </html>
  );
}
