import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import SocialSidebar from "@/app/components/ui/social-sidebar/social-sidebar";
import { NavigationMenuDemo } from "@/app/components/ui/navbar/navbar";
import { Footer } from "@/app/components/ui/footer/footer";
import Head from "./head";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KEO World",
  description:
    "Founded in 2020, KEO World helps buyers and suppliers accelerate business growth through all-digital inventory financing and B2B payment solutions. Headquartered in Miami, Florida, KEO operates in the U.S., Canada and across LATAM.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={poppins.className} lang="en">
      <head>
        <Head></Head>
      </head>

      <body>
        <NavigationMenuDemo></NavigationMenuDemo>
        <SocialSidebar></SocialSidebar>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
