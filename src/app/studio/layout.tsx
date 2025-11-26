/**
 * Layout for Sanity Studio routes
 * This handles metadata and viewport exports as a server component
 */

export { metadata, viewport } from "next-sanity/studio";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
