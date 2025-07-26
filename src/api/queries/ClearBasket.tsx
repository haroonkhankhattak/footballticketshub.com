import { gql } from "@apollo/client";

export const CLEAR_BASKET = gql`
mutation ClearBasket {
  clearBasket {
    message
    success
  }
}
`;