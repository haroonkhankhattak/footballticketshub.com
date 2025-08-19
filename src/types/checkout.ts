export interface Visitor {
  firstName: string;
  lastName: string;
}

export interface CheckoutFormData {
  // Step 1: Your Details
  email: string;
  confirmEmail: string;
  phone: string;
  countryCode: string;
  firstName: string;
  lastName: string;
  address: string;
  postcode: string;
  city: string;
  country: string;
  acceptTerms: boolean;
  acceptUpdates: boolean;

  // Step 2: Visitor Details
  visitors: Visitor[];

  // Step 3: Payment Details
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolderName: string;
  totalAmount: number;
  perTicketPrice: number;
  ticketsQuantity: number;
  commissionAmount: number;
}


export type CheckoutStep = "details" | "visitor" | "payment";
