"use client";
import { motion } from "framer-motion";
import styles from "./news-pagination.module.css";
import Button from "@/ui/shared/components/button/button";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface NewsPaginationProps {
  totalPages: number;
}

export default function NewsPagination({ totalPages }: NewsPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const raw = searchParams.get("page") ?? "1";
    const parsed = Number(raw);
    setCurrentPage(Number.isFinite(parsed) && parsed > 0 ? parsed : 1);
  }, [searchParams]);

  // Calculate which pages to display with ellipsis
  // Simple, reliable algorithm that always works correctly
  const getVisiblePages = (): (number | "ellipsis")[] => {
    const pages: (number | "ellipsis")[] = [];
    const siblingCount = 1; // Pages to show on each side of current

    // If 4 or fewer pages, show all
    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    // Calculate the middle section (around current page)
    const leftSiblingIndex = Math.max(2, currentPage - siblingCount);
    const rightSiblingIndex = Math.min(totalPages - 1, currentPage + siblingCount);

    // Add ellipsis and middle section
    if (leftSiblingIndex > 2) {
      pages.push("ellipsis");
    }

    // Add pages in the middle section
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (rightSiblingIndex < totalPages - 1) {
      pages.push("ellipsis");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    // Remove duplicates and clean up consecutive ellipsis
    const cleaned: (number | "ellipsis")[] = [];
    for (let i = 0; i < pages.length; i++) {
      const current = pages[i];
      const prev = pages[i - 1];

      // Skip if it's a duplicate number
      if (typeof current === "number" && cleaned.includes(current)) {
        continue;
      }

      // Skip if it's ellipsis right after another ellipsis
      if (current === "ellipsis" && prev === "ellipsis") {
        continue;
      }

      cleaned.push(current);
    }

    return cleaned;
  };

  const visiblePages = getVisiblePages();

  const navigateTo = (page: number) => {
    // ensure page in range
    const target = Math.max(1, Math.min(totalPages, page));

    // Preserve existing query params (like category filters)
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", target.toString());

    // Construct URL with preserved params
    const url = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.push(url);
  };

  const handlePrevious = () => {
    if (currentPage > 1) navigateTo(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) navigateTo(currentPage + 1);
  };

  const handlePageClick = (page: number) => navigateTo(page);

  return (
    <motion.nav
      className={styles.pagination}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      aria-label="Pagination"
    >
      <div className={styles.navButtonWrapper}>
        <Button
          variant="outline"
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 16L6 10L12 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          aria-label="Previous page"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
      </div>

      <div className={styles.pages}>
        {/* Desktop: Show full pagination with ellipsis */}
        <div className={styles.pagesDesktop}>
          {visiblePages.map((page, index) => {
            if (page === "ellipsis") {
              return (
                <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                  ...
                </span>
              );
            }
            return (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                aria-label={`Page ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
                onClick={() => handlePageClick(page)}
                disabled={currentPage === page}
              >
                {page}
              </Button>
            );
          })}
        </div>

        {/* Mobile: Show only current page and total */}
        <div className={styles.pagesMobile}>
          <span className={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </span>
        </div>
      </div>

      <div className={styles.navButtonWrapper}>
        <Button
          variant="outline"
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 4L14 10L8 16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          iconPosition="end"
          aria-label="Next page"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </motion.nav>
  );
}
