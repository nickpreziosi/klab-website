"use client";

import { ExternalLink, MoveRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/ui/shared/utils/utils";
import { RESOURCE_NAV_ICONS, RESOURCE_NAV_ITEMS } from "./resource-nav-items";
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
          const Icon = RESOURCE_NAV_ICONS[item.id];
          const LinkIcon = item.external ? ExternalLink : MoveRight;
          const className = styles.card;
          const content = (
            <>
              <span className={styles.iconWell} aria-hidden>
                <Icon className={styles.categoryIcon} strokeWidth={1.75} />
              </span>
              <span className={styles.label}>{t(item.id)}</span>
              <LinkIcon
                className={cn(styles.linkIcon, "rtlFlipH")}
                aria-hidden
                strokeWidth={2}
              />
            </>
          );

          if (item.external) {
            const isPlaceholder = item.href === "#";
            return (
              <a
                key={item.id}
                href={item.href}
                className={className}
                target={isPlaceholder ? undefined : "_blank"}
                rel={isPlaceholder ? undefined : "noopener noreferrer"}
                onClick={() => {
                  onLinkClick?.();
                }}
              >
                {content}
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
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
