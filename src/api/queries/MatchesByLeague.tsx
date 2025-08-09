import { gql } from "@apollo/client";

export const GET_MATCHES_BY_LEAGUE = gql`
query MatchesByLeague($league: String!, $category: String!) {
  matchesByLeague(league: $league, category: $category) {
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
    league_slug
    venue
    city
    country
    stadium_id
  }
}
`;