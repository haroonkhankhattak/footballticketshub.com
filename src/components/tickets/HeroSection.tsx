import React, { useEffect, useMemo, useState } from "react";
import { Calendar, MapPin, CheckCircle } from "lucide-react";
import { convertTeamNameToSlug } from "../../lib/teamUtils";
import { CLUB_FANS } from "../../lib/constants";
import MatchCard from "./MatchCard";
import Link from "next/link";
import { Match } from "../../types/match";

interface HeroSectionProps {
    match: Match
}

const HeroSection: React.FC<HeroSectionProps> = ({
    match
}) => {

    console.log("home", match.home_team);
    const home_team_slug = convertTeamNameToSlug(match.home_team);
    const filename = CLUB_FANS[home_team_slug];

    const newDate = new Date(Number(match.date));

    const day = String(newDate.getUTCDate()).padStart(2, '0');

    const month = newDate.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }).toUpperCase();
    const year = newDate.getUTCFullYear();
    const time = newDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' });


    useEffect(() => {
    }, [match.price_starts_from]);

    const backgroundImage = `/uploads/teamfans/${filename}`;
    return (

        <section className="w-full bg-gradient-to-br from-white via-sky-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="rounded-xl border border-gray-200 shadow-lg overflow-hidden bg-white/40 backdrop-blur-md">

                    {/* 🔷 Top Banner Section with Background + Icons */}
                    <div className="relative h-40 sm:h-56 w-full overflow-hidden">
                        {/* 🔹 Blurred Background */}
                        <div
                            className="absolute inset-0 bg-cover bg-center scale-105 blur-sm brightness-75"
                            style={{ backgroundImage: `url(${backgroundImage})` }}
                        />
                        <div className="absolute inset-0 bg-black/40" />

                        <div className="absolute inset-0 z-20">
                            {/* League icon in top-left */}
                            <div className="absolute top-4 left-4 bg-white p-1 rounded-full shadow-md">
                                <img
                                    src={`/uploads/leaguelogo/${match.league_slug}.png`}
                                    alt={`${match.league} logo`}
                                    className="h-5 w-5 sm:w-12 sm:h-12 object-contain"
                                />
                            </div>

                            {/* Center content */}
                            <div className="flex justify-center items-center h-full gap-8 sm:gap-16 text-center">
                                {/* Home Team Icon + Name */}
                                <div className="flex flex-col items-center">
                                    <img
                                        src={`/uploads/teamlogo/${match.home_team_slug}.svg`}
                                        alt={match.home_team}
                                        className="w-8 h-8 sm:w-20 sm:h-20 object-contain"
                                    />
                                    <h1 className="text-base sm:text-2xl text-white font-light drop-shadow-md mt-1 sm:mt-2">
                                        {match.home_team}
                                    </h1>
                                </div>

                                {/* VS Text */}
                                <h1 className="text-base sm:text-2xl text-white font-bold drop-shadow-md">
                                    VS
                                </h1>

                                {/* Away Team Icon + Name */}
                                <div className="flex flex-col items-center">
                                    <img
                                        src={`/uploads/teamlogo/${match.away_team_slug}.svg`}
                                        alt={match.away_team}
                                        className="w-8 h-8 sm:w-20 sm:h-20 object-contain"
                                    />
                                    <h1 className="text-base sm:text-2xl text-white font-light drop-shadow-md mt-1 sm:mt-2">
                                        {match.away_team}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 🔷 Match Info Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 p-6">
                        {/* 📝 Left Column: Match Details */}
                        <div className="lg:col-span-3 flex flex-col space-y-4">
                            {/* Title & League */}
                            <div>
                                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">{match.title}</h2>
                                <Link
                                    href={`/league/${match.league_slug}`}
                                    className="block text-sky-600 hover:underline text-sm uppercase mt-1"
                                >
                                    {match.league}
                                </Link>
                            </div>

                            {/* Date & Location */}
                            <div className="space-y-2 text-gray-600 text-sm">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-sky-500" />
                                    <span>{day} {month} {year} • {time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-sky-500" />
                                    <span>{match.venue}, {match.city}, {match.country}</span>
                                </div>
                            </div>

                            {/* Price */}
                            {match.price_starts_from && (
                                <div className="pt-2">
                                    <p className="text-sm text-gray-500">
                                        Tickets from{" "}
                                        <span className="text-green-600 font-semibold">${match.price_starts_from}</span>
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* ✅ Right Column: Trust Points */}
                        <div className="lg:col-span-2 space-y-4">
                            {[
                                "Tickets provided by our Trusted partners",
                                "All our orders are 150% guaranteed",
                                "Seated together, unless stated otherwise",
                            ].map((text, i) => (
                                <div key={i} className="flex items-start gap-2">
                                    <CheckCircle className="text-green-500 w-4 h-4 mt-0.5" />
                                    <p className="text-sm text-gray-700">{text}</p>
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

