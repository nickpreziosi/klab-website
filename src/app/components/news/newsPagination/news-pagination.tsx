"use client";
import { motion } from "framer-motion";
import styles from "./news-pagination.module.css";
import Button from "../../ui/button/button";

interface NewsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function NewsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: NewsPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
            variant="outline"
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
