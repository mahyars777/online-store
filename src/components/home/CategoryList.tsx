"use client";

import Link from "next/link";
import { useCategories } from "@/hooks/useCategories";
import Skeleton from "@/components/ui/Skeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function CategoryList() {
  const { data, isPending, isError, error, refetch } = useCategories();

  if (isPending) {
    return (
      <div className="flex flex-wrap gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-32" />
        ))}
      </div>
    );
  }

  if (isError) {
    return <ErrorMessage message={error.message} onRetry={() => refetch()} />;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.map((category) => (
        <Link
          key={category.id}
          href={`/products?category=${category.slug}`}
          className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm transition hover:border-indigo-600 hover:text-indigo-600"
        >
          {category.name}
          <span className="ms-2 text-xs text-gray-400">({category.product_count})</span>
        </Link>
      ))}
    </div>
  );
}
