import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query getProducts($filter: String) {
    products(filters: { name: { containsi: $filter } }) {
      data {
        id
        attributes {
          slug
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
  query getProduct($slug: String) {
    products(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          slug
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

export const GET_CATEGORY = gql`
  query getCategory {
    categories {
      data {
        id
        attributes {
          category
        }
      }
    }
  }
`;
