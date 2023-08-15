import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
  query getTransactions {
    transactions {
      data {
        id
        attributes {
          total
          products {
            data {
              id
              attributes {
                name
                price
              }
            }
          }
        }
      }
    }
  }
`;
