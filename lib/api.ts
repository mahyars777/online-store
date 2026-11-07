import type { Category, Product } from "@/types";

const API =
  typeof window === "undefined"
    ? `${(process.env.BACKEND_API_URL || "http://localhost:4000").replace(/\/$/, "")}/api`
    : process.env.NEXT_PUBLIC_API_BASE || "/api/backend";

type ProductsResponse = {
  items: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      ...(init?.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...init?.headers,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `API Error: ${res.status}`);
  }

  return res.json();
}

export async function getProducts(): Promise<Product[]> {
  const response = await request<ProductsResponse>("/products");
  return response.items;
}
export async function getProduct(id: string): Promise<Product> {
  return request<Product>(`/products/${id}`);
}

export const api = {
  products: getProducts,

  product: getProduct,

  categories: () => request<Category[]>("/categories"),
};

type CollectionResponse<T> =
  | T[]
  | {
      items?: T[];
      data?: T[];
    };

async function requestCollection<T>(path: string): Promise<T[]> {
  const response = await request<CollectionResponse<T>>(path);

  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response.items)) {
    return response.items;
  }

  if (Array.isArray(response.data)) {
    return response.data;
  }

  throw new Error(`Invalid API response: ${path}`);
}

export const adminApi = {
  products: () => requestCollection<Product>("/admin/products"),

  categories: () => requestCollection<Category>("/admin/categories"),

  upload: async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    return request<{ imageUrl: string }>("/admin/upload", {
      method: "POST",
      body: formData,
    });
  },

  createProduct: (data: Partial<Product>) =>
    request<Product>("/admin/products", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateProduct: (id: number | string, data: Partial<Product>) =>
    request<Product>(`/admin/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteProduct: (id: number | string) =>
    request<void>(`/admin/products/${id}`, {
      method: "DELETE",
    }),

  createCategory: (data: Partial<Category>) =>
    request<Category>("/admin/categories", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateCategory: (id: number | string, data: Partial<Category>) =>
    request<Category>(`/admin/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteCategory: (id: number | string) =>
    request<void>(`/admin/categories/${id}`, {
      method: "DELETE",
    }),
};

export function imageSrc(imageUrl: string): string {
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  const origin = (
    process.env.NEXT_PUBLIC_BACKEND_ORIGIN || "http://localhost:4000"
  ).replace(/\/$/, "");

  return `${origin}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
}
