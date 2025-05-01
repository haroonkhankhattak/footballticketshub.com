import React, { useEffect, useState } from "react";
import CheckoutLayout from "@/components/checkout/CheckoutLayout";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const CheckoutPage = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            {/* <Header isScrolledPastHero={false} fixed={false} /> */}
            <main className="flex-grow bg-gray-50">
                <CheckoutLayout />
            </main>
            <Footer />
        </div>
    );
};

export default CheckoutPage;
