export const RESOURCE_NAV_ITEMS = [
  { id: "brand", href: "#" },
  { id: "marketing", href: "#" },
  { id: "wellness", href: "#" },
  { id: "press", href: "#" },
] as const;

export type ResourceNavItemId = (typeof RESOURCE_NAV_ITEMS)[number]["id"];
