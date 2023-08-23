import React from "react";
import { useSession } from "next-auth/react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  Box,
  TextField,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Divider,
} from "@mui/material";

import Benefite from "@/components/footers/Benefite";
import Footer from "@/components/footers/Footer";
import Header from "@/components/headers/Header";
import Container from "@/components/layouts/Container";
import HeaderProduct from "@/components/headers/HeaderProduct";

import { GET_CARTS } from "@/graphql/queries/cart.query";
import { CartItem } from "@/interfaces/cart.interface";

import { getSumProduct, getTotalPrice } from "@/utils/cart/getTotalCart";
import { convertCurrency } from "@/utils/currency";
import { ADD_TRANSACTION } from "@/graphql/mutations/transaction.mutation";
import { UPDATE_CARTS } from "@/graphql/mutations/cart.mutation";
import { STATUS_TRANSACTION } from "@/constants";
import { GET_PROFILE } from "@/graphql/queries/profile.query";
import { enqueueSnackbar } from "notistack";

export default function Checkout() {
  const session = useSession();
  const { data } = useQuery(GET_CARTS, {
    variables: {
      filters: {
        users_permissions_user: {
          id: { eq: session.data?.user.id },
        },
        transaction: {
          id: null,
        },
      },
    },
  });

  const { data: dataProfile } = useQuery(GET_PROFILE, {
    variables: {
      filters: {
        users_permissions_user: {
          id: {
            eq: session.data?.user.id,
          },
        },
      },
    },
  });

  const profile = dataProfile?.profiles?.data[0];

  const [createTransaction] = useMutation(ADD_TRANSACTION);
  const [updateCarts] = useMutation(UPDATE_CARTS);
  const { data: dataCarts, refetch } = useQuery(GET_CARTS, {
    variables: {
      filters: {
        users_permissions_user: {
          id: { eq: session.data?.user.id },
        },
        transaction: {
          id: { eq: null },
        },
      },
    },
    onCompleted: (cartData) => {},
  });

  const updateTransactionToCart = async (transaction: number) => {
    const idCarts = dataCarts?.carts.data.map((cart: CartItem) => cart.id);
    if (idCarts.length) {
      const updateAllCarts = await Promise.all(
        idCarts.map((id: number) => {
          return updateCarts({
            variables: {
              data: {
                transaction,
              },
              id,
            },
          });
        }),
      );

      refetch();
      enqueueSnackbar("Transaction has created!", { variant: "success" });
      return;
    }
    enqueueSnackbar("You haven't carts!", { variant: "error" });

    // getCarts({
    //   onCompleted: async (cartData: CartDataQuery) => {
    //     const idCarts = cartData?.carts.data.map((cart: CartItem) => cart.id);
    //     if (idCarts.length) {
    //       const updateAllCarts = await Promise.all(
    //         idCarts.map((id: number) => {
    //           return updateCarts({
    //             variables: {
    //               data: {
    //                 transaction,
    //               },
    //               id,
    //             },
    //           });
    //         }),
    //       );

    //       console.log(updateAllCarts);
    //       enqueueSnackbar("Transaction has created!", { variant: "success" });
    //       return;
    //     }
    //     enqueueSnackbar("You haven't carts!", { variant: "error" });
    //   },
    //   onError: () => {
    //     enqueueSnackbar("Failed create transaction!", { variant: "error" });
    //   },
    // });
  };

  const handleCheckoutCart = () => {
    createTransaction({
      variables: {
        data: {
          status: STATUS_TRANSACTION.pending,
          users_permissions_user: session.data?.user.id,
        },
      },
      onCompleted: (data) => {
        updateTransactionToCart(data.createTransaction?.data.id);
      },
    });
  };
  return (
    <>
      <Header />
      <HeaderProduct
        title="Checkout"
        paths={[{ label: "Checkout", url: "/checkout" }]}
      />
      <Container>
        <h3 className="tw-py-8 tw-text-2xl tw-font-bold">Billing details</h3>
      </Container>
      <Container className="tw-mb-8">
        <Box className="tw-grid tw-grid-cols-1 tw-gap-20 md:tw-grid-cols-2">
          <div>
            <div className="tw-flex tw-flex-col tw-gap-4">
              <div className="tw-flex tw-w-full tw-gap-2 ">
                <TextField
                  placeholder="First Name"
                  value={profile?.attributes.firstname}
                  disabled
                />
                <TextField
                  placeholder="Last Name"
                  value={profile?.attributes.lastname}
                  disabled
                />
              </div>
              <TextField
                placeholder="Company Name (optional)"
                value={profile?.attributes.company}
                disabled
              />
              <TextField
                placeholder="Country / Region "
                value={profile?.attributes.country}
                disabled
              />
              <TextField
                placeholder="Street Address "
                value={profile?.attributes.street}
                disabled
              />
              <TextField
                placeholder="Town / City "
                value={profile?.attributes.city}
                disabled
              />
              <TextField
                placeholder="Province"
                value={profile?.attributes.province}
                disabled
              />
              <TextField
                placeholder="ZIP Code"
                value={profile?.attributes.zip_code}
                disabled
              />
              <TextField
                placeholder="Phone"
                value={profile?.attributes.phone}
                disabled
              />
              <TextField
                placeholder="Additional information"
                value={profile?.attributes.additional}
                disabled
              />
            </div>
          </div>
          <div>
            <table className="tw-w-full">
              <thead>
                <tr>
                  <td className="tw-py-2 tw-text-xl tw-font-bold">Product</td>
                  <td className="tw-font-boldtw-py-2 tw-text-right tw-text-xl tw-font-bold">
                    Subtotal
                  </td>
                </tr>
              </thead>
              <tbody>
                {data?.carts.data.map((cart: CartItem, index: number) => (
                  <tr key={`cart-${index}`}>
                    <td className=" tw-py-2 tw-text-sm">
                      <span className="tw-mr-2 tw-text-gray-400">
                        {cart.attributes.product.data.attributes.name}
                      </span>
                      <span>x {cart.attributes.total}</span>
                    </td>
                    <td className="tw-py-2 tw-text-right">
                      {convertCurrency(getSumProduct(cart))}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="text-gray-400 tw-py-2 tw-text-sm">Subtotal</td>
                  <td className="tw-py-2 tw-text-right">
                    {convertCurrency(getTotalPrice(data?.carts.data))}
                  </td>
                </tr>
                <tr>
                  <td className="text-gray-400 tw-py-2 tw-text-sm">Total</td>
                  <td className="tw-py-2 tw-text-right tw-text-lg tw-font-bold tw-text-default-200">
                    {convertCurrency(getTotalPrice(data?.carts.data))}
                  </td>
                </tr>
              </tfoot>
            </table>

            <Divider className="tw-my-8" />

            <h3 className="tw-mb-4">Direct Bank Transfer</h3>
            <p className="tw-mb-4 tw-text-sm tw-text-gray-400">
              Make your payment directly into our bank account. Please use your
              Order ID as the payment reference. Your order will not be shipped
              until the funds have cleared in our account.
            </p>
            <FormControl className="tw-mb-4">
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
              >
                <FormControlLabel
                  value="0"
                  control={<Radio size="small" />}
                  label="Direct Bank Transfer"
                  className="tw-text-sm tw-text-gray-400"
                />
                <FormControlLabel
                  value="1"
                  control={<Radio size="small" />}
                  label="Cash On Delivery"
                  className="tw-text-sm tw-text-gray-400"
                />
              </RadioGroup>
            </FormControl>
            <p className="tw-mb-8 tw-text-sm">
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our privacy policy.
            </p>
            <div className="tw-flex tw-items-center tw-justify-center">
              <Button
                variant="outlined"
                onClick={handleCheckoutCart}
                disabled={!dataCarts?.carts.data?.length}
              >
                Place order{" "}
                {dataCarts?.carts.data?.length &&
                  `${dataCarts?.carts.data?.length} product`}
              </Button>
            </div>
          </div>
        </Box>
      </Container>
      <Benefite />
      <Footer />
    </>
  );
}
