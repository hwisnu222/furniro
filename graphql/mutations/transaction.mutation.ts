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

export const UPDATE_TRANSACTION = gql`
  mutation updateStatusTransaction($data: TransactionInput!, $id: ID!) {
    updateTransaction(data: $data, id: $id) {
      data {
        id
      }
    }
  }
`;
