import { gql } from "@apollo/client";

export const GET_UPCOMING_POPULAR_MATCHES = gql`
  query GetPosts {
    posts {
      id
      title
      content
    }
  }
`;
