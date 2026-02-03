"use client";

import LandingPageContent from "@/ui/landing-page/components/landing-page-content";

type LandingPageVariant = "orange" | "wave";

interface LandingPageViewProps {
  variant: LandingPageVariant;
}

export function LandingPageView({ variant }: LandingPageViewProps) {
  return <LandingPageContent variant={variant} />;
}
