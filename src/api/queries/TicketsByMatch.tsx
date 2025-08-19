import { gql } from "@apollo/client";

export const GET_TICKETS_BY_MATCH = gql`
query GetListingsByMatch($eventId: ID!, $page: Int, $limit: Int) {
  getListingsByMatch(event_id: $eventId, page: $page, limit: $limit) {
    listings {
      listing_id
      broker_id
      section_id
      price
      attributes
      togather_upto
      status
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
      match_commission
      section_name
      section_stand_name
      section_tier
      total_tickets
      available_tickets
      tickets {
      ticket_id
      }
    }
    limit
    page
    totalCount
  }
}`;