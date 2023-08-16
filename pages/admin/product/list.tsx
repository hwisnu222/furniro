import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLazyQuery } from "@apollo/client";

import HeaderCard from "@/components/headers/HeaderCard";
import DashboardLayout from "@/components/layouts/DashboardAdminLayout";

import {
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Table,
  Button,
  Box,
  TextField,
  Pagination,
  Divider,
  IconButton,
} from "@mui/material";

import client from "@/graphql/client";
import { GET_PRODUCTS } from "@/graphql/queries/product.query";

// images
import { ItemProduct } from "@/interfaces/product.interface";
import FornitureImg from "@/assets/images/furniture.png";
import { formatDate } from "@/utils/date";
import { Edit } from "@mui/icons-material";
import { Meta } from "@/interfaces/meta.interface";

export default function List({
  products,
}: {
  products: {
    data: ItemProduct[];
    meta: Meta;
  };
}) {
  const [productList, setProductList] = React.useState(products || []);
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [getProducts] = useLazyQuery(GET_PRODUCTS, {
    variables: {
      filter: search,
    },
    onCompleted: (data) => {
      const dataProduct = data.products;
      setProductList(dataProduct);
    },
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    getProducts();
  };

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };
  console.log(productList);
  return (
    <DashboardLayout>
      <HeaderCard
        title="Product Lists"
        rightAction={
          <Button
            variant="contained"
            className="tw-bg-default-200"
            size="large"
            component={Link}
            href="/admin/product/create"
          >
            Create Product
          </Button>
        }
      />
      <Box className="tw-mb-4 tw-flex tw-items-center tw-justify-between tw-gap-2 tw-pt-4">
        <p className="tw-text-gray-400">Show from 1 to 20 result</p>
        <Box>
          <Button className="tw-mr-4">Filter</Button>
          <TextField
            placeholder="Search"
            size="small"
            onChange={handleSearch}
          />
        </Box>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Product</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Updated At</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList.data?.map((product: ItemProduct, index: number) => (
              <TableRow
                key={`row-${index}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" className="tw-w-[200px]">
                  <Image
                    src={FornitureImg}
                    alt="thumbnail-product"
                    fill={false}
                    className="tw-h-36 tw-w-36 tw-object-cover"
                  />
                </TableCell>
                <TableCell>{product.attributes.name}</TableCell>
                <TableCell align="right">
                  {product.attributes.category.data?.attributes.category || "-"}
                </TableCell>
                <TableCell align="right" suppressHydrationWarning>
                  {formatDate(product.attributes.createdAt)}
                </TableCell>
                <TableCell align="right" suppressHydrationWarning>
                  {formatDate(product.attributes.updatedAt)}
                </TableCell>
                <TableCell align="right">
                  <Link href={`/admin/product/edit?id=${product.id}`}>
                    <IconButton>
                      <Edit />
                    </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider />
      <Box className="tw-flex tw-justify-end tw-py-4">
        <Pagination
          page={page}
          count={Math.floor(
            productList.meta?.pagination.total /
              productList.meta?.pagination.pageSize,
          )}
          onChange={handlePagination}
          showFirstButton
          showLastButton
        />
      </Box>
    </DashboardLayout>
  );
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_PRODUCTS,
  });
  const products = data.products;

  return {
    props: {
      products,
    },
  };
}
