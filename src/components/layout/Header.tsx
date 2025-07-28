

'use client';

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';


import { Search, Clock, MapPin, X, Menu, Ticket, ShoppingBagIcon, ShoppingBasketIcon, ShoppingCartIcon, List } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from '@apollo/client';
import { debounce } from "lodash";

// import { useCurrencyLanguage } from "../../lib/CurrencyLanguageContext";
import { predefinedKeywords } from "../../lib/searchKeywords";
// import { useNavigate } from 'react-router-dom';
import { GET_SEARCH_RESULTS } from "../../api/queries/Search";
import BasketWithTimer from "../BasketWithTimer";
import { GET_BASKET_BY_SESSION } from "../../api/queries/GetBasket";
import { BasketProps } from "../../types/basket";
import { CLEAR_BASKET } from "../../api/queries/ClearBasket";

const DEBOUNCE_DELAY = 300;

const Header = ({
  isScrolledPastHero,
  fixed,
}: {
  isScrolledPastHero: boolean;
  fixed: boolean;
}) => {

const currencies = [
  { id: "1", code: "gbp", symbol: "£", name: "British Pound" },
  { id: "2", code: "eur", symbol: "€", name: "Euro" },
  { id: "3", code: "usd", symbol: "$", name: "US Dollar" },
  { id: "4", code: "chf", symbol: "Fr", name: "Swiss Franc" },
  { id: "5", code: "sek", symbol: "kr", name: "Swedish Krona" },
  { id: "6", code: "nok", symbol: "kr", name: "Norwegian Krone" },
  { id: "7", code: "dkk", symbol: "kr", name: "Danish Krone" },
];

const languages = [
  { id: "1", code: "en", icon: "/uploads/icons/en.png", name: "English" },
  { id: "2", code: "fr", icon: "/uploads/icons/fr.png", name: "French" },
  { id: "3", code: "de", icon: "/uploads/icons/de.svg", name: "German" },
  { id: "4", code: "es", icon: "/uploads/icons/es.svg", name: "Spanish" },
  { id: "5", code: "nl", icon: "/uploads/icons/nl.png", name: "Dutch" },
];

  const router = useRouter();
  const { t, i18n } = useTranslation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [basket, setBasket] = useState<BasketProps>();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(true);
  const [basketItems, setBasketItems] = useState<string[]>([]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [showCurrencySelector, setShowCurrencySelector] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // const { selectedCurrency, setSelectedCurrency, selectedLanguage, setSelectedLanguage } = useCurrencyLanguage();

  const filteredSuggestions = predefinedKeywords.filter((keyword) =>
    keyword.toLowerCase().includes(searchQuery.toLowerCase()) && searchQuery
  );

  const [clearBasket] = useMutation(CLEAR_BASKET, {
    fetchPolicy: "network-only",
  });

  const { data: basketData } = useQuery(GET_BASKET_BY_SESSION, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (basketData?.getBasketBySessionId) {
      setBasket(basketData.getBasketBySessionId);
      setBasketItems(
        basketData.getBasketBySessionId?.listing?.tickets?.map((ticket) => ticket.ticket_id) || []
      );
    }
  }, [basketData]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(() => {
  //   const savedCurrency = localStorage.getItem("selectedCurrency");
  //   setSelectedCurrency(savedCurrency ?? "GBP");

  //   const savedLanguage = localStorage.getItem("selectedLanguage");
  //   setSelectedLanguage(savedLanguage ?? "en");

  //   const handleScroll = () => setIsScrolled(window.scrollY > 10);
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const handleCurrencySelect = (currencyCode: string) => {
    setSelectedCurrency(currencyCode);
    setShowCurrencySelector(false);
  };

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    i18n.changeLanguage(languageCode);
    setShowLanguageSelector(false);
  };

  // const selectedCurrencyData = currencies.find((c) => c.code === selectedCurrency);
  // const selectedLanguageData = languages.find((l) => l.code === selectedLanguage);

  const { data: searchData } = useQuery(GET_SEARCH_RESULTS, {
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

  const debouncedSetSearchTerm = debounce((val: string) => {
    setSearchTerm(val);
    setSearchLoading(true);
  }, 300);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    setShowSuggestions(true);
    debouncedSetSearchTerm(val);
    if (!val.trim()) setShowSuggestions(false);
  };

  const handleSelectSuggestion = (value: any) => {
    setShowSuggestions(false);
    setSearchLoading(true);

    if (value.type === "MatchResult") {
      const newDate = new Date(Number(value.date));
      const day = String(newDate.getUTCDate()).padStart(2, "0");
      const month = newDate.toLocaleString("en-US", { month: "short", timeZone: "UTC" }).toUpperCase();
      const year = newDate.getUTCFullYear();
      const time = newDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC",
      });

      const searchParams = new URLSearchParams({
        homeTeam: value.home_team,
        eventId: value.id,
        eventCode: value.eventCode,
        eventTypeCode: value.eventTypeCode,
        pageNumber: "1",
        eventName: value.title,
        categoryName: value.league,
        day,
        month,
        year: year.toString(),
        time,
        venue: value.venue,
        city: value.city,
        country: value.country,
        minPrice: value.price,
      });

      router.push(`/tickets/${value.slug}?${searchParams.toString()}`);
    } else {
      router.push(`/premier-league/${value.slug}`);
    }
  };

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const handleClearBasket = async () => {
    try {
      const { data } = await clearBasket();
      if (data?.clearBasket?.success) {
        console.log("Basket cleared:", data.clearBasket.message);
      } else {
        console.warn("Failed to clear basket");
      }
    } catch (err) {
      console.error("Clear basket error:", err);
    }
  };


  return (
    <header
      className={`w-full top-0 left-0 z-50 bg-white shadow-md ${fixed ? "fixed" : ""
        }`}
    >
      {/* Top Info Bar */}
      {!isScrolledPastHero && (
        <div className="w-full bg-white text-gray-700 py-2 text-xs sm:text-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center truncate">{t("welcome")}</p>
          </div>
        </div>
      )}

      {/* Logo and Currency Selection */}
      <div className="bg-white py-3 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <div className={`w-full md:w-auto ${searchQuery && isMobile ? 'hidden' : 'block'}`}>
            <Link href="/" className="flex items-center">
              <div>
                <span className="font-bold text-base sm:text-xl md:text-2xl block">
                  Foolball<span className="text-ticket-red">Tickets</span>Hub
                </span>
                <span className="text-[8px] sm:text-xs text-gray-600 block tracking-tight">
                  RELIABLE. SECURE. ENJOY THE MATCH
                </span>
              </div>
            </Link>
          </div>


          {isScrolledPastHero && (
            // <div className="w-full max-w-2xl relative mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`w-full ${searchQuery && isMobile ? 'mt-0' : 'md:max-w-2xl'} relative`}>

              <div className="w-full max-w-3xl mx-auto mt-0">
                {/* Search Input */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 relative">
                  <div className="flex-1 relative">
                    <div className="relative w-full">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={onInputChange}
                        placeholder="Search here..."
                        className="w-full border border-ticket-lightgray rounded-lg p-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-ticket-primarycolor text-black"
                      />

                      {/* Search Icon (left) */}
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />

                      {/* Clear (X) Icon (right) - only show if there's a query */}
                      {searchQuery && (
                        <button
                          onClick={() => {
                            setSearchQuery("");
                            setResults([]);
                            setShowSuggestions(false);
                          }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-ticket-red"
                          aria-label="Clear search"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>




                    {/* Suggestions dropdown */}
                    {showSuggestions && (
                      <div className="absolute z-20 w-full bg-white text-black border border-gray-200 mt-1 rounded-lg max-h-80 overflow-y-auto shadow-lg">
                        {searchLoading ? (
                          <div className="flex justify-center items-center py-6">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-ticket-primarycolor"></div>
                          </div>
                        ) : results.length > 0 ? (
                          <ul>
                            {results.map((item) => {
                              // Format date only for match results
                              let day, month, year, time;

                              if (item.type === "MatchResult") {
                                const newDate = new Date(Number(item.date));
                                day = String(newDate.getUTCDate()).padStart(2, "0");
                                month = newDate
                                  .toLocaleString("en-US", { month: "short", timeZone: "UTC" })
                                  .toUpperCase();
                                year = newDate.getUTCFullYear();
                                time = newDate.toLocaleTimeString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                  timeZone: "UTC",
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
                                      <a className="text-sm hover:underline mt-2 inline-block">
                                        View Club Matches
                                      </a>
                                    </>
                                  ) : (
                                    <>
                                      <div className="grid grid-cols-12 items-center border-gray-200 group cursor-pointer transition">
                                        <div className="col-span-1 bg-gray-50 text-center transition">
                                          <div className="py-1">
                                            <div className="uppercase text-xs text-gray-800">{month}</div>
                                            <div className="text-2xl font-bold group-hover:text-ticket-red">{day}</div>
                                            <div className="text-sm text-gray-400">{year}</div>
                                          </div>
                                        </div>

                                        <div className="col-span-8 pl-4">
                                          <div className="text-xs text-gray-500 uppercase mb-1 group-hover:text-black transition">
                                            {item.league}
                                          </div>
                                          <div className="text-sm font-medium mb-1 group-hover:text-ticket-red transition">
                                            {item.title}
                                          </div>
                                          <div className="flex items-center font-light text-sm text-gray-600 group-hover:text-gray-800 transition whitespace-nowrap overflow-hidden text-ellipsis">
                                            <Clock size={14} className="mr-1 shrink-0" />
                                            <span>{time}</span>
                                            <span className="mx-2">•</span>
                                            <MapPin size={14} className="mr-1 shrink-0" />
                                            <span className="truncate">
                                              {item.venue}, {item.city}, {item.country}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </>
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

                </div>
              </div>
            </div>
          )}

          {/* <div className="flex items-center gap-1"> */}
          {/* <Popover
              open={showCurrencySelector}
              onOpenChange={setShowCurrencySelector}>
              <PopoverTrigger asChild>
                <button className="flex items-center px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none">
                  {selectedCurrencyData ? (
                    <>
                      <span className="mr-2">
                        {selectedCurrencyData.symbol}
                      </span>
                      <span>{selectedCurrencyData.code.toUpperCase()}</span>
                    </>
                  ) : (
                    "Select Currency"
                  )}
                </button>
              </PopoverTrigger>

              <PopoverContent className="w-100 p-4" align="end">
                <div className="bg-ltg-white relative grid p-2 pb-2">
                  <h3 className="font-dosis border-b-ltg-grey-4 border-b pb-2 text-l font-medium">
                    Select your preferred currency
                  </h3>
                  {currencies.map((currency) => (
                    <button
                      key={currency.id}
                      className="border-b-ltg-grey-4 hover:bg-ltg-grey-4 flex items-center gap-5 border-b px-2 py-4 transition duration-150 ease-in-out hover:bg-opacity-10 hover:text-opacity-100"
                      onClick={() => handleCurrencySelect(currency.code)}>
                      <div className="items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 12 16"
                          className="text-ltg-grey-2 h-5 w-8"
                          aria-hidden="true">
                          <text
                            x="50%"
                            y="50%"
                            font-size="1rem"
                            text-anchor="middle"
                            dominant-baseline="central"
                            fill="currentColor">
                            {currency.symbol}
                          </text>
                        </svg>
                      </div>
                      <div>{currency.name}</div>
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover> */}

          {/* <Popover
              open={showLanguageSelector}
              onOpenChange={setShowLanguageSelector}>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-4 px-4 py-2 rounded-r-full border border-gray-300 border-l-0 focus:outline-none">
                  {selectedLanguageData ? (
                    <>
                      <span className="w-6 h-6 flex items-center justify-center">
                        <img
                          src={selectedLanguageData.icon}
                          alt="language icon"
                          className="w-full h-full object-contain"
                        />
                      </span>
                      <span>{selectedLanguageData.name}</span>
                    </>
                  ) : (
                    "Select Language"
                  )}
                </button>
              </PopoverTrigger>

              <PopoverContent className="w-100 p-4" align="end">
                <div className="bg-ltg-white relative grid p-2 pb-2">
                  <h3 className="font-dosis border-b-ltg-grey-4 border-b pb-2 text-l font-medium">
                    Select your preferred Language
                  </h3>
                  {languages.map((language) => (
                    <button
                      key={language.id}
                      className="border-b-ltg-grey-4 hover:bg-ltg-grey-4 flex items-center gap-5 border-b px-2 py-4 transition duration-150 ease-in-out hover:bg-opacity-10 hover:text-opacity-100"
                      onClick={() => handleLanguageSelect(language.code)}>
                      <div className="w-6 h-6 flex items-center justify-center">
                        <span className="w-6 h-6 flex items-center justify-center overflow-hidden rounded">
                          <img
                            src={language.icon}
                            alt="language icon"
                            className="w-full h-full object-cover"
                          />
                        </span>
                      </div>
                      <div>{language.name}</div>
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover> */}
          {/* </div> */}


          {basket && basket.listing.tickets && basket.listing.tickets.length > 0 && (
            <BasketWithTimer
              expiresAt={basket.expires}
              listing={basket.listing}
              onExpire={() => {
                setBasketItems([]);
                // handleClearBasket();
              }}
            />
          )}

        </div>
      </div>


      {/* Hamburger Icon on Mobile - Full-width background */}
      <div className="lg:hidden w-full bg-ticket-primarycolor  px-4 py-2 flex justify-start">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
        </button>
      </div>

      {/* Mobile Menu with animation */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-ticket-primarycolor ${mobileMenuOpen ? 'max-h-[1000px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
          }`}
      >
        <div className="flex flex-col gap-2 px-4 text-white font-semibold">

          <Link href="/" className="hover:text-ticket-red text-sm">HOME</Link>


          <div></div>


          {/* --- PREMIER LEAGUE Section --- */}
          <button
            className="text-left  text-sm hover:text-ticket-red"
            onClick={() => toggleSection('premier-league')}
          >
            PREMIER LEAGUE
          </button>
          <div
            className={`pl-4 text-sm transition-all duration-300 ease-in-out overflow-hidden ${openSection === 'premier-league' ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
              }`}
          >
            <a href="/premier-league/liverpool" className="block py-1  hover:text-ticket-red">Liverpool</a>
            <a href="/premier-league/arsenal" className="block py-1 hover:text-ticket-red">Arsenal</a>
            <a href="/premier-league/manchester-united" className="block py-1 hover:text-ticket-red">Manchester United</a>
            <a href="/premier-league/chelsea" className="block py-1 hover:text-ticket-red">Chelsea</a>
            <a href="/premier-league" className="block py-1 font-thin hover:text-ticket-red">View All</a>
          </div>

          {/* --- ENGLISH CUPS Section --- */}
          <button
            className="text-left text-sm hover:text-ticket-red"
            onClick={() => toggleSection('english-cups')}
          >
            ENGLISH CUPS
          </button>
          <div
            className={`pl-4 text-sm transition-all duration-300 ease-in-out overflow-hidden ${openSection === 'english-cups' ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
              }`}
          >
            <a href="/fa-cup" className="block py-1 hover:text-ticket-red">FA Cup</a>
            <a href="/efl-cup" className="block py-1 hover:text-ticket-red">EFL Cup</a>
            <a href="/community-sheild" className="block py-1 hover:text-ticket-red">Community Sheild</a>
            <a href="/championship-play-off-final" className="block py-1 hover:text-ticket-red">Championship Play Off Final</a>
          </div>


          {/* --- EUROPEAN CUPS Section --- */}
          <button
            className="text-left text-sm hover:text-ticket-red"
            onClick={() => toggleSection('european-cups')}
          >
            EUROPEAN CUPS
          </button>
          <div
            className={`pl-4 text-sm transition-all duration-300 ease-in-out overflow-hidden ${openSection === 'european-cups' ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
              }`}
          >
            <a href="/champions-league" className="block py-1 hover:text-ticket-red">Champions League</a>
            <a href="/europa-league" className="block py-1 hover:text-ticket-red"> Europa League</a>
            <a href="/super-cup" className="block py-1 hover:text-ticket-red">Super Cup</a>
            <a href="/conference-league" className="block py-1 hover:text-ticket-red">Conference League</a>
          </div>

          <Link href="/track" className="py-4 text-sm flex items-center gap-2 hover:text-ticket-red">
            <Ticket />
            <span>Track your tickets</span>
          </Link>

        </div>
      </div>


      {/* Main Navigation */}
      <div className="bg-ticket-primarycolor text-white hidden lg:flex">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between w-full">


            <div className="flex items-center space-x-4">

              <Link
                href="/"
                className="navbar-link px-0 font-bold py-4 whitespace-nowrap hover:text-ticket-red"
              >
                HOME
              </Link>

              <div className="relative group">
                {/* --- Trigger Link --- */}
                <Link
                  href="/premier-league"
                  className="navbar-link px-4 sm:px-8 font-bold py-4 flex items-center group-hover:text-ticket-red whitespace-nowrap"
                >
                  PREMIER LEAGUE
                  {/* <ChevronDown size={18} className="ml-1" /> */}
                </Link>

                {/* --- Full Width Dropdown Directly Below the Link --- */}
                <div className="fixed left-0 w-screen bg-ticket-primarycolor shadow-xl transform scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500 ease-in-out z-40">
                  <div className="max-w-screen-lg mx-auto px-6 flex flex-row space-x-6 sm:space-x-12 items-start flex-wrap">
                    <div className="max-w-screen-md px-4 sm:px-6 py-8 flex flex-col space-y-4 items-start">
                      <a
                        href="/premier-league/liverpool"
                        className="text-lg sm:text-base text-white hover:text-ticket-red transition-colors"
                      >
                        Liverpool
                      </a>
                      <a
                        href="/premier-league/arsenal"
                        className="text-lg sm:text-base text-white hover:text-ticket-red transition-colors"
                      >
                        Arsenal
                      </a>
                      <a
                        href="/premier-league/manchester-united"
                        className="text-lg sm:text-base text-white hover:text-ticket-red transition-colors"
                      >
                        Manchester United
                      </a>
                      <a
                        href="/premier-league/chelsea"
                        className="text-lg sm:text-base text-white hover:text-ticket-red transition-colors"
                      >
                        Chelsea
                      </a>
                    </div>

                    <div className="max-w-screen-md px-4 sm:px-6 py-8 flex flex-col space-y-4 items-start">
                      <a
                        href="/premier-league/nottingham-forest"
                        className="text-lg sm:text-base text-white hover:text-ticket-red transition-colors"
                      >
                        Nottingham Forest
                      </a>
                      <a
                        href="/premier-league/newcastle-united"
                        className="text-lg sm:text-base text-white hover:text-ticket-red transition-colors"
                      >
                        Newcastle
                      </a>
                      <a
                        href="/premier-league/fulham"
                        className="text-lg sm:text-base text-white hover:text-ticket-red transition-colors"
                      >
                        Fulham
                      </a>
                      <a
                        href="/premier-league/wolves"
                        className="text-lg sm:text-base text-white hover:text-ticket-red transition-colors"
                      >
                        Wolves
                      </a>
                    </div>

                    <div className="max-w-screen-md px-4 sm:px-6 py-8 flex flex-col items-start justify-end">
                      <a
                        href="/premier-league"
                        className="text-sm text-ticket-backgroundcolor underline hover:text-ticket-red transition-colors ml-8 mb-4 sm:mb-10"
                      >
                        View All
                      </a>
                    </div>
                  </div>
                </div>
              </div>


              <div className="relative group">
                {/* --- Trigger Link --- */}
                <Link
                  href="/ENGLISH CUPS"
                  className="navbar-link px-4 sm:px-8 font-bold py-4 flex items-center group-hover:text-ticket-red whitespace-nowrap"
                >
                  ENGLISH CUPS
                  {/* <ChevronDown size={18} className="ml-1" /> */}
                </Link>

                {/* --- Full Width Dropdown Directly Below the Link --- */}
                <div className="fixed left-0 w-screen bg-ticket-primarycolor shadow-xl transform scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500 ease-in-out z-40">
                  <div className="max-w-screen-md mx-auto px-4 sm:px-6 py-8 flex flex-col space-y-4 items-start">
                    <div className="flex items-center">
                      <a
                        href="/fa-cup"
                        className="text-lg sm:text-base text-white hover:text-ticket-red transition-colors"
                      >
                        FA Cup
                      </a>
                    </div>
                    <div className="flex items-center">
                      <a
                        href="/efl-cup"
                        className="text-lg sm:text-base text-white hover:text-ticket-red transition-colors"
                      >
                        EFL Cup
                      </a>
                    </div>
                    <div className="flex items-center">
                      <a
                        href="/community-sheild"
                        className="text-lg sm:text-base text-white hover:text-ticket-red transition-colors"
                      >
                        Community Sheild
                      </a>
                    </div>
                    <div className="flex items-center">
                      <a
                        href="/championship-play-off-final"
                        className="text-lg sm:text-base text-white hover:text-ticket-red transition-colors"
                      >
                        Championship Play Off Final
                      </a>
                    </div>
                  </div>
                </div>
              </div>


              <div className="relative group">
                {/* --- Trigger Link --- */}
                <Link
                  href="/european-cups"
                  className="navbar-link px-2 sm:px-4 md:px-8 font-bold py-4 flex items-center group-hover:text-ticket-red whitespace-nowrap"
                  style={{ minWidth: 0 }} // prevent flex overflow
                >
                  EUROPEAN CUPS
                  {/* <ChevronDown size={18} className="ml-1" /> */}
                </Link>

                {/* --- Full Width Dropdown Directly Below the Link --- */}
                <div className="fixed left-0 w-screen bg-ticket-primarycolor shadow-xl transform scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500 ease-in-out z-40">
                  <div className="max-w-screen-md mx-auto px-4 sm:px-6 py-8 pl-6 sm:pl-20 flex flex-col space-y-4 items-start">
                    <div className="flex items-center">
                      <a
                        href="/champions-league"
                        className="text-lg sm:text-base font-light text-white hover:text-ticket-red transition-colors"
                      >
                        Champions League
                      </a>
                    </div>
                    <div className="flex items-center">
                      <a
                        href="/europa-league"
                        className="text-lg sm:text-base font-light text-white hover:text-ticket-red transition-colors"
                      >
                        Europa League
                      </a>
                    </div>
                    <div className="flex items-center">
                      <a
                        href="/super-cup"
                        className="text-lg sm:text-base font-light text-white hover:text-ticket-red transition-colors"
                      >
                        Super Cup
                      </a>
                    </div>
                    <div className="flex items-center">
                      <a
                        href="/conference-league"
                        className="text-lg sm:text-base font-light text-white hover:text-ticket-red transition-colors"
                      >
                        Conference League
                      </a>
                    </div>
                  </div>
                </div>
              </div>


            </div>

            <div className="ml-auto">
              <Link
                href="/track"
                className="navbar-link px-4 py-4 flex items-center whitespace-nowrap"
              >
                <Ticket />
                <div>&nbsp; Track your tickets</div>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;