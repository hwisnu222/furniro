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
  IconButton,
} from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import { enqueueSnackbar } from "notistack";

import { WishListItem } from "@/interfaces/wishlist.interface";
import Image from "@/components/images/Image";
import { Delete } from "@mui/icons-material";

import { GET_WISHLISTS } from "@/graphql/queries/wishlist.query";
import { DELETE_WISHLIST } from "@/graphql/mutations/wishlist.mutation";
import NotList from "@/components/notFound/NotList";
import { useSession } from "next-auth/react";

export default function Wishlist() {
  const session = useSession();
  const { data, refetch } = useQuery(GET_WISHLISTS, {
    fetchPolicy: "cache-and-network",
    variables: {
      filters: {
        users_permissions_user: { id: { eq: session.data?.user.id } },
      },
    },
  });

  const [deleteWishlist] = useMutation(DELETE_WISHLIST, {
    onCompleted: () => {
      enqueueSnackbar("Wishlist is deleted!", { variant: "success" });
      refetch();
    },
    onError: () => {
      enqueueSnackbar("failed delete wishlist!", { variant: "error" });
    },
  });

  const handleDeleteWishlist = (id: number) => {
    deleteWishlist({
      variables: { id },
    });
  };
  return (
    <DashboardUserLayout>
      <HeaderCard title="Wishlist" />
      {!data?.wishlists.data?.length && <NotList />}
      {Boolean(data?.wishlists.data?.length) && (
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Product</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.wishlists.data.map(
                (wishlist: WishListItem, index: number) => (
                  <TableRow
                    key={`row-${index}`}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      className="tw-w-[200px]"
                    >
                      <Image
                        src={
                          wishlist.attributes.product.data?.attributes?.image
                            .data[0].attributes.url
                        }
                        alt="wishlist-product"
                        className="tw-h-32 tw-w-32 tw-object-cover"
                      />
                    </TableCell>
                    <TableCell>
                      {wishlist.attributes.product.data?.attributes?.name}
                    </TableCell>
                    <TableCell align="right" suppressHydrationWarning>
                      <IconButton
                        onClick={() => handleDeleteWishlist(wishlist.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DashboardUserLayout>
  );
}
