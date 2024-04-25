// types.ts
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string;
}

export interface ProductCreate {
  id?: number;
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export interface ProductUpdate {
  id: number;
  title?: string;
  price?: number;
  description?: string;
  categoryId?: number;
  images?: string;
}

// Defines the structure of a cart item, which includes the product and quantity.
export interface CartItem {
  product: Product;
  quantity: number;
}

// Type for actions that might be used in managing the cart
export interface CartAction {
  type: 'ADD_ITEM' | 'REMOVE_ITEM' | 'UPDATE_ITEM';
  payload: CartItem;
}

// Type for the initial state of the cart, which includes an array of CartItems
export interface CartState {
  items: CartItem[];
}
