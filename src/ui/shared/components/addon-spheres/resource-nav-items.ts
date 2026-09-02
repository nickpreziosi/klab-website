import {
  BookOpen,
  FileText,
  FlaskConical,
  Newspaper,
  SwatchBook,
  type LucideIcon,
} from "lucide-react";

export const RESOURCE_NAV_ITEMS = [
  { id: "brand", href: "#", external: true },
  { id: "press", href: "#", external: false },
  { id: "poc", href: "#", external: false },
  { id: "manuals", href: "#", external: false },
  { id: "documentation", href: "#", external: false },
] as const;

export type ResourceNavItemId = (typeof RESOURCE_NAV_ITEMS)[number]["id"];

export const RESOURCE_NAV_ICONS: Record<ResourceNavItemId, LucideIcon> = {
  brand: SwatchBook,
  press: Newspaper,
  poc: FlaskConical,
  manuals: BookOpen,
  documentation: FileText,
};
