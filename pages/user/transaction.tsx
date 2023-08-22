import React from "react";
import DashboardUserLayout from "@/components/layouts/DashboardUserLayout";
import HeaderCard from "@/components/headers/HeaderCard";
import Link from "next/link";

import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  AvatarGroup,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Stack,
} from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TRANSACTIONS } from "@/graphql/queries/transaction.query";
import { useSession } from "next-auth/react";
import { TransactionItem } from "@/interfaces/transaction.interface";
import { formatDate } from "@/utils/date";
import NotList from "@/components/notFound/NotList";
import { CartItem } from "@/interfaces/cart.interface";
import { Delete, Details, MoreVert } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";
import { DELETE_TRANSACTION } from "@/graphql/mutations/transaction.mutation";
import ModalTransaction from "@/components/modals/ModalTransaction";

const StatusTypography = (props: {
  children: React.ReactNode;
  status: string;
}) => {
  return (
    <Typography
      className={
        props.status === "process"
          ? "tw-text-orange-600"
          : props.status === "finish"
          ? "tw-text-green-600"
          : "tw-text-gray-600"
      }
    >
      {props.children}
    </Typography>
  );
};

export default function Transaction() {
  const session = useSession();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [deleteTransaction] = useMutation(DELETE_TRANSACTION);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const { data, refetch } = useQuery(GET_TRANSACTIONS, {
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

  const handleDelete = (id: number) => {
    handleCloseMenu();
    deleteTransaction({
      variables: {
        id,
      },
      onCompleted: () => {
        refetch();
        enqueueSnackbar("Transaction has deleted!", { variant: "success" });
      },
      onError: () => {
        enqueueSnackbar("Failed delete transaction", { variant: "error" });
      },
    });
  };

  return (
    <DashboardUserLayout>
      <HeaderCard title="Transactions" />
      {!data?.transactions?.data.length && <NotList />}
      {!!data?.transactions.data.length && (
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Product</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Created At</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.transactions?.data.map(
                (transaction: TransactionItem, index: number) => {
                  const dataTransaction = transaction.attributes;
                  return (
                    <TableRow
                      key={`transaction-${index}`}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        className="tw-w-[200px]"
                      >
                        <AvatarGroup max={4}>
                          {transaction.attributes.carts?.data.map(
                            (cart: CartItem, index: number) => (
                              <Avatar
                                key={`avatar-${index}`}
                                alt="Remy Sharp"
                                src={
                                  process.env.NEXT_PUBLIC_MEDIA +
                                  cart.attributes.product.data.attributes.image
                                    .data[0].attributes.url
                                }
                              />
                            ),
                          )}
                        </AvatarGroup>
                      </TableCell>
                      <TableCell>
                        {`${dataTransaction.carts?.data.length} products`}
                      </TableCell>
                      <TableCell align="right">
                        <StatusTypography status={dataTransaction.status}>
                          {dataTransaction.status}
                        </StatusTypography>
                      </TableCell>
                      <TableCell align="right" suppressHydrationWarning>
                        {formatDate(dataTransaction.createdAt)}
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row">
                          <IconButton
                            onClick={() => handleDelete(transaction.id)}
                          >
                            <Delete />
                          </IconButton>
                          <ModalTransaction transaction={transaction}>
                            <IconButton>
                              <Details />
                            </IconButton>
                          </ModalTransaction>
                        </Stack>

                        {/* <IconButton>
                          <IconButton onClick={handleClick}>
                            <MoreVert />
                          </IconButton>

                          <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleCloseMenu}
                            MenuListProps={{
                              "aria-labelledby": "basic-button",
                            }}
                          >
                            <ModalTransaction transaction={transaction}>
                              <MenuItem>Detail</MenuItem>
                            </ModalTransaction>
                            <MenuItem
                              className="tw-text-red-800"
                              
                            >
                              Hapus
                            </MenuItem>
                          </Menu>
                        </IconButton> */}
                      </TableCell>
                    </TableRow>
                  );
                },
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DashboardUserLayout>
  );
}
