import { gql } from "@apollo/client";
export const ADD_PROFILE = gql`
  mutation createProfile($data: ProfileInput!) {
    createProfile(data: $data) {
      data {
        id
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation updateProfile($data: ProfileInput!, $id: ID!) {
    updateProfile(data: $data, id: $id) {
      data {
        id
      }
    }
  }
`;
