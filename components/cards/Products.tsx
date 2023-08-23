import React from "react";
import Image from "next/image";
import Link from "next/link";
import { enqueueSnackbar } from "notistack";
import { useSession } from "next-auth/react";

import { useMutation, useQuery } from "@apollo/client";
import { Button, Avatar, Box, IconButton } from "@mui/material";
import {
  Compare,
  Details,
  Favorite,
  FavoriteBorder,
  Reply,
} from "@mui/icons-material";
import { convertCurrency } from "@/utils/currency";

import { ItemProduct, ProductProps } from "@/interfaces/product.interface";
import { ADD_CART } from "@/graphql/mutations/cart.mutation";
import {
  CREATE_WISHLIST,
  DELETE_WISHLIST,
} from "@/graphql/mutations/wishlist.mutation";
import { GET_WISHLISTS } from "@/graphql/queries/wishlist.query";
import { WishListItem } from "@/interfaces/wishlist.interface";

export default function Products(props: {
  data: ItemProduct[];
  refetch?: any;
}) {
  const session = useSession();
  const [wishlists, setWishlist] = React.useState([]);

  const [addCart] = useMutation(ADD_CART);
  const [addWishlist] = useMutation(CREATE_WISHLIST);
  const [deleteWishlist] = useMutation(DELETE_WISHLIST);

  const { refetch: refetchWishlist } = useQuery(GET_WISHLISTS, {
    variables: {
      filters: {
        users_permissions_user: {
          id: { eq: session.data?.user.id },
        },
      },
    },
    onCompleted: (data) => {
      setWishlist(data.wishlists.data);
    },
  });

  const checkWishlist = (id: number) => {
    const listId = wishlists.filter(
      (item: WishListItem) => item.attributes.product.data?.id === id,
    );
    return listId[0]?.["id"];
  };

  const handleAddWishlist = (id: number) => {
    const idUser = session.data?.user.id;
    addWishlist({
      variables: {
        data: {
          product: id,
          users_permissions_user: idUser,
        },
      },
      onCompleted: () => {
        refetchWishlist();
        props.refetch();
        enqueueSnackbar("Product has added to wishlist", {
          variant: "success",
        });
      },
      onError: () => {
        enqueueSnackbar("failed add product to wishlist", { variant: "error" });
      },
    });
  };

  const handleDeleteWishlist = (id: number) => {
    deleteWishlist({
      variables: {
        id,
      },
      onCompleted: () => {
        refetchWishlist();
        props.refetch();
        enqueueSnackbar("Wishlist is deleted!", { variant: "success" });
      },
      onError: () => {
        enqueueSnackbar("failed delete wishlist!", { variant: "error" });
      },
    });
  };

  const handleAddCart = (id: number) => {
    addCart({
      variables: {
        data: {
          total: 1,
          product: id,
          users_permissions_user: session.data?.user.id,
        },
      },
      onCompleted: () => {
        enqueueSnackbar("Product has added to cart", { variant: "success" });
      },
      onError: () => {
        enqueueSnackbar("failed add product to cart", { variant: "error" });
      },
    });
  };
  return (
    <div className="tw-mb-8 tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-4">
      {props.data?.map((item: ItemProduct, index: number) => (
        <Box
          key={`product-${index}`}
          className="tw-relative tw-gap-4 tw-rounded-md tw-bg-gray-200 tw-text-left"
        >
          <div className="tw-absolute tw-left-0 tw-top-0 tw-z-20 tw-flex tw-h-full tw-w-full tw-flex-col tw-items-center tw-justify-center tw-bg-[#00000080] tw-opacity-0 tw-duration-300 hover:tw-h-full hover:tw-opacity-100">
            <Button
              onClick={() => handleAddCart(item.id)}
              variant="contained"
              className="tw-mb-8 tw-bg-white tw-text-default-200 hover:tw-text-white"
            >
              Add to cart
            </Button>
            <ul className="tw-grid tw-grid-cols-2 tw-gap-4 tw-font-bold tw-text-white">
              <li className="cursor-pointer tw-flex tw-items-center tw-gap-1 tw-text-sm">
                <Reply className="tw-h-6 tw-w-6" /> Share
              </li>
              <li className="cursor-pointer tw-flex tw-cursor-pointer tw-items-center tw-gap-1 tw-text-sm">
                {checkWishlist(item.id) ? (
                  <IconButton
                    onClick={() => handleDeleteWishlist(checkWishlist(item.id))}
                  >
                    <Favorite className="tw-h-6 tw-w-6 tw-text-red-400" />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => handleAddWishlist(item.id)}>
                    <FavoriteBorder className="tw-h-6 tw-w-6 tw-text-white" />
                  </IconButton>
                )}

                <span>Like</span>
              </li>
              <Link
                href={`/product-comparison?current=${item.attributes.slug}`}
              >
                <li className="cursor-pointer tw-flex tw-items-center tw-gap-1 tw-text-sm">
                  <Compare className="tw-h-6 tw-w-6" />
                  Compare
                </li>
              </Link>
              <Link href={`/single-product/${item.attributes.slug}`}>
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
              item.attributes.image?.data[0].attributes.url
            }
            alt="products"
            fill={false}
            width={200}
            height={200}
            className="tw-h-72 tw-w-full tw-object-cover"
          />
          <Box className="tw-flex tw-flex-col tw-gap-2 tw-p-4">
            <h3 className="tw-text-xl tw-font-bold">{item.attributes.name}</h3>
            <p className="tw-text-gray-500">
              {item.attributes.category?.data?.attributes.category || "-"}
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
          </Box>
        </Box>
      ))}
    </div>
  );
}
