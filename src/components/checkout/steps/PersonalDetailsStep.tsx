import React from "react";
import { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckoutFormData } from "@/types/checkout";
import { COUNTRY_CODES, COUNTRY_NAMES } from "@/lib/constants";

interface PersonalDetailsStepProps {
  control: Control<CheckoutFormData>;
}

const PersonalDetailsStep: React.FC<PersonalDetailsStepProps> = ({
  control,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-1 sm:gap-4">
          <FormField
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs sm:text-l text-black font-normal">
                  Email Address <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    className="h-11 text-xs sm:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="confirmEmail"
            rules={{
              required: "Please confirm your email",
              validate: (value, formValues) =>
                value === formValues.email || "Emails don't match",
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs sm:text-sm text-black font-normal">
                  Confirm Email <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm your email"
                    className="h-11 text-sm sm:text-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-1 sm:gap-4">
          {/* Country Code - 1 Column */}
          <div className="col-span-1">
            <FormField
              control={control}
              name="countryCode"
              rules={{ required: "Required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm text-black font-normal">
                    Code <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-11 text-xs sm:text-sm">
                        <SelectValue placeholder="+44" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {COUNTRY_CODES.map((code, index) => (
                        <SelectItem key={`${code.value}-${code.label}-${index}`} value={code.value}>
                          {code.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Phone Number - 2 Columns */}
          <div className="col-span-2">
            <FormField
              control={control}
              name="phone"
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm text-black font-normal">
                    Phone Number <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter phone number"
                      className="h-11 text-xs sm:text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>


        <div className="space-y-4 leading-none pt-12">
          <FormLabel className="text-base text-black sm:text-xl font-light">
            Billing Address
          </FormLabel>
        </div>

        <div className="grid grid-cols-2 gap-1 sm:gap-4">
          <FormField
            control={control}
            name="firstName"
            rules={{ required: "First name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs sm:text-sm text-black font-normal">
                  First Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter first name"
                    className="h-11 text-xs sm:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="lastName"
            rules={{ required: "Last name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs sm:text-sm text-black font-normal">
                  Last Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter last name"
                    className="h-11 text-xs sm:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-1 sm:gap-4">
          <FormField
            control={control}
            name="address"
            rules={{ required: "Address is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs sm:text-sm text-black font-normal">
                  Address <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your address"
                    className="h-11 text-xs sm:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="postcode"
            rules={{ required: "Postcode is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs sm:text-sm text-black font-normal">
                  Postcode <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter postcode"
                    className="h-11 text-xs sm:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>

        <div className="grid grid-cols-2 gap-1 sm:gap-1">
          <FormField
            control={control}
            name="city"
            rules={{ required: "City is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs sm:text-sm text-black font-normal">
                  City <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter city" className="h-11 text-xs sm:text-sm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="country"
            rules={{ required: "Country is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-l text-black font-normal">
                  Country <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-11 text-xs text-gray-500 sm:text-lg">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {COUNTRY_NAMES.map((code) => (
                      <SelectItem key={code.value} value={code.value}>
                        {code.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="space-y-2">
        <FormField
          control={control}
          name="acceptTerms"
          rules={{ required: "You must accept the terms and conditions" }}
          render={({ field }) => (
            <FormItem className="flex items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-xs sm:text-sm text-black font-normal">
                  I have read and agree to the{" "}
                  <a
                    href="/terms"
                    className="text-xs sm:text-sm text-sky-500 underline hover:text-sky-500"
                    target="_blank"
                    rel="noopener noreferrer">
                    Terms and Conditions
                  </a>{" "}
                  &{" "}
                  <a
                    href="/privacy"
                    className="text-xs sm:text-sm text-sky-500 underline hover:text-sky-500"
                    target="_blank"
                    rel="noopener noreferrer">
                    Privacy Policy
                  </a>
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="acceptUpdates"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-xs sm:text-sm text-black font-normal">
                  I agree to receive relevant emails with event updates and
                  offers
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default PersonalDetailsStep;
