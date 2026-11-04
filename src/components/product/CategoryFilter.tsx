"use client";

import { useCategories } from "@/hooks/useCategories";
import Skeleton from "@/components/ui/Skeleton";

interface CategoryFilterProps {
  value?: string;
  onChange: (slug?: string) => void;
}

export default function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  const { data, isPending, isError } = useCategories();

  const itemClass = "w-full rounded-lg px-3 py-2 text-start text-sm transition";
  const active = "bg-indigo-600 text-white";
  const inactive = "bg-white text-gray-700 hover:bg-gray-100";

  if (isPending) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-full" />
        ))}
      </div>
    );
  }

  if (isError) {
    return <p className="text-sm text-red-600">خطا در دریافت دسته‌بندی‌ها</p>;
  }

  return (
    <div className="space-y-1">
      <button
        onClick={() => onChange(undefined)}
        className={`${itemClass} ${!value ? active : inactive}`}
      >
        همه
      </button>
      {data.map((category) => (
        <button
          key={category.id}
          onClick={() => onChange(category.slug)}
          className={`${itemClass} ${value === category.slug ? active : inactive}`}
        >
          {category.name}
          <span className="ms-2 text-xs opacity-70">
            ({category.product_count.toLocaleString("fa-IR")})
          </span>
        </button>
      ))}
    </div>
  );
}
