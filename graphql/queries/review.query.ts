import { gql } from "@apollo/client";

export const GET_REVIEWS = gql`
  query getReview($filters: ReviewFiltersInput, $sort: [String]) {
    reviews(filters: $filters, sort: $sort) {
      data {
        id
        attributes {
          review
          users_permissions_user {
            data {
              id
              attributes {
                profile {
                  data {
                    attributes {
                      firstname
                      lastname
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
