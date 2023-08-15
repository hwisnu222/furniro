import { gql } from "@apollo/client";

export const GET_CARTS = gql`
  query getCarts {
    carts {
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
