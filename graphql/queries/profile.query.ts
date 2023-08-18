import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query getProfile($filters: ProfileFiltersInput) {
    profiles(filters: $filters) {
      data {
        id
        attributes {
          firstname
          lastname
          company
          country
          street
          city
          province
          zip_code
          phone
          additional
          avatar {
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
`;
