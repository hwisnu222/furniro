import React from "react";
import Link from "next/link";
import Image from "next/image";

import HeaderCard from "@/components/headers/HeaderCard";
import DashboardLayout from "@/components/layouts/DasboardLayout";

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
  Chip,
  Pagination,
  Divider,
} from "@mui/material";

// images
import FornitureImg from "@/assets/images/furniture.png";

export default function list() {
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
          <TextField placeholder="Search" size="small" />
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
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: 8 }).map((_, index: number) => (
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
                <TableCell>T200</TableCell>
                <TableCell align="right">Table</TableCell>
                <TableCell align="right">23 October 2023</TableCell>
                <TableCell align="right">24 October 2023</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider />
      <Box className="tw-flex tw-justify-end tw-py-4">
        <Pagination count={10} showFirstButton showLastButton />
      </Box>
    </DashboardLayout>
  );
}
