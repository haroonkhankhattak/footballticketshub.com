import { Listing } from "../pages/tickets/listing";
import { Ticket } from "./ticket";

export interface BasketProps {
  listing: Listing;
  expires: string;
}
