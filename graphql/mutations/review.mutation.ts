import { gql } from "@apollo/client";

export const CREATE_REVIEW = gql`
  mutation createReview($data: ReviewInput!) {
    createReview(data: $data) {
      data {
        id
      }
    }
  }
`;
