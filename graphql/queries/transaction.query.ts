import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
  query getTransaction($filters: TransactionFiltersInput) {
    transactions(filters: $filters) {
      data {
        id
        attributes {
          total
          product {
            data {
              id
              attributes {
                name
                image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
      meta {
        pagination {
          total
          page
          pageSize
          pageCount
        }
      }
    }
  }
`;
