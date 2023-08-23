import React from "react";
import Link from "next/link";

import Header from "@/components/headers/Header";
import HeaderProduct from "@/components/headers/HeaderProduct";
import Benefite from "@/components/footers/Benefite";
import Footer from "@/components/footers/Footer";
import Container from "@/components/layouts/Container";
import Comparison from "@/components/cards/ComparisonProduct";

import {
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  Rating,
} from "@mui/material";

import dummyProducts from "@/json/products";
import { useSearchParams } from "next/navigation";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_PRODUCT, GET_PRODUCTS } from "@/graphql/queries/product.query";
import { convertCurrency } from "@/utils/currency";
import { ItemProduct } from "@/interfaces/product.interface";

const products = dummyProducts();

export default function ProductComparison() {
  const search = useSearchParams();
  const currentProduct = search.get("current");
  const [selectProduct, setSelectProduct] = React.useState("");

  const { data } = useQuery(GET_PRODUCT, {
    variables: {
      filters: {
        slug: {
          eq: currentProduct,
        },
      },
    },
  });
  const product = data?.products?.data[0];
  const { data: dataProducts } = useQuery(GET_PRODUCTS, {
    skip: !product?.attributes.category.data.attributes.category,
    variables: {
      filters: {
        category: {
          category: {
            eq: product?.attributes.category.data.attributes.category,
          },
        },
      },
    },
  });
  const products = dataProducts?.products.data;

  const [getProduct, { data: dataCompare }] = useLazyQuery(GET_PRODUCT);
  const productCompare = dataCompare?.products.data[0];

  const handleSelectProduct = (event: SelectChangeEvent) => {
    getProduct({
      variables: {
        filters: {
          id: {
            eq: event.target.value,
          },
        },
      },
    });
    setSelectProduct(event.target.value);
  };

  React.useEffect(() => {
    getProduct();
  }, [getProduct]);
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
          <Link
            href={`/single-product/${product?.attributes.slug}`}
            className="hover:tw-bg-gray-50"
          >
            <Comparison
              image={product?.attributes.image.data[0]?.attributes.url}
              price={product?.attributes.price}
              name={product?.attributes.name}
              review={product?.attributes.reviews.data.length}
              rating={product?.attributes.rating}
            />
          </Link>
          {productCompare && (
            <Link
              href={`/single-product/${productCompare?.attributes.slug}`}
              className="hover:tw-bg-gray-50"
            >
              <Comparison
                image={productCompare?.attributes.image.data[0]?.attributes.url}
                price={productCompare?.attributes.price}
                name={productCompare?.attributes.name}
                review={productCompare?.attributes.reviews.data.length}
                rating={productCompare?.attributes.rating}
              />
            </Link>
          )}

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
              {products?.map((product: ItemProduct, index: number) => (
                <MenuItem value={product.id} key={`product-${index}`}>
                  {product.attributes.name}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
        {/* <TableComparison title="General" data={general} /> */}
        <Box className="tw-pt-8">
          <h3 className="tw-mb-4 tw-text-lg tw-font-semibold">General</h3>
          <table className="md:tw-w-5/6">
            <tbody>
              <tr>
                <td className="tw-py-2">Name</td>
                <td className="tw-py-2">{product?.attributes.name}</td>
                <td className="tw-py-2">{productCompare?.attributes.name}</td>
              </tr>
              <tr>
                <td className="tw-py-2">Price</td>
                <td className="tw-py-2">
                  {convertCurrency(product?.attributes.price)}
                </td>
                <td className="tw-py-2">
                  {convertCurrency(productCompare?.attributes.price)}
                </td>
              </tr>
              <tr>
                <td className="tw-py-2">Disscount</td>
                <td className="tw-py-2">{product?.attributes.disscount} %</td>
                <td className="tw-py-2">
                  {productCompare?.attributes.disscount} %
                </td>
              </tr>

              <tr>
                <td className="tw-py-2">Rating</td>
                <td className="tw-py-2">
                  <Rating value={product?.attributes.rating} size="small" />
                </td>
                <td className="tw-py-2">
                  <Rating
                    value={productCompare?.attributes.rating}
                    size="small"
                  />
                </td>
              </tr>
              <tr>
                <td className="tw-py-2">Stock</td>
                <td className="tw-py-2">{product?.attributes.stock}</td>
                <td className="tw-py-2">{productCompare?.attributes.stock}</td>
              </tr>
              <tr>
                <td className="tw-py-2">SKU</td>
                <td className="tw-py-2">{product?.attributes.sku}</td>
                <td className="tw-py-2">{productCompare?.attributes.sku}</td>
              </tr>
              <tr>
                <td className="tw-py-2">Review</td>
                <td className="tw-py-2">
                  {product?.attributes.reviews.data.length} reviews
                </td>
                <td className="tw-py-2">
                  {productCompare?.attributes.reviews.data.length} reviews
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      </Container>
      <Benefite />
      <Footer />
    </>
  );
}
