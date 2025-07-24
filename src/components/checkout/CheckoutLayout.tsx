import React, { useState } from "react";
import Timer from "./Timer";
import OrderSummary from "./OrderSummary";
import CheckoutForm from "./CheckoutForm";
import { Listing } from "../../pages/tickets/listing";
import { ArrowLeft, ShoppingBasket, ShoppingCartIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CLEAR_BASKET } from "../../lib/graphql/queries/ClearBasket";
import { useMutation } from "@apollo/client";
import { AlertDialouge } from "../AlertDialouge";
import FullScreenLoader from "../FullScreenLoader";
import { toast, Toaster } from "sonner";

interface CheckoutLayoutProps {
    ticket: Listing,
    quantity: number,

}

const CheckoutLayout: React.FC<CheckoutLayoutProps> = ({
    ticket: ticket,
    quantity: quantity,
}) => {
    const navigate = useNavigate();
    const [showCartAlert, setShowCartAlert] = useState(false);
    const [showLoading, setshowLoading] = useState(false);


    const [clearBasket, { data, loading, error }] = useMutation(CLEAR_BASKET, {
        fetchPolicy: "network-only",
    });

    const handleClearBasket = async () => {
        try {
            setshowLoading(true);
            const { data } = await clearBasket();
            if (data?.clearBasket?.success) {
                setshowLoading(false);
                toast.success(data?.clearBasket?.message, {
                    description: "",
                });
                navigate(-1)
                console.log("Basket cleared:", data.clearBasket.message);

            } else {
                setshowLoading(false);
                console.warn("Failed to clear basket");
                toast.error(data?.clearBasket?.message, {
                    description: "Please try again later.",
                });
            }
        } catch (err) {
            setshowLoading(false);
            console.error("Clear basket error:", err);
            toast.error(err, {
                description: "Please try again later.",
            });
        }
    };


    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

            <div className="flex items-center justify-between w-full mb-4">
                {/* Back Button (Left) */}
                <div
                    className="flex items-center gap-2 hover:text-red-600 cursor-pointer w-fit"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft size={20} />
                    <span>Back</span>
                </div>

                {/* Clear Basket Button (Right) */}
                <div
                    className="flex items-center gap-2 text-red-500 hover:text-red-600 cursor-pointer w-fit"
                    onClick={() => setShowCartAlert(true)}

                >
                    <span>Clear Basket</span>
                    <ShoppingCartIcon size={20} />
                </div>
            </div>


            {/* Desktop Ticket filters */}
            <div className=" hidden sm:block">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
                    <div className="lg:col-span-8">
                        <CheckoutForm ticketCount={quantity} />
                    </div>

                    <div className="lg:col-span-4">
                        <OrderSummary
                            {...{
                                ticket: ticket,
                                quantity: quantity,
                            }}
                        />
                    </div>
                </div>
            </div>


            {/* Mobile Ticket filters */}
            <div className="block sm:hidden">
                <div className=" grid-cols-1 lg:grid-cols-12 gap-8 mt-8 ">

                    <div className="lg:col-span-4">
                        <OrderSummary
                            {...{
                                ticket: ticket,
                                quantity: quantity,
                            }}
                        />
                    </div>

                    <div className="lg:col-span-8 mt-2">
                        <CheckoutForm ticketCount={quantity} />
                    </div>

                </div>
            </div>

            <AlertDialouge
                open={showCartAlert}
                onOpenChange={setShowCartAlert}
                confirmAction={() => {
                    handleClearBasket();
                }}
                title="Clear Basket?"
                subtitle="You are about to remove all tickets from your basket."
                description="This action will clear all the items currently in your cart. Do you want to proceed and empty your basket?"
                boldPhrases={["clear", "remove", "empty"]}
                confirmText="Confirm"
                cancelText="Cancel"
                showCancel={true}
                icon={<ShoppingBasket className="w-5 h-5" />}
            />

            {showLoading && <FullScreenLoader />}


        </div>
    );
};

export default CheckoutLayout;
