import { create } from 'zustand';
import { Listing } from '../../types/listing';



type CheckoutState = {
  ticket: Listing | null;
  quantity: number;
  expiresAt: string;
  setCheckoutData: (data: {
    ticket: Listing;
    quantity: number;
    expiresAt: string;
  }) => void;
  clearCheckoutData: () => void;
};

export const useCheckoutStore = create<CheckoutState>((set) => ({
  ticket: null,
  quantity: 1,
  expiresAt: '',
  setCheckoutData: ({ ticket, quantity, expiresAt }) =>
    set({ ticket, quantity, expiresAt }),
  clearCheckoutData: () =>
    set({ ticket: null, quantity: 1, expiresAt: '' }),
}));
