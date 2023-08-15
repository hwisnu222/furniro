import { ImageItem } from "./image.interface";

export interface ItemProduct {
  id: number;
  attributes: {
    name: string;
    image: ImageItem;
    summary: string;
    description: string;
    category: {
      data: {
        id: number;
        attributes: {
          category: string;
        };
      };
    };
    price: number;
    disscount: number;
    color?: string[] | null;
    size?: string[] | null;
    tag?: string[] | null;
    sku: string;
    rating: number;
    stock: number;
    review: any;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ProductProps {
  data: ItemProduct[];
}
