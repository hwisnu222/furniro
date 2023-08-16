import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation createReview($data: ProductInput!) {
    createProduct(data: $data) {
      data {
        id
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($data: ProductInput!, $id: ID!) {
    updateProduct(data: $data, id: $id) {
      data {
        id
      }
    }
  }
`;
