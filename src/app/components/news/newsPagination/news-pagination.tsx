"use client";
import { motion } from "framer-motion";
import styles from "./news-pagination.module.css";
import Button from "@/app/components/ui/button/button";
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

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const navigateTo = (page: number) => {
    // ensure page in range
    const target = Math.max(1, Math.min(totalPages, page));
    // construct simple query (replace other query params)
    const url = `${pathname}?page=${target}`;
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
        text="Previous"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      ></Button>

      <div className={styles.pages}>
        {pages.map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "full" : "outline"}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
            text={page.toString()}
            onClick={() => handlePageClick(page)}
            disabled={currentPage === page}
          ></Button>
        ))}
      </div>

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
        text="Next page"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      ></Button>
    </motion.nav>
  );
}
