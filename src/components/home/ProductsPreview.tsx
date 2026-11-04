"use client";

import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/product/ProductCard";
import ProductCardSkeleton from "@/components/product/ProductCardSkeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";

const gridClass = "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4";

export default function ProductsPreview() {
  const { data, isPending, isError, error, refetch } = useProducts({ limit: 4 });

  if (isPending) {
    return (
      <div className={gridClass}>
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <ErrorMessage message={error.message} onRetry={() => refetch()} />;
  }

  return (
    <div className={gridClass}>
      {data.items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
