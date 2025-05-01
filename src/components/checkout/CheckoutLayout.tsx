import React from "react";
import Timer from "./Timer";
import OrderSummary from "./OrderSummary";
import CheckoutForm from "./CheckoutForm";

const CheckoutLayout = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <Timer initialMinutes={10} initialSeconds={0} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
                <div className="lg:col-span-8">
                    <CheckoutForm />
                </div>

                <div className="lg:col-span-4">
                    <OrderSummary />
                </div>
            </div>
        </div>
    );
};

export default CheckoutLayout;
