import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/products.service";
import { queryKeys } from "@/hooks/queryKeys";
import type { ProductFilters } from "@/types/product";

export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: queryKeys.products(filters),
    queryFn: () => getProducts(filters),
    placeholderData: keepPreviousData,
  });
}
