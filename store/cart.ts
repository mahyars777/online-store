import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types";
type CartItem = { product: Product; quantity: number };
type CartState = { items: CartItem[]; add: (p: Product) => void; remove: (id: string | number) => void; setQuantity: (id: string | number, q: number) => void; clear: () => void };
export const useCart = create<CartState>()(persist((set) => ({
  items: [],
  add: (product) => set(s => { const found = s.items.find(i => i.product.id === product.id); return { items: found ? s.items.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i) : [...s.items, { product, quantity: 1 }] }; }),
  remove: (id) => set(s => ({ items: s.items.filter(i => i.product.id !== id) })),
  setQuantity: (id, quantity) => set(s => ({ items: quantity <= 0 ? s.items.filter(i => i.product.id !== id) : s.items.map(i => i.product.id === id ? { ...i, quantity } : i) })),
  clear: () => set({ items: [] })
}), { name: "sabzineh-cart" }));
