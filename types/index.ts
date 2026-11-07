export type Category = { id: number | string; name: string; description?: string };
export type Product = {
  id: number | string; name: string; description?: string; price: number | string;
  imageUrl?: string | null; stock?: number; categoryId?: number | string | null;
  category?: Category | string | null;
};
