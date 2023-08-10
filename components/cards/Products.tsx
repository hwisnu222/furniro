import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Avatar } from "@mui/material";
import { Compare, Details, FavoriteBorder, Reply } from "@mui/icons-material";
import { convertCurrency } from "@/utils/currency";

import { ItemProduct, ProductProps } from "@/interfaces/product.interface";

export default function Products({ data }: ProductProps) {
  return (
    <div className="tw-mb-8 tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-4">
      {data?.map((item: ItemProduct, index: number) => (
        <section
          key={`product-${index}`}
          className="tw-relative tw-gap-4 tw-rounded-md tw-bg-gray-200 tw-text-left"
        >
          <div className="tw-absolute tw-left-0 tw-top-0 tw-z-20 tw-flex tw-h-full tw-w-full tw-flex-col tw-items-center tw-justify-center tw-bg-[#00000080] tw-opacity-0 tw-duration-300 hover:tw-h-full hover:tw-opacity-100">
            <Button
              variant="contained"
              className="tw-mb-8 tw-bg-white tw-text-default-200 hover:tw-text-white"
            >
              Add to cart
            </Button>
            <ul className="tw-grid tw-grid-cols-2 tw-gap-4 tw-font-bold tw-text-white">
              <li className="cursor-pointer tw-flex tw-items-center tw-gap-1 tw-text-sm">
                <Reply className="tw-h-6 tw-w-6" /> Share
              </li>
              <li className="cursor-pointer tw-flex tw-items-center tw-gap-1 tw-text-sm">
                <FavoriteBorder className="tw-h-6 tw-w-6" /> <span>Like</span>
              </li>
              <Link href={`/product-comparison?current=${index}&compare=5`}>
                <li className="cursor-pointer tw-flex tw-items-center tw-gap-1 tw-text-sm">
                  <Compare className="tw-h-6 tw-w-6" />
                  Compare
                </li>
              </Link>
              <Link href={`/single-product/${item.id}`}>
                <li className="cursor-pointer  tw-flex tw-items-center tw-gap-1 tw-text-sm">
                  <Details />
                  Detail
                </li>
              </Link>
            </ul>
          </div>

          <Avatar className="tw-absolute tw-right-4 tw-top-4 tw-bg-red-400">
            <span className="tw-text-sm">{item?.attributes?.disscount}%</span>
          </Avatar>

          <Image
            src={
              process.env.NEXT_PUBLIC_MEDIA +
              item.attributes.image?.data.attributes.url
            }
            alt="products"
            fill={false}
            width={100}
            height={100}
            className="tw-h-72 tw-w-full tw-object-cover"
          />
          <div className="tw-flex tw-flex-col tw-gap-2 tw-p-4">
            <h3 className="tw-text-xl tw-font-bold">{item.attributes.name}</h3>
            <p className="tw-text-gray-500">
              {item.attributes.category?.data.attributes.name || "-"}
            </p>
            <div className="tw-flex tw-flex-col tw-items-start tw-justify-between tw-gap-2 md:tw-flex-row md:tw-items-center">
              <s className="tw-inline tw-text-sm tw-text-gray-400">
                {convertCurrency(item?.attributes.price)}
              </s>
              <strong className="tw-inline tw-text-default-200">
                {convertCurrency(
                  (item?.attributes.disscount / 100) * item?.attributes.price,
                )}
              </strong>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
