// import React, { useEffect, useMemo, useState } from "react";
// import { Card } from "@/components/ui/card";
// import { useToast } from "@/components/ui/use-toast";
// import { MANCHESTER_UNITED_GROUND } from "./Manchester-United";
// import { LIVERPOOL_GROUND } from "./Liverpool";
// import { TOTTENHAM_HOTSPUR_GROUND } from "./Tottenham-Hotspur";
// import { FULHAM_GROUND } from "./Fulham";
// import { NOTTINGHAM_FOREST_GROUND } from "./Nottingham-Forest";
// import { WOLVERHAMPTON_WANDERERS_GROUND } from "./Wolverhampton-Wanderers";
// import { NEWCASTLE_UNITED_GROUND } from "./Newcastle-United";
// import { IPSWICH_GROUND } from "./Ipswich";
// import { BOURNEMOUTH_GROUND } from "./Bournmouth";
// import { CRYSTAL_PALACE_GROUND } from "./Crystal-Palace";
// import { ARSENAL_GROUND } from "./Arsenal";
// import { EVERTON_GROUND } from "./Everton";
// import { MANCHESTER_CITY_GROUND } from "./Manchester-City";
// import { CHELSEA_GROUND } from "./Chelsea";
// import { ASTON_VILLA_GROUND } from "./Aston-Villa";
// import { WEST_HAM_UNITED_GROUND } from "./West-Ham";
// import { BRENTFORD_GROUND } from "./Brentford";
// import { BRIGHTON_GROUND } from "./Brighton";
// import { liverpool_tickets, manchester_united_tickets } from "../Tickets";
// import { BURNLEY_GROUND } from "./Burnley";

// export type SeatSection = {
//     id: string;
//     name: string;
//     type: "rect" | "path" | "polygon" | "circle" | "line";
//     fill: string;

//     textColor?: string;
//     fontSize?: number;
//     // For rectangles
//     x?: number;
//     y?: number;
//     width?: number;
//     height?: number;
//     rx?: number; // For rounded corners
//     // For paths
//     d?: string;
//     // For polygons
//     points?: string;
//     // For text placement in curved sections
//     textX?: number;
//     textY?: number;
//     textRotation?: number;

//     stroke?: string;
//     strokeWidth?: number;
//     strokeLinejoin?: string;
//     cx?: number;
//     cy?: number;
//     r?: number;
//     x1?: number;
//     y1?: number;
//     x2?: number;
//     y2?: number;
// };

// export type StadiumSection = {
//     id: string;
//     name: string;
//     type: 'rect' | 'path' | 'circle' | 'line';
//     x?: number;
//     y?: number;
//     width?: number;
//     height?: number;
//     d?: string;
//     fill: string;
//     textColor: string;
//     fontSize: number;
// };

// // interface StadiumSectionProps {
// //     id: string;
// //     d: string;
// //     fill: string;
// //     stroke?: string;
// //     label?: string;
// //     labelX?: number;
// //     labelY?: number;
// //     area: string;
// //     isSelected?: boolean;
// //     isAvailable?: boolean;
// //     onClick?: (id: string, area: string) => void;
// // }


// interface StadiumMap2DProps {
//     venue: string;
//     selectedArea?: string;
//     selectedSection2?: string | undefined;
//     onSectionClick?: (sectionId: string) => void;
//     // availableTickets?: Ticket[];
// }

// const StadiumMap2D_OldTrafford: React.FC<StadiumMap2DProps> = ({
//     venue,
//     selectedArea,
//     selectedSection2,
//     onSectionClick,
//     // availableTickets = []

// }) => {

//     const { toast } = useToast();
//     const [selectedSection, setSelectedSection] = useState<string | null>(null);

