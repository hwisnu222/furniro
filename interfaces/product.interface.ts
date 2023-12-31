import { ImageItems } from "./image.interface";
import { ReviewItem } from "./review.interface";

export interface ItemProduct {
  id: number;
  attributes: {
    slug: string;
    name: string;
    image: ImageItems;
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
    reviews: {
      data: ReviewItem[];
    };
    additional?: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ProductProps {
  data: ItemProduct[];
}
