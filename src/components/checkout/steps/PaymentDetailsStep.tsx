import React, { useEffect, useState } from "react";
import { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Card } from "../../../components/ui/card";
import { CheckoutFormData } from "../../../types/checkout";
import { CreditCard, Lock } from "lucide-react";
import {
  CardElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ApplePayIcon from '/public/uploads/icons/apple-pay.svg';



interface PaymentDetailsStepProps {
  control: Control<CheckoutFormData>;
}

const PaymentDetailsStep: React.FC<PaymentDetailsStepProps> = ({ control }) => {

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  const [selectedMethod, setSelectedMethod] = useState<
    "card" | "apple" | "google"
  >("card");

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 1000, currency: "usd" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data:::", data);
        setClientSecret(data.clientSecret);
      });
  }, []);


  const handleCardPayment = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
        billing_details: {
          name: "name",
        },
      },
    });

    if (result.error) {
      setMessage(result.error.message || "Payment failed");
    } else if (result.paymentIntent?.status === "succeeded") {
      setMessage("Payment successful!");
    }
    setLoading(false);
  };




  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          <h3 className="font-medium">Payment Details</h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Lock className="h-4 w-4" />
          Secure Payment
        </div>
      </div>

      {/* Payment method selection */}
      <div className="flex gap-2 sm:gap-4">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setSelectedMethod("card")
          }}
          className={`border p-3 rounded-md flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 text-center ${selectedMethod !== "card" ? "border-gray-300" : "border-ticket-red"
            }`}>
          <CreditCard className="h-5 w-5 text-gray-600" />
          <span className="text-sm">Credit Card</span>
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setSelectedMethod("apple")
          }}
          className={`border p-3 rounded-md flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 text-center ${selectedMethod !== "apple" ? "border-gray-300" : "border-ticket-red"
            }`}>
          <img
            src="/uploads/icons/apple-pay.svg"
            alt="Apple Pay"
            width={32}
            height={32}
          />
          <span className="text-sm">Apple Pay</span>
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setSelectedMethod("google")
          }}
          className={`border p-3 rounded-md flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 text-center ${selectedMethod !== "google" ? "border-gray-300" : "border-ticket-red"
            }`}
        >
          <img
            src="/uploads/icons/google-pay.svg"
            alt="Google Pay"
            width={32}
            height={32}
            className="sm:mr-2"
          />
          <span className="text-sm">Google Pay</span>
        </button>

      </div>


      {selectedMethod === "card" && (
        <Card className="p-6 space-y-4">
          <FormField
            control={control}
            name="cardNumber"
            rules={{ required: "Card number is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-l text-black font-normal">
                  Card Number <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={control}
              name="expiryDate"
              rules={{ required: "Expiry date is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-l text-black font-normal">
                    Expiry Date <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="MM/YY" className="h-11" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="cvv"
              rules={{ required: "CVV is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-l text-black font-normal">
                    CVV <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123"
                      className="h-11"
                      type="password"
                      maxLength={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="cardHolderName"
            rules={{ required: "Card holder name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-l text-black font-normal">
                  Card Holder Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter name as shown on card"
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            onClick={handleCardPayment}
            className="flex items-center justify-center w-full gap-3 px-6 py-3 text-white bg-black rounded-lg hover:bg-gray-800 transition duration-200">
            <CreditCard className="h-8 w-8 text-white" />
            <span className="text-sm font-medium">Pay Now</span>
          </button>
          <p className="text-xs text-center text-gray-600">
            Secure checkout using your credit cards.
          </p>

        </Card>


      )}

      {selectedMethod === "google" && (
        <div className="flex flex-col items-center gap-4 p-4 rounded-xl bg-white shadow-md w-full max-w-xs mx-auto">
          <button className="flex items-center justify-center w-full gap-3 px-6 py-3 text-white bg-black rounded-lg hover:bg-gray-800 transition duration-200">
            <img
              src="/uploads/icons/google-pay.svg"
              alt="Google Logo"
              className="w-10 h-10"
            />
            <span className="text-sm font-medium">Pay with Google</span>
          </button>
          <p className="text-xs text-center text-gray-600">
            Secure checkout using your saved cards with Google Pay.
          </p>
        </div>
      )}

      {selectedMethod === "apple" && (
        <div className="flex flex-col items-center gap-4 p-4 rounded-xl bg-white shadow-md w-full max-w-xs mx-auto">
          <button className="flex items-center justify-center w-full gap-3 px-6 py-3 text-white bg-black rounded-lg hover:bg-gray-800 transition duration-200">
            <div className="w-10 h-10 bg-white mask mask-image" style={{ WebkitMaskImage: "url(/uploads/icons/apple-pay.svg)", WebkitMaskRepeat: "no-repeat", WebkitMaskSize: "contain", backgroundColor: "white" }} />
            <span className="text-sm font-medium">Pay with Apple</span>
          </button>
          <p className="text-xs text-center text-gray-600">
            Secure checkout using your saved cards with Apple Pay.
          </p>
        </div>
      )}

    </div>
  );
};

export default PaymentDetailsStep;
