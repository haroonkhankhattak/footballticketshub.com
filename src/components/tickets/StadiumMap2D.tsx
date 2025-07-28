
import React, { useMemo, useRef, useState } from "react";
import { Card } from "../../components/ui/card";
import { useToast } from "../../components/ui/use-toast";
import { MANCHESTER_UNITED_GROUND } from "./grounds/Manchester-United";
import { LIVERPOOL_GROUND } from "./grounds/Liverpool";
import { TOTTENHAM_HOTSPUR_GROUND } from "./grounds/Tottenham-Hotspur";
import { FULHAM_GROUND } from "./grounds/Fulham";
import { NOTTINGHAM_FOREST_GROUND } from "./grounds/Nottingham-Forest";
import { WOLVERHAMPTON_WANDERERS_GROUND } from "./grounds/Wolverhampton-Wanderers";
import { NEWCASTLE_UNITED_GROUND } from "./grounds/Newcastle-United";
import { IPSWICH_GROUND } from "./grounds/Ipswich";
import { BOURNEMOUTH_GROUND } from "./grounds/Bournmouth";
import { CRYSTAL_PALACE_GROUND } from "./grounds/Crystal-Palace";
import { ARSENAL_GROUND } from "./grounds/Arsenal";
import { EVERTON_GROUND } from "./grounds/Everton";
import { MANCHESTER_CITY_GROUND } from "./grounds/Manchester-City";
import { CHELSEA_GROUND } from "./grounds/Chelsea";
import { ASTON_VILLA_GROUND } from "./grounds/Aston-Villa";
import { WEST_HAM_UNITED_GROUND } from "./grounds/West-Ham";
import { BRENTFORD_GROUND } from "./grounds/Brentford";
import { BRIGHTON_GROUND } from "./grounds/Brighton";
import { getStadiumInfoByVenueName } from "./grounds/grounds";
import { BURNLEY_GROUND } from "./grounds/Burnley";
import { LEEDS_UNITED_GROUND } from "./grounds/Leeds-United";
import { SUNDERLAND_GROUND } from "./grounds/Sunderland";
import { StadiumDescription } from "./StadiumDescription";
import { Listing } from "../../pages/tickets/listing";

// import { StadiumDescription } from "./StadiumDescription"

export type SeatSection = {
    id: string;
    name: string;
    type: "rect" | "path" | "polygon" | "circle" | "line" | "ground";
    fill: string;

    textColor?: string;
    fontSize?: number;
    // For rectangles
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    rx?: number; // For rounded corners
    // For paths
    d?: string;
    // For polygons
    points?: string;
    // For text placement in curved sections
    textX?: number;
    textY?: number;
    textRotation?: number;

    stroke?: string;
    strokeWidth?: number;
    strokeLinejoin?: string;
    cx?: number;
    cy?: number;
    r?: number;
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;
    multilineName?: boolean,
};

export type StadiumSection = {
    id: string;
    name: string;
    type: 'rect' | 'path' | 'circle' | 'line';
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    d?: string;
    fill: string;
    textColor: string;
    fontSize: number;
};



interface StadiumMap2DProps {
    venue: string;
    selectedArea?: string;
    selectedSection2?: string | undefined;
    onSectionClick?: (sectionId: string) => void;
    availableListing?: Listing[];
}

