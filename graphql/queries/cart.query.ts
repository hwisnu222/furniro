import { gql } from "@apollo/client";

export const GET_CARTS = gql`
  query getCarts($filters: CartFiltersInput) {
    carts(filters: $filters) {
      data {
        id
        attributes {
          total
          product {
            data {
              id
              attributes {
                name
                price
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
    }
  }
`;
