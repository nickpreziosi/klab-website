"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import Button from "../components/ui/button/button";

interface CategorySelectorProps {
  categories: string[];
  selectedCategories: string[];
}

export default function CategorySelector({
  categories,
  selectedCategories,
}: CategorySelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryToggle = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // Remove page param when filtering
    params.delete("page");

    // Get current categories from URL
    const currentCategories = params.getAll("category");

    // Toggle category
    if (currentCategories.includes(category)) {
      // Remove category
      const newCategories = currentCategories.filter((c) => c !== category);
      params.delete("category");
      newCategories.forEach((c) => params.append("category", c));
    } else {
      // Add category
      params.append("category", category);
    }

    // Update URL
    const newUrl = params.toString() ? `/news?${params.toString()}` : "/news";
    router.push(newUrl);
  };

  const handleClearAll = () => {
    router.push("/news");
  };

  return (
    <motion.div
      className={styles.categorySelector}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className={styles.categoryButtons}>
        {categories.map((category, index) => {
          const isSelected = selectedCategories.includes(category);

          return (
            <div
              className={`${styles.categoryButton} ${isSelected ? styles.categoryButtonActive : ""}`}
              key={category}
            >
              <Button
                text={category}
                onClick={() => handleCategoryToggle(category)}
                variant="outline"
                width="fit"
                size="sm"
              />
            </div>
          );
        })}
        {selectedCategories.length > 0 && (
          <Button
            text="Clear filters"
            onClick={handleClearAll}
            variant="full"
            width="fit"
            size="sm"
          />
        )}
      </div>
    </motion.div>
  );
}
