import React, { useEffect, useState } from "react";
import CheckoutLayout from "@/components/checkout/CheckoutLayout";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLocation, useParams } from "react-router-dom";
import { Listing } from "../tickets/listing";
import Timer from "../../components/checkout/Timer";
import { ArrowLeft } from "lucide-react";



const CheckoutPage = () => {

    const urlLocation = useLocation();
    const state = urlLocation.state as {
        ticket: Listing,
        quantity: number,
        expiresAt?: string,
    };



    const calculateRemainingSeconds = () => {
        if (!state.expiresAt) {
            return 10 * 60; // default to 10 minutes
        }

        const now = Date.now();
        const expires = Number(state.expiresAt);
        const diffInMs = expires - now;

        return Math.max(Math.floor(diffInMs / 1000), 0);
    };

    const totalSeconds = calculateRemainingSeconds();
    const initialMinutes = Math.floor(totalSeconds / 60);
    const initialSeconds = totalSeconds % 60;


    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    return (
        <>
            <div className="fixed top-0 left-0 ml-3 mr-3 mt-1 right-0 z-50 bg-gray-50">
                <Timer initialMinutes={initialMinutes} initialSeconds={initialSeconds} />
            </div>

            <div className="min-h-screen flex flex-col pt-[56px]">
                {/* Add padding top equal to timer height to avoid content hiding behind */}
                <main className="flex-grow bg-gray-50">
                    <CheckoutLayout
                        {...{
                            ticket: state.ticket,
                            quantity: state.quantity,
                        }}
                    />
                </main>
                <Footer />
            </div>
        </>


    );
};

export default CheckoutPage;
