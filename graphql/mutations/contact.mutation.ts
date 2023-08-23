import { gql } from "@apollo/client";

export const CREATE_CONTACT = gql`
  mutation createContact($data: ContactInput!) {
    createContact(data: $data) {
      data {
        id
      }
    }
  }
`;

export const DELETE_CONTACT = gql`
  mutation deleteContact($id: ID!) {
    deleteContact(id: $id) {
      data {
        id
      }
    }
  }
`;
