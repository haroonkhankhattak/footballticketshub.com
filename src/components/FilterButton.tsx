// import { useState } from "react";

// export default function FilterButton() {
//   const [selected, setSelected] = useState("All");

//   const buttons = [
//     { label: "All", short: "All" },
//     { label: "Upcoming 30 days", short: "30 days" },
//     { label: "Upcoming 7 days", short: "7 days" },
//     { label: "Upcoming 3 days", short: "3 days" },
//   ];

//   return (
//     <div className="flex items-center gap-1 sm:gap-4 border-b py-4">
//       {buttons.map((btn) => (
//         <button
//           key={btn.label}
//           onClick={() => setSelected(btn.label)}
//           aria-pressed={selected === btn.label}
//           className={`w-full max-w-36 rounded-3xl py-3 px-0 text-center text-sm font-normal border-2 
//             ${
//               selected === btn.label
//                 ? "border-ticket-red text-ticket-red text-ltg-green"
//                 : "border-ltg-grey-2 text-ltg-black"
//             } 
//             bg-ltg-white`}>
//           <span className="hidden sm:inline">{btn.label}</span>
//           <span className="sm:hidden">{btn.short}</span>
//         </button>
//       ))}
//     </div>
//   );
// }


// FilterButton.tsx
import React from "react";
// No need for useSearchParams here if only controlling date filter via props

interface FilterButtonProps {
  // Callback function to inform the parent about filter changes
  onFilterChange: (filterType: "all" | "30 days" | "7 days" | "3 days") => void;
  // The currently active filter, received from the parent
  selectedFilter: "all" | "30 days" | "7 days" | "3 days";
}

export default function FilterButton({ onFilterChange, selectedFilter }: FilterButtonProps) {
  const buttons = [
    { label: "All", short: "All", filterValue: "all" },
    { label: "Upcoming 30 days", short: "30 days", filterValue: "30 days" },
    { label: "Upcoming 7 days", short: "7 days", filterValue: "7 days" },
    { label: "Upcoming 3 days", short: "3 days", filterValue: "3 days" },
  ];

  return (
    <div className="flex items-center gap-1 sm:gap-4 border-b py-4">
      {buttons.map((btn) => (
        <button
          key={btn.label}
          // Call the prop function to update the filter in the parent
          onClick={() => onFilterChange(btn.filterValue as "all" | "30 days" | "7 days" | "3 days")}
          // Determine active state based on the selectedFilter prop
          aria-pressed={selectedFilter === btn.filterValue}
          className={`w-full max-w-36 rounded-3xl py-3 px-0 text-center text-sm font-normal border-2 
            ${selectedFilter === btn.filterValue
              ? "border-ticket-red text-ticket-red bg-ltg-green"
              : "border-ltg-grey-2 text-ltg-black"
            } 
            bg-ltg-white`}>
          <span className="hidden sm:inline">{btn.label}</span>
          <span className="sm:hidden">{btn.short}</span>
        </button>
      ))}
    </div>
  );
}
