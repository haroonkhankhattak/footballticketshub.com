import React, { useState } from "react";
import StadiumMap2D from "./StadiumMap2D";

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

interface StadiumSectionProps {
    selectedArea: string;
    onAreaClick: (area: string) => void;
    areaNames: Record<string, string>;
    availableTickets?: Ticket[];
}

const StadiumSection: React.FC<StadiumSectionProps> = ({
    selectedArea,
    onAreaClick,
    areaNames,
    availableTickets = [],
}) => {
    const [selectedSection, setSelectedSection] = useState<string | undefined>(
        undefined
    );

    // Build the list of areas
    const stadiumAreas = [
        { id: "main-stand", color: "bg-blue-500" },
        { id: "kop", color: "bg-yellow-500" },
        { id: "sir-kenny-dalglish", color: "bg-green-500" },
        { id: "anfield-road", color: "bg-red-500" },
    ];

    const handleSectionClick = (sectionId: string) => {
        setSelectedSection(sectionId);
        console.log(`Selected section: ${sectionId}`);
        onAreaClick(sectionId);

        // Determine the area of the clicked section and update it
        // if (/^[MUL]\d+$/.test(sectionId)) onAreaClick("main-stand");
        // else if (/^(CE|K)/.test(sectionId)) onAreaClick("sir-kenny-dalglish");
        // else if (/^(AL|AU)/.test(sectionId)) onAreaClick("anfield-road");
        // else if (/^([0-9])/.test(sectionId)) onAreaClick("kop");
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            {/* <h3 className="text-lg font-semibold mb-4">Stadium Map</h3> */}

            <div className="h-auto mb-6">
                <StadiumMap2D
                    selectedArea={selectedArea}
                    selectedSection={selectedSection}
                    onSectionClick={handleSectionClick}
                    availableTickets={availableTickets}
                />
            </div>

            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stadiumAreas.map((area) => (
          <button
            key={area.id}
            className={`p-3 rounded-lg transition-colors ${
              selectedArea === area.id
                ? `${area.color} text-white font-medium`
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => {
              onAreaClick(area.id);
              setSelectedSection(undefined);
            }}>
            {areaNames[area.id]}
          </button>
        ))}
      </div> */}
        </div>
    );
};

export default StadiumSection;
