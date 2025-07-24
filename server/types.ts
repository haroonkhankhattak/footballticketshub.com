import * as React from "react";

export interface MatchProps {
  id: number;
  day: string;
  month: string;
  year: string;
  competition: string;
  teams: string;
  time: string;
  venue: string;
  country: string;
}

export interface TicketOption {
  type: string;
  options: {
    name: string;
    description: string;
    code: string;
  }[];
}

export interface TicketProps {
  url: string;
  ticketId: number;
  badges: string[];
  quantities: number[];
  section: string;
  row: string;
  sellerPrice: Record<string, number>;
  total: Record<string, number>;
  layoutCategoryId: number;
  shippingTypeId: string;
  ticketOptions: TicketOption[];
  allocationId: string;
  allocation: string;
}

interface TicketsResponse {
  tickets: {
    items: TicketProps[];
    pageNumber: number;
    totalPages: number;
    totalCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export interface InfoProps {
  title: string;
  subtitle: string;
  description: string;
  submitText: string;
  icon: React.ReactNode;
}
