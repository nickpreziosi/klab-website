"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { RESOURCE_NAV_ITEMS } from "./resource-nav-items";
import sphereStyles from "./nav-addon-spheres.module.css";
import styles from "./nav-resource-links.module.css";

type NavResourceLinksProps = {
  onLinkClick?: () => void;
  headerTitle?: string;
};

export function NavResourceLinks({ onLinkClick, headerTitle }: NavResourceLinksProps) {
  const t = useTranslations("resourcesDropdown");

  return (
    <div className={sphereStyles.wrapper}>
      {headerTitle ? <h3 className={sphereStyles.headerTitle}>{headerTitle}</h3> : null}
      <div className={styles.list}>
        {RESOURCE_NAV_ITEMS.map((item) => {
          const className = styles.link;
          const label = t(item.id);

          if (item.external) {
            return (
              <a
                key={item.id}
                href={item.href}
                className={className}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  onLinkClick?.();
                }}
              >
                {label}
              </a>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              className={className}
              onClick={() => {
                onLinkClick?.();
              }}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
