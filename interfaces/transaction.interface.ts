import { CartItem } from "./cart.interface";
import { ItemProduct } from "./product.interface";

export interface TransactionItem {
  id: number;
  attributes: {
    status: string;
    carts: {
      data: CartItem[];
    };
    createdAt?: string;
    updatedAt?: string;
  };
}
