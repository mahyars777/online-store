import { apiClient } from "@/lib/axios";
import type { Paginated } from "@/types/api";
import type { Product, ProductFilters } from "@/types/product";

export async function getProducts(
  filters: ProductFilters = {},
): Promise<Paginated<Product>> {
  const { data } = await apiClient.get<Paginated<Product>>("/products", {
    params: filters,
  });
  return data;
}

export async function getProduct(id: number): Promise<Product> {
  const { data } = await apiClient.get<Product>(`/products/${id}`);
  return data;
}
