'use client';

import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import React, { useState, useEffect } from "react";
import { leagues } from "../lib/constants/leagues";
import { Props } from "../types/event";
// import { POPULAR_MATCHES_API } from "../lib/constants/apis";
import FilterButton from "./FilterButton";
// import { premier_league_2025_2026_events } from "../pages/league/matches";
// import { formatDate } from "../lib/utils";
import { useQuery } from "@apollo/client/react/hooks/useQuery";
import { GET_POPULAR_MATCHES } from "../api/queries/PopularMatches";
// import { url } from "inspector";
import { Match } from "../types/match";
import RecentNews from "./RecentNews";
import RecentTicketBuyers from "./RecentTicketBuyers";


interface Team {
  name: string;
  link: string;
}

interface LeagueSectionProps {
  title: string;
  teams: Team[];
  viewAllLink: string;
}

const LeagueSection: React.FC<LeagueSectionProps> = ({
  title,
  teams,
  viewAllLink,
}) => {
  return (
    <div className="mb-16 px-4 sm:px-6 md:px-0">
      <h2 className="font-dosis text-ltg-black text-base sm:text-lg font-medium capitalize pb-2 sm:pb-3">
        {title}
      </h2>
      <ul className="text-xs sm:text-sm">
        {teams.map((team, index) => (
          <li
            key={index}
            className="border-ltg-grey-4 border-t py-1 sm:py-2 last:border-b"
          >
            <a href={team.link} className="flex hover:underline">
              {team.name}
            </a>
          </li>
        ))}
      </ul>
      <a
        href={viewAllLink}
        className="text-ltg-grey-1 inline-block pt-2 sm:pt-3 text-gray-500 text-xs sm:text-sm"
      >
        View all {title} <span className="capitalize">tickets</span>&nbsp;»
      </a>
    </div>

  );
};



const MatchRow: React.FC<Match> = ({
  date,
  league,
  title,
  slug,
  venue,
  city,
  country,
}) => {

  // const match = urlToEvent.match(/\/fixtures\/(.*?)-tickets-(.*)\.html/);
  const eventCode = "";
  const eventTypeCode = "";
  // console.log("---hometeam---", homeTeam);

  const newDate = new Date(Number(date));

  const day = String(newDate.getUTCDate()).padStart(2, '0'); // "04"

  const month = newDate.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }).toUpperCase(); // AUG
  const year = newDate.getUTCFullYear(); // 2025
  const time = newDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' }); // 02:00 PM


  return (
    <Link
      href={`/tickets/${slug}`}
    >

      <div className="grid grid-cols-12 items-center border-b border-gray-200 group hover:bg-gray-100 cursor-pointer transition">

        {/* Date */}
        <div className="col-span-2 sm:col-span-1 bg-gray-50 text-center group-hover:bg-gray-200 transition">
          <div className="py-5">
            <div className="uppercase text-[10px] sm:text-xs text-gray-800">{month}</div>
            <div className="text-2xl sm:text-3xl font-bold group-hover:text-ticket-red">{day}</div>
            <div className="text-xs sm:text-sm text-gray-400">{year}</div>

            {/* Show time below year only on mobile */}
            <div className="mt-1 text-[10px] text-gray-600 flex items-center justify-center gap-1 sm:hidden">
              <Clock size={12} />
              <span>{time}</span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="col-span-8 sm:col-span-8 pl-4 ">
          <div className="text-[10px] sm:text-xs text-gray-500 group-hover:text-black uppercase mb-1 group-hover:sky-700 transition">
            {league}
          </div>

          <div className="text-sm md:text-lg font-medium mb-1 group-hover:text-ticket-red text-black transition">
            {title}
          </div>

          {/* Desktop view: time + location */}
          <div className="hidden sm:flex items-center font-light text-sm text-gray-600 group-hover:text-gray-800 transition">
            <Clock size={14} className="mr-1" />
            {time}
            <span className="mx-2">•</span>
            <MapPin size={14} className="mr-1" />
            {venue}, {city}, {country}
          </div>

          {/* Mobile view: show only location */}
          <div className="flex sm:hidden items-center font-light text-[10px] text-gray-600 group-hover:text-gray-800 transition mt-1">
            <MapPin size={12} className="mr-1" />
            {venue}, {city}, {country}
          </div>
        </div>


        {/* View Tickets button */}
        <div className="sm:col-span-3 px-0 text-right hidden sm:block">
          <div className="btn-primary inline-block text-sm px-8 bg-ticket-primarycolor group-hover:bg-ticket-red transition rounded-full">
            View Tickets
          </div>
        </div>
      </div>
    </Link>

  );
};

