import { StaticImageData } from "next/image";

export interface ItemProduct {
  id: number;
  attributes: {
    name: string;
    image: { data: { id: number; attributes: { url: string } } };
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
    stock: number;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ProductProps {
  data: ItemProduct[];
}
