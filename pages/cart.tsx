import React from "react";
import Image from "next/image";

import {
  Box,
  Table,
  TableContainer,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Button,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

import Footer from "@/components/footers/Footer";
import Header from "@/components/headers/Header";
import HeaderProduct from "@/components/headers/HeaderProduct";
import Benefite from "@/components/footers/Benefite";
import Container from "@/components/layouts/Container";

import FurnitureImg from "@/assets/images/furniture.png";

import { convertCurrency } from "@/utils/currency";
import { CartItem } from "@/interfaces/cart.interface";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CARTS } from "@/graphql/queries/cart.query";
import { DELETE_CART } from "@/graphql/mutations/cart.mutation";
import { getTotalPrice } from "@/utils/cart/getTotalCart";

export default function Cart() {
  const [deleteCart] = useMutation(DELETE_CART, {
    onCompleted: () => {
      alert("Cart is delete");
      refetch();
    },
    onError: () => {
      alert("failed delete cart");
    },
  });

  const { data, refetch } = useQuery(GET_CARTS, {
    fetchPolicy: "cache-and-network",
  });
  const carts = data?.carts.data;

  const handleDeleteCart = (id: number) => {
    deleteCart({
      variables: {
        id,
      },
    });
  };
  return (
    <>
      <Header />
      <HeaderProduct title="Cart" paths={[{ label: "Cart", url: "/cart" }]} />
      <Container className="tw-flex tw-flex-col tw-gap-8 tw-p-12 md:tw-flex-row">
        <div className="tw-flex-2 tw-w-full md:tw-w-3/4">
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className="tw-bg-default-100">
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Subtotal</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {carts?.map((cart: CartItem, index: number) => (
                  <TableRow
                    key={`cart-${index}`}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right" className="tw-text-gray-400">
                      <Image
                        src={FurnitureImg}
                        alt="thumbnail-cart"
                        fill={false}
                        className="tw-h-24 tw-w-24 tw-rounded-md"
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      className="tw-text-gray-400"
                    >
                      {cart.attributes.product?.data?.attributes.name}
                    </TableCell>
                    <TableCell align="right" className="tw-text-gray-400">
                      {convertCurrency(
                        cart.attributes.total *
                          cart.attributes.product?.data?.attributes.price,
                      )}
                    </TableCell>
                    <TableCell className="tw-text-right">
                      <p className="tw-inline-block tw-h-8 tw-w-8 tw-rounded-sm tw-border tw-text-center tw-align-middle ">
                        {cart.attributes.total}
                      </p>
                    </TableCell>
                    <TableCell align="right">4</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleDeleteCart(cart.id)}>
                        <Delete className="tw-text-default-200" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="tw-rounded-sm tw-bg-default-100 tw-px-12 tw-py-4">
          <h3 className="tw-mb-4 tw-text-center tw-text-2xl">Cart Totals</h3>
          <Box className="tw-mb-8">
            <div className="tw-mb-2 tw-grid tw-grid-cols-2">
              <span>Subtotal</span>
              <span className="tw-whitespace-nowrap">Rp 25.000.000</span>
            </div>
            <div className="tw-grid tw-grid-cols-2">
              <span>Total</span>
              <span className="tw-whitespace-nowrap">
                {convertCurrency(getTotalPrice(carts))}
              </span>
            </div>
          </Box>
          <Button variant="outlined" className="tw-w-full">
            Check out
          </Button>
        </div>
      </Container>
      <Benefite />
      <Footer />
    </>
  );
}
