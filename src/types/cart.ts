export interface CartItem {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
  quantity: number;
  lineTotal: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface AddToCartPayload {
  userId: number;
  productId: number;
  quantity: number;
}

export interface UpdateCartItemPayload {
  userId: number;
  productId: number;
  quantity: number;
}
