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
  title: "K-Lab",
  description:
    "Founded in 2020, KLab helps buyers and suppliers accelerate business growth through all-digital inventory financing and B2B payment solutions. Headquartered in Miami, Florida, KLab operates in the U.S., Canada and across LATAM.",
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
