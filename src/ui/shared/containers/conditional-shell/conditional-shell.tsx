"use client";

import { usePathname } from "next/navigation";
import type { NavTranslations, DrawerTranslations } from "@/ui/shared/types/translations";
import SocialSidebar from "@/ui/shared/components/social-sidebar/social-sidebar";
import { NavigationMenuDemo } from "@/ui/shared/components/navbar/navbar";
import { Footer } from "@/ui/shared/components/footer/footer";

type ConditionalShellProps = {
  children: React.ReactNode;
  /** When provided (from layout), nav copy is SSR'd */
  navTranslations?: NavTranslations;
  /** When provided (from layout), drawer copy is SSR'd */
  drawerTranslations?: DrawerTranslations;
};

export function ConditionalShell({
  children,
  navTranslations,
  drawerTranslations,
}: ConditionalShellProps) {
  const pathname = usePathname();
  // Paths are locale-prefixed (e.g. /en/landing-page, /es/landing-page/wave)
  const isLandingPage = pathname.includes("/landing-page") || pathname.endsWith("/landing-page");

  if (isLandingPage) {
    return <>{children}</>;
  }

  return (
    <>
      <NavigationMenuDemo
        navTranslations={navTranslations}
        drawerTranslations={drawerTranslations}
      />
      <SocialSidebar />
      {children}
      <Footer />
    </>
  );
}
