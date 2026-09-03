import {
  BookOpen,
  FlaskConical,
  Newspaper,
  SwatchBook,
  type LucideIcon,
} from "lucide-react";

export const RESOURCE_NAV_ITEMS = [
  { id: "brand", href: "#", external: true },
  { id: "press", href: "/press", external: false },
  { id: "poc", href: "/poc", external: false },
  { id: "manuals", href: "/manuals", external: false },
] as const;

export type ResourceNavItemId = (typeof RESOURCE_NAV_ITEMS)[number]["id"];

export const RESOURCE_NAV_ICONS: Record<ResourceNavItemId, LucideIcon> = {
  brand: SwatchBook,
  press: Newspaper,
  poc: FlaskConical,
  manuals: BookOpen,
};
