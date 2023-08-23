import { gql } from "@apollo/client";

export const GET_CONTACT = gql`
  query contacts($filters: ContactFiltersInput, $pagination: PaginationArg) {
    contacts(filters: $filters, pagination: $pagination) {
      data {
        id
        attributes {
          name
          email
          subject
          message
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
