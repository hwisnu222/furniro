import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
  query getTransaction($filters: TransactionFiltersInput) {
    transactions(filters: $filters) {
      data {
        id
        attributes {
          status
          carts {
            data {
              id
              attributes {
                total
                product {
                  data {
                    id
                    attributes {
                      name
                      image {
                        data {
                          id
                          attributes {
                            url
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          users_permissions_user {
            data {
              attributes {
                profile {
                  data {
                    attributes {
                      firstname
                      lastname
                      city
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
