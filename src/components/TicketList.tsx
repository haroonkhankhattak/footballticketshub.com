import React from "react";

import TicketItem from "./TicketItem";
import { Listing } from "../pages/tickets/listing";



// const attributesList = [
//     {
//         label: "E-ticket",
//         icon: QrCode,
//         color: "bg-blue-100 text-blue-800",
//     },
//     {
//         label: "Mobile Ticket",
//         icon: Smartphone,
//         color: "bg-indigo-100 text-indigo-800",
//     },
//     {
//         label: "Hardcopy",
//         icon: Tag,
//         color: "bg-yellow-100 text-yellow-800",
//     },
//     {
//         label: "Unrestricted View",
//         icon: Eye,
//         color: "bg-green-100 text-green-800",
//     },
//     {
//         label: "Home Area",
//         icon: ShieldCheck,
//         color: "bg-sky-100 text-sky-800",
//     },
//     {
//         label: "Away Fans Allowed",
//         icon: ShieldCheck,
//         color: "bg-red-100 text-red-800",
//     },
//     {
//         label: "Neutral Fans Allowed",
//         icon: Eye,
//         color: "bg-purple-100 text-purple-800",
//     },
//     {
//         label: "VIP Entry",
//         icon: UserCheck,
//         color: "bg-green-100 text-green-800",
//     },
//     {
//         label: "Premium Hospitality",
//         icon: Handshake,
//         color: "bg-amber-100 text-amber-800",
//     },
//     {
//         label: "Parking Included",
//         icon: ParkingCircle,
//         color: "bg-gray-100 text-gray-800",
//     },
// ]

// const restrictionsList = [
//     {
//         label: "Restricted View",
//         icon: Eye,
//         color: "bg-yellow-100 text-yellow-800",
//     },
//     {
//         label: "Severely Restricted View",
//         icon: EyeOff,
//         color: "bg-yellow-200 text-yellow-900",
//     },
//     {
//         label: "Passport Copy Required",
//         icon: FileWarning,
//         color: "bg-rose-100 text-rose-700",
//     },
//     {
//         label: "No Hospitality Included",
//         icon: BadgeMinus,
//         color: "bg-red-100 text-red-700",
//     },
//     {
//         label: "No Away Team Nationals",
//         icon: Ban,
//         color: "bg-orange-100 text-orange-700",
//     },
//     {
//         label: "Standing Section",
//         icon: Users,
//         color: "bg-yellow-100 text-yellow-800",
//     },
//     {
//         label: "Unreserved Seating",
//         icon: Users,
//         color: "bg-yellow-100 text-yellow-800",
//     },
//     {
//         label: "iPhone Users Only",
//         icon: Apple,
//         color: "bg-green-100 text-green-800",
//     },
//     {
//         label: "Android Users Only",
//         icon: Smartphone,
//         color: "bg-green-100 text-green-800",
//     },
//     {
//         label: "Junior Ticket",
//         icon: Baby,
//         color: "bg-blue-100 text-blue-800",
//     },
//     {
//         label: "Junior Ticket (Under 20yrs)",
//         icon: Baby,
//         color: "bg-blue-100 text-blue-800",
//     },
//     {
//         label: "Junior Ticket (Under 18yrs)",
//         icon: Baby,
//         color: "bg-blue-100 text-blue-800",
//     },
//     {
//         label: "Junior Ticket (Under 17yrs)",
//         icon: Baby,
//         color: "bg-blue-100 text-blue-800",
//     },
//     {
//         label: "Junior Ticket (18-21yrs)",
//         icon: Baby,
//         color: "bg-blue-100 text-blue-800",
//     },
//     {
//         label: "Junior Ticket (18-20yrs)",
//         icon: Baby,
//         color: "bg-blue-100 text-blue-800",
//     },
//     {
//         label: "Young Adult Ticket (17-21yrs)",
//         icon: User,
//         color: "bg-indigo-100 text-indigo-800",
//     },
//     {
//         label: "Young Adult Ticket (17-18yrs)",
//         icon: User,
//         color: "bg-indigo-100 text-indigo-800",
//     },
//     {
//         label: "Adult + Junior (Under 21yrs)",
//         icon: Users,
//         color: "bg-pink-100 text-pink-700",
//     },
//     {
//         label: "Adult + Junior (Under 20yrs)",
//         icon: Users,
//         color: "bg-pink-100 text-pink-700",
//     },
//     {
//         label: "Adult + Junior (Under 18yrs)",
//         icon: Users,
//         color: "bg-pink-100 text-pink-700",
//     },
//     {
//         label: "Adult + Junior (Under 17yrs)",
//         icon: Users,
//         color: "bg-pink-100 text-pink-700",
//     },
//     {
//         label: "Adult + Junior (Under 16yrs)",
//         icon: Users,
//         color: "bg-pink-100 text-pink-700",
//     },
//     {
//         label: "Adult + Junior (Under 11yrs)",
//         icon: Users,
//         color: "bg-pink-100 text-pink-700",
//     },
//     {
//         label: "Adult + Junior",
//         icon: Users,
//         color: "bg-pink-100 text-pink-700",
//     },
//     {
//         label: "Adult + Senior",
//         icon: Users,
//         color: "bg-pink-100 text-pink-700",
//     },
//     {
//         label: "Senior Ticket",
//         icon: UserMinus,
//         color: "bg-pink-100 text-pink-700",
//     },
// ];

