import React, { useState } from "react";
import StadiumMap2D from "./StadiumMap2D";
import { Listing } from "../../pages/tickets/listing";

interface StadiumSectionProps {
  venue: string;
  selectedArea: string;
  onAreaClick: (area: string) => void;
  availableListing?: Listing[];
}

const StadiumSection: React.FC<StadiumSectionProps> = ({
  venue,
  selectedArea,
  onAreaClick,
  availableListing,
}) => {
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    undefined
  );


  const handleSectionClick = (sectionId: string) => {
    setSelectedSection(sectionId);
    console.log(`Selected section: ${sectionId}`);
    onAreaClick(sectionId);
  };

  return (
    <div className="bg-white rounded-lg p-0 mb-4">
      {/* <h3 className="text-lg font-semibold mb-4">Stadium Map</h3> */}

      <div className="h-auto mb-0">

        <StadiumMap2D venue={venue}
          selectedArea={selectedArea}
          selectedSection2={selectedSection}
          onSectionClick={handleSectionClick}
          availableListing={availableListing}
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
