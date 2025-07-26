import { gql } from "@apollo/client";

export const GET_SEARCH_RESULTS = gql`query Query($searchTerm: String!) {
  searchResult(searchTerm: $searchTerm) {

    ... on TeamResult {
      id
      type
      slug
      title
      country
    }
          ... on MatchResult {
      id
      type
      slug
      title
      date
      home_team
      away_team
      league
      venue
      city
      country
    }
  }
}`;
