import { Listing } from "./listing";

export type OrderDetails = {
  ticket: Listing;
  formatted_date: string;
  total_amount: number;
  quantity: number;
  commission: number;
  commission_amount: number;
};