//     // const availableTickets2: Ticket[] = [
//     //     {
//     //         id: 1,
//     //         match: "Manchester United vs Arsenal",
//     //         date: "2025-08-10",
//     //         time: "18:00",
//     //         competition: "Premier League",
//     //         venue: "Old Trafford",
//     //         area: "North Stand",
//     //         section: "M4",
//     //         row: "A",
//     //         price: 120,
//     //         availability: 5,
//     //         togather: 3,
//     //     },
//     //     {
//     //         id: 2,
//     //         match: "Manchester United vs Chelsea",
//     //         date: "2025-08-17",
//     //         time: "20:00",
//     //         competition: "Premier League",
//     //         venue: "Old Trafford",
//     //         area: "South Stand",
//     //         section: "M6",
//     //         row: "B",
//     //         price: 100,
//     //         availability: 2,
//     //         togather: 2,
//     //     },
//     //     {
//     //         id: 3,
//     //         match: "Manchester United vs Liverpool",
//     //         date: "2025-08-24",
//     //         time: "17:30",
//     //         competition: "Premier League",
//     //         venue: "Old Trafford",
//     //         area: "East Stand",
//     //         section: "CE2",
//     //         row: "D",
//     //         price: 150,
//     //         availability: 4,
//     //         togather: 4,
//     //     },
//     //     {
//     //         id: 4,
//     //         match: "Manchester United vs Tottenham",
//     //         date: "2025-08-30",
//     //         time: "16:00",
//     //         competition: "Premier League",
//     //         venue: "Old Trafford",
//     //         area: "West Stand",
//     //         section: "CE3",
//     //         row: "C",
//     //         price: 110,
//     //         availability: 3,
//     //         togather: 2,
//     //     },
//     //     {
//     //         id: 5,
//     //         match: "Manchester United vs Newcastle",
//     //         date: "2025-09-05",
//     //         time: "19:45",
//     //         competition: "Carabao Cup",
//     //         venue: "Old Trafford",
//     //         area: "North-East Stand",
//     //         section: "L9",
//     //         row: "E",
//     //         price: 90,
//     //         availability: 6,
//     //         togather: 5,
//     //     },
//     //     {
//     //         id: 6,
//     //         match: "Manchester United vs Leicester",
//     //         date: "2025-09-12",
//     //         time: "15:00",
//     //         competition: "Premier League",
//     //         venue: "Old Trafford",
//     //         area: "South-East Stand",
//     //         section: "KJ",
//     //         row: "F",
//     //         price: 95,
//     //         availability: 3,
//     //         togather: 1,
//     //     },
//     //     {
//     //         id: 7,
//     //         match: "Manchester United vs Aston Villa",
//     //         date: "2025-09-18",
//     //         time: "14:00",
//     //         competition: "FA Cup",
//     //         venue: "Old Trafford",
//     //         area: "North-West Stand",
//     //         section: "L5",
//     //         row: "G",
//     //         price: 85,
//     //         availability: 4,
//     //         togather: 2,
//     //     },
//     //     {
//     //         id: 8,
//     //         match: "Manchester United vs West Ham",
//     //         date: "2025-09-25",
//     //         time: "21:00",
//     //         competition: "Premier League",
//     //         venue: "Old Trafford",
//     //         area: "South-West Stand",
//     //         section: "AL7",
//     //         row: "H",
//     //         price: 105,
//     //         availability: 2,
//     //         togather: 1,
//     //     },
//     //     {
//     //         id: 9,
//     //         match: "Manchester United vs Brighton",
//     //         date: "2025-10-01",
//     //         time: "19:00",
//     //         competition: "Premier League",
//     //         venue: "Old Trafford",
//     //         area: "East Lower",
//     //         section: "L4",
//     //         row: "J",
//     //         price: 88,
//     //         availability: 5,
//     //         togather: 3,
//     //     },
//     //     {
//     //         id: 10,
//     //         match: "Manchester United vs Crystal Palace",
//     //         date: "2025-10-08",
//     //         time: "16:30",
//     //         competition: "Premier League",
//     //         venue: "Old Trafford",
//     //         area: "East Upper",
//     //         section: "U5",
//     //         row: "K",
//     //         price: 92,
//     //         availability: 3,
//     //         togather: 2,
//     //     },
//     // ];

//     const GROUND_MAP: Record<string, any> = {
//         "Anfield": LIVERPOOL_GROUND,
//         "Old Trafford": MANCHESTER_UNITED_GROUND,
//         "Tottenham Hotspur Stadium": TOTTENHAM_HOTSPUR_GROUND,
//         "Craven Cottage": FULHAM_GROUND,
//         "City Ground": NOTTINGHAM_FOREST_GROUND,
//         "Molineux Stadium": WOLVERHAMPTON_WANDERERS_GROUND,
//         "St James' Park": NEWCASTLE_UNITED_GROUND,
//         "Portman Road": IPSWICH_GROUND,
//         "Vitality Stadium": BOURNEMOUTH_GROUND,
//         "Selhurst Park": CRYSTAL_PALACE_GROUND,
//         "Emirates Stadium": ARSENAL_GROUND,
//         "Goodison Park": EVERTON_GROUND,
//         "Etihad Stadium": MANCHESTER_CITY_GROUND,
//         "Stamford Bridge": CHELSEA_GROUND,
//         "Villa Park": ASTON_VILLA_GROUND,
//         "London Stadium": WEST_HAM_UNITED_GROUND,
//         "Gtech Community Stadium": BRENTFORD_GROUND,
//         "Falmer Stadium": BRIGHTON_GROUND,
//         "Turf Moor": BURNLEY_GROUND,
//         "Wembley Stadium": MANCHESTER_UNITED_GROUND, // Example, replace with actual Wembley ground data
//     };

