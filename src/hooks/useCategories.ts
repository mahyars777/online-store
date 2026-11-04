import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/categories.service";
import { queryKeys } from "@/hooks/queryKeys";

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
  });
}
