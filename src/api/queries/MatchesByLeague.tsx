import { gql } from "@apollo/client";

export const GET_MATCHES_BY_LEAGUE = gql`
query MatchesByLeague($league: String!) {
  matchesByLeague(league: $league) {
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