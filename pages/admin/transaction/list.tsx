import React from "react";
import Link from "next/link";
import { useMutation, useQuery } from "@apollo/client";

import HeaderCard from "@/components/headers/HeaderCard";
import DashboardLayout from "@/components/layouts/DashboardAdminLayout";

import {
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Table,
  Box,
  TextField,
  Pagination,
  Divider,
  IconButton,
  Select,
  MenuItem,
  Button,
  Modal,
  Typography,
  SelectChangeEvent,
} from "@mui/material";

// images
import { Edit } from "@mui/icons-material";
import { GET_TRANSACTIONS } from "@/graphql/queries/transaction.query";
import { TransactionItem } from "@/interfaces/transaction.interface";
import { formatDate } from "@/utils/date";
import { UPDATE_TRANSACTION } from "@/graphql/mutations/transaction.mutation";
import { enqueueSnackbar } from "notistack";

const ModalDetail = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <IconButton onClick={handleOpen}>
        <Edit />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="tw-absolute tw-left-1/2 tw-right-1/2 tw-top-1/2 tw-inline-block tw-rounded-md tw-bg-white tw-p-4 md:tw-w-[400px]">
          <Typography variant="h5">hello</Typography>
        </Box>
      </Modal>
    </>
  );
};
export default function List() {
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(0);
  const { data, refetch } = useQuery(GET_TRANSACTIONS, {
    variables: {
      filters: {
        status: {
          containsi: search,
        },
      },
    },
  });

  const [updateStatusTransaction] = useMutation(UPDATE_TRANSACTION);

  const handleStatusTransaction = (status: string, id: number) => {
    updateStatusTransaction({
      variables: {
        data: {
          status,
        },
        id,
      },
      onCompleted: () => {
        enqueueSnackbar("Status transaction updated!", { variant: "success" });
      },
      onError: () => {
        enqueueSnackbar("failed updated status transaction", {
          variant: "error",
        });
      },
    });
    refetch();
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event?.target.value);
  };

  const handleChangePage = (_: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };
  return (
    <DashboardLayout>
      <HeaderCard title="Transaction User" />
      <Box className="tw-mb-4 tw-flex tw-items-center tw-justify-between tw-gap-2 tw-pt-4">
        <p className="tw-text-gray-400">
          Show from {data?.transactions?.data.length} to{" "}
          {data?.transactions.meta.pagination.total} result
        </p>
        <Box>
          <TextField
            placeholder="Search: Pending, process..."
            size="small"
            onChange={handleSearch}
          />
        </Box>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Updated At</TableCell>
              {/* <TableCell align="right"></TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.transactions.data.map(
              (transaction: TransactionItem, index: number) => (
                <TableRow
                  key={`row-${index}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    {transaction.attributes.carts.data.length} Products
                  </TableCell>
                  <TableCell align="right">
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      variant="standard"
                      value={transaction.attributes.status}
                      onChange={(event: SelectChangeEvent) =>
                        handleStatusTransaction(
                          event.target.value,
                          transaction.id,
                        )
                      }
                      className={
                        transaction.attributes.status === "process"
                          ? "tw-bg-orange-600 tw-px-2 tw-text-white"
                          : transaction.attributes.status === "finish"
                          ? "tw-bg-green-600 tw-px-2 tw-text-white"
                          : "tw-bg-gray-600 tw-px-2 tw-text-white"
                      }
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="process">Process</MenuItem>
                      <MenuItem value="finish">Finish</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell align="right" suppressHydrationWarning>
                    {formatDate(transaction.attributes.createdAt)}
                  </TableCell>
                  <TableCell align="right" suppressHydrationWarning>
                    {formatDate(transaction.attributes.updatedAt)}
                  </TableCell>
                  {/* <TableCell align="right">
                    <IconButton>
                        <Edit />
                      </IconButton>
                    <ModalDetail />
                  </TableCell> */}
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider />
      <Box className="tw-flex tw-justify-end tw-py-4">
        <Pagination
          showFirstButton
          showLastButton
          count={Math.floor(
            data?.transactions.meta.pagination.total /
              data?.transactions.meta.pagination.pageSize,
          )}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
    </DashboardLayout>
  );
}