//     const availableTickets2: Record<string, Ticket[]> = {
//         "Anfield": liverpool_tickets,
//         "Old Trafford": manchester_united_tickets,
//         // "Tottenham Hotspur Stadium": TOTTENHAM_HOTSPUR_GROUND,
//         // "Craven Cottage": FULHAM_GROUND,
//         // "City Ground": NOTTINGHAM_FOREST_GROUND,
//         // "Molineux Stadium": WOLVERHAMPTON_WANDERERS_GROUND,
//         // "St James' Park": NEWCASTLE_UNITED_GROUND,
//         // "Portman Road": IPSWICH_GROUND,
//         // "Vitality Stadium": BOURNEMOUTH_GROUND,
//         // "Selhurst Park": CRYSTAL_PALACE_GROUND,
//         // "Emirates Stadium": ARSENAL_GROUND,
//         // "Goodison Park": EVERTON_GROUND,
//         // "Etihad Stadium": MANCHESTER_CITY_GROUND,
//         // "Stamford Bridge": CHELSEA_GROUND,
//         // "Villa Park": ASTON_VILLA_GROUND,
//         // "London Stadium": WEST_HAM_UNITED_GROUND,
//         // "Gtech Community Stadium": BRENTFORD_GROUND,
//         // "Falmer Stadium": BRIGHTON_GROUND,
//         "Wembley Stadium": manchester_united_tickets, // Example, replace with actual Wembley ground data
//     };

//     // useEffect(() => {
//     //     const sections = GROUND_MAP[venue] ?? null;
//     //     console.log('Sections:', sections);
//     // }, [venue]);

//     // const allSections: SeatSection[] = getGroundByStadiumName(venue);

//     // function getGroundByStadiumName(name: string) {
//     //     console.log("----->", name);
//     //     return GROUND_MAP[name] ?? null;
//     // }

//     const allSections: SeatSection[] = useMemo(() => {
//         console.log("-----> ground length -->", GROUND_MAP[venue].length);
//         return GROUND_MAP[venue] ?? null;
//     }, [venue]);



//     const handleSectionClick = (section: SeatSection) => {
//         if (section == null) {
//             setSelectedSection(null);
//             onSectionClick(null);
//             return;
//         } else {
//             // if (section.id?.toLowerCase().includes("ground"))
//             //     return;
//             // console.log(`Section ${section.id} clicked!`);
//             // setSelectedSection(section.id);
//             // onSectionClick(section.id);
//         }
//         toast({
//             title: `Section ${section.id} selected`,
//             description: "View available tickets for this section",
//         });
//     };

//     return (
//         <Card className="p-4">
//             <h1 className="text-lg font-light text-left mb-2">OLD TRAFFORD STADIUM MAP</h1>
//             <div className="relative w-full overflow-auto" onClick={() => handleSectionClick(null)}>
//                 <svg
//                     viewBox="-100 -40 1300 1100"
//                     style={{ maxWidth: "100%", height: "auto" }}
//                     className="border border-gray-300"
//                 >
//                     {/* Background */}
//                     <rect x="-100" y="-40" width="1300" height="1100" fill="#f8f8f8" />

//                     {/* All seat sections */}
//                     {allSections.map((section) => {
//                         const isAvailable = availableTickets2[venue].some(ticket => ticket.section === section.id || section.id?.toLowerCase().includes("ground"));

//                         const commonProps = {
//                             onClick: isAvailable
//                                 ? (e: React.MouseEvent) => {
//                                     e.stopPropagation(); // prevent background click
//                                     handleSectionClick(section);
//                                 }
//                                 : undefined,
//                             className: isAvailable
//                                 ? "cursor-pointer svg-hover-red transition-colors hover:opacity-75"
//                                 : "opacity-50",
//                         };

