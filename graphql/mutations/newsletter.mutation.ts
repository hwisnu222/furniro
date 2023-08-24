import { gql } from "@apollo/client";

export const ADD_NEWSLETTER = gql`
  mutation createNewsletter($data: NewsletterInput!) {
    createNewsletter(data: $data) {
      data {
        id
      }
    }
  }
`;
