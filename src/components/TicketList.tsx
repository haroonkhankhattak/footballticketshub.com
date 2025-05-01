import React from "react";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CustomDropdown from "@/components/DropdownSelector";
import { DevicePhoneMobileIcon } from "@heroicons/react/24/outline";
import { Armchair } from "lucide-react";
import { TicketIcon } from "lucide-react";

import { Minus, Plus } from "lucide-react";

interface Ticket {
    id: number;
    match: string;
    date: string;
    time: string;
    competition: string;
    venue: string;
    area: string;
    section: string;
    row: string;
    price: number;
    availability: number;
}

interface TicketListProps {
    tickets: Ticket[];
    selectedSeat: string | null;
    areaNames: Record<string, string>;
    onTicketHover: (area: string, section?: string) => void;
    onTicketSelect: (id: number) => void;
    selectedArea: string;
    selectedSection: string;
}

const TicketList: React.FC<TicketListProps> = ({
    tickets,
    selectedSeat,
    areaNames,
    onTicketHover,
    onTicketSelect,
    selectedArea,
    selectedSection,
}) => {
    // Filter tickets to show only those in the selected area or all if none selected
    let displayTickets = selectedArea
        ? tickets.filter((ticket) => ticket.area === selectedArea)
        : tickets;

    displayTickets = selectedSection
        ? tickets.filter((ticket) => ticket.section === selectedSection)
        : tickets;

    const maxLimit = 10;

    const [ticketCount, setTicketCount] = useState<{ [key: string]: number }>({});

    const increment = (id: number) => {
        setTicketCount((prev) => {
            const current = prev[id] || 1;
            if (current >= 10) return prev; // max limit
            return { ...prev, [id]: current + 1 };
        });
    };

    const decrement = (id: number) => {
        setTicketCount((prev) => {
            const current = prev[id] || 1;
            if (current <= 1) return prev; // min limit
            return { ...prev, [id]: current - 1 };
        });
    };

    return (
        <div className="bg-white rounded-lg">
            {/* <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Liverpool vs West Ham United</h2>
                <div className="text-sm text-green-600 font-medium mb-4">Premier League</div>
            </div> */}

            <div className="mb-6">
                {/* <h3 className="text-lg font-semibold mb-4">
                    {selectedArea ? `${areaNames[selectedArea]} Tickets` : 'Available Tickets'}
                </h3> */}
                <div className="space-y-4">
                    {/* {displayTickets.map((ticket) => (
                        <div
                            key={ticket.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-colors hover:border-green-500 ${selectedSeat === ticket.section ? 'border-green-500 bg-green-50' : ''}`}
                            onMouseEnter={() => onTicketHover(ticket.area, ticket.section)}
                            onMouseLeave={() => onTicketHover(selectedArea)}
                            onClick={() => onTicketSelect(ticket.id)}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <div className="font-medium">{areaNames[ticket.area]}</div>
                                    <div className="text-sm text-gray-500">Section {ticket.section}, Row {ticket.row}</div>
                                </div>
                                <div className="text-xl font-bold text-green-600">£{ticket.price}</div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="text-sm text-gray-500">{ticket.availability} tickets available</div>
                                <button className="px-4 py-1 bg-green-600 text-white text-sm rounded-full hover:bg-green-700 transition-colors">
                                    Select
                                </button>
                            </div>
                        </div>
                    ))} */}

                    {displayTickets.map((ticket) => (
                        <div
                            key={ticket.id}
                            className={`relative bg-white rounded-lg p-4 group ticket-red shadow border cursor-pointer transition-colors  ${selectedSeat === ticket.section ? " bg-green-500" : ""
                                }`}
                            onMouseEnter={() => onTicketHover(ticket.area, ticket.section)}
                            onMouseLeave={() => onTicketHover(selectedArea)}
                            onClick={() => onTicketSelect(ticket.id)}>
                            {/* Counter top right */}
                            <div className="absolute top-2 right-2 z-10">
                                <div className="flex items-center p-1 gap-1 rounded-sm bg-white">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            decrement(ticket.id);
                                        }}
                                        className="bg-gray-100 hover:bg-ticket-red hover:text-white transition-colors p-2 rounded-full">
                                        <Minus className="w-3 h-3" />
                                    </button>

                                    <div className="flex flex-col items-center px-1">
                                        <span className="text-lg font-medium text-center min-w-[1.5rem]">
                                            {ticketCount[ticket.id] || 1} &nbsp;
                                            <span className="text-xs font-light text-center whitespace-nowrapn">
                                                Ticket{(ticketCount[ticket.id] || 1) > 1 ? "s" : ""}
                                            </span>
                                        </span>
                                    </div>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            increment(ticket.id);
                                        }}
                                        className="bg-gray-100 hover:bg-ticket-red hover:text-white transition-colors p-2 rounded-full">
                                        <Plus className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>

                            {/* Header */}
                            <header className="">
                                <h3 className="text-gray-800 text-base font-semibold group-hover:text-ticket-red ">
                                    <span>{areaNames[ticket.area]}</span>
                                    <span className="block text-sm text-gray-500 ml-1 group-hover:text-black">
                                        Section {ticket.section}, Row {ticket.row}
                                    </span>
                                </h3>
                            </header>

                            <ul className="flex flex-wrap gap-2 text-xs mb-3">
                                <li>
                                    <span className="bg-gray-100 border border-gray-300 text-gray-600 rounded-md px-2 py-1 inline-flex items-center gap-1">
                                        <DevicePhoneMobileIcon className="w-3 h-3" />
                                        Mobile ticket
                                    </span>

                                    {/* <span className="bg-gray-100 border border-gray-300 text-gray-600 rounded-md px-2 py-1 inline-flex items-center gap-1">
                                        <TicketIcon className="w-3 h-3" />
                                        E-ticket
                                    </span> */}
                                </li>
                                <li>
                                    <span className="bg-gray-100 border border-gray-300 text-gray-600 rounded-md px-2 py-1 inline-flex items-center gap-1">
                                        <Armchair className="w-3 h-3" />
                                        Single seat
                                    </span>
                                </li>
                            </ul>

                            {/* Tags */}
                            <ul className="flex flex-wrap gap-2 text-xs mb-3">
                                {/* ... your tags ... */}
                            </ul>

                            {/* Bottom Row */}
                            <div className="flex justify-between items-center">
                                <div className="text-sm text-gray-500">
                                    {ticket.availability} tickets available
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="text-lg font-semibold text-black">
                                        £{ticket.price}{" "}
                                        <span className="font-thin text-sm text-gray-500">
                                            / Ticket
                                        </span>
                                    </div>
                                    <Link to={`/checkout`} className="block">
                                        <button className="px-4 py-2 bg-ticket-primarycolor text-white text-sm rounded-full group-hover:bg-ticket-red transition-colors">
                                            Buy Now
                                        </button>
                                    </Link>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* 
      <div className="mt-4 space-y-3">
        <h3 className="text-lg font-semibold">Ticket Information</h3>
        <div className="flex items-start">
          <CheckCircle size={16} className="text-green-600 mt-1 mr-2" />
          <span className="text-sm">
            All tickets are 100% guaranteed and delivered securely via email.
          </span>
        </div>
        <div className="flex items-start">
          <CheckCircle size={16} className="text-green-600 mt-1 mr-2" />
          <span className="text-sm">
            Tickets for the same group/party are always adjacent to each other.
          </span>
        </div>
        <div className="flex items-start">
          <CheckCircle size={16} className="text-green-600 mt-1 mr-2" />
          <span className="text-sm">
            Ticket prices include all fees and service charges.
          </span>
        </div>
      </div> */}
        </div>
    );
};

export default TicketList;
