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

export const REGISTER = gql`
  mutation registerUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      jwt
      user {
        id
        username
        blocked
        role {
          id
          name
        }
      }
    }
  }
`;
