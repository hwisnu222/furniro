import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($identifier: String!, $password: String!) {
    login(
      input: { identifier: $identifier, password: $password, provider: "local" }
    ) {
      jwt
      user {
        email
        blocked
        role {
          id
          name
        }
        id
        username
      }
    }
  }
`;
