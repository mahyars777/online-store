import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { buildQueryString, parseFilters } from "@/lib/product-filters";
import type { ProductFilters } from "@/types/product";

export function useProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(() => parseFilters(searchParams), [searchParams]);

  const setFilters = useCallback(
    (changes: Partial<ProductFilters>) => {
      const next = { ...filters, ...changes };
      // با تغییر هر فیلتر (به‌جز خود صفحه)، به صفحه اول برگرد
      if (!("page" in changes)) next.page = 1;

      const query = buildQueryString(next);
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [filters, pathname, router],
  );

  const resetFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  return { filters, setFilters, resetFilters };
}
