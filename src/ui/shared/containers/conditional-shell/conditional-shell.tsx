"use client";

import { usePathname } from "next/navigation";
import SocialSidebar from "@/ui/shared/components/social-sidebar/social-sidebar";
import { NavigationMenuDemo } from "@/ui/shared/components/navbar/navbar";
import { Footer } from "@/ui/shared/components/footer/footer";

export function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Paths are locale-prefixed (e.g. /en/landing-page, /es/landing-page/wave)
  const isLandingPage = pathname.includes("/landing-page") || pathname.endsWith("/landing-page");

  if (isLandingPage) {
    return <>{children}</>;
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
