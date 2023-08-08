import React from "react";
import Link from "next/link"

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
} from "@mui/material";

export default function list() {
  return (
    <DashboardLayout>
      <HeaderCard title="Product Lists" />
      <Box className="tw-mb-4 tw-flex tw-items-center tw-justify-between tw-gap-2">
        <Button
          variant="contained"
          className="tw-bg-default-200"
          component={Link}
          href="/admin/product/create"
        >
          Create Post
        </Button>
        <Box>
          <Button className="tw-mr-4">Filter</Button>
          <TextField placeholder="Search" size="small" />
        </Box>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Author</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Judul
              </TableCell>
              <TableCell align="right">Admin</TableCell>
              <TableCell align="right">
                <Chip label="Publised" />
              </TableCell>
              <TableCell align="right">23 October 2023</TableCell>
              <TableCell align="right">24 October 2023</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardLayout>
  );
}
