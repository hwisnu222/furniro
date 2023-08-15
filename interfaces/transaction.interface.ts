import { ItemProduct } from "./product.interface";

export interface TransactionItem {
  id: number;
  attributes: {
    total: number;
    product: {
      data: ItemProduct;
    };
    createdAt?: string;
    updatedAt?: string;
  };
}
