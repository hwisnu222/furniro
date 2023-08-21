import { gql } from "@apollo/client";

export const ADD_TRANSACTION = gql`
  mutation createTransaction($data: TransactionInput!) {
    createTransaction(data: $data) {
      data {
        id
        attributes {
          status
        }
      }
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation deleteTransaction($id: ID!) {
    deleteTransaction(id: $id) {
      data {
        id
      }
    }
  }
`;
