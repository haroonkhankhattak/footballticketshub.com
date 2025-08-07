import React from "react";

import TicketItem from "./TicketItem";
import { Listing } from "../types/listing";



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
