export interface OrderItem {
  productId: number;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: number;
  total: number;
  shippingAddress: string;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export type CreateOrderResponse = Order & { user_id: number };

export interface CreateOrderPayload {
  userId: number;
  shippingAddress: string;
}
