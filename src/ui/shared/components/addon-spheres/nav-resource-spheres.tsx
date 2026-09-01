"use client";

import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/ui/shared/utils/utils";
import { ADDON_SPHERE_PRODUCTS } from "./addon-sphere-products";
import { IdleSphereVideo } from "./nav-addon-spheres";
import { RESOURCE_NAV_ITEMS } from "./resource-nav-items";
import sphereStyles from "./nav-addon-spheres.module.css";
import styles from "./nav-resource-spheres.module.css";

type NavResourceSpheresProps = {
  onLinkClick?: () => void;
  headerTitle?: string;
};

export function NavResourceSpheres({ onLinkClick, headerTitle }: NavResourceSpheresProps) {
  const t = useTranslations("resourcesDropdown");

  return (
    <div className={sphereStyles.wrapper}>
      {headerTitle ? <h3 className={sphereStyles.headerTitle}>{headerTitle}</h3> : null}
      <div className={sphereStyles.products}>
        {RESOURCE_NAV_ITEMS.map((item, index) => {
          const sphere = ADDON_SPHERE_PRODUCTS[index];
          const onLight = sphere?.id === "ktalk";

          return (
            <a
              key={item.id}
              href={item.href}
              className={cn(
                sphereStyles.product,
                styles.product,
                onLight && sphereStyles.ktalk,
                onLight && styles.productOnLight
              )}
              onClick={() => {
                onLinkClick?.();
              }}
            >
              {sphere ? <IdleSphereVideo src={sphere.idleVideo} /> : null}
              <span className={styles.label}>{t(item.id)}</span>
              <span className={sphereStyles.arrowWrap} aria-hidden>
                <ExternalLink className={`${styles.externalIcon} rtlFlipH`} strokeWidth={2} />
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
