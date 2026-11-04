import type { ProductFilters, ProductSort } from "@/types/product";

export const PAGE_SIZE = 12;

const SORTS: ProductSort[] = ["price_asc", "price_desc"];

function toNumber(value: string | null): number | undefined {
  if (value === null || value.trim() === "") return undefined;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

export function parseFilters(params: Pick<URLSearchParams, "get">): ProductFilters {
  const sort = params.get("sort");
  const page = toNumber(params.get("page"));

  return {
    search: params.get("search") || undefined,
    category: params.get("category") || undefined,
    minPrice: toNumber(params.get("minPrice")),
    maxPrice: toNumber(params.get("maxPrice")),
    sort: SORTS.includes(sort as ProductSort) ? (sort as ProductSort) : undefined,
    page: page && page >= 1 ? Math.floor(page) : 1,
    limit: PAGE_SIZE,
  };
}

export function buildQueryString(filters: ProductFilters): string {
  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  if (filters.category) params.set("category", filters.category);
  if (filters.minPrice !== undefined) params.set("minPrice", String(filters.minPrice));
  if (filters.maxPrice !== undefined) params.set("maxPrice", String(filters.maxPrice));
  if (filters.sort) params.set("sort", filters.sort);
  if (filters.page && filters.page > 1) params.set("page", String(filters.page));
  return params.toString();
}
