import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query getProducts {
    products {
      data {
        id
        attributes {
          name
          summary
          description
          rating
          additional
          price
          disscount
          color
          stock
          size
          tag
          image {
            data {
              id
              attributes {
                url
              }
            }
          }
          category {
            data {
              id
              attributes {
                category
              }
            }
          }
          createdAt
          updatedAt
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

export const GET_PRODUCT = gql`
  query getProduct($id: ID) {
    products(filters: { id: { eq: $id } }) {
      data {
        id
        attributes {
          name
          summary
          description
          rating
          additional
          price
          disscount
          color
          stock
          size
          tag
          sku
          image {
            data {
              id
              attributes {
                url
              }
            }
          }
          category {
            data {
              id
              attributes {
                category
              }
            }
          }
          createdAt
          updatedAt
        }
      }
    }
  }
`;
