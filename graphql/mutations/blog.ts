import { gql } from "@apollo/client";

export const DELETE_BLOG = gql`
  mutation deleteBlog($id: ID!) {
    deleteBlog(id: $id) {
      data {
        id
      }
    }
  }
`;