//                         if (section.type === "rect") {
//                             return (
//                                 <g key={`${section.id}-${section.x}-${section.y}`} {...commonProps}>

//                                     <rect
//                                         x={section.x}
//                                         y={section.y}
//                                         width={section.width}
//                                         height={section.height}
//                                         rx={section.rx || 0}
//                                         fill={section.fill}
//                                         stroke="#000"
//                                         strokeWidth="0.5"
//                                     />
//                                     {/* <text
//                                         x={section.x + (section.width || 0) / 2}
//                                         y={section.y + (section.height || 0) / 2}
//                                         textAnchor="middle"
//                                         dominantBaseline="middle"
//                                         fill={section.textColor}
//                                         fontSize={section.fontSize || 12}
//                                         fontWeight="bold"
//                                         transform={section.textRotation ? `rotate(${section.textRotation} ${section.x + (section.width || 0) / 2} ${section.y + (section.height || 0) / 2})` : undefined}
//                                         style={{ pointerEvents: "none" }}
//                                     >
//                                         {section.name}
//                                     </text> */}

//                                     <text
//                                         x={section.textX || 0}
//                                         y={section.textY || 0}
//                                         textAnchor="middle"
//                                         dominantBaseline="middle"
//                                         fill={section.textColor}
//                                         fontSize={section.fontSize || 12}
//                                         fontWeight="bold"
//                                         transform={section.textRotation ? `rotate(${section.textRotation} ${section.textX} ${section.textY})` : undefined}
//                                         style={{ pointerEvents: "none" }}
//                                     >
//                                         {/* {section.name} */}
//                                         {section.name.split('\n').map((line, index) => (
//                                             <tspan key={index} x={section.textX} dy={index === 0 ? 0 : '1.2em'}>
//                                                 {line}
//                                             </tspan>
//                                         ))}
//                                     </text>



//                                 </g>
//                             );
//                         } else if (section.type === "path") {
//                             return (
//                                 <g key={`${section.id}-path`} {...commonProps}>
//                                     <path
//                                         d={section.d}
//                                         stroke={section.stroke || "#000"}
//                                         strokeWidth={section.strokeWidth || 0.5}
//                                         fill={
//                                             selectedSection === section.id
//                                                 ? "#e4032f"
//                                                 : (availableTickets.some(ticket => ticket.section === section.id)
//                                                     ? "#123458"
//                                                     : section.fill)
//                                         }

//                                     />
//                                     <text
//                                         x={section.textX || 0}
//                                         y={section.textY || 0}
//                                         textAnchor="middle"
//                                         dominantBaseline="middle"
//                                         fill={section.textColor}
//                                         fontSize={section.fontSize || 12}
//                                         fontWeight="bold"
//                                         transform={section.textRotation ? `rotate(${section.textRotation} ${section.textX} ${section.textY})` : undefined}
//                                         style={{ pointerEvents: "none" }}
//                                     >
//                                         {section.name}
//                                     </text>
//                                 </g>
//                             );
//                         } else if (section.type === "polygon") {
//                             return (
//                                 <g key={`${section.id}-polygon`} {...commonProps}>
//                                     <polygon
//                                         points={section.points}
//                                         fill={section.fill}
//                                         stroke="#000"
//                                         strokeWidth="0.5"
//                                     />
//                                     <text
//                                         x={section.textX || 0}
//                                         y={section.textY || 0}
//                                         textAnchor="middle"
//                                         dominantBaseline="middle"
//                                         fill={section.textColor}
//                                         fontSize={section.fontSize || 12}
//                                         fontWeight="bold"
//                                         style={{ pointerEvents: "none" }}
//                                     >
//                                         {section.name}
//                                     </text>
//                                 </g>
//                             );
//                         }
//                         return null;
//                     })}
//                 </svg>
//             </div>

//             {/* <div className="mt-4">
//                 {selectedSection ? (
//                     <p className="text-center text-md font-medium">
//                         Selected section: <span className="font-bold">{selectedSection}</span> -
//                         <span className="text-blue-600 underline cursor-pointer ml-2">View available tickets</span>
//                     </p>
//                 ) : (
//                     <p className="text-sm text-gray-500 text-center">
//                         Select a section to view available seats
//                     </p>
//                 )}
//             </div> */}
//         </Card>
//     );
// };

// export default StadiumMap2D_OldTrafford;