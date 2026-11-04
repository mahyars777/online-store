"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useProductFilters } from "@/hooks/useProductFilters";
import SearchInput from "@/components/product/SearchInput";
import CategoryFilter from "@/components/product/CategoryFilter";
import PriceFilter from "@/components/product/PriceFilter";
import SortSelect from "@/components/product/SortSelect";
import ProductGrid, { ProductGridSkeleton } from "@/components/product/ProductGrid";
import Pagination from "@/components/ui/Pagination";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function ProductsView() {
  const { filters, setFilters, resetFilters } = useProductFilters();
  const { data, isPending, isError, error, refetch, isPlaceholderData } =
    useProducts(filters);

  // با تغییر این عدد، ورودی‌های جستجو و قیمت از نو ساخته می‌شن (برای پاک شدن متنشون)
  const [resetCount, setResetCount] = useState(0);

  const handleReset = () => {
    setResetCount((count) => count + 1);
    resetFilters();
  };

  const handlePageChange = (page: number) => {
    setFilters({ page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const labelClass = "mb-2 block text-sm font-bold text-gray-800";

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
      <aside className="space-y-6">
        <div>
          <span className={labelClass}>جستجو</span>
          <SearchInput
            key={`search-${resetCount}`}
            value={filters.search ?? ""}
            onChange={(search) => setFilters({ search: search || undefined })}
          />
        </div>

        <div>
          <span className={labelClass}>دسته‌بندی</span>
          <CategoryFilter
            value={filters.category}
            onChange={(category) => setFilters({ category })}
          />
        </div>

        <div>
          <span className={labelClass}>محدوده قیمت</span>
          <PriceFilter
            key={`price-${resetCount}`}
            min={filters.minPrice}
            max={filters.maxPrice}
            onApply={(minPrice, maxPrice) => setFilters({ minPrice, maxPrice })}
          />
        </div>

        <button
          onClick={handleReset}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          پاک کردن همه فیلترها
        </button>
      </aside>

      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            {data
              ? `${data.pagination.total.toLocaleString("fa-IR")} محصول`
              : "در حال بارگذاری..."}
          </p>
          <SortSelect value={filters.sort} onChange={(sort) => setFilters({ sort })} />
        </div>

        {isPending && <ProductGridSkeleton />}

        {isError && !data && (
          <ErrorMessage message={error.message} onRetry={() => refetch()} />
        )}

        {data && data.items.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 py-16 text-center">
            <p className="text-gray-600">محصولی با این فیلترها پیدا نشد.</p>
            <button
              onClick={handleReset}
              className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
            >
              پاک کردن فیلترها
            </button>
          </div>
        )}

        {data && data.items.length > 0 && (
          <div className={`transition-opacity ${isPlaceholderData ? "opacity-50" : ""}`}>
            <ProductGrid products={data.items} />
          </div>
        )}

        {data && (
          <Pagination
            page={data.pagination.page}
            totalPages={data.pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </div>
  );
}
