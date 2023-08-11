import { gql } from "@apollo/client";

export const GET_BLOGS = gql`
  query getBlogs($filter: String) {
    blogs(filters: { title: { containsi: $filter } }) {
      data {
        id
        attributes {
          title
          article
          image {
            data {
              id
              attributes {
                url
              }
            }
          }
          users_permissions_user {
            data {
              id
              attributes {
                username
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
