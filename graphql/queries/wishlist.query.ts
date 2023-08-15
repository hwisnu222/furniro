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
  query getWishlist($id: String) {
    wishlists(filters: { users_permissions_user: { id: $id } }) {
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
