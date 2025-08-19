import React, { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { ArrowLeft, ShoppingBasket, ShoppingCartIcon } from "lucide-react";
import { CLEAR_BASKET } from "../../api/queries/ClearBasket";
import { useMutation } from "@apollo/client";
import { AlertDialouge } from "../AlertDialouge";
import FullScreenLoader from "../FullScreenLoader";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { Listing } from "../../types/listing";
import { convertTeamNameToSlug } from "../../lib/teamUtils";
import { CLUB_FANS } from "../../lib/constants";
import { OrderDetails } from "../../types/orderDetails";
import OrderSummary from "./OrderSummary";


interface CheckoutLayoutProps {
    ticket: Listing,
    quantity: number
}

const CheckoutLayout: React.FC<CheckoutLayoutProps> = ({
    ticket: ticket,
    quantity: quantity
}) => {
    const router = useRouter();
    const [showCartAlert, setShowCartAlert] = useState(false);
    const [showLoading, setshowLoading] = useState(false);


    const initialOrderSummary: OrderDetails = {
        ticket: ticket,
        formatted_date: "",
        total_amount: 0,
        quantity: 0,
        commission: 0,
        commission_amount: 0
    };

    const [orderDetails, setOrderDetails] = useState<OrderDetails>(initialOrderSummary);

    const ticketPrice = Number((ticket.price).toFixed(0));

    function getFirstTeam(eventName) {
        const teams = eventName.split(' vs ');
        return teams[0];
    }

    const homeTeam = getFirstTeam(ticket.match_title);
    const homeTeamSlug = convertTeamNameToSlug(homeTeam);
    const filename = CLUB_FANS[homeTeamSlug];
    const markupPercentage = ticket.match_commission;
    const markupAmount = ticketPrice * markupPercentage;
    const totalPrice = ticketPrice + markupAmount;
    const totalMarkup = (markupAmount * quantity).toFixed(0);
    const matchDate = new Date(Number(ticket.match_date));
    const formattedDate = matchDate.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });


    useEffect(() => {
    if (!ticket) return;

    const ticketPrice = Number(ticket.price.toFixed(0));
    const commissionRate = ticket.match_commission / 100;
    const markupAmount = ticketPrice * commissionRate;
    const totalPrice = ticketPrice + markupAmount;
    const totalMarkup = (markupAmount * quantity).toFixed(0);

    const matchDate = new Date(Number(ticket.match_date));
    const formattedDate = matchDate.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    setOrderDetails({
        ticket: ticket,
        formatted_date: formattedDate,
        commission: ticket.match_commission,
        quantity: quantity,
        commission_amount: Number(totalMarkup),
        total_amount: Number((totalPrice * quantity).toFixed(0)),
    });
}, [ticket, quantity]);


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
                router.back();
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
                    onClick={() => router.back()}
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
                        <CheckoutForm orderDetails={orderDetails} />
                    </div>

                    <div className="lg:col-span-4">
                        <OrderSummary
                            {...{
                                orderDetails: orderDetails
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
                                orderDetails: orderDetails
                            }}
                        />
                    </div>

                    <div className="lg:col-span-8 mt-2">
                        <CheckoutForm orderDetails={orderDetails} />
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
                boldText={["clear", "remove", "empty"]}
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
