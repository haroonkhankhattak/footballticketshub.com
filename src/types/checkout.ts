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
  visitor1FirstName: string;
  visitor1LastName: string;

  visitor2FirstName: string;
  visitor2LastName: string;

  // Step 3: Payment Details
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolderName: string;
}

export type CheckoutStep = "details" | "visitor" | "payment";
