import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    BadgeCheck,
    MapPin,
    Flag,
    CalendarDays,
    Info,
    Section,
    Ticket,
    HelpCircle,
    X
} from "lucide-react";

import { Apple, Armchair, Baby, BadgeMinus, Ban, EyeOff, FileWarning, User, UserMinus, Users } from "lucide-react";
import { QrCode, Smartphone, Handshake, Tag, ShieldCheck, Eye, UserCheck, ParkingCircle } from "lucide-react"

import { CLUB_FANS } from "../../lib/constants";
import { useCurrencyLanguage } from "../../lib/CurrencyLanguageContext";
import { convertTeamNameToSlug } from "../../lib/teamUtils";
import { Listing } from "../../pages/tickets/listing";
import { useState } from "react";
import { restrictionsList } from "../../lib/constants/restrictions";
import { attributesList } from "../../lib/constants/attributes";
import { seatingArrgOptions } from "../../lib/constants/seatingArrgOptions";
import { HintBubble } from "../HintBubble";
import { AlertDialouge } from "../AlertDialouge";
import { AiOutlineWarning } from "react-icons/ai";


interface CheckoutLayoutProps {
    ticket: Listing,
    quantity: number,
}


const OrderSummary: React.FC<CheckoutLayoutProps> = ({
    ticket: ticket,
    quantity: quantity,
}) => {

    const { selectedCurrency } = useCurrencyLanguage();
    const [alertOpen, setAlertOpen] = useState(false);
    const [open, setOpen] = useState(false);

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

    const ticketPrice = Number((ticket.price * (exchangeRates[currencyKey] || 1)).toFixed(0));



    // console.log("--------------->", eventName, categoryName, date, time, venue, ticketArea, ticketSection, ticketprice, quantity, seatedTogather);

    function getFirstTeam(eventName) {
        const teams = eventName.split(' vs '); // Split the string by ' vs '
        return teams[0]; // Return the first team
    }

    const homeTeam = getFirstTeam(ticket.match_title);
    const homeTeamSlug = convertTeamNameToSlug(homeTeam);
    console.log(homeTeamSlug);
    const filename = CLUB_FANS[homeTeamSlug];
    console.log(filename);
    const markupPercentage = 0.3;
    const markupAmount = ticketPrice * markupPercentage; // 30
    const totalPrice = ticketPrice + markupAmount;       // 130

    const totalMarkup = (markupAmount * quantity).toFixed(0);
    const grandTotal = (totalPrice * quantity).toFixed(0);


    const matchDate = new Date(Number(ticket.match_date));

    const formattedDate = matchDate.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (




        <Card className="border-none shadow-lg">
            <div className="relative h-40 w-full">
                <img
                    src={`/uploads/teamfans/${filename}`}
                    alt="Liverpool vs Tottenham match"
                    className="object-cover w-full h-full rounded-t-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg" />
            </div>

            <CardContent className="p-6 space-y-6">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-sky-500/10 text-sky-500 text-xs font-medium rounded">
                            {ticket.match_league}
                        </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold mt-2">
                        {ticket.match_title}
                    </h2>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-500">
                        <CalendarDays className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-thin">
                            {formattedDate}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-500">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-thin">
                            {ticket.match_venue}
                        </span>
                    </div>
                </div>

                <div className="space-y-3 bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-emerald-600">
                        <BadgeCheck className="h-4 w-4" />
                        <span className="text-sm font-medium">
                            150% Money Back Guarantee
                        </span>

                        <div onClick={() => setAlertOpen(true)}>
                            <HelpCircle className="h-4 w-4 text-emerald-600" />
                        </div>

                    </div>

                    <div className="flex items-center gap-2 text-emerald-600">
                        <ShieldCheck className="h-4 w-4" />
                        <span className="text-sm">Easy and secure payments</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-700 text-2xl">
                        <img
                            src="/uploads/icons/visa-pay.svg"
                            className="object-cover rounded-t-lg text-black"
                            width={32}
                            height={32}
                        />
                        <img
                            src="/uploads/icons/master-pay.svg"
                            className="object-cover rounded-t-lg text-black"
                            width={32}
                            height={32}
                        />
                        <img
                            src="/uploads/icons/apple-pay.svg"
                            className="object-cover rounded-t-lg text-black"
                            width={32}
                            height={32}
                        />
                        <img
                            src="/uploads/icons/google-pay.svg"
                            className="object-cover rounded-t-lg text-black"
                            width={32}
                            height={32}
                        />
                    </div>
                </div>

                <hr className="border-t-1 border-dashed border-gray-400" />

                <div className="space-y-1">
                    <div className="flex items-start gap-2 text-gray-500">
                        <Ticket className="h-4 w-4 text-gray-500 mt-1" />


                        {/* <div className="flex flex-col">
                            <span className="text-sm font-semibold">E-Tickets</span>
                            <span className="text-sm font-thin">
                                Digital tickets (usually E-Ticket) will be sent to you digitaly.
                                {ticket.other_shipping_id}
                            </span>
                        </div> */}

                        {/* <div className="flex flex-col">
                            {ticket.shipping_type === "4" ? (
                                otherShippingOptions[Number(ticket.other_shipping_id)] && (
                                    <>
                                        <span className="text-sm font-semibold">Other Method</span>
                                        <span className="text-sm font-thin">
                                            {otherShippingOptions[Number(ticket.other_shipping_id)].name} - {symbol} {otherShippingOptions[Number(ticket.other_shipping_id)].rate}
                                        </span>
                                    </>
                                )
                            ) : (
                                shippingOptions[Number(ticket.shipping_type)] && (
                                    <>
                                        <span className="text-sm font-semibold">
                                            {shippingOptions[Number(ticket.shipping_type)].name}
                                        </span>
                                        <span className="text-sm font-thin">
                                            Delivery method: {shippingOptions[Number(ticket.shipping_type)].name}
                                        </span>
                                    </>
                                )
                            )}
                        </div> */}


                    </div>

                    <div className="flex items-start gap-2 text-gray-500">
                        <Flag className="h-4 w-4 text-gray-500 mt-1" />

                        <div className="flex flex-col">
                            <span className="text-xs sm:text-sm font-semibold">Area / Section</span>
                            <span className="text-xs sm:text-sm font-light">{ticket.section_stand_name}, {ticket.section_name}</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-2 text-gray-500">
                        <Armchair className="h-4 w-4 text-gray-500 mt-1" />

                        <div className="flex flex-col">
                            <span className="text-xs sm:text-sm font-semibold">Seats: {seatingArrgOptions[Number(ticket.togather_upto) - 1].name}</span>

                            <span className="text-xs sm:text-sm font-light">
                                {seatingArrgOptions[Number(ticket.togather_upto) - 1].description}
                            </span>

                        </div>
                    </div>

                    <div className="flex items-start gap-2 text-gray-500">


                        {/* Attributes */}
                        <div className="flex flex-wrap gap-1 pb-2 border-b mb-2 mt-2">
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
                                        <div className="relative inline-block">
                                            {/* Help Icon */}
                                            <HintBubble item={found} />

                                            {/* Popup Modal */}
                                            {open && (
                                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                                    <div className="bg-white rounded-xl shadow-lg w-80 p-6 relative">
                                                        {/* Close Button */}
                                                        <button
                                                            onClick={() => setOpen(false)}
                                                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                                                        >
                                                            <X className="h-5 w-5" />
                                                        </button>

                                                        {/* Content */}
                                                        <h2 className="text-lg font-bold mb-1">Need Help?</h2>
                                                        <h3 className="text-sm text-gray-700 mb-2">Understanding This Feature</h3>
                                                        <p className="text-sm text-gray-600 mb-4">
                                                            This icon explains the feature in more detail. Click OK to continue or close to dismiss.
                                                        </p>

                                                        {/* Buttons */}
                                                        <div className="flex justify-end space-x-2">
                                                            <button
                                                                onClick={() => setOpen(false)}
                                                                className="px-4 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                                                            >
                                                                OK
                                                            </button>
                                                            <button
                                                                onClick={() => setOpen(false)}
                                                                className="px-4 py-1 text-sm text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                                                            >
                                                                Close
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </span>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex items-start gap-2 text-gray-500">

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
                                        {/* Help Icon */}
                                        <HintBubble item={found} />
                                    </span>
                                );
                            })}
                        </div>

                    </div>
                </div>

                <hr className="border-t-1 border-dashed border-gray-400" />

                <div className="space-y-1">
                    <div className="flex font-light text-sm sm:text-lg justify-between text-gray-500">
                        <span>Price per ticket</span>
                        <span className="font-semibold">{symbol} {ticketPrice}</span>
                    </div>

                    <div className="flex font-light text-sm sm:text-lg justify-between text-gray-500">
                        <span>Quantity</span>
                        <span className="font-semibold">{quantity}x</span>
                    </div>

                    <div className="flex font-light text-sm sm:text-lg justify-between text-gray-500">
                        <span>Service Fee + Tax</span>
                        <span className="font-semibold">{symbol} {totalMarkup}</span>
                    </div>

                    <hr className="border-t-1 border-dashed border-gray-400" />

                    <div className="flex justify-between text-sm sm:text-lg font-bold">
                        <span>Total</span>
                        <span>{symbol} {grandTotal}</span>
                    </div>
                </div>

                <div className="w-100 h-14 sm:h-20 border bg-white p-2 flex gap-0.5 justify-center items-end">
                    {Array.from({ length: 80 }).map((_, i) => (
                        <div
                            key={i}
                            className={`h-full ${i % 3 === 0
                                ? "w-1 bg-ticket-darkgray"
                                : i % 2 === 0
                                    ? "w-0.5 bg-black"
                                    : "w-0.5 bg-gray-200"
                                }`}></div>
                    ))}
                </div>

                <AlertDialouge
                    open={alertOpen}
                    onOpenChange={setAlertOpen}
                    confirmAction={() => {
                        setAlertOpen(false);
                    }}
                    title="The most reliable ticket marketplace you can trust"
                    description="Our 150% Money Back Guarantee
With over 1,000 reviews and an excellent Trustpilot rating, we’re committed to delivering the highest quality experience. We work exclusively with trusted, approved ticket specialists to ensure reliability and peace of mind.
99+% of customers receive their tickets on time — but if something goes wrong, we’ll refund 100% of your payment and give you a 50% credit toward your next match. That’s our 150% Money Back Guarantee."
                    boldPhrases={
                        ["150% Money Back Guarantee",
                            "over 1,000 reviews",
                            "excellent Trustpilot rating",
                            "trusted, approved ticket specialists",
                            "99+% of customers",
                            "100% of your payment",
                            "50% credit",]
                    }
                    confirmText="Okay, I understand"
                    icon={<ShieldCheck className="w-5 h-5" />}
                />

            </CardContent>
        </Card>
    );
};

export default OrderSummary;
