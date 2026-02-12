"use client";

import { usePathname } from "next/navigation";
import type { NavTranslations, DrawerTranslations } from "@/ui/shared/types/translations";
import SocialSidebar from "@/ui/shared/components/social-sidebar/social-sidebar";
import { NavigationMenuDemo } from "@/ui/shared/components/navbar/navbar";
import { Footer } from "@/ui/shared/components/footer/footer";
import { SUPPORTED_LOCALES } from "@/ui/shared/utils/i18n";
import { IS_LANDING_ONLY } from "@/config/landing-only";

type ConditionalShellProps = {
  children: React.ReactNode;
  /** When provided (from layout), nav copy is SSR'd */
  navTranslations?: NavTranslations;
  /** When provided (from layout), drawer copy is SSR'd */
  drawerTranslations?: DrawerTranslations;
  /** Server-resolved theme from cookie for correct logo first paint */
  initialTheme?: "light" | "dark";
};

const localeRootRegex = new RegExp(
  `^/(${SUPPORTED_LOCALES.join("|")})/?$`
);

export function ConditionalShell({
  children,
  navTranslations,
  drawerTranslations,
  initialTheme,
}: ConditionalShellProps) {
  const pathname = usePathname();
  // Landing page is at root: /en, /es, /pt, etc. When landing-only, all pages (including 404) use minimal shell.
  const isLandingPage =
    IS_LANDING_ONLY || localeRootRegex.test(pathname);

  if (isLandingPage) {
    return <>{children}</>;
  }

  return (
    <>
      <NavigationMenuDemo
        navTranslations={navTranslations}
        drawerTranslations={drawerTranslations}
        initialTheme={initialTheme}
      />
      <SocialSidebar />
      {children}
      <Footer />
    </>
  );
}
