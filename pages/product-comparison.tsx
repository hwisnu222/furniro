import React from "react";
import Link from "next/link";

import Header from "@/components/Header";
import HeaderProduct from "@/components/HeaderProduct";
import Benefite from "@/components/Benefite";
import Footer from "@/components/Footer";
import Container from "@/components/layouts/Container";
import Comparison from "@/components/ComparisonProduct";

import { Select, MenuItem, SelectChangeEvent, Box } from "@mui/material";

import FurnitureImg from "@/assets/images/furniture.png";
import TableComparison from "@/components/TableComparison";
import dummyProducts from "@/json/products";
import general from "@/json/comparison/general.json";

const products = dummyProducts();

export default function ProductComparison() {
  const [selectProduct, setSelectProduct] = React.useState("");

  const handleSelectProduct = (event: SelectChangeEvent) => {
    setSelectProduct(event.target.value);
  };
  return (
    <>
      <Header />
      <HeaderProduct
        title="Product Comparison"
        paths={[{ label: "Comparison" }]}
      />
      <Container className="tw-my-8">
        <div className="tw-grid tw-grid-cols-4 tw-gap-8">
          <div>
            <h3 className="tw-mb-2 tw-mt-2 tw-text-xl tw-font-bold">
              Go to Product page for more Products
            </h3>
            <Link href="/shop" className="tw-underline">
              View More
            </Link>
          </div>
          <Comparison
            image={FurnitureImg}
            price={2500000}
            name="Asgaard Sofa"
            review={200}
            rating={4}
          />
          <Comparison
            image={FurnitureImg}
            price={2500000}
            name="Asgaard Sofa"
            review={200}
            rating={4}
          />

          <div className="md:tw-pt-8">
            <h3 className="tw-mb-4 tw-text-xl tw-font-bold">Add Product</h3>
            <Select
              value={selectProduct}
              onChange={handleSelectProduct}
              displayEmpty
              size="small"
              className="tw-w-full tw-bg-default-200 tw-text-white"
            >
              <MenuItem value="">
                <em>Choose a Product</em>
              </MenuItem>
              {products.map((product, index) => (
                <MenuItem value={10} key={`product-${index}`}>
                  {product.title}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
        <TableComparison title="General" data={general} />
      </Container>
      <Benefite />
      <Footer />
    </>
  );
}
