// types/tickets.ts

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

export interface TicketsResponse {
  tickets: {
    items: TicketProps[];
    pageNumber: number;
    totalPages: number;
    totalCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}
