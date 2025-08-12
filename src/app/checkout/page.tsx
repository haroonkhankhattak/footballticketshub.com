'use client';

import { useEffect } from "react";
import CheckoutLayout from "../../components/checkout/CheckoutLayout";
import Footer from "../../components/layout/Footer";
import Timer from "../../components/checkout/Timer";
import { useCheckoutStore } from "../store/checkoutStore";
import { useRouter } from 'next/navigation';



const Checkout = () => {

    const { ticket, quantity, expiresAt } = useCheckoutStore();
    const router = useRouter();

    useEffect(() => {
        console.log("ticket for checkout:", ticket);
        console.log("quantity:", quantity);
        console.log("expiresAt:", expiresAt);
        if (!ticket || !quantity || !expiresAt) {
            console.warn("No ticket found, redirect or show error");
            router.push("/");
        }
    }, [ticket]);

    const calculateRemainingSeconds = () => {
        const now = Date.now();
        const expires = Number(expiresAt);
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
        <div>
            {ticket && quantity ? (
                <>
                    <div className="fixed top-0 left-0 ml-3 mr-3 mt-1 right-0 z-50 bg-gray-50">
                        <Timer initialMinutes={initialMinutes} initialSeconds={initialSeconds} />
                    </div>

                    <div className="min-h-screen flex flex-col pt-[56px]">
                        <main className="flex-grow bg-gray-50">
                            <CheckoutLayout
                                ticket={ticket}
                                quantity={Number(quantity)}
                            />
                        </main>
                        <Footer />
                    </div>
                </>
            ) : (
                <div className="flex justify-center items-center h-screen bg-gray-50">
                    <p className="text-gray-500 text-sm">Loading checkout details...</p>
                </div>
            )}
        </div>
    );
}

export default Checkout;
