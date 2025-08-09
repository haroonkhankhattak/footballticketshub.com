import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import LeagueCard from "./LeagueCard";
import FilterButton from "../components/FilterButton";
import { leagues } from "../lib/constants/leagues";
import { Props } from "../types/event";
// import { useCurrencyLanguage } from "../lib/CurrencyLanguageContext";
import { Match } from "../types/match";
import { convertSlugToTeamName } from "../lib/teamUtils";
import RecentNews from "./RecentNews";
import { useQuery } from "@apollo/client";
import { GET_MATCHES_BY_LEAGUE } from "../api/queries/MatchesByLeague";

interface Team {
  name: string;
  link: string;
}

interface LeagueSectionProps {
  title: string;
  teams: Team[];
}

const LeagueSection: React.FC<LeagueSectionProps> = ({ title, teams }) => {
  return (
    <div className="mb-16">
      <h2 className="font-dosis text-ltg-black text-lg font-medium capitalize pb-3">
        {title}
      </h2>
      <ul className="text-sm">
        {teams.map((team, index) => (
          <li
            key={index}
            className="border-ltg-grey-4 border-t py-2 last:border-b">
            <a href={team.link} className="flex hover:underline">
              {team.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};


const MatchRow: React.FC<Match> = ({
  date,
  league,
  league_slug,
  home_team_slug,
  away_team_slug,
  home_team,
  away_team,
  slug,
  venue,
  city,
  country,
  price_starts_from,

}) => {
  // const match = urlToEvent.match(/\/fixtures\/(.*?)-tickets-(.*)\.html/);


  const newDate = new Date(Number(date));

  const day = String(newDate.getUTCDate()).padStart(2, '0'); // "04"

  const month = newDate.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }).toUpperCase(); // AUG
  const year = newDate.getUTCFullYear(); // 2025
  const time = newDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' }); // 02:00 PM


  // const { selectedCurrency } = useCurrencyLanguage();

  // const currencySymbols: Record<string, string> = {
  //   gbp: "£",
  //   usd: "$",
  //   eur: "€",
  //   chf: "Fr",
  //   sek: "kr",
  //   nok: "kr",
  //   dkk: "kr",
  // };

  // const currencyKey = selectedCurrency.toLowerCase();
  // const symbol = currencySymbols[selectedCurrency] || "";
  // const price = minPrice[currencyKey] ?? "N/A";

  const price = price_starts_from;

  return (
    <Link
      href={{
        pathname: `/tickets/${slug}`,
      }}
    >
      <div className="grid grid-cols-12 items-center border-b border-gray-200 group hover:bg-gray-50 cursor-pointer transition transform hover:scale-[1.02] hover:shadow-md rounded-md px-4 py-3">

        {/* Date */}
        <div className="col-span-3 sm:col-span-1 flex flex-col items-center justify-center bg-gray-100 group-hover:bg-gray-200 transition rounded-md py-4">
          <div className="uppercase text-[10px] sm:text-xs font-semibold text-gray-700 bg-gray-200 px-2 rounded-full mb-1">{month}</div>
          <div className="text-3xl font-extrabold text-ticket-blue group-hover:text-ticket-red leading-none">{day}</div>
          <div className="text-xs font-medium text-gray-400">{year}</div>

          <div className="mt-1 text-[10px] text-gray-600 flex items-center justify-center gap-1 sm:hidden">
            <Clock size={12} />
            <span>{time}</span>
          </div>
        </div>

        <div className="col-span-9 sm:col-span-8 pl-4">

          <div className="col-span-9 sm:col-span-8 flex flex-col justify-center pl-6">
            <div className="flex justify-center items-center space-x-8 mt-0 mb-1">
              {/* Home Team */}
              <div className="flex flex-col items-center group">
                <img
                  src={`uploads/teamlogo/${home_team_slug}.svg`}
                  alt={home_team}
                  className="w-10 h-10 object-contain  group-hover:border-ticket-red transition"
                />
                <span className="text-xs sm:text-sm font-semibold mt-2 text-ticket-blue uppercase">{home_team}</span>
              </div>

              {/* VS text */}
              <div className="text-ticket-blue font-semibold text-sm sm:text-base select-none">vs</div>

              {/* Away Team */}
              <div className="flex flex-col items-center group">
                <img
                  src={`uploads/teamlogo/${away_team_slug}.svg`}
                  alt={away_team}
                  className="w-10 h-10 object-contain  group-hover:border-ticket-red transition"
                />
                <span className="text-xs sm:text-sm font-semibold mt-2 text-ticket-blue uppercase">{away_team}</span>
              </div>
            </div>

            {/* Desktop view: time + location */}
            {/* Desktop view: time + location */}
            <div className="hidden sm:flex items-center justify-center border-t border-dashed border-gray-300 text-sm text-gray-500 group-hover:text-gray-800 transition py-2 flex-wrap gap-2">
              <div className="flex items-center">
                <Clock size={14} className="mr-1 text-gray-400" />
                {time}
              </div>
              <span className="mx-2">•</span>
              <div className="flex items-center">
                <MapPin size={14} className="mr-1 text-gray-400" />
                {venue}, {city}, {country}
              </div>
            </div>

          </div>



          {/* Mobile view: show only location */}
          <div className="flex sm:hidden items-center font-light text-[10px] text-gray-600 group-hover:text-gray-800 transition mt-2 space-x-1">
            <MapPin size={12} />
            <span>{venue}, {city}, {country}</span>
          </div>

        </div>

        <div className="col-span-12 sm:col-span-3 px-0 text-center hidden sm:block">
          <div className="btn-primary inline-block text-sm px-4 bg-ticket-primarycolor group-hover:bg-ticket-red transition rounded-full">
            View Tickets
          </div>
          <span className="inline-block font-medium text-sm">From £{price}</span>
        </div>

      </div>
    </Link>
  );
};

const LeagueMatchList: React.FC<Props> = ({ league }) => {

  const leagueName = convertSlugToTeamName(league);
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentCategoryFilter, setCurrentCategoryFilter] = useState<"Best Selling" | "Trending Matches" | "Fan Favorites" | "High Demand">("Best Selling");

  const filteredMatches = getFilteredMatches(
    matches,
    currentCategoryFilter
  );

  const { data, loading, error } = useQuery(GET_MATCHES_BY_LEAGUE, {
    variables: { category: currentCategoryFilter, league: league },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.matchesByLeague) {
      setMatches(data.matchesByLeague);
    }
  }, [data, filteredMatches]);

  // const team = searchParams.get("team");

  // Function to be passed to FilterButton to update the date filter state

  // Apply both filters using the local state for date and search param for team



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

  // if (loading) return <div>Loading matches...</div>;
  // if (error) return <div>{error}</div>;

  return (
    <section className=" bg-white">
      <div className="ticket-container">
        <div className="mt-6 lg:mt-14 font-light text-sm text-gray-500">
          <ul
            aria-label="breadcrumbs"
            className="text-ltg-grey-1 font-roboto flex flex-wrap items-center gap-x-3 uppercase">
            <li>
              <a
                href="/"
                data-testid="breadcrumb"
                className="whitespace-nowrap hover:underline">
                Home
              </a>
              <span className="pl-3 text-xl lg:text-2xl font-bold">▸</span>
            </li>
            <li>
              <a
                href={`/league/${encodeURIComponent(
                  league
                )}`}
                data-testid="breadcrumb"
                className="whitespace-nowrap hover:underline">
                {leagueName}
              </a>
              <span className="pl-3 text-xl lg:text-2xl font-bold"></span>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 py-4">
            <LeagueCard leagueName={leagueName} />

            <div className="lg:col-span-7 py-6">
              <div className="text-xl font-medium text-ticket-blue py-2 ">
                Upcoming English Premier League Fixtures
              </div>
              {/* <div className="text-sm text-black py-2 ">
                {filteredMatches.length} results found.
              </div> */}
              <FilterButton
                onFilterChange={handleCategoryFilterChange}
                selectedFilter={currentCategoryFilter}
              />

              <div className="h-[700px] overflow-y-auto space-y-2 thin-scrollbar">
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
          </div>
          <div className="lg:col-span-5 space-y-16">

            <div className="space-y-4 py-4 mt-0">

              {/* <RecentNews slug={league} height={1200} /> */}
            </div>
          </div>
          {/* <div className="lg:col-span-4 space-y-16">
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
                    className="text-sky-500">
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
                    className="text-sky-500">
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
                    className="text-sky-500">
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
                    className="text-sky-500">
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
                />
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default LeagueMatchList;
