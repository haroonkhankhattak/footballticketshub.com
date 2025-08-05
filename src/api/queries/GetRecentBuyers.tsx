import { gql } from "@apollo/client";

export const GET_RECENT_BUYERS = gql`
query getRecentBuyers {
  getRecentBuyers {
    id
    name
    match
    created_at
  }
}
`;