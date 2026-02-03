"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { MultipleSelector } from "@/ui/shared/components/multiple-selector/multiple-selector";
import styles from "@/ui/news/views/NewsView/NewsView.module.css";

interface NewsFiltersProps {
  categories: string[];
  selectedCategories: string[];
}

export default function NewsFilters({ categories, selectedCategories }: NewsFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryItems = categories.map((cat) => ({
    value: cat,
    label: cat,
  }));

  const handleCategoryChange = (keys: Set<string>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    params.delete("category");

    keys.forEach((cat) => params.append("category", cat));

    const newUrl = params.toString() ? `/news?${params.toString()}` : "/news";
    router.push(newUrl);
  };

  return (
    <motion.div
      className={styles.newsFilters}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className={styles.filtersRow}>
        <MultipleSelector
          label="Category"
          placeholder="All Categories"
          options={categoryItems}
          selectedKeys={new Set(selectedCategories)}
          onSelectionChange={handleCategoryChange}
          minWidth={240}
          maxWidth={400}
          maxHeight={140}
        />
      </div>
    </motion.div>
  );
}
