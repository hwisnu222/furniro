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
  query getWishlist($filters: WishlistFiltersInput) {
    wishlists(filters: $filters) {
      data {
        id
        attributes {
          product {
            data {
              id
              attributes {
                slug
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
