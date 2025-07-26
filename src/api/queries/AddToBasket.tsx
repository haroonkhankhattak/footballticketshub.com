import { gql } from "@apollo/client";

export const ADD_TO_BASKET = gql`
mutation AddToBasket($ticketIds: [ID!]!) {
  addToBasket(ticketIds: $ticketIds) {
    message
    success
  }
}
`;