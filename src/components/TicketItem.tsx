// components/Ticket.tsx

import { Armchair, Minus, Plus, ShoppingBasket } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"
import { useCurrencyLanguage } from "../lib/CurrencyLanguageContext";
import { Listing } from "../pages/tickets/listing";
import { restrictionsList } from "../lib/constants/restrictions";
import { attributesList } from "../lib/constants/attributes";
import { HintBubble } from "./HintBubble";
import { WarningAlertDialouge } from "./WarningAlertDialouge";
import { LoadingDialog } from "./LoadingDialog";
import { toast, Toaster } from "sonner";
import { AlertDialouge } from "./AlertDialouge";
import e from "express";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { CLEAR_BASKET } from "../lib/graphql/queries/ClearBasket";

interface TicketProps {
    ticket: Listing;
    selectedSeat: string;
    onTicketHover: (stand: string, section?: string) => void;
    selectedArea: string;
    areaNames: string[];
}

const TicketItem = ({
    ticket,
    selectedSeat,
    onTicketHover,
    selectedArea,
    areaNames,
}: TicketProps) => {

    const navigate = useNavigate()
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

    const { selectedCurrency } = useCurrencyLanguage();

    const currencySymbols: Record<string, string> = {
        gbp: "£",
        usd: "$",
        eur: "€",
        chf: "Fr",
        sek: "kr",
        nok: "kr",
        dkk: "kr",
    };

    const currencyKey = selectedCurrency.toLowerCase();
    const symbol = currencySymbols[selectedCurrency] || "";

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
                console.log("Basket cleared:", data.clearBasket.message);
                setshowLoading(true);
            } else {
                console.warn("Failed to clear basket");
            }
        } catch (err) {
            console.error("Clear basket error:", err);
        }
    };



    return (
        <>
            {/* <Toaster position="top-center" richColors /> */}
            <div
                key={ticket.listing_id}
                className={`relative bg-white rounded-lg p-4 group ticket-red shadow border cursor-pointer transition-colors ${selectedSeat === ticket.section_name ? "bg-green-500" : ""
                    }`}
                onMouseEnter={() =>
                    onTicketHover(ticket.section_stand_name, ticket.section_name)
                }
                onMouseLeave={() => onTicketHover(selectedArea)}
            >
                {/* Quantity Counter */}
                <div className="absolute top-2 right-2 z-10">
                    <div className="flex items-center p-1 gap-1 rounded-sm bg-white">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                decrement(ticket);
                            }}
                            className="bg-gray-100 hover:bg-ticket-red hover:text-white transition-colors p-2 rounded-full"
                        >
                            <Minus className="w-3 h-3" />
                        </button>
                        <div className="flex flex-col items-center px-1">
                            <span className="text-lg font-medium text-center min-w-[1.5rem]">
                                {ticketCount[ticket.listing_id] || 1}{" "}
                                <span className="text-xs font-light text-center">
                                    Ticket{(ticketCount[ticket.listing_id] || 1) > 1 ? "s" : ""}
                                </span>
                            </span>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                increment(ticket);
                            }}
                            className="bg-gray-100 hover:bg-ticket-red hover:text-white transition-colors p-2 rounded-full"
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                    </div>
                </div>

                {/* Header */}
                <header>
                    <h3 className="text-gray-800 mb-2 text-xs sm:text-sm font-semibold group-hover:text-ticket-red ">
                        <span>{areaNames[ticket.section_stand_name]}</span>
                        <span className="block text-xs sm:text-sm text-gray-500 ml-1 group-hover:text-black">
                            {ticket.section_stand_name} {ticket.section_name}
                        </span>
                    </h3>
                </header>

                {/* Badges */}
                <div className="flex items-start flex-wrap gap-2 mb-2 mt-4">
                    <ul className="flex flex-wrap gap-1 text-xs">
                        <li>
                            <span className="bg-gray-100 border border-gray-300 text-gray-600 rounded-md px-2 py-1 inline-flex items-center gap-1">
                                <Armchair className="w-3 h-3" />
                                {{
                                    "1": "Single Seat",
                                    "2": "Up to 2 Together",
                                    "3": "Up to 3 Together",
                                    "4": "Up to 4 Together",
                                    "5": "Connecting Seats",
                                    "6": "All Together",
                                }[ticket.togather_upto] || ""}
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Attributes */}
                <div className="flex flex-wrap gap-1 pb-2 border-b mb-2">
                    {ticket.attributes?.map((attr: string, i: number) => {
                        const found = attributesList.find((item) => item.label === attr);
                        const Icon = found?.icon;
                        return (
                            <span
                                key={i}
                                className={`rounded-md px-2 py-1 inline-flex items-center gap-1 text-[8px] sm:text-xs border ${found?.color || "bg-gray-100 text-gray-700"
                                    }`}
                            >
                                {Icon && <Icon className="w-3 h-3" />}
                                {attr}
                                <HintBubble item={found} />
                            </span>
                        );
                    })}
                </div>

                {/* Restrictions */}
                <div className="flex flex-wrap gap-1 mb-2">
                    {ticket.restrictions?.map((attr: string, i: number) => {
                        const found = restrictionsList.find((item) => item.label === attr);
                        const Icon = found?.icon;
                        return (
                            <span
                                key={i}
                                className={`rounded-md px-2 py-1 inline-flex items-center gap-1 text-[8px] sm:text-xs border ${found?.color || "bg-gray-100 text-gray-700"
                                    }`}
                            >
                                {Icon && <Icon className="w-3 h-3" />}
                                {attr}
                                <HintBubble item={found} />
                            </span>
                        );
                    })}
                </div>

                {/* Footer: Price and Buy Now */}
                <div className="flex justify-between items-center">
                    <div className="text-xs sm:text-sm text-gray-500">
                        {ticket.tickets.length} ticket
                        {ticket.tickets.length > 1 ? "s" : ""} available
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="text-xs sm:text-base font-semibold text-black">
                            {symbol}{" "}
                            {(ticket.price * (exchangeRates[currencyKey] || 1)).toFixed(0)}
                            <span className="font-thin text-xs sm:text-sm text-gray-500">
                                / Ticket
                            </span>
                        </div>
                        <button
                            onClick={() => handleBuyNow(ticket)}
                            className="px-4 py-2 bg-ticket-primarycolor text-white text-xs sm:text-sm rounded-full group-hover:bg-ticket-red transition-colors"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>



                {/* Show notice */}
                <AnimatePresence>
                    {showNotice && (
                        <motion.div
                            initial={{ scaleY: 0, opacity: 0, transformOrigin: "top" }}
                            animate={{ scaleY: 1, opacity: 1 }}
                            exit={{ scaleY: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="mt-1 font-light text-orange-700 text-xs sm:text-sm text-center px-4 rounded-b-lg overflow-hidden z-10 relative"
                        >
                            {message}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Alert Dialogue */}
                <WarningAlertDialouge
                    open={showDialog}
                    onOpenChange={setShowDialog}
                    listing={ticket}
                    onConfirm={() => {
                        setshowLoading(true);
                    }}
                />

                {/* Loading Dialogue */}
                <LoadingDialog
                    open={showLoading}
                    listing={ticket}
                    quantity={pendingQuantity}
                    onAdded={() => {
                        setshowLoading(false);
                        const now = new Date();
                        const expiresAtUTC = new Date(now.getTime() + 10 * 60 * 1000);

                        navigate("/checkout", {
                            state: {
                                ticket: pendingTicket,
                                quantity: pendingQuantity,
                                expiresAt: expiresAtUTC,
                            },
                        });
                    }}
                    onAlert={() => {
                        setshowLoading(false);
                        setShowCartAlert(true)
                    }}
                    onError={(msg) => {
                        setshowLoading(false);
                        toast.error(msg, {
                            description: "Please try again later.",
                        });
                    }}
                />

                <AlertDialouge
                    open={showCartAlert}
                    onOpenChange={setShowCartAlert}
                    confirmAction={() => {
                        setShowCartAlert(false);
                        const now = new Date();
                        const expiresAtUTC = new Date(now.getTime() + 10 * 60 * 1000);
                        handleClearBasket();
                    }}
                    cancelAction={() => {
                        setShowCartAlert(false);
                        const now = new Date();
                        const expiresAtUTC = new Date(now.getTime() + 10 * 60 * 1000);

                        navigate("/checkout", {
                            state: {
                                ticket: pendingTicket,
                                quantity: pendingQuantity,
                                expiresAt: expiresAtUTC,
                            },
                        });
                    }}
                    title="Replace Cart Items?"
                    subtitle="Your basket already contains tickets."
                    description="Adding these tickets will remove the ones already in your cart. Do you want to proceed and clear your current basket?"
                    boldPhrases={["replace", "remove", "clear"]}
                    confirmText="Okay, Replace"
                    cancelText="Cancel"
                    showCancel={true}
                    icon={<ShoppingBasket className="w-5 h-5" />}
                />

            </div>

        </>
    );
};

export default TicketItem;
