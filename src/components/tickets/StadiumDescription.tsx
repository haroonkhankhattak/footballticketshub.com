import { useState } from "react";

interface StadiumDescriptionProps {
    stadiumInfo?: { description: string };
    venue: string;
}

export const StadiumDescription = ({ stadiumInfo, venue }: StadiumDescriptionProps) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="mt-0 mb-0 font-light max-lg:text-center text-justify text-gray-500">
            {stadiumInfo?.description ? (
                <>
                    <p
                        className={`${expanded ? "" : "line-clamp-1"
                            } text-sm sm:text-base transition-all duration-200`}
                    >
                        {stadiumInfo.description}
                    </p>
                    <button
                        className="text-sky-600 text-xs sm:text-sm mt-1 underline"
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? "Show less" : "Show more"}
                    </button>
                </>
            ) : (
                <>
                    Information for <strong>{venue}</strong> is currently unavailable. Tickets for events at
                    this venue are highly sought after. Grab this opportunity to watch exciting events live in
                    action.
                </>
            )}
        </div>
    );
};
