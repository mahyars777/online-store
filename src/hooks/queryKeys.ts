import type { ProductFilters } from "@/types/product";

export const queryKeys = {
  categories: ["categories"] as const,
  products: (filters: ProductFilters = {}) => ["products", filters] as const,
  product: (id: number) => ["product", id] as const,
};
