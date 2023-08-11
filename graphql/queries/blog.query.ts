import { gql } from "@apollo/client";

export const GET_BLOGS = gql`
  query getBlogs($filter: String) {
    blogs(filters: { title: { containsi: $filter } }) {
      data {
        id
        attributes {
          title
          article
          category_blog {
            data {
              attributes {
                category
              }
            }
          }
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

export const CREATE_POST_BLOG = gql`
  mutation createBlog($data: BlogInput!) {
    createBlog(data: $data) {
      data {
        id
      }
    }
  }
`;

export const GET_CATEGORY_BLOG = gql`
  query getCategoryBlog {
    categoryBlogs {
      data {
        id
        attributes {
          category
        }
      }
    }
  }
`;

export const GET_DETAIL_BLOG = gql`
  query getBlog($id: ID) {
    blog(id: $id) {
      data {
        attributes {
          title
          article
          image {
            data {
              attributes {
                url
              }
            }
          }
          category_blog {
            data {
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
