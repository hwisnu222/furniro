import { gql } from "@apollo/client";

export const CREATE_WISHLIST = gql`
  mutation createWishlist($data: WishlistInput!) {
    createWishlist(data: $data) {
      data {
        id
      }
    }
  }
`;

export const DELETE_WISHLIST = gql`
  mutation deleteWishlist($id: ID!) {
    deleteWishlist(id: $id) {
      data {
        id
      }
    }
  }
`;
