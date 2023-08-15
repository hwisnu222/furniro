import { gql } from "@apollo/client";

export const DELETE_CART = gql`
  mutation deleteCart($id: ID!) {
    deleteCart(id: $id) {
      data {
        id
      }
    }
  }
`;

export const ADD_CART = gql`
  mutation createCart($data: CartInput!) {
    createCart(data: $data) {
      data {
        id
      }
    }
  }
`;
