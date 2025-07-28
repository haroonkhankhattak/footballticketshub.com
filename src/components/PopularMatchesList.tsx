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
  id,
  date,
  league,
  title,
  home_team,
  away_team,
  home_team_slug,
  away_team_slug,
  slug,
  venue,
  city,
  country,
  price_starts_from,
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
      href={{
        pathname: `/tickets/${slug}`,
        query: {
          homeTeam: home_team,
          eventId: id,
          eventCode: eventCode,
          eventTypeCode: eventTypeCode,
          pageNumber: 1,
          eventName: title,
          categoryName: league,
          day: day,
          month: month,
          year: year,
          time: time,
          venue: venue,
          city: city,
          country: country,
          minPrice: price_starts_from,
        },
      }}
    >

      <div className="grid grid-cols-12 items-center border-b border-gray-200 group hover:bg-gray-100 cursor-pointer transition">

        {/* Date */}
        <div className="col-span-3 sm:col-span-1 bg-gray-50 text-center group-hover:bg-gray-200 transition">
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
        <div className="col-span-9 sm:col-span-8 pl-4">
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
        <div className="col-span-12 sm:col-span-3 px-4 text-right hidden sm:block">
          <Link
            href={{
              pathname: `/tickets/${slug}`,
              query: {
                homeTeam: home_team,
                eventId: id,
                eventCode: eventCode,
                eventTypeCode: eventTypeCode,
                pageNumber: 1,
                eventName: title,
                categoryName: league,
                day: day,
                month: month,
                year: year,
                time: time,
                venue: venue,
                city: city,
                country: country,
                minPrice: price_starts_from,
              }
            }}
            className="btn-primary inline-block text-sm px-8 bg-ticket-primarycolor group-hover:bg-ticket-red transition rounded-full"
          >
            View Tickets
          </Link>
        </div>
      </div>
    </Link>

  );
};

const PopularMatchesList: React.FC<Props> = () => {
  // if (loading) return <div>Loading matches...</div>;
  // if (error) return <div>{error}</div>;

  // const [matches, setMatches] = useState<EventProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDateFilter, setCurrentDateFilter] = useState<"all" | "30 days" | "7 days" | "3 days">("all");
  const [featuredMatches, setFeaturedMatches] = useState([]);
  const [matches, setMatches] = useState<Match[]>([]);
  // const { data } = useQuery(GET_POPULAR_MATCHES);

  // useEffect(() => {
  //   if (data?.popularMatches) {
  //     const formattedMatches = data.popularMatches.map((match: any, index: number) => {
  //       const matchDate = new Date(Number(match.date)); // ensure it's a number

  //       return {
  //         id: index,
  //         homeTeam: match.home_team,
  //         categoryName: match.league,
  //         year: matchDate.getFullYear(),
  //         month: matchDate.toLocaleString("en-US", { month: "short" }).toUpperCase(),
  //         day: matchDate.getDate(),
  //         time: matchDate.toLocaleTimeString("en-US", {
  //           hour: "2-digit",
  //           minute: "2-digit",
  //           hour12: true,
  //         }),
  //         venue: match.venue,
  //         city: match.city,
  //         country: match.country,
  //         eventName: match.title,
  //         date: formatDate(match.date),
  //         league: match.league,
  //         urlToEvent: match.slug,
  //         tba: false,
  //         minPrice: {
  //           gbp: 95,
  //           usd: 120,
  //           eur: 110,
  //           aud: 170,
  //           cad: 160,
  //           chf: 105,
  //         },
  //         link: `/tickets/${match.slug}`,
  //       };
  //     });

  //     setMatches(formattedMatches);
  //   }
  // }, [data]);



  // Function to be passed to FilterButton to update the date filter state

  // Apply both filters using the local state for date and search param for team
  const filteredMatches = getFilteredMatches(
    matches,
    currentDateFilter
  );

  const { data } = useQuery(GET_POPULAR_MATCHES, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.popularMatches) {
      setMatches(data.popularMatches);
      setLoading(false);
    }
  }, [data, filteredMatches]);

  const handleDateFilterChange = (filterType: "all" | "30 days" | "7 days" | "3 days") => {
    setCurrentDateFilter(filterType);
  };

  function getFilteredMatches(events, dateFilter) {
    console.log("Filtering matches with date filter:", dateFilter);
    if (dateFilter === "all") {
      return events;
    }

    // Reference current date based on the provided context (June 5, 2025).
    // Set to midnight local time for consistent date comparison.
    const currentDate = new Date(2025, 5, 5); // Month is 0-indexed (June is 5)
    currentDate.setHours(0, 0, 0, 0); // Set time to beginning of the day

    let filterDays;
    if (dateFilter === "30 days") {
      filterDays = 30;
    } else if (dateFilter === "7 days") {
      filterDays = 7;
    } else if (dateFilter === "3 days") {
      filterDays = 3;
    } else {
      // If an invalid filter is provided, return all events or handle as an error.
      // For this case, we'll default to returning all events.
      console.warn(`Invalid date filter: ${dateFilter}. Returning all matches.`);
      return events;
    }

    // Calculate the end date for the filter period
    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + filterDays);
    endDate.setHours(23, 59, 59, 999); // Set to end of the day to include matches on the last day

    // Helper map for month names to 0-indexed numbers
    const monthNameToNumber = {
      "January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5,
      "July": 6, "August": 7, "September": 8, "October": 9, "November": 10, "December": 11
    };

    return events.filter(event => {
      // Construct the event date from its properties (year, month, day)
      // Set to midnight local time for consistent date comparison
      const eventDate = new Date(event.year, monthNameToNumber[event.month], event.day);
      eventDate.setHours(0, 0, 0, 0); // Set time to beginning of the day

      // Filter criteria: event must be on or after the current date,
      // and on or before the calculated end date.
      return eventDate >= currentDate && eventDate <= endDate;
    });
  }


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
        <div className="grid lg:grid-cols-12 gap-8 px-0">
          {/* div left */}
          <div className="lg:col-span-8">
            <div className="text-xl font-medium py-4 sticky top-0 bg-white z-10">
              Most Popular Football Tickets
            </div>
            {/* <div className="text-sm text-black py-2 ">
              {filteredMatches.length} results found.
            </div> */}
            <FilterButton
              onFilterChange={handleDateFilterChange}
              selectedFilter={currentDateFilter}
            />
            <div className="max-h-[2500px] overflow-y-auto space-y-2">
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
          <div className="lg:col-span-4 space-y-16">
            <div className="space-y-4 border-b py-4">
              <div className="text-xl font-medium py-4 border-b">
                Book With Confidence
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
              </div>
            </div>
            <div>
              {leagues.map((league, index) => (
                <LeagueSection
                  key={index}
                  title={league.title}
                  teams={league.teams}
                  viewAllLink={league.viewAllLink}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

};

export default PopularMatchesList;
