import { apiClient } from "@/lib/axios";
import type { AddToCartPayload, Cart, UpdateCartItemPayload } from "@/types/cart";

export async function getCart(userId: number): Promise<Cart> {
  const { data } = await apiClient.get<Cart>("/cart", { params: { userId } });
  return data;
}

export async function addToCart(payload: AddToCartPayload): Promise<Cart> {
  const { data } = await apiClient.post<Cart>("/cart/items", payload);
  return data;
}

export async function updateCartItem({
  productId,
  ...body
}: UpdateCartItemPayload): Promise<Cart> {
  const { data } = await apiClient.patch<Cart>(`/cart/items/${productId}`, body);
  return data;
}

export async function removeCartItem(userId: number, productId: number): Promise<Cart> {
  const { data } = await apiClient.delete<Cart>(`/cart/items/${productId}`, {
    params: { userId },
  });
  return data;
}
