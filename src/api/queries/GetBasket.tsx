import { gql } from "@apollo/client";

export const GET_BASKET_BY_SESSION = gql`
query GetBasketBySessionId {
  getBasketBySessionId {
    expires
    listing {
      listing_id
      broker_id
      section_id
      listing_description
      row
      price
      available_tickets
      total_tickets
      currency
      attributes
      togather_upto
      status
      sold_to
      sold_date_at
      sold_time_at
      created_at
      updated_at
      stadium_id
      event_id
      restrictions
      other_shipping_id
      shipping_type
      sell_as
      match_title
      match_date
      match_venue
      match_slug
      match_league
      match_league_slug
      section_name
      section_stand_name
      section_tier
      tickets {
        ticket_id
      }
    }
  }
}
`;