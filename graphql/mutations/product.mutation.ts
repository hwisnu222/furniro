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
