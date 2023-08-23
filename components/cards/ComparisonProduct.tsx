import React from "react";
import { StaticImageData } from "next/image";
import { Rating, Box } from "@mui/material";
import { convertCurrency } from "@/utils/currency";
import Image from "../images/Image";

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
        className="tw-h-32 tw-w-full tw-object-cover"
      />
      <Box className="tw-p-2">
        <h3 className="tw-text-lg tw-font-bold">{name}</h3>
        <p className="tw-font-bold">{convertCurrency(price)}</p>
        <div className="tw-flex tw-items-center tw-gap-2">
          <span>{rating}</span>
          <Rating value={rating as number} size="small" readOnly />
          <span className="tw-text-sm tw-text-gray-400">{review} reviews</span>
        </div>
      </Box>
    </section>
  );
}