const StadiumMap2D: React.FC<StadiumMap2DProps> = ({
    venue,
    selectedArea,
    selectedSection2,
    onSectionClick,
    availableListing = [] }) => {

    const [zoom, setZoom] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const isDragging = useRef(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const offsetStart = useRef({ x: 0, y: 0 });

    const { toast } = useToast();
    const [selectedSection, setSelectedSection] = useState<string | null>(null);

    const GROUND_MAP: Record<string, any> = {
        "Anfield": LIVERPOOL_GROUND,
        "Old Trafford": MANCHESTER_UNITED_GROUND,
        "Tottenham Hotspur Stadium": TOTTENHAM_HOTSPUR_GROUND,
        "Craven Cottage": FULHAM_GROUND,
        "The City Ground": NOTTINGHAM_FOREST_GROUND,
        "Molineux Stadium": WOLVERHAMPTON_WANDERERS_GROUND,
        "St James’ Park": NEWCASTLE_UNITED_GROUND,
        "Portman Road": IPSWICH_GROUND,
        "Vitality Stadium": BOURNEMOUTH_GROUND,
        "Selhurst Park": CRYSTAL_PALACE_GROUND,
        "Emirates Stadium": ARSENAL_GROUND,
        "Hill Dickinson Stadium": EVERTON_GROUND,
        "Etihad Stadium": MANCHESTER_CITY_GROUND,
        "Stamford Bridge": CHELSEA_GROUND,
        "Villa Park": ASTON_VILLA_GROUND,
        "London Stadium": WEST_HAM_UNITED_GROUND,
        "Gtech Community Stadium": BRENTFORD_GROUND,
        "American Express Stadium": BRIGHTON_GROUND,
        "Turf Moor": BURNLEY_GROUND,
        "Elland Road": LEEDS_UNITED_GROUND,
        "Stadium of Light": SUNDERLAND_GROUND,
    };


    const allSections: SeatSection[] = useMemo(() => {
        return GROUND_MAP[venue] ?? null;
    }, [venue]);


    const stadiumInfo = getStadiumInfoByVenueName(venue);


    const handleSectionClick = (sectionId: string) => {
        if (sectionId == null) {
            setSelectedSection(null);
            onSectionClick(null);
            return;
        } else {
            if (sectionId?.toLowerCase().includes("ground"))
                return;
            setSelectedSection(sectionId);
            onSectionClick(sectionId);

            const section = availableListing.find(ticket => ticket.section_id === sectionId);
            const sectionName = section ? section.section_name : null;
            toast({
                title: `Section ${sectionName} selected`,
                description: "View available tickets for this section",
            });
        }

    };

    const handleWheelZoom = (e: React.WheelEvent<SVGSVGElement>) => {
        e.preventDefault();

        const svg = e.currentTarget;
        const rect = svg.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const svgX = (mouseX - offset.x) / zoom;
        const svgY = (mouseY - offset.y) / zoom;

        const zoomStep = 0.02; // 👈 slower zoom
        const delta = e.deltaY > 0 ? -zoomStep : zoomStep;

        const newZoom = Math.min(3, Math.max(1, zoom + delta));

        const newOffsetX = mouseX - svgX * newZoom;
        const newOffsetY = mouseY - svgY * newZoom;

        setZoom(newZoom);
        setOffset({ x: newOffsetX, y: newOffsetY });
    };

    const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
        isDragging.current = true;
        dragStart.current = { x: e.clientX, y: e.clientY };
        offsetStart.current = { ...offset };
    };

    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
        if (!isDragging.current) return;

        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;

        setOffset({
            x: offsetStart.current.x + dx,
            y: offsetStart.current.y + dy,
        });
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const handleMouseLeave = () => {
        isDragging.current = false;
    };



    return (
        <main>
            <div className="w-full">
                <Card className="p-2">
                    <h1 className="text-lg font-light text-left mb-2">{venue}</h1>
                    {/* <div className="flex gap-2 mb-4">
                        <button onClick={() => setZoom(prev => Math.max(0.5, prev - 0.1))} className="px-2 py-1 bg-gray-200 rounded">−</button>
                        <button onClick={() => setZoom(prev => Math.min(2, prev + 0.1))} className="px-2 py-1 bg-gray-200 rounded">+</button>
                    </div> */}

                    <div className="relative w-full overflow-auto" onClick={() => handleSectionClick(null)}>
                        <svg
                            viewBox="-100 -40 1300 1100"
                            style={{ maxWidth: "100%", height: "auto" }}
                            className="border border-gray-300"
                            onWheel={handleWheelZoom}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseLeave}
                        >
                            {/* Background */}
                            <rect x="-100" y="-40" width="1300" height="1100" fill="#f8f8f8" />

                            <g transform={`translate(${offset.x}, ${offset.y}) scale(${zoom})`}>

                                {/* All seat sections */}
                                {allSections.map((section) => {
                                    const isAvailable = availableListing.some(ticket => ticket.section_id === section.id || section.id?.toLowerCase().includes("ground"));

                                    const commonProps = {
                                        onClick: isAvailable
                                            ? (e: React.MouseEvent) => {
                                                e.stopPropagation();
                                                handleSectionClick(section.id);
                                            }
                                            : undefined,
                                        className: isAvailable
                                            ? "cursor-pointer svg-hover-red transition-colors hover:opacity-75"
                                            : "opacity-50",
                                    };

                                    if (section.type === "rect") {
                                        return (
                                            <g key={`${section.id}-${section.x}-${section.y}`} {...commonProps}>

                                                <rect
                                                    x={section.x}
                                                    y={section.y}
                                                    width={section.width}
                                                    height={section.height}
                                                    rx={section.rx || 0}
                                                    fill={
                                                        String(selectedSection) === String(section.id)
                                                            ? "#e4032f"
                                                            : (availableListing.some(ticket => ticket.section_id === section.id)
                                                                ? "#123458"
                                                                : section.fill)
                                                    }
                                                    stroke="#000"
                                                    strokeWidth="0.5"
                                                />

                                                <text
                                                    x={section.textX || 0}
                                                    y={section.textY || 0}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                    fill={section.textColor}
                                                    fontSize={section.fontSize || 12}
                                                    fontWeight="bold"
                                                    transform={section.textRotation ? `rotate(${section.textRotation} ${section.textX} ${section.textY})` : undefined}
                                                    style={{ pointerEvents: "none", userSelect: "none" }}

                                                >
                                                    {/* {section.name} */}
                                                    {/* {section.name.split('\n').map((line, index) => (
                                                        <tspan key={index} x={section.textX} dy={index === 0 ? 0 : '1.2em'}>
                                                            {line}
                                                        </tspan>
                                                    ))} */}

                                                    {section.multilineName
                                                        ? section.name.trim().split(/\s+/).map((word, index) => (
                                                            <tspan
                                                                key={index}
                                                                x={section.textX || 0}
                                                                dy={index === 0 ? 0 : `${section.fontSize || 12}px`}
                                                            >
                                                                {word}
                                                            </tspan>
                                                        ))
                                                        : section.name}
                                                </text>

                                            </g>
                                        );
                                    } else if (section.type === "path") {
                                        return (
                                            <g key={`${section.id}-path`} {...commonProps}>
                                                <path
                                                    d={section.d}
                                                    stroke={section.stroke || "#000"}
                                                    strokeWidth={section.strokeWidth || 0.5}
                                                    fill={
                                                        String(selectedSection) === String(section.id)
                                                            ? "#e4032f"
                                                            : (availableListing.some(ticket => ticket.section_id === section.id)
                                                                ? "#123458"
                                                                : section.fill)
                                                    }


                                                />
                                                <text
                                                    x={section.textX || 0}
                                                    y={section.textY || 0}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                    fill={section.textColor}
                                                    fontSize={section.fontSize || 12}
                                                    fontWeight="bold"
                                                    transform={section.textRotation ? `rotate(${section.textRotation} ${section.textX} ${section.textY})` : undefined}
                                                    style={{ pointerEvents: "none", userSelect: "none" }}
                                                >
                                                    {/* {section.name} */}
                                                    {section.multilineName
                                                        ? section.name.trim().split(/\s+/).map((word, index) => (
                                                            <tspan
                                                                key={index}
                                                                x={section.textX || 0}
                                                                dy={index === 0 ? 0 : `${section.fontSize || 12}px`}
                                                            >
                                                                {word}
                                                            </tspan>
                                                        ))
                                                        : section.name}

                                                </text>
                                            </g>
                                        );
                                    } else if (section.type === "polygon") {
                                        return (
                                            <g key={`${section.id}-polygon`} {...commonProps}>
                                                <polygon
                                                    points={section.points}
                                                    fill={section.fill}
                                                    stroke="#000"
                                                    strokeWidth="0.5"
                                                />
                                                <text
                                                    x={section.textX || 0}
                                                    y={section.textY || 0}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                    fill={section.textColor}
                                                    fontSize={section.fontSize || 12}
                                                    fontWeight="bold"
                                                    style={{ pointerEvents: "none", userSelect: "none" }}

                                                >
                                                    {section.name}
                                                </text>
                                            </g>
                                        );
                                    } else if (section.type === "ground") {
                                        return (
                                            <g key={`${section.id}-path`}>
                                                <path
                                                    d={section.d}
                                                    stroke={section.stroke || "#000"}
                                                    strokeWidth={section.strokeWidth || 0.5}
                                                    fill={section.fill}
                                                />
                                            </g>
                                        );
                                    }
                                    return null;
                                })}
                            </g>

                        </svg>
                    </div>

                    <div className="flex items-center flex-wrap gap-2 sm:gap-4 mt-2 sm:mt-4">
                        {/* Available Seats */}
                        <div className="flex items-center gap-1 sm:gap-2">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#123458] rounded-sm" />
                            <span className="text-black text-[10px] sm:text-[13px]">Available Seats</span>
                        </div>

                        {/* Not-Available Seats */}
                        <div className="flex items-center gap-1 sm:gap-2">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#123458] opacity-50 rounded-sm" />
                            <span className="text-black text-[10px] sm:text-[13px]">Not-Available Seats</span>
                        </div>

                        {/* Selected Seats */}
                        <div className="flex items-center gap-1 sm:gap-2">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#e4032f] rounded-sm" />
                            <span className="text-black text-[10px] sm:text-[13px]">Selected Seats</span>
                        </div>
                    </div>


                </Card>
            </div >
            <div className="p-4 text-center lg:p-6">
                {/* Display the stadium title if available, otherwise a generic title */}
                {/* <h1 className="font-dosis text-ltg-black text-xl font-medium  capitalize lg:text-[22px] lg:leading-[30px] pb-4">
                    {stadiumInfo ? stadiumInfo.title : `${venue} Tickets`}
                </h1> */}

                {/* Display the stadium description if available, with specified styling */}
                <StadiumDescription stadiumInfo={stadiumInfo} venue={venue} />

                {/* <div className="mt-0 mb-0 font-light max-lg:text-center text-justify text-gray-500">
                    {stadiumInfo ? (
                        stadiumInfo.description
                    ) : (
                        <>
                            Information for <strong>{venue}</strong> is currently unavailable.
                            Tickets for events at this venue are highly sought after.
                            Grab this opportunity to watch exciting events live in action.
                        </>
                    )}
                </div> */}
            </div>
        </main >
    );
};

export default StadiumMap2D;
