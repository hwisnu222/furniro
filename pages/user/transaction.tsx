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
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "@/graphql/queries/transaction.query";
import { useSession } from "next-auth/react";
import { TransactionItem } from "@/interfaces/transaction.interface";
import { formatDate } from "@/utils/date";
import Image from "@/components/images/Image";
import NotList from "@/components/notFound/NotList";

export default function Transaction() {
  const session = useSession();
  const { data } = useQuery(GET_TRANSACTIONS, {
    variables: {
      users_permissions_user: {
        id: {
          eq: session?.data?.id,
        },
      },
    },
  });

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
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Created At</TableCell>
                <TableCell align="right">Updated At</TableCell>
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
                        <Image
                          src={
                            dataTransaction.product.data.attributes.image
                              ?.data[0].attributes.url
                          }
                          alt="thumbnail-trasnaction"
                        />
                      </TableCell>
                      <TableCell>
                        {dataTransaction.product.data.attributes.name}
                      </TableCell>
                      <TableCell align="right">
                        {dataTransaction.total}
                      </TableCell>
                      <TableCell align="right" suppressHydrationWarning>
                        {formatDate(dataTransaction.createdAt)}
                      </TableCell>
                      <TableCell align="right" suppressHydrationWarning>
                        {formatDate(dataTransaction.updatedAt)}
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
