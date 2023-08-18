import { gql } from "@apollo/client";

export const GET_BLOGS = gql`
  query getBlogs($filter: String) {
    blogs(filters: { title: { containsi: $filter } }) {
      data {
        id
        attributes {
          slug
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

export const GET_RECENT_BLOGS = gql`
  query getRecentBlogs {
    blogs(pagination: { limit: 5 }, sort: "createdAt:desc") {
      data {
        id
        attributes {
          slug
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

// use: create post blog
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

// use: blog list user
export const GET_CATEGORY_BLOGS = gql`
  query getCategoryBlogs {
    categoryBlogs {
      data {
        id
        attributes {
          category
          blogs {
            data {
              id
            }
          }
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const GET_DETAIL_BLOG = gql`
  query getBlog($slug: String) {
    blogs(filters: { slug: { eq: $slug } }) {
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
