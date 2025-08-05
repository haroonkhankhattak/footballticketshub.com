import React, { useState } from "react";
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
import Image from "next/image";

interface PaymentDetailsStepProps {
  control: Control<CheckoutFormData>;
}

const PaymentDetailsStep: React.FC<PaymentDetailsStepProps> = ({ control }) => {
  const [selectedMethod, setSelectedMethod] = useState<
    "card" | "apple" | "google"
  >("card");

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
          // onClick={() => setSelectedMethod("apple")}
          className={`border p-3 rounded-md flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 text-center ${selectedMethod === "google" ? "border-primary" : "border-gray-300"
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
          // onClick={() => setSelectedMethod("google")}
          className={`border p-3 rounded-md flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 text-center ${selectedMethod === "google" ? "border-primary" : "border-gray-300"
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


        <button
          // onClick={() => setSelectedMethod("card")}
          className={`border p-3 rounded-md flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 text-center ${selectedMethod === "google" ? "border-primary" : "border-gray-300"
            }`}>
          <CreditCard className="h-5 w-5 text-gray-600" />
          <span className="text-sm">Credit Card</span>
        </button>
      </div>

      {/* Credit Card Fields */}
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
        </Card>
      )}
    </div>
  );
};

export default PaymentDetailsStep;
