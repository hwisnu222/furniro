import React from "react";
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

import Benefite from "@/components/Benefite";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Container from "@/components/layouts/Container";
import HeaderProduct from "@/components/HeaderProduct";

export default function checkout() {
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
                <TextField label="First Name" />
                <TextField label="Last Name" />
              </div>
              <TextField label="Company Name (optional)" />
              <TextField label="Country / Region " />
              <TextField label="Street Address " />
              <TextField label="Town / City " />
              <TextField label="Province" />
              <TextField label="ZIP Code" />
              <TextField label="Phone" />
              <TextField label="Email Address" />
              <TextField placeholder="Additional information" />
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
                <tr>
                  <td className=" tw-py-2 tw-text-sm">
                    <span className="tw-mr-2 tw-text-gray-400">
                      Asgard Sofa
                    </span>
                    <span>x 1</span>
                  </td>
                  <td className="tw-py-2 tw-text-right">Rp 25.000.000</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td className="text-gray-400 tw-py-2 tw-text-sm">Subtotal</td>
                  <td className="tw-py-2 tw-text-right">Rp 25.000.000</td>
                </tr>
                <tr>
                  <td className="text-gray-400 tw-py-2 tw-text-sm">Total</td>
                  <td className="tw-py-2 tw-text-right tw-text-lg tw-font-bold tw-text-default-200">
                    Rp 25.000.000
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
              <Button variant="outlined">Place order</Button>
            </div>
          </div>
        </Box>
      </Container>
      <Benefite />
      <Footer />
    </>
  );
}
