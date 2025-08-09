import { gql } from "@apollo/client";

export const GET_POPULAR_MATCHES = gql`
query Matches($category: String!, $limit: Int) {
  popularMatches(category: $category, limit: $limit) {
      id
      title
      date
      slug
      commission
      tickets_count
      available_tickets
      sold_tickets
      total_tickets
      commission_amount
      total_amount
      net_amount
      price_starts_from
      home_team_slug
      away_team_slug
      home_team
      away_team
      highlight
      league
      league_slug
      is_popular
      venue
      city
      country
      category
    }
  }
`;
