import React, { useEffect, useMemo, useState } from "react";
import { Calendar, MapPin, CheckCircle } from "lucide-react";
import { convertTeamNameToSlug } from "../../lib/teamUtils";
import { CLUB_FANS } from "../../lib/constants";
import MatchCard from "./MatchCard";
import { Link } from "react-router-dom";

interface HeroSectionProps {
    homeTeam: string;
    eventName: string;
    categoryName: string;
    date: string;
    venue: string;
    city: string;
    country: string;
    minPrice: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
    homeTeam,
    eventName,
    categoryName,
    date,
    venue,
    city,
    country,
    minPrice,
}) => {

    console.log("home", homeTeam);
    const home_team_slug = convertTeamNameToSlug(homeTeam);
    const filename = CLUB_FANS[home_team_slug];

      const newDate = new Date(Number(date));

  const day = String(newDate.getUTCDate()).padStart(2, '0'); // "04"

  const month = newDate.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }).toUpperCase(); // AUG
  const year = newDate.getUTCFullYear(); // 2025
  const time = newDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' }); // 02:00 PM


    useEffect(() => {
    }, [minPrice]);

    const backgroundImage = `/uploads/teamfans/${filename}`;
    return (

        <section className="w-full bg-white">


            {/* <MatchCard filename={filename} /> */}



            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

                <div className="rounded-md shadow-md border-b overflow-hidden">
                    <div
                        className="rounded-t-md relative h-[100px] sm:h-[200px] mt-2 flex items-center justify-center overflow-hidden"
                    >
                        {/* Blurred Background Layer */}
                        <div
                            className="absolute inset-0 bg-cover bg-center blur-[2px] scale-100"
                            style={{
                                backgroundImage: `url(${backgroundImage})`,
                            }}
                        />

                        {/* Semi-transparent Overlay (optional for contrast) */}
                        <div className="absolute inset-0 bg-black/30" />

                        {/* Foreground Text */}
                        <div className="relative z-10 text-center px-4">
                            <h1 className="text-xl sm:text-4xl font-semibold text-white">{eventName}</h1>
                            <p className="text-white text-xs sm:text-2xl uppercase tracking-wider mt-1">
                                Tickets
                            </p>
                        </div>
                    </div>


                    {/* Content below image */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 p-2 sm:p-2 gap-6">
                        {/* Match info - Left side */}
                        <div className="lg:col-span-3 space-y-4 sm:space-y-6 px-2 sm:px-0">
                            <div>
                                <h1 className="text-lg sm:text-2xl font-semibold mt-1">
                                    {eventName}
                                </h1>



                                <Link to="/league/premier-league" className="flex items-center">
                                    <p className="text-sky-500 text-xs sm:text-sm uppercase tracking-wide mt-1 sm:mt-2">
                                        {categoryName}
                                    </p>
                                </Link>

                                <div className="flex flex-col gap-2 mt-3 sm:mt-4">
                                    {/* Date */}
                                    <div className="flex items-center text-gray-600">
                                        <Calendar size={16} className="mr-2 text-gray-600 shrink-0 sm:size-18" />
                                        <span className="text-xs sm:text-sm text-gray-600">
                                            {day} {month} {year} {time}
                                        </span>
                                    </div>

                                    {/* Location */}
                                    <div className="flex items-center text-gray-600">
                                        <MapPin size={16} className="mr-2 text-gray-600 shrink-0 sm:size-18" />
                                        <span className="text-xs sm:text-sm text-gray-600">
                                            {venue}, {city}, {country}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Optional ticket price info placeholder */}
                            <p className="text-xs sm:text-sm font-light text-gray-500">
                                {/* Add ticket info here if needed */}
                            </p>
                        </div>


                        {/* Trust indicators - Right side */}
                        <div className="lg:col-span-2 flex flex-col justify-center space-y-3 mt-0 lg:mt-0 px-2 sm:px-0">
                            {[
                                "Tickets provided by our Trusted partners",
                                "All our orders are 150% guaranteed",
                                "Seated together, unless stated otherwise",
                            ].map((text, index) => (
                                <div key={index} className="flex items-start">
                                    <CheckCircle
                                        className="text-sky-500 mt-0.5 mr-2 shrink-0"
                                        size={16} // smaller on all screens
                                    />
                                    <p className="text-gray-700 text-xs sm:text-sm leading-snug">
                                        {text}
                                    </p>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </div>
        </section>

    );
};

export default HeroSection;