// const otherShippingOptions = [
//     { id: 2, name: "Secure Delivery (Country of Event)", rate: 6.5 },
//     { id: 4, name: "Hotel Delivery (Event City)", rate: 6.5 },
//     { id: 6, name: "Bike Courier (Central London)", rate: 20 },
//     { id: 9, name: "Bike Courier (London Heathrow)", rate: 50 },
//     { id: 14, name: "UK Special Delivery Mon-Fri Pre-1pm", rate: 7.5 },
//     { id: 15, name: "UK Special Delivery Mon-Fri Pre-9am", rate: 22.5 },
//     { id: 16, name: "UK Special Delivery (Residential) Sat Pre-1pm", rate: 22.5 },
//     { id: 17, name: "UK Special Delivery (Residential) Sat Pre-9am", rate: 27.5 },
//     { id: 21, name: "TNT International (Central Europe)", rate: 40 },
//     { id: 25, name: "DHL Delivery (EU)", rate: 35 },
//     { id: 26, name: "DHL Delivery (Non-EU)", rate: 50 },
//     { id: 29, name: "UPS/Fedex Delivery", rate: 20 },
// ];

interface TicketListProps {
    listings: Listing[];
    selectedSeat: string | null;
    areaNames: string[];
    onTicketHover: (area: string, section?: string) => void;
    onTicketSelect: (id: string) => void;
    selectedArea: string;
    selectedSection: string;
}

const TicketList: React.FC<TicketListProps> = ({
    listings,
    selectedSeat,
    areaNames,
    onTicketHover,
    onTicketSelect,
    selectedArea,
    selectedSection,
}) => {


    // Filter listings to show only those in the selected area or all if none selected
    let displayTickets = selectedArea
        ? listings.filter((ticket) => ticket.section_stand_name === selectedArea)
        : listings;

    displayTickets = selectedSection
        ? listings.filter((ticket) => ticket.section_id === selectedSection)
        : listings;

    return (


        <div className="space-y-6">

            {displayTickets.map((ticket) => (
                <TicketItem
                    key={ticket.listing_id}
                    ticket={ticket}
                    selectedSeat={selectedSeat}
                    onTicketHover={onTicketHover}
                    selectedArea={selectedArea}
                    areaNames={areaNames}
                />
            ))}
        </div>

    );
};

export default TicketList;
