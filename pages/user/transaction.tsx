import React from "react";
import DashboardUserLayout from "@/components/layouts/DashboardUserLayout";
import HeaderCard from "@/components/headers/HeaderCard";

import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";

export default function Transaction() {
  return (
    <DashboardUserLayout>
      <HeaderCard title="Transactions" />
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
            <TableRow
              key={`row-`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                className="tw-w-[200px]"
              ></TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right" suppressHydrationWarning></TableCell>
              <TableCell align="right" suppressHydrationWarning></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardUserLayout>
  );
}
