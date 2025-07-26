import { gql } from "@apollo/client";

export const GET_UPCOMING_POPULAR_MATCHES = gql`
  query PopularUpcomingMatches($limit: Int) {
    popularUpcomingMatches(limit: $limit) {
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
      is_popular
      venue
      city
      country
    }
  }
`;
