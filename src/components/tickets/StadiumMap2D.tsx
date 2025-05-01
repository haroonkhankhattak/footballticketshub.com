import React from "react";
import { MapPinned, Info } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

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
    id: string;
    d: string;
    fill: string;
    stroke?: string;
    label?: string;
    labelX?: number;
    labelY?: number;
    area: string;
    isSelected?: boolean;
    isAvailable?: boolean;
    onClick?: (id: string, area: string) => void;
}

interface StadiumMap2DProps {
    selectedArea?: string;
    selectedSection?: string | undefined;
    onSectionClick?: (sectionId: string) => void;
    availableTickets?: Ticket[];
}

const StadiumSection: React.FC<StadiumSectionProps> = ({
    id,
    d,
    fill,
    stroke = "white",
    label,
    labelX,
    labelY,
    area,
    isSelected,
    isAvailable,
    onClick,
}) => {
    const handleClick = () => {
        if (onClick) onClick(id, area);
    };

    // Determine the appropriate fill color
    let fillColor = fill;
    if (isSelected) {
        fillColor = "#fcd4d4"; // Purple for selected
        fillColor = isAvailable ? "#123458" : "#d4e8fc";
    } else if (isAvailable) {
        // Darken the original color for available sections
        const colorMap: Record<string, string> = {
            "#d4e8fc": "#2980b9",
        };
        fillColor = colorMap[fill] || "#444"; // Default darkened color if not in map
    }

    return (
        <g className="cursor-pointer" onClick={handleClick}>
            <path
                id={id}
                d={d}
                fill={fillColor}
                stroke={stroke}
                strokeWidth={isSelected ? "2" : "1"}
                className={`transition-all duration-200 ${isSelected ? "opacity-100" : "opacity-85"
                    } hover:opacity-30`}
            />
            {label && labelX && labelY && (
                <text
                    x={labelX}
                    y={labelY}
                    fontSize="16"
                    fontFamily="Arial"
                    fill={isAvailable ? "white" : "#333"}
                    fontWeight="bold"
                    textAnchor="middle"
                    className="pointer-events-none">
                    {label}
                </text>
            )}
        </g>
    );
};

