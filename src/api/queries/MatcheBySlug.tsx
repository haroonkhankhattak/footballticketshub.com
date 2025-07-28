import { gql } from "@apollo/client";

export const GET_MATCHE_BY_SLUG = gql`
query matchBySlug($slug: String!) {
  matchBySlug(slug: $slug) {
    home_team
    home_team_slug
    title
    stadium_id
    venue
    league
    away_team
    away_team_slug
    city
    country
    date
    price_starts_from
    id
    slug
    commission
    commission_amount
  }
}

`;