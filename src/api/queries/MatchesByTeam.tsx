import { gql } from "@apollo/client";

export const GET_MATCHES_BY_TEAM = gql`
  query GetMatchesByTeam($team: String!) {
    matchesByTeam(team: $team) {
    id
    slug
    title
    date
    commission
    commission_amount
    price_starts_from
    home_team_slug
    away_team_slug
    home_team
    away_team
    league
    venue
    city
    country
    stadium_id
    }
  }
`;
