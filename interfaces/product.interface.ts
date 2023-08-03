import { StaticImageData } from "next/image";

export interface ItemProduct {
  title: string;
  image: StaticImageData | string;
  category: string;
  price: number;
}

export interface ProductProps {
  data: ItemProduct[];
}
