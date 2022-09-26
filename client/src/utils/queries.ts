import { gql } from "@apollo/client";

export const QUERY_TAGS = gql`
  query tags {
    tags {
      _id
      name
    }
  }
`;
