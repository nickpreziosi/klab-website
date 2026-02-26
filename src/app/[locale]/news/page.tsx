import { NewsView } from "@/ui/news/views/NewsView/NewsView";

export default function NewsPage() {
  return (
    <NewsView
      articles={[]}
      allCategories={[]}
      selectedCategories={[]}
      articlesPerPage={6}
      showNewsCards={true}
      showArticles={false}
    />
  );
}
