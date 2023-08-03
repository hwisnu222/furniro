import React from "react";
import Image, { StaticImageData } from "next/image";
import { Rating } from "@mui/material";
import { convertCurrency } from "@/utils/currency";

interface ProductComparisonProps {
  image: StaticImageData | string;
  name: string;
  price: number;
  rating?: number;
  review?: number;
}

export default function ComparisonProduct({
  image,
  name,
  price,
  rating = 0,
  review = 0,
}: ProductComparisonProps) {
  return (
    <section className="tw-flex tw-flex-col tw-gap-2">
      <Image
        src={image}
        alt="thumbnail-compare"
        fill={false}
        className="tw-h-32 tw-w-full"
      />
      <h3 className="tw-text-lg tw-font-bold">{name}</h3>
      <p className="tw-font-bold">{convertCurrency(price)}</p>
      <div className="tw-flex tw-items-center tw-gap-2">
        <span>{rating}</span>
        <Rating value={rating as number} size="small" />
        <span className="tw-text-sm tw-text-gray-400">{review} reviews</span>
      </div>
    </section>
  );
}
