import { gql } from "@apollo/client";

export const SEND_EMAIL_TO_SUPPORT = gql`mutation SendSupportMessage($name: String!, $email: String!, $message: String!) {
  sendSupportMessage(name: $name, email: $email, message: $message)
}`;
