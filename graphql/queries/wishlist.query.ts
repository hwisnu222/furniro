import { gql } from "@apollo/client";

export const ADD_LIKE = gql`
  mutation createLike($data: LikeInput!) {
    createLike(data: $data) {
      data {
        id
      }
    }
  }
`;

export const GET_WISHLISTS = gql`
  query getWishlist {
    wishlists {
      data {
        id
        attributes {
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
          createdAt
          updatedAt
        }
      }
    }
  }
`;