const StadiumMap2D: React.FC<StadiumMap2DProps> = ({
    selectedArea,
    selectedSection,
    onSectionClick,
    availableTickets = [], // Default to empty array if not provided
}) => {
    // Define stadium areas with their respective colors
    const areaColors = {
        "main-stand": "#d4e8fc", // Main Stand (Blue)
        "anfield-road": "#d4e8fc", // Anfield Road (Red)
        "sir-kenny-dalglish": "#d4e8fc", // Sir Kenny Dalglish Stand (Green)
        kop: "#d4e8fc", // The Kop (Yellow)
        "the-kop": "#d4e8fc", // Alternative name for The Kop (Yellow)
    };

    // Create a set of available sections for faster lookup
    const availableSections = new Set(
        availableTickets.map((ticket) => ticket.section)
    );

    // Define sections for each area
    const mainStandSections = [
        { id: "M1", d: "M257 779H190V816H257V779Z", labelX: 223, labelY: 803 },
        { id: "M2", d: "M331 779H263V816H331V779Z", labelX: 297, labelY: 803 },
        { id: "M3", d: "M405 779H337V816H405V779Z", labelX: 371, labelY: 803 },
        { id: "M4", d: "M479 779H411V816H479V779Z", labelX: 445, labelY: 803 },
        { id: "M5", d: "M553 779H485V816H553V779Z", labelX: 519, labelY: 803 },
        { id: "M6", d: "M627 779H559V816H627V779Z", labelX: 593, labelY: 803 },
        { id: "M7", d: "M701 779H633V816H701V779Z", labelX: 667, labelY: 803 },
        { id: "M8", d: "M775 779H707V816H775V779Z", labelX: 741, labelY: 803 },
        { id: "M9", d: "M849 779H781V816H849V779Z", labelX: 815, labelY: 803 },
        { id: "L1", d: "M190 736H241V677L190 710V736Z", labelX: 215, labelY: 714 },
        {
            id: "L2",
            d: "M243 736H276V723.947H308V664.947H275V671H252L243 676V736Z",
            labelX: 275,
            labelY: 714,
        },
        { id: "L3", d: "M374 665L310 665V724H374V665Z", labelX: 342, labelY: 714 },
        {
            id: "L4",
            d: "M441.948 665H376V724H442L441.948 665Z",
            labelX: 409,
            labelY: 714,
        },
        {
            id: "L5",
            d: "M444 665V724H518V704.055H509.002V675H495V665H444Z",
            labelX: 481,
            labelY: 714,
        },
        {
            id: "L6",
            d: "M520 724H591.942V665H544.028V675.045H529.046V704H520.027L520 724Z",
            labelX: 555,
            labelY: 714,
        },
        {
            id: "L7",
            d: "M593.997 665V724H662V665H593.997Z",
            labelX: 628,
            labelY: 714,
        },
        { id: "L8", d: "M664 665V724H728V665H664Z", labelX: 696, labelY: 714 },
        {
            id: "L9",
            d: "M730 665H760V671H782L793 685V736H759V724H730V665Z",
            labelX: 763,
            labelY: 714,
        },
        { id: "L10", d: "M795 687V736H856V687H795Z", labelX: 825, labelY: 714 },
        {
            id: "U1",
            d: "M188 830H277V892H255.669L188 855.125V830Z",
            labelX: 232,
            labelY: 874,
        },
        { id: "U2", d: "M280 830H347V892H280V830Z", labelX: 313, labelY: 874 },
        {
            id: "U3",
            d: "M350 830V892H418V845H398V830H350Z",
            labelX: 384,
            labelY: 874,
        },
        { id: "U4", d: "M487 845H421V892H487V845Z", labelX: 454, labelY: 874 },
        { id: "U5", d: "M558 845H490V892H558V845Z", labelX: 524, labelY: 874 },
        { id: "U6", d: "M627 845H561V892H627V845Z", labelX: 594, labelY: 874 },
        {
            id: "U7",
            d: "M629.954 845V892H693V830H654V845H629.954Z",
            labelX: 661,
            labelY: 874,
        },
        { id: "U8", d: "M696 830V892H760V830H696Z", labelX: 728, labelY: 874 },
        {
            id: "U9",
            d: "M763 830V892H785.45L850 852.326V830H763Z",
            labelX: 806,
            labelY: 874,
        },
    ];

    const kopSections = [
        {
            id: "102",
            d: "M881 617V673H857.525L839.701 629.95H814L814 617H881Z",
            labelX: 847,
            labelY: 650,
        },
        { id: "103", d: "M900 542H814V615H900V542Z", labelX: 857, labelY: 584 },
        { id: "104", d: "M900 467H814V540H900V467Z", labelX: 857, labelY: 509 },
        { id: "105", d: "M900 392H814V465H900V392Z", labelX: 857, labelY: 432 },
        { id: "106", d: "M900 318H814V390H900V318Z", labelX: 857, labelY: 359 },
        { id: "107", d: "M900 243H814V316H900V243Z", labelX: 857, labelY: 285 },
        {
            id: "108",
            d: "M814 241H879V202H849V228H814V241Z",
            labelX: 857,
            labelY: 225,
        },
        {
            id: "109",
            d: "M879 200H849.025V172H828V156H879V200Z",
            labelX: 857,
            labelY: 182,
        },
        { id: "202", d: "M968 617H883V690H968V617Z", labelX: 925, labelY: 659 },
        { id: "203", d: "M987 542H902V615H987V542Z", labelX: 944, labelY: 584 },
        { id: "204", d: "M947 467H902V540H947V467Z", labelX: 924, labelY: 508 },
        { id: "205", d: "M947 392H902V465H947V392Z", labelX: 924, labelY: 432 },
        { id: "206", d: "M947 318H902V390H947V318Z", labelX: 924, labelY: 359 },
        { id: "207", d: "M987 243H902V316H987V243Z", labelX: 944, labelY: 285 },
        { id: "208", d: "M966 166H881V241H966V166Z", labelX: 923, labelY: 207 },
        { id: "304", d: "M1007 467H949V540H1007V467Z", labelX: 978, labelY: 509 },
        { id: "305", d: "M1007 392H949V465H1007V392Z", labelX: 978, labelY: 432 },
        { id: "306", d: "M1007 318H949V390H1007V318Z", labelX: 978, labelY: 359 },
    ];

    const kennySections = [
        { id: "KG", d: "M261 129H234V201H261V129Z", labelX: 248, labelY: 173 },
        {
            id: "KH",
            d: "M279 129V140H340V201H263V129H279Z",
            labelX: 300,
            labelY: 173,
        },
        { id: "KI", d: "M412 140H342V201H412V140Z", labelX: 377, labelY: 173 },
        { id: "KJ", d: "M497 140H414V201H497V140Z", labelX: 455, labelY: 173 },
        { id: "KK", d: "M569 140H499V201H569V140Z", labelX: 534, labelY: 173 },
        { id: "KL", d: "M640 140H571V201H640V140Z", labelX: 605, labelY: 173 },
        { id: "KM", d: "M719 140H642V201H719V140Z", labelX: 680, labelY: 173 },
        {
            id: "KN",
            d: "M786 129V201H721V140H777L777.034 129H786Z",
            labelX: 753,
            labelY: 173,
        },
        { id: "KP", d: "M813 129H788V201H813V129Z", labelX: 800, labelY: 173 },
        { id: "CE1", d: "M261 43H234V99H261V43Z", labelX: 248, labelY: 71 },
        { id: "CE2", d: "M340 43H263V99H340V43Z", labelX: 301, labelY: 71 },
        { id: "CE3", d: "M418 43H342V99H418V43Z", labelX: 380, labelY: 71 },
        { id: "CE4", d: "M485 43H420V99H485V43Z", labelX: 452, labelY: 71 },
        { id: "CE5", d: "M562 43H487V99H562V43Z", labelX: 524, labelY: 71 },
        { id: "CE6", d: "M638 43H564V99H638V43Z", labelX: 601, labelY: 71 },
        { id: "CE7", d: "M715 43H640V99H715V43Z", labelX: 677, labelY: 71 },
        { id: "CE8", d: "M788 43H717V99H788V43Z", labelX: 752, labelY: 71 },
        { id: "CE9", d: "M819 43H790V99H819V43Z", labelX: 804, labelY: 71 },
    ];

    const anfieldRoadSections = [
        {
            id: "AL1",
            d: "M183 166.443V196.57L192.5 205.57V232H226V166.443H183Z",
            labelX: 204,
            labelY: 200,
        },
        {
            id: "AL2",
            d: "M147 166.443V232H190.5V206.43L181 197.43V166.443H147Z",
            labelX: 168,
            labelY: 200,
        },
        {
            id: "AL3",
            d: "M147 234V295H232V247.5H226V234H147Z",
            labelX: 189,
            labelY: 269,
        },
        { id: "AL4", d: "M147 297V351H232V297H147Z", labelX: 189, labelY: 328 },
        { id: "AL5", d: "M147 417H232V353H147V417Z", labelX: 189, labelY: 389 },
        { id: "AL6", d: "M147 486H232V419H147V486Z", labelX: 189, labelY: 457 },
        {
            id: "AL7",
            d: "M147 550H226V525H232V488H147V550Z",
            labelX: 189,
            labelY: 523,
        },
        {
            id: "AL8",
            d: "M147 604H209V633.047L226 607.512V552H147V604Z",
            labelX: 186,
            labelY: 582,
        },
        {
            id: "AL9",
            d: "M147 683.038H188.392V664L207 636.051V606H147V683.038Z",
            labelX: 177,
            labelY: 644,
        },
        {
            id: "AU1",
            d: "M106 223V162.552L59.2151 158L37 218V223H106Z",
            labelX: 71,
            labelY: 196,
        },
        { id: "AU2", d: "M106 290V225H37V290H106Z", labelX: 71, labelY: 263 },
        { id: "AU3", d: "M106 357V292H37V357H106Z", labelX: 71, labelY: 330 },
        { id: "AU4", d: "M106 424V359H37V424H106Z", labelX: 71, labelY: 397 },
        { id: "AU5", d: "M106 491V426H37V491H106Z", labelX: 71, labelY: 464 },
        { id: "AU6", d: "M106 558V493H37V558H106Z", labelX: 71, labelY: 531 },
        { id: "AU7", d: "M106 625V560H37V625H106Z", labelX: 71, labelY: 598 },
        {
            id: "AU8",
            d: "M106 687.63V627H37V632L59.2151 693L106 687.63Z",
            labelX: 71,
            labelY: 659,
        },
    ];

    // Construct the pitch and stands
    const pitch = "M777 254H269V609H777V254Z";
    const pitchOutline = "M767 264H279V599H767V264Z";
    const pitchCenterLine = "M523 265V598";
    const pitchCenterCircle =
        "M522.926 472.553C546.302 472.553 565.252 453.735 565.252 430.521C565.252 407.307 546.302 388.488 522.926 388.488C499.551 388.488 480.601 407.307 480.601 430.521C480.601 453.735 499.551 472.553 522.926 472.553Z";
    const pitchPenaltyLeft = "M360 335H279V525H360V335Z";
    const pitchPenaltyGoalLeft = "M313 383H279V478H313V383Z";
    const pitchPenaltyRight = "M767 335H682V525H767V335Z";
    const pitchPenaltyGoalRight = "M767 383H732V478H767V383Z";

    const handleSectionClick = (sectionId: string, areaId: string) => {
        if (onSectionClick) {
            onSectionClick(sectionId);
            console.log(`Selected section: ${sectionId} in area: ${areaId}`);
        }
    };

    return (
        <div className="bg-white rounded-lg border p-6 shadow-sm overflow-hidden transition transform">
            <div className="flex items-center mb-4 pb-4">
                <h3 className="text-lg font-semibold flex items-center">
                    {/* <Ticket className="mr-2 h-5 w-5 text-primary" /> */}
                    <MapPinned className="mr-2 h-5 w-5 text-ticket-darkgray" />
                    Stadium Map
                </h3>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className="ml-4 text-gray-400 hover:text-gray-600">
                            <Info className="h-5 w-5" />
                        </TooltipTrigger>
                        <TooltipContent
                            side="bottom"
                            className="bg-white p-3 shadow-lg rounded-lg border max-w-xs"
                        >
                            <p className="text-sm text-gray-700">
                                Click on a section to see available tickets. Hover over
                                different areas to explore the stadium.
                                <br />
                                <br />
                                <span className="font-semibold">Darker sections</span> indicate
                                available tickets.
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>


            <div className="relative w-full" style={{ paddingTop: "85%" }}>
                <svg
                    viewBox="0 0 1040 933"
                    fill="none"
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ maxHeight: "600px" }}>
                    {/* Pitch and field elements */}
                    <g className="extras">
                        <g className="extra">
                            <path
                                className="extra"
                                d="M777 254H269V609H777V254Z"
                                fill="#999997"
                                stroke="white"
                                strokeWidth="1.72727"></path>
                            <path
                                className="extra"
                                d="M767 264H279V599H767V264Z"
                                stroke="white"
                                strokeWidth="1.72727"></path>
                            <path
                                className="extra"
                                d="M523 265V598"
                                stroke="white"
                                strokeWidth="1.72727"
                                strokeLinecap="square"></path>
                            <path
                                className="extra"
                                d="M522.926 472.553C546.302 472.553 565.252 453.735 565.252 430.521C565.252 407.307 546.302 388.488 522.926 388.488C499.551 388.488 480.601 407.307 480.601 430.521C480.601 453.735 499.551 472.553 522.926 472.553Z"
                                stroke="white"
                                strokeWidth="1.72727"></path>
                            <path
                                className="extra"
                                d="M360 335H279V525H360V335Z"
                                stroke="white"
                                strokeWidth="1.72727"></path>
                            <path
                                className="extra"
                                d="M313 383H279V478H313V383Z"
                                stroke="white"
                                strokeWidth="1.72727"></path>
                            <path
                                className="extra"
                                d="M767 335H682V525H767V335Z"
                                stroke="white"
                                strokeWidth="1.72727"></path>
                            <path
                                className="extra"
                                d="M767 383H732V478H767V383Z"
                                stroke="white"
                                strokeWidth="1.72727"></path>
                        </g>

                        {/* Stadium names */}
                        <text
                            className="stand-name"
                            fill="black"
                            fontFamily="Arial"
                            fontSize="24"
                            fontWeight="bold"
                            x="446"
                            y="926">
                            MAIN STAND
                        </text>
                        <text
                            className="stand-name"
                            transform="translate(1039 275) rotate(90)"
                            fill="black"
                            fontFamily="Arial"
                            fontSize="24"
                            fontWeight="bold"
                            x="102"
                            y="18">
                            THE KOP
                        </text>
                        <text
                            className="stand-name"
                            transform="translate(2 580) rotate(-90)"
                            fill="black"
                            fontFamily="Arial"
                            fontSize="24"
                            fontWeight="bold"
                            x="20"
                            y="18">
                            ANFIELD ROAD STAND
                        </text>
                        <text
                            className="stand-name"
                            fill="black"
                            fontFamily="Arial"
                            fontSize="24"
                            fontWeight="bold"
                            x="377"
                            y="24">
                            KENNY DALGLISH STAND
                        </text>
                    </g>

                    {/* Main Stand Sections */}
                    <g className="stand-sections">
                        {mainStandSections.map((section) => (
                            <StadiumSection
                                key={section.id}
                                id={section.id}
                                d={section.d}
                                fill={areaColors["main-stand"]}
                                label={section.id}
                                labelX={section.labelX}
                                labelY={section.labelY}
                                area="main-stand"
                                isSelected={selectedSection === section.id}
                                isAvailable={availableSections.has(section.id)}
                                onClick={handleSectionClick}
                            />
                        ))}
                    </g>

                    {/* The Kop Sections */}
                    <g className="stand-sections">
                        {kopSections.map((section) => (
                            <StadiumSection
                                key={section.id}
                                id={section.id}
                                d={section.d}
                                fill={areaColors["kop"]}
                                label={section.id}
                                labelX={section.labelX}
                                labelY={section.labelY}
                                area="kop"
                                isSelected={selectedSection === section.id}
                                isAvailable={availableSections.has(section.id)}
                                onClick={handleSectionClick}
                            />
                        ))}
                    </g>

                    {/* Kenny Dalglish Stand Sections */}
                    <g className="stand-sections">
                        {kennySections.map((section) => (
                            <StadiumSection
                                key={section.id}
                                id={section.id}
                                d={section.d}
                                fill={areaColors["sir-kenny-dalglish"]}
                                label={section.id}
                                labelX={section.labelX}
                                labelY={section.labelY}
                                area="sir-kenny-dalglish"
                                isSelected={selectedSection === section.id}
                                isAvailable={availableSections.has(section.id)}
                                onClick={handleSectionClick}
                            />
                        ))}
                    </g>

                    {/* Anfield Road Stand Sections */}
                    <g className="stand-sections">
                        {anfieldRoadSections.map((section) => (
                            <StadiumSection
                                key={section.id}
                                id={section.id}
                                d={section.d}
                                fill={areaColors["anfield-road"]}
                                label={section.id}
                                labelX={section.labelX}
                                labelY={section.labelY}
                                area="anfield-road"
                                isSelected={selectedSection === section.id}
                                isAvailable={availableSections.has(section.id)}
                                onClick={handleSectionClick}
                            />
                        ))}
                    </g>
                </svg>
            </div>

            <div className="mt-4 text-sm text-gray-500 italic">
                Click on a section to view available tickets
            </div>
        </div>
    );
};

export default StadiumMap2D;
