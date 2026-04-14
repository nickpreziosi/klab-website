"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { getTextDirection, type Locale } from "@/i18n/routing";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/ui/shared/utils/utils";
import styles from "./pagination.module.css";

const MOBILE_BREAKPOINT = 768;

export interface PaginationProps {
  totalPages: number;
}

function buildPageUrl(pathname: string, searchParams: URLSearchParams, page: number): string {
  const params = new URLSearchParams(searchParams.toString());
  params.set("page", String(page));
  return params.toString() ? `${pathname}?${params.toString()}` : pathname;
}

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

function cleanPageList(pages: (number | "ellipsis")[]): (number | "ellipsis")[] {
  const cleaned: (number | "ellipsis")[] = [];
  for (let i = 0; i < pages.length; i++) {
    const current = pages[i];
    const prev = pages[i - 1];
    if (typeof current === "number" && cleaned.includes(current)) continue;
    if (current === "ellipsis" && prev === "ellipsis") continue;
    cleaned.push(current);
  }
  return cleaned;
}

/** Builds [first, middle?, last] with ellipsis only between numbers that are not adjacent. */
function mobilePagesWithGaps(
  first: number,
  middle: number,
  last: number
): (number | "ellipsis")[] {
  const result: (number | "ellipsis")[] = [];
  result.push(first);
  if (middle - first > 1) result.push("ellipsis");
  if (middle !== first) result.push(middle);
  if (last - middle > 1) result.push("ellipsis");
  if (last !== middle) result.push(last);
  return result;
}

export function Pagination({ totalPages }: PaginationProps) {
  const t = useTranslations("pagination");
  const locale = useLocale();
  const navDir = getTextDirection(locale as Locale) === "rtl" ? "rtl" : "ltr";
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile();

  useEffect(() => {
    const raw = searchParams.get("page") ?? "1";
    const parsed = Number(raw);
    setCurrentPage(Number.isFinite(parsed) && parsed > 0 ? parsed : 1);
  }, [searchParams]);

  const getVisiblePages = useCallback((): (number | "ellipsis")[] => {
    if (isMobile) {
      if (totalPages <= 3) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }
      if (currentPage === 1) {
        return mobilePagesWithGaps(1, 2, totalPages);
      }
      if (currentPage === totalPages) {
        return mobilePagesWithGaps(1, totalPages - 1, totalPages);
      }
      return mobilePagesWithGaps(1, currentPage, totalPages);
    }

    const pages: (number | "ellipsis")[] = [];
    const siblingCount = 1;

    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);
    const leftSiblingIndex = Math.max(2, currentPage - siblingCount);
    const rightSiblingIndex = Math.min(totalPages - 1, currentPage + siblingCount);

    if (leftSiblingIndex > 2) pages.push("ellipsis");
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) pages.push(i);
    if (rightSiblingIndex < totalPages - 1) pages.push("ellipsis");
    if (totalPages > 1) pages.push(totalPages);

    return cleanPageList(pages);
  }, [totalPages, currentPage, isMobile]);

  const visiblePages = getVisiblePages();
  const isPreviousDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  return (
    <motion.nav
      role="navigation"
      aria-label={t("ariaLabel")}
      className={styles.pagination}
      dir={navDir}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <ul className={styles.content}>
        <li>
          <Link
            href={
              isPreviousDisabled ? pathname : buildPageUrl(pathname, searchParams, currentPage - 1)
            }
            aria-label={t("previousPage")}
            className={styles.linkPrevNext}
            aria-disabled={isPreviousDisabled ? "true" : undefined}
            tabIndex={isPreviousDisabled ? -1 : undefined}
            onClick={(e) => {
              if (isPreviousDisabled) e.preventDefault();
            }}
          >
            <ChevronLeft className={cn(styles.icon, "rtlFlipH")} aria-hidden />
            <span>{t("prev")}</span>
          </Link>
        </li>

        {visiblePages.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <li key={`ellipsis-${index}`}>
                <span className={styles.ellipsis} aria-hidden>
                  <MoreHorizontal className={styles.icon} />
                  <span className={styles.srOnly}>More pages</span>
                </span>
              </li>
            );
          }
          const isActive = page === currentPage;
          return (
            <li key={page}>
              <Link
                href={buildPageUrl(pathname, searchParams, page)}
                aria-label={t("page", { number: page })}
                aria-current={isActive ? "page" : undefined}
                aria-disabled={isActive ? "true" : undefined}
                tabIndex={isActive ? -1 : undefined}
                className={isActive ? styles.linkPageActive : styles.linkPage}
                onClick={(e) => {
                  if (isActive) e.preventDefault();
                }}
              >
                {page}
              </Link>
            </li>
          );
        })}

        <li>
          <Link
            href={isNextDisabled ? pathname : buildPageUrl(pathname, searchParams, currentPage + 1)}
            aria-label={t("nextPage")}
            className={styles.linkPrevNext}
            aria-disabled={isNextDisabled ? "true" : undefined}
            tabIndex={isNextDisabled ? -1 : undefined}
            onClick={(e) => {
              if (isNextDisabled) e.preventDefault();
            }}
          >
            <span>{t("next")}</span>
            <ChevronRight className={cn(styles.icon, "rtlFlipH")} aria-hidden />
          </Link>
        </li>
      </ul>
    </motion.nav>
  );
}
