import { ImageItem } from "./image.interface";
import { ItemProduct } from "./product.interface";

export interface CartItem {
  id: number;
  attributes: {
    total: number;
    product: {
      data: ItemProduct;
    };
  };
}