const PopularMatchesList: React.FC<Props> = () => {
  // if (loading) return <div>Loading matches...</div>;
  // if (error) return <div>{error}</div>;

  // const [matches, setMatches] = useState<EventProps[]>([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentCategoryFilter, setCurrentCategoryFilter] = useState<"Best Selling" | "Trending Matches" | "Fan Favorites" | "High Demand">("Best Selling");
  const [featuredMatches, setFeaturedMatches] = useState([]);
  const [matches, setMatches] = useState<Match[]>([]);

  const filteredMatches = getFilteredMatches(
    matches,
    currentCategoryFilter
  );

  const { data, loading } = useQuery(GET_POPULAR_MATCHES, {
    fetchPolicy: "network-only",
    variables: { category: currentCategoryFilter, limit: 100 }
  });

  useEffect(() => {
    if (data?.popularMatches) {
      setMatches(data.popularMatches);
    }
  }, [data, filteredMatches]);

  const handleCategoryFilterChange = (filterType: "Best Selling" | "Trending Matches" | "Fan Favorites" | "High Demand") => {
    setCurrentCategoryFilter(filterType);
  };

  function getFilteredMatches(events, categoryFilter) {
    switch (categoryFilter) {
      case "Trending Matches":
        return events.filter(e => e.category == "Trending Matches");
      case "Fan Favorites":
        return events.filter(e => e.category == "Fan Favorites");
      case "High Demand":
        return events.filter(e => e.category == "High Demand");
      case "Best Selling":
      default:
        return events;
    }
  }

  // function getFilteredMatches(events, dateFilter) {
  //   console.log("Filtering matches with date filter:", dateFilter);
  //   if (dateFilter === "Best Selling") {
  //     return events;
  //   }

  //   // Reference current date based on the provided context (June 5, 2025).
  //   // Set to midnight local time for consistent date comparison.
  //   const currentDate = new Date(2025, 5, 5); // Month is 0-indexed (June is 5)
  //   currentDate.setHours(0, 0, 0, 0); // Set time to beginning of the day

  //   let filterDays;
  //   if (dateFilter === "Trending Matches") {
  //     filterDays = 30;
  //   } else if (dateFilter === "Fan Favorites") {
  //     filterDays = 7;
  //   } else if (dateFilter === "High Demand") {
  //     filterDays = 3;
  //   } else {
  //     // If an invalid filter is provided, return all events or handle as an error.
  //     // For this case, we'll default to returning all events.
  //     console.warn(`Invalid date filter: ${dateFilter}. Returning all matches.`);
  //     return events;
  //   }

  //   // Calculate the end date for the filter period
  //   const endDate = new Date(currentDate);
  //   endDate.setDate(currentDate.getDate() + filterDays);
  //   endDate.setHours(23, 59, 59, 999); // Set to end of the day to include matches on the last day

  //   // Helper map for month names to 0-indexed numbers
  //   const monthNameToNumber = {
  //     "January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5,
  //     "July": 6, "August": 7, "September": 8, "October": 9, "November": 10, "December": 11
  //   };

  //   return events.filter(event => {
  //     // Construct the event date from its properties (year, month, day)
  //     // Set to midnight local time for consistent date comparison
  //     const eventDate = new Date(event.year, monthNameToNumber[event.month], event.day);
  //     eventDate.setHours(0, 0, 0, 0); // Set time to beginning of the day

  //     // Filter criteria: event must be on or after the current date,
  //     // and on or before the calculated end date.
  //     return eventDate >= currentDate && eventDate <= endDate;
  //   });
  // }


  // useEffect(() => {
  //   // fetch(POPULAR_MATCHES_API)
  //   //   .then((response) => response.json())
  //   //   .then((data) => {
  //   //     console.log("fetching data:", data);
  //   //     setMatches(data.matches);
  //   //     setLoading(false);
  //   //   })
  //   //   .catch((err) => {
  //   //     console.error("Error fetching data:", err);
  //   //     setError("Failed to load matches");
  //   //     setLoading(false);
  //   //   });
  //   setMatches(featuredMatches)
  // }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });


  }, []);


  return (
    <section className="py-8 bg-white">
      <div className="ticket-container">
        <div className="grid lg:grid-cols-12 gap-2 px-0">
          {/* div left */}
          <div className="lg:col-span-7">
            <div className="text-xl font-medium py-4 sticky top-0 bg-white z-10">
              Hot Picks for Football Fans
            </div>
            {/* <div className="text-sm text-black py-2 ">
              {filteredMatches.length} results found.
            </div> */}
            <FilterButton
              onFilterChange={handleCategoryFilterChange}
              selectedFilter={currentCategoryFilter}
            />
            <div className="h-[700px] overflow-y-auto space-y-2 p-2 thin-scrollbar">
              {loading ? (
                <div className="w-full py-6 flex items-center justify-center bg-white/60">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-ticket-primarycolor border-gray-200"></div>
                </div>
              ) : filteredMatches.length === 0 ? (
                <div className="text-center text-gray-500 py-8">No matches found.</div>
              ) : (
                filteredMatches.map((match) => (
                  <MatchRow key={match.id} {...match} />
                ))
              )}
            </div>
          </div>


          {/* div right */}
          <div className="lg:col-span-5 space-y-16">

            <div className="space-y-4 py-4 mt-20">

              <RecentNews />

              {/* <div className="text-xl font-medium py-4 border-b">
                Book With Confidence
              </div> */}

              {/* <div className="flex items-start"> */}
              {/* <div className="flex-shrink-0 mt-1">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-sky-700">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div> */}
              {/* <div className="ml-0">
                  <h3 className="font-semibold text-sm text-black">
                    Every seller on our platform brings over 20 years of expertise in the football ticketing market, ensuring you receive not only authentic tickets but also the highest level of service, reliability, and insider knowledge that comes from decades of industry experience.
                  </h3>
                </div> */}
              {/* </div> */}

              {/* <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-sky-700">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="font-light text-sm">
                    Champions League level Customer support
                  </h3>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-sky-700">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="font-light text-sm">
                    5 star rating on Trustpilot (13k+ reviews)
                  </h3>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-sky-700">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="font-light text-sm">
                    Best ticket selection and prices
                  </h3>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-sky-700">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="font-light text-sm">
                    150% Money Back Guarantee
                  </h3>
                </div>
              </div> */}
            </div>
            {/* <div>
              {leagues.map((league, index) => (
                <LeagueSection
                  key={index}
                  title={league.title}
                  teams={league.teams}
                  viewAllLink={league.viewAllLink}
                />
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );

};

export default PopularMatchesList;
