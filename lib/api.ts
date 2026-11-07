import type { Category, Product } from "@/types";

const API = typeof window === "undefined"
  ? `${(process.env.BACKEND_API_URL || "http://localhost:4000").replace(/\\/$/, "")}/api`
  : (process.env.NEXT_PUBLIC_API_BASE || "/api/backend");
async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, { ...init, headers: { ...(init?.body instanceof FormData ? {} : { "Content-Type": "application/json" }), ...init?.headers }, cache: "no-store" });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || data.message || `خطا در ارتباط با سرور (${res.status})`);
  return data as T;
}
function unwrapList<T>(data: any): T[] {
  if (Array.isArray(data)) return data;
  return data.products || data.categories || data.data || data.items || [];
}
export async function getProducts(): Promise<Product[]> {
  const data = await request<any>("/products");
  return unwrapList<Product>(data);
}
export async function getProduct(id: string): Promise<Product> {
  const data = await request<any>(`/products/${id}`);
  return data.product || data.data || data;
}
export async function getCategories(): Promise<Category[]> {
  const data = await request<any>("/categories");
  return unwrapList<Category>(data);
}
export const adminApi = {
  products: () => request<Product[]>("/admin/products").then(unwrapList<Product>),
  categories: () => request<Category[]>("/admin/categories").then(unwrapList<Category>),
  createProduct: (body: Partial<Product>) => request("/admin/products", { method: "POST", body: JSON.stringify(body) }),
  updateProduct: (id: string, body: Partial<Product>) => request(`/admin/products/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteProduct: (id: string) => request(`/admin/products/${id}`, { method: "DELETE" }),
  createCategory: (body: Partial<Category>) => request("/admin/categories", { method: "POST", body: JSON.stringify(body) }),
  deleteCategory: (id: string) => request(`/admin/categories/${id}`, { method: "DELETE" }),
  upload: async (file: File) => {
    const form = new FormData(); form.append("image", file);
    return request<{ imageUrl: string }>("/admin/upload", { method: "POST", body: form });
  }
};
export function imageSrc(path?: string | null) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const backend = (process.env.NEXT_PUBLIC_BACKEND_ORIGIN || "http://localhost:4000").replace(/\/$/, "");
  return `${backend}${path.startsWith("/") ? path : `/${path}`}`;
}
