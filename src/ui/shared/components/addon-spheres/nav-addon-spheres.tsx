"use client";

import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getTextDirection, type Locale } from "@/i18n/routing";
import { TechnologiesShowcaseLogoArrow } from "@/ui/shared/components/technologies-showcase/technologies-showcase-arrow";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/shared/components/tooltip/tooltip";
import { cn } from "@/ui/shared/utils/utils";
import { ADDON_SPHERE_PRODUCTS } from "./addon-sphere-products";
import styles from "./nav-addon-spheres.module.css";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function IdleSphereVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (prefersReducedMotion()) return;
    video.play().catch(() => {});
  }, [src]);

  return (
    <span className={styles.sphere} aria-hidden>
      <video
        ref={ref}
        className={styles.sphereVideo}
        src={src}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
      />
    </span>
  );
}

type NavAddonSpheresProps = {
  onLinkClick?: () => void;
  headerTitle?: string;
};

export function NavAddonSpheres({ onLinkClick, headerTitle }: NavAddonSpheresProps) {
  const locale = useLocale() as Locale;
  const dir = getTextDirection(locale);
  const tAddons = useTranslations("homeKrails");
  const tShowcase = useTranslations("technologiesShowcase");

  return (
    <div className={styles.wrapper}>
      {headerTitle ? <h3 className={styles.headerTitle}>{headerTitle}</h3> : null}
      <TooltipProvider delayDuration={200}>
        <div className={styles.products}>
          {ADDON_SPHERE_PRODUCTS.map((product) => (
            <Tooltip key={product.id}>
              <TooltipTrigger asChild>
                <Link
                  href={product.href}
                  className={cn(styles.product, product.id === "ktalk" && styles.ktalk)}
                  aria-label={product.name}
                  onClick={(event) => {
                    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                      onLinkClick?.();
                    }
                  }}
                >
                  {!product.hideAddons ? (
                    <>
                      <span className={styles.pillSm} aria-hidden />
                      <span className={styles.plusSm} aria-hidden>
                        <img
                          src="/images/home-addons/plus-circle-sm.svg"
                          alt=""
                          width={16}
                          height={16}
                        />
                        <span className={styles.plusBarVSm} />
                        <span className={styles.plusBarHSm} />
                      </span>
                      <span className={styles.pillSmLabel} dir={dir}>
                        {tAddons("addonsEyebrow")}
                      </span>
                    </>
                  ) : null}
                  <IdleSphereVideo src={product.idleVideo} />
                  <img
                    src={product.logo}
                    alt=""
                    className={styles.productLogo}
                    decoding="async"
                  />
                  <span className={styles.arrowWrap} aria-hidden>
                    <TechnologiesShowcaseLogoArrow />
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={24} className={styles.techTooltip}>
                {tShowcase(`technologies.${product.id}`)}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
}
