export type Order = {
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  match: string;
  address: string;
  postal_code: string;
  city: string;
  country: string;
  send_promotion: boolean;
  total_amount: string;
  payment_status: string;
  payment_method: string;
  stripe_payment_id: string;
};
