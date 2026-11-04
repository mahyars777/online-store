import { apiClient } from "@/lib/axios";
import type { CreateOrderPayload, CreateOrderResponse, Order } from "@/types/order";

export async function createOrder(
  payload: CreateOrderPayload,
): Promise<CreateOrderResponse> {
  const { data } = await apiClient.post<CreateOrderResponse>("/orders", payload);
  return data;
}

export async function getOrders(userId: number): Promise<Order[]> {
  const { data } = await apiClient.get<Order[]>("/orders", { params: { userId } });
  return data;
}
