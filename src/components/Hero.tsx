'use client';

import { useEffect, useState } from "react";
import { Calendar, MapPin, Search, Check, X, Clock } from "lucide-react";
// import TrustPilotRow from "../components/TrustpilotRow";
import Link from "next/link";
import { predefinedKeywords } from "../lib/searchKeywords";
import { GET_UPCOMING_POPULAR_MATCHES } from "../api/queries/PopularUpcomingMatches";
import { useQuery } from '@apollo/client';
import { formatDate } from "../lib/utils";
// import { Match } from "../api/queries/getHomePageProps";
import { GET_SEARCH_RESULTS } from "../api/queries/Search";
import { debounce } from "lodash";
import { useRouter } from 'next/navigation';

// import { log } from "console";


const DEBOUNCE_DELAY = 300;
const Hero = () => {

  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [featuredMatches, setFeaturedMatches] = useState([]);
  const [results, setResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(true);

  const { data: upcomingData,
    loading: upcomingLoading,
    error: upcomingError,
  } = useQuery(GET_UPCOMING_POPULAR_MATCHES, {
    variables: { limit: 4, },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (upcomingData?.popularUpcomingMatches) {
      const formattedMatches = upcomingData.popularUpcomingMatches.map((match: any, index: number) => {
        const matchDate = new Date(Number(match.date));
        return {
          id: index,
          homeTeam: match.home_team,
          categoryName: match.league,
          year: matchDate.getFullYear(),
          month: matchDate.toLocaleString("en-US", { month: "short" }).toUpperCase(),
          day: matchDate.getDate(),
          time: matchDate.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
          venue: match.venue,
          city: match.city,
          country: match.country,
          eventName: match.title,
          date: formatDate(match.date),
          league: match.league,
          urlToEvent: match.slug,
          tba: false,
          slug: match.slug,
          minPrice: {
            gbp: 95,
            usd: 120,
            eur: 110,
            aud: 170,
            cad: 160,
            chf: 105,
          },
          link: `/tickets/${match.slug}`,
        };
      });
      setFeaturedMatches(formattedMatches);
    }
  }, [upcomingData]);

  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = predefinedKeywords.filter((keyword) =>
    keyword.toLowerCase().includes(searchQuery.toLowerCase()) && searchQuery
  );

  const { data: searchData, loading: queryLoading, error: searchError } = useQuery(GET_SEARCH_RESULTS, {
    variables: { searchTerm },
    fetchPolicy: "network-only",
    skip: !searchTerm.trim(),
  });

  useEffect(() => {
    if (searchData?.searchResult) {
      setResults(searchData.searchResult);
      setSearchLoading(false);
    }
  }, [searchData]);

  // Debounce function to update the searchTerm state (triggers query)
  const debouncedSetSearchTerm = debounce((val) => {
    setSearchTerm(val);
    setSearchLoading(true);
  }, DEBOUNCE_DELAY);

  // On input change: update input field and debounce update of searchTerm
  const onInputChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    setShowSuggestions(true);
    debouncedSetSearchTerm(val);
    if (val.trim() === '') {
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (value) => {
    // setSearchQuery(value);
    // setSearchTerm(value);

    if (value.type === "MatchResult") {

      const newDate = new Date(Number(value.date));

      const day = String(newDate.getUTCDate()).padStart(2, '0'); // "04"

      const month = newDate.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }).toUpperCase(); // AUG
      const year = newDate.getUTCFullYear(); // 2025
      const time = newDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' }); // 02:00 PM

      router.push(
        `/tickets/${value.slug}?`
      );
    } else {
      router.push(
        `/premeri-league/${value.slug}`
      )
    }

    setShowSuggestions(false);
    setSearchLoading(true);
  };



  return (
    <main>
      <div className="w-full relative md:mt-10">

        {/* Hero Image */}
        <div
          className="w-full h-[60vh] min-h-[300px] bg-cover bg-center relative"
          style={{
            backgroundImage: `url('/uploads/monochrome-soccer-fans-cheering.jpg')`,
            backgroundPosition: "50% 30%",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4 sm:px-6">
            <div className="bg-white/10 rounded-xl shadow-lg w-full max-w-[95%] sm:max-w-2xl md:max-w-3xl mx-auto p-4 sm:p-6 animate-slide-in">

              {/* Title Section */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start mb-4 gap-3 text-left">
                <Search size={20} className="text-ticket-lightcolor" />
                <h2 className="text-base sm:text-lg font-semibold">
                  Find your perfect match
                </h2>
              </div>

              {/* Search Input */}
              <div className="w-full mt-6 sm:mt-10">
                <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={onInputChange}
                      placeholder="Search clubs or matches..."
                      className="w-full border border-ticket-lightgray rounded-lg p-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-ticket-primarycolor text-black"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    {searchQuery && (
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setResults([]);
                          setShowSuggestions(false);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-ticket-red"
                        aria-label="Clear search"
                      >
                        <X size={18} />
                      </button>
                    )}
                    {showSuggestions && (
                      <div className="absolute z-20 w-full bg-white text-black border border-gray-200 mt-1 rounded-lg max-h-80 overflow-y-auto shadow-lg text-left">
                        {searchLoading ? (
                          <div className="flex justify-center items-center py-6">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-ticket-primarycolor"></div>
                          </div>
                        ) : results.length > 0 ? (
                          <ul>
                            {results.map((item) => {
                              // extract date
                              let day, month, year, time;
                              if (item.type === "MatchResult") {
                                const newDate = new Date(Number(item.date));
                                day = String(newDate.getUTCDate()).padStart(2, "0");
                                month = newDate.toLocaleString("en-US", {
                                  month: "short",
                                  timeZone: "UTC"
                                }).toUpperCase();
                                year = newDate.getUTCFullYear();
                                time = newDate.toLocaleTimeString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                  timeZone: "UTC"
                                });
                              }

                              return (
                                <li
                                  key={item.id}
                                  className="px-4 py-2 hover:bg-ticket-lightgray cursor-pointer text-sm"
                                  onClick={() => handleSelectSuggestion(item)}
                                >
                                  {item.type === "TeamResult" ? (
                                    <>
                                      <h3 className="text-base text-ticket-red font-semibold">{item.title}</h3>
                                      <p className="text-sm text-gray-600">{item.country}</p>
                                      <a className="text-sm hover:underline mt-2 inline-block">View Club Matches</a>
                                    </>
                                  ) : (
                                    <div className="grid grid-cols-12 items-center group transition">
                                      <div className="col-span-2 text-center">
                                        <div className="uppercase text-xs text-gray-800">{month}</div>
                                        <div className="text-xl font-bold group-hover:text-ticket-red">{day}</div>
                                        <div className="text-xs text-gray-400">{year}</div>
                                      </div>
                                      <div className="col-span-10 pl-3">
                                        <div className="text-xs text-gray-500 uppercase mb-1 group-hover:text-black">{item.league}</div>
                                        <div className="text-sm font-medium group-hover:text-ticket-red">{item.title}</div>
                                        <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-800 whitespace-nowrap overflow-hidden">
                                          <Clock size={14} className="mr-1" />
                                          <span>{time}</span>
                                          <span className="mx-2">•</span>
                                          <MapPin size={14} className="mr-1" />
                                          <span className="truncate">{item.venue}, {item.city}, {item.country}</span>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  <hr />
                                </li>
                              );
                            })}
                          </ul>
                        ) : (
                          <p className="text-center text-sm text-gray-500 py-4">No results found.</p>
                        )}
                      </div>
                    )}
                  </div>

                  <button
                    className="hidden md:flex btn-primary bg-ticket-primarycolor hover:bg-ticket-red flex items-center justify-center w-full md:w-auto px-5 py-3 rounded-lg text-white"
                    onClick={() => {
                      setSearchTerm(searchQuery);
                      setShowSuggestions(false);
                      setSearchLoading(true);
                    }}
                  >
                    <Search size={18} className="mr-2" />
                    Find Tickets
                  </button>

                </div>
              </div>

              {/* Quick Picks */}
              <div className="mt-10 w-full px-2 sm:px-0">
                <div className="flex items-center mb-2">
                  <Calendar size={16} className="text-ticket-lightcolor mr-2" />
                  <span className="text-sm font-semibold text-ticket-lightcolor">Popular Upcoming Matches</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {featuredMatches.slice(0, 4).map((match) => {
                    // Split the eventName by " vs "
                    const teams = match.eventName.split(" vs ");

                    return (
                      <Link
                        key={match.id}
                        href={{
                          pathname: `/tickets/${match.slug}`,
                         
                        }}
                        className="bg-white p-1 rounded-md hover:shadow-md text-sm text-ticket-primarycolor hover:text-ticket-red group transition"
                      >
                        <div className="font-medium overflow-hidden text-center">
                          <div className="transition-transform duration-500">
                            <div className="leading-tight">
                              <div className="text-xs sm:text-sm">{teams[0]}</div>
                              <div className="text-ticket-red font-semibold text-sm sm:text-base my-0">vs</div>
                              <div className="text-xs sm:text-sm">{teams[1]}</div>
                            </div>
                          </div>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 flex items-center justify-center group-hover:text-ticket-darkcolor mt-1">
                          <Calendar size={12} className="mr-1" />
                          <span className="text-[0.65rem] sm:text-xs">{match.date}</span>
                        </div>
                      </Link>
                    );
                  })}

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>

  );
};

export default Hero;

