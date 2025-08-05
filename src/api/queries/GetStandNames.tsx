import { gql } from "@apollo/client";

export const GET_STAND_NAMES_BY_VENUE = gql`
query StandNamesByVenue($venue: String!) {
  standNamesByVenue(venue: $venue) {
    stand_name
  }
}
`;