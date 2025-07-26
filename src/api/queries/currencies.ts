import { gql } from "@apollo/client";

export const GET_CURRENCIES = gql`
  query GetCurrencies {
    currencies {
      id
      code
      symbol
      name
      rate
      is_default
    }
  }
`;
