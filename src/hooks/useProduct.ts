import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/services/products.service";
import { queryKeys } from "@/hooks/queryKeys";

export function useProduct(id: number) {
  return useQuery({
    queryKey: queryKeys.product(id),
    queryFn: () => getProduct(id),
    enabled: id > 0,
  });
}
