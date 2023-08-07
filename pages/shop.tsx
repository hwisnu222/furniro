import React from "react";

import {
  Button,
  MenuItem,
  Select,
  TextField,
  Stack,
  SelectChangeEvent,
} from "@mui/material";

import Header from "@/components/headers/Header";
import Products from "@/components/cards/Products";

import { TuneOutlined } from "@mui/icons-material";
import { Box } from "@mui/system";

import Footer from "@/components/footers/Footer";
import products from "@/json/products";
import HeaderProduct from "@/components/headers/HeaderProduct";
import Benefite from "@/components/footers/Benefite";
export default function Shop() {
  const [order, setOrder] = React.useState("asc");

  const handleOrder = (event: SelectChangeEvent) => {
    setOrder(event.target.value);
  };
  return (
    <>
      <Header />
      <HeaderProduct title="Shop" paths={[{ label: "Shop" }]} />

      <div className="tw-mb-8 tw-flex tw-flex-col tw-items-center tw-gap-4 tw-bg-default-100 tw-p-2 md:tw-flex-row md:tw-justify-around">
        <Stack direction="row" gap={2} alignItems="center">
          <Button startIcon={<TuneOutlined />} className="tw-text-black">
            Filter
          </Button>

          <span>Showing 1-18 of 32 results</span>
        </Stack>

        <Stack direction="row" gap={4}>
          <Stack direction="row" alignItems="center" gap={2}>
            <span>Show</span>
            <TextField disabled size="small" className="tw-w-10" />
          </Stack>
          <Stack direction="row" alignItems="center" gap={2}>
            <span>Short By</span>
            <Select value={order} onChange={handleOrder} size="small">
              <MenuItem value="asc">Asc</MenuItem>
              <MenuItem value="desc">Desc</MenuItem>
            </Select>
          </Stack>
        </Stack>
      </div>
      <Box className="tw-container tw-mx-auto tw-px-10">
        <Products data={products()} />
      </Box>

      <Benefite />
      <Footer />
    </>
  );
}
