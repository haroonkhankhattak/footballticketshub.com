// components/Ticket.tsx

import { Armchair, Minus, Plus, ShoppingBasket } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion"
import { Listing } from "../types/listing";
import { restrictionsList } from "../lib/constants/restrictions";
import { attributesList } from "../lib/constants/attributes";
import { HintBubble } from "./HintBubble";
import { WarningAlertDialouge } from "./WarningAlertDialouge";
import { LoadingDialog } from "./LoadingDialog";
import { toast, Toaster } from "sonner";
import { AlertDialouge } from "./AlertDialouge";
import e from "express";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { CLEAR_BASKET } from "../api/queries/ClearBasket";
import { useCheckoutStore } from '../app/store/checkoutStore';



interface TicketProps {
    ticket: Listing;
    selectedSeat: string;
    onTicketHover: (stand: string, section?: string, section_id?: string) => void;
    onTicketUnHover: () => void;
    selectedArea: string;
    areaNames: string[];
}

const TicketItem = ({
    ticket,
    selectedSeat,
    onTicketHover,
    onTicketUnHover,
    selectedArea,
    areaNames,
}: TicketProps) => {

    const router = useRouter();
    const setCheckoutData = useCheckoutStore((state) => state.setCheckoutData);

    const [showNotice, setShowNotice] = useState(false)
    const [message, setMessage] = useState("")
    const maxLimit = 10;
    const [ticketCount, setTicketCount] = useState<{ [key: string]: number }>({});
    const [show, setShow] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const [showLoading, setshowLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [showCartAlert, setShowCartAlert] = useState(false);
    const [pendingTicket, setPendingTicket] = useState(ticket);
    const [pendingQuantity, setPendingQuantity] = useState(0);

    const increment = (listing) => {
        const current = ticketCount[listing.listing_id] || 0;
        const allowedQuantities = getAllowedQuantities(listing);

        const currentIndex = allowedQuantities.indexOf(current);
        const nextQuantity = allowedQuantities[currentIndex + 1];

        if (nextQuantity !== undefined && nextQuantity <= listing.tickets.length) {
            setTicketCount((prev) => ({
                ...prev,
                [listing.listing_id]: nextQuantity,
            }));
        }
    };

    const decrement = (listing) => {
        const current = ticketCount[listing.listing_id] || 0;
        const allowedQuantities = getAllowedQuantities(listing);

        const currentIndex = allowedQuantities.indexOf(current);
        const prevQuantity = allowedQuantities[currentIndex - 1];

        if (prevQuantity !== undefined && prevQuantity >= 1) {
            setTicketCount((prev) => ({
                ...prev,
                [listing.listing_id]: prevQuantity,
            }));
        }
    };

    // const { selectedCurrency } = useCurrencyLanguage();

    // const currencySymbols: Record<string, string> = {
    //     gbp: "£",
    //     usd: "$",
    //     eur: "€",
    //     chf: "Fr",
    //     sek: "kr",
    //     nok: "kr",
    //     dkk: "kr",
    // };

    // const currencyKey = selectedCurrency.toLowerCase();
    // const symbol = currencySymbols[selectedCurrency] || "";

    const exchangeRates: Record<string, number> = {
        usd: 1.25,
        eur: 1.15,
        chf: 1.10,
        sek: 13.00,
        nok: 13.50,
        dkk: 8.50,
        gbp: 1,
    };



    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setShow(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const updatedCounts: Record<number, number> = {};

        const allowedQuantities = getAllowedQuantities(ticket);
        const min = allowedQuantities.length > 0 ? allowedQuantities[0] : 1;

        if (!(ticket.listing_id in ticketCount)) {
            updatedCounts[ticket.listing_id] = min;
        }

        if (Object.keys(updatedCounts).length > 0) {
            setTicketCount((prev) => ({
                ...prev,
                ...updatedCounts,
            }));
        }
    }, [ticket]);

    const handleBuyNow = (ticket) => {
        const quantity = ticketCount[ticket.listing_id] || 0
        const allowedQuantities = getAllowedQuantities(ticket)

        if (allowedQuantities.includes(quantity) && ticket.restrictions?.length !== 0) {
            setPendingTicket(ticket);
            setPendingQuantity(quantity);
            setShowDialog(true);
            return;
        } else if (allowedQuantities.includes(quantity)) {
            setPendingTicket(ticket);
            setPendingQuantity(quantity);
            setshowLoading(true);
            return;
        }

        let sellAsMessage = ""
        switch (ticket.sell_as) {
            case "1":
                sellAsMessage = `You must purchase all ${ticket.tickets.length} tickets`
                break
            case "2":
                sellAsMessage = "You must buy these tickets in pairs (2, 4, 6...)"
                break
            case "3":
                sellAsMessage = "You may select any number of tickets"
                break
            case "4":
                sellAsMessage = "You must not leave a single ticket unselected"
                break
            default:
                sellAsMessage = "Ticket group type not specified"
        }

        setMessage(sellAsMessage)
        setShowNotice(true)
        setTimeout(() => setShowNotice(false), 4000)
    }

    const getAllowedQuantities = (ticket) => {
        const total = ticket.tickets.length || 1
        const allowed = []

        switch (ticket.sell_as) {
            case "1":
                allowed.push(total)
                break

            case "2":
                for (let i = 2; i <= total; i += 2) {
                    allowed.push(i)
                }
                break

            case "3":
                for (let i = 1; i <= total; i++) {
                    allowed.push(i)
                }
                break

            case "4":
                for (let i = 1; i <= total; i++) {
                    if (total - i !== 1) {
                        allowed.push(i)
                    }
                }
                break

            default:
                for (let i = 1; i <= total; i++) {
                    allowed.push(i)
                }
        }
        return allowed
    }

    const [clearBasket, { data, loading, error }] = useMutation(CLEAR_BASKET, {
        fetchPolicy: "network-only",
    });

    const handleClearBasket = async () => {
        try {
            const { data } = await clearBasket();
            if (data?.clearBasket?.success) {
                setshowLoading(true);
            } else {
                console.warn("Failed to clear basket");
            }
        } catch (err) {
            console.error("Clear basket error:", err);
        }
    };


    console.log("ticket:", ticket)


    return (
        <>
            <div
                key={ticket.listing_id}
                className={`   m-2
     border-b border-gray-200 group bg-gray-50
     duration-300  hover:-translate-y-0.5 
    group hover:bg-red-50 cursor-pointer transition transform hover:scale-[1.02] hover:shadow-md rounded-md px-4 py-3
    ${selectedSeat === ticket.section_name ? "" : ""}`}
                style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                }}
                onMouseEnter={() =>
                    onTicketHover(ticket.section_stand_name, ticket.section_name, ticket.section_id)
                }
                onMouseLeave={() => onTicketUnHover()}
            >
                {/* Quantity Counter */}
                <div className="absolute top-2 right-2 z-10">
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-white rounded-full 
        shadow-[0_1px_3px_rgba(0,0,0,0.1)] border">
                        <button
                            onClick={(e) => { e.stopPropagation(); decrement(ticket); }}
                            className="bg-gray-100 hover:bg-ticket-red hover:text-white 
                transition-all p-1 rounded-full shadow-sm"
                        >
                            <Minus className="w-3 h-3" />
                        </button>
                        <div className="text-sm font-medium min-w-[1.75rem] text-center">
                            {ticketCount[ticket.listing_id] || 1}
                        </div>
                        <button
                            onClick={(e) => { e.stopPropagation(); increment(ticket); }}
                            className="bg-gray-100 hover:bg-ticket-red hover:text-white 
                transition-all p-1 rounded-full shadow-sm"
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                    </div>
                </div>

                {/* Header */}
                <header className="mb-1">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-700 
        group-hover:text-ticket-red transition-colors duration-300 leading-tight">
                        {areaNames[ticket.section_stand_name]}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                        {ticket.section_stand_name}{" "}
                        <span className="font-medium">{ticket.section_name}</span>
                    </p>
                </header>

                {/* Badges */}
                <div className="mb-1">
                    <div className="inline-flex items-center gap-1 text-xs text-white bg-ticket-blue rounded-full px-2.5 py-1 shadow-sm">
                        <Armchair className="w-3 h-3" />
                        {{
                            "1": "Single Seat",
                            "2": "Up to 2 Together",
                            "3": "Up to 3 Together",
                            "4": "Up to 4 Together",
                            "5": "Connecting Seats",
                            "6": "All Together",
                        }[ticket.togather_upto] || ""}
                    </div>
                </div>

                {/* Attributes */}
                {ticket.attributes?.length > 0 && (
                    <div className="flex flex-wrap gap-1 border-b pb-2 mb-2">
                        {ticket.attributes.map((attr, i) => {
                            const found = attributesList.find((item) => item.label === attr);
                            const Icon = found?.icon;
                            return (
                                <span
                                    key={i}
                                    className={`px-1.5 py-0.5 text-xs rounded-full inline-flex items-center gap-1 border 
                        shadow-sm ${found?.color || "bg-gray-100 text-gray-700"}`}
                                >
                                    {Icon && <Icon className="w-3 h-3" />}
                                    {attr}
                                    <HintBubble item={found} />
                                </span>
                            );
                        })}
                    </div>
                )}

                {/* Restrictions */}
                {ticket.restrictions?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                        {ticket.restrictions.map((attr, i) => {
                            const found = restrictionsList.find((item) => item.label === attr);
                            const Icon = found?.icon;
                            return (
                                <span
                                    key={i}
                                    className={`px-1.5 py-0.5 text-xs rounded-full inline-flex items-center gap-1 border 
                        shadow-sm ${found?.color || "bg-gray-100 text-gray-700"}`}
                                >
                                    {Icon && <Icon className="w-3 h-3" />}
                                    {attr}
                                    <HintBubble item={found} />
                                </span>
                            );
                        })}
                    </div>
                )}

                {/* Footer */}
                <div className="flex justify-between items-center pt-1">
                    <div className="text-xs sm:text-sm text-gray-600">
                        {ticket.tickets.length} ticket{ticket.tickets.length > 1 ? "s" : ""} available
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="text-sm sm:text-base font-semibold text-gray-800">
                            £{ticket.price}
                            <span className="font-light text-xs text-gray-500 ml-0.5">/ ticket</span>
                        </div>
                        <button
                            onClick={() => handleBuyNow(ticket)}
                            className="px-3 py-1.5 text-xs sm:text-sm bg-ticket-primarycolor hover:bg-ticket-red 
                text-white rounded-full transition-all shadow-md hover:shadow-lg"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>




        </>
    );
};

export default TicketItem;
