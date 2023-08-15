import { ItemProduct } from "@/interfaces/product.interface";

export interface WishListItem {
  id: number;
  attributes: {
    product: { data: ItemProduct };
    createdAt: string;
    updatedAt: string;
  };
}
