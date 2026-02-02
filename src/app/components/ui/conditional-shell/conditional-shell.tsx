"use client";

import { usePathname } from "next/navigation";
import SocialSidebar from "@/app/components/ui/social-sidebar/social-sidebar";
import { NavigationMenuDemo } from "@/app/components/ui/navbar/navbar";
import { Footer } from "@/app/components/ui/footer/footer";

export function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Paths are locale-prefixed (e.g. /en/landing-page, /es/landing-page/wave)
  const isLandingPage =
    pathname.includes("/landing-page") || pathname.endsWith("/landing-page");

  if (isLandingPage) {
    return (
      <>
        <SocialSidebar />
        {children}
      </>
    );
  }

  return (
    <>
      <NavigationMenuDemo />
      <SocialSidebar />
      {children}
      <Footer />
    </>
  );
}
