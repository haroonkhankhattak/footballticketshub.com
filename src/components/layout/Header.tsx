import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { GetServerSideProps } from "next";
import { client } from "@/lib/graphql/apollo-client";

import { GET_UPCOMING_POPULAR_MATCHES } from "../../lib/graphql/queries/PopularUpcomingMatches";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await client.query({
      query: GET_UPCOMING_POPULAR_MATCHES,
    });

    return {
      props: {
        posts: data.posts,
      },
    };
  } catch (error) {
    console.error("Apollo SSR error:", error);
    return { props: { posts: [] } };
  }
};

const Header = ({
  isScrolledPastHero,
  fixed,
}: {
  isScrolledPastHero: boolean;
  fixed: boolean;
}) => {
  const currencies = [
    { id: "1", code: "GBP", symbol: "£", name: "British Pound" },
    { id: "2", code: "EUR", symbol: "€", name: "Euro" },
    { id: "3", code: "USD", symbol: "$", name: "US Dollar" },
    { id: "4", code: "CHF", symbol: "Fr", name: "Swiss Franc" },
    { id: "5", code: "SEK", symbol: "kr", name: "Swedish Krona" },
    { id: "6", code: "NOK", symbol: "kr", name: "Norwegian Krone" },
    { id: "7", code: "DKK", symbol: "kr", name: "Danish Krone" },
  ];

  const languages = [
    { id: "1", code: "en", icon: "/uploads/icons/en.png", name: "English" },
    { id: "2", code: "fr", icon: "/uploads/icons/fr.png", name: "French" },
    { id: "3", code: "de", icon: "/uploads/icons/de.svg", name: "German" },
    { id: "4", code: "es", icon: "/uploads/icons/es.svg", name: "Spanish" },
    { id: "5", code: "nl", icon: "/uploads/icons/nl.png", name: "Dutch" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [showCurrencySelector, setShowCurrencySelector] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);

  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedCurrency = localStorage.getItem("selectedCurrency");
    setSelectedCurrency(savedCurrency ?? "GBP");

    const savedLanguage = localStorage.getItem("selectedLanguage");
    setSelectedLanguage(savedLanguage ?? "en");

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCurrencySelect = (currencyCode: string) => {
    setSelectedCurrency(currencyCode);
    localStorage.setItem("selectedCurrency", currencyCode);
    setShowCurrencySelector(false);
  };

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    i18n.changeLanguage(languageCode);
    localStorage.setItem("selectedLanguage", languageCode);
    setShowLanguageSelector(false);
  };

  // Find the selected currency from the local list
  const selectedCurrencyData = currencies.find(
    (currency) => currency.code === selectedCurrency
  );

  const selectedLanguageData = languages.find(
    (language) => language.code === selectedLanguage
  );

  return (
    <header
      className={`w-full top-0 left-0 z-50 bg-white shadow-md ${
        fixed ? "fixed" : ""
      }`}>
      {/* Top Info Bar */}
      {!isScrolledPastHero && (
        <div className="w-full bg-white text-gray-700 py-2 text-sm border-b">
          <div className="ticket-container">
            <p className="text-center">{t("welcome")}</p>
          </div>
        </div>
      )}

      {/* Logo and Currency Selection */}
      <div className="bg-white py-3 border-b">
        <div className="ticket-container flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <div>
              <span className="font-bold text-2xl">
                Foolball<span className="text-ticket-red">Tickets</span>Hub
              </span>
              <span className="text-xs text-gray-600 block tracking-tight">
                RELIABLE. SECURE. ENJOY THE MATCH
              </span>
            </div>
          </Link>

          {isScrolledPastHero && (
            <div className="w-full  max-w-2xl relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for team, match, stadium or city"
                className="w-full bg-gray-200 py-2 px-5 pr-12 rounded-md text-black text-lg focus:outline-none"
              />
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Search size={24} />
              </button>
            </div>
          )}

          <div className="flex items-center gap-1">
            <Popover
              open={showCurrencySelector}
              onOpenChange={setShowCurrencySelector}>
              <PopoverTrigger asChild>
                <button className="flex items-center px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none">
                  {selectedCurrencyData ? (
                    <>
                      <span className="mr-2">
                        {selectedCurrencyData.symbol}
                      </span>
                      <span>{selectedCurrencyData.code}</span>
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
            </Popover>

            <Popover
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
            </Popover>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-ticket-primarycolor text-white">
        <div className="ticket-container">
          <nav className="flex justify-between">
            <div className="flex">
              <Link
                to="/"
                className="navbar-link px-0 font-bold py-4 whitespace-nowrap hover:text-ticket-red">
                HOME
              </Link>

              <div className="relative group">
                {/* --- Trigger Link --- */}
                <Link
                  to="/premier-league"
                  className="navbar-link px-8 font-bold py-4 flex items-center group-hover:text-ticket-red whitespace-nowrap">
                  PREMIER LEAGUE
                  {/* <ChevronDown size={18} className="ml-1" /> */}
                </Link>

                {/* --- Full Width Dropdown Directly Below the Link --- */}
                <div className="fixed left-0 w-screen bg-ticket-primarycolor shadow-xl transform scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500 ease-in-out z-40">
                  <div className="max-w-screen-lg mx-auto px-6 flex flex-row space-x-12 items-start">
                    <div className="max-w-screen-md px-6 py-8 flex flex-col space-y-4 items-start">
                      <div className="flex items-center">
                        {/* <img
                          src="/uploads/teamlogo/Liverpool.webp" // Add logo image URL
                          alt={`${name} logo`}
                          className="w-6 h-6 object-contain mr-2" // Adjust size and margin
                        /> */}
                        <a
                          href="/matches?team=Liverpool&league=Premier League"
                          className="text-l text-white hover:text-ticket-red transition-colors">
                          Liverpool
                        </a>
                      </div>

                      <div className="flex items-center">
                        {/* <img
                          src="/uploads/teamlogo/Arsenal.webp" // Add logo image URL
                          alt={`${name} logo`}
                          className="w-6 h-6 object-contain mr-2" // Adjust size and margin
                        /> */}
                        <a
                          href="/matches?team=Liverpool&league=Premier League"
                          className="text-l text-white hover:text-ticket-red transition-colors">
                          Arsenal
                        </a>
                      </div>

                      <div className="flex items-center">
                        {/* <img
                          src="/uploads/teamlogo/manchester_united.webp" // Add logo image URL
                          alt={`${name} logo`}
                          className="w-6 h-6 object-contain mr-2" // Adjust size and margin
                        /> */}
                        <a
                          href="/matches?team=Liverpool&league=Premier League"
                          className="text-l text-white hover:text-ticket-red transition-colors">
                          Manchester United
                        </a>
                      </div>

                      <div className="flex items-center">
                        {/* <img
                          src="/uploads/teamlogo/Chelsea.webp" // Add logo image URL
                          alt={`${name} logo`}
                          className="w-6 h-6 object-contain mr-2" // Adjust size and margin
                        /> */}
                        <a
                          href="/matches?team=Liverpool&league=Premier League"
                          className="text-l text-white hover:text-ticket-red transition-colors">
                          Chelsea
                        </a>
                      </div>
                    </div>

                    <div className="max-w-screen-md px-6 py-8 flex flex-col space-y-4 items-start">
                      <div className="flex items-center">
                        {/* <img
                          src="/uploads/teamlogo/nottingham_forest.webp" // Add logo image URL
                          alt={`${name} logo`}
                          className="w-6 h-6 object-contain mr-2" // Adjust size and margin
                        /> */}
                        <a
                          href="/matches?team=Liverpool&league=Premier League"
                          className="text-l text-white hover:text-ticket-red transition-colors">
                          Nottingham Forest
                        </a>
                      </div>

                      <div className="flex items-center">
                        {/* <img
                          src="/uploads/teamlogo/newcastle.webp" // Add logo image URL
                          alt={`${name} logo`}
                          className="w-6 h-6 object-contain mr-2" // Adjust size and margin
                        /> */}
                        <a
                          href="/matches?team=Liverpool&league=Premier League"
                          className="text-l text-white hover:text-ticket-red transition-colors">
                          NewCastle
                        </a>
                      </div>

                      <div className="flex items-center">
                        {/* <img
                          src="/uploads/teamlogo/fulham.webp" // Add logo image URL
                          alt={`${name} logo`}
                          className="w-6 h-6 object-contain mr-2" // Adjust size and margin
                        /> */}
                        <a
                          href="/matches?team=Liverpool&league=Premier League"
                          className="text-l text-white hover:text-ticket-red transition-colors">
                          Fulham
                        </a>
                      </div>

                      <div className="flex items-center">
                        {/* <img
                          src="/uploads/teamlogo/wolves.webp" // Add logo image URL
                          alt={`${name} logo`}
                          className="w-6 h-6 object-contain mr-2" // Adjust size and margin
                        /> */}
                        <a
                          href="/matches?team=Liverpool&league=Premier League"
                          className="text-l text-white hover:text-ticket-red transition-colors">
                          Wolves
                        </a>
                      </div>
                    </div>

                    <div className="max-w-screen-md px-6 py-8 flex flex-col space-y-4 items-start">
                      <div className="flex items-end mb-10 ml-8">
                        <a
                          href="/league?league=Premier League"
                          className="text-sm text-ticket-backgroundcolor underline hover:text-ticket-red transition-colors">
                          View All
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                {/* --- Trigger Link --- */}
                <Link
                  to="/premier-league"
                  className="navbar-link px-8 font-bold py-4 flex items-center group-hover:text-ticket-red whitespace-nowrap">
                  ENGLISH CUPS
                  {/* <ChevronDown size={18} className="ml-1" /> */}
                </Link>

                {/* --- Full Width Dropdown Directly Below the Link --- */}
                <div className="fixed left-0 w-screen bg-ticket-primarycolor shadow-xl transform scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500 ease-in-out z-40">
                  <div className="max-w-screen-md mx-auto px-6 py-8 flex flex-col space-y-4 items-start">
                    <div className="flex items-center">
                      {/* <img
                        src="/uploads/leaguelogo/fa_cup.png" // Add logo image URL
                        alt={`${name} logo`}
                        className="w-6 h-6 object-contain mr-2" // Adjust size and margin
                      /> */}
                      <a
                        href="/matches?team=Liverpool&league=Premier League"
                        className="text-l text-white hover:text-ticket-red transition-colors">
                        FA Cup
                      </a>
                    </div>
                    <div className="flex items-center">
                      {/* <img
                        src="/uploads/leaguelogo/efl_cup.png" // Add logo image URL
                        alt={`${name} logo`}
                        className="w-6 h-6 object-contain mr-2" // Adjust size and margin
                      /> */}
                      <a
                        href="/matches?team=Liverpool&league=Premier League"
                        className="text-l text-white hover:text-ticket-red transition-colors">
                        EFL Cup
                      </a>
                    </div>
                    <div className="flex items-center">
                      {/* <img
                        src="/uploads/leaguelogo/community_shield.png" // Add logo image URL
                        alt={`${name} logo`}
                        className="w-6 h-6 object-contain mr-2" // Adjust size and margin
                      /> */}
                      <a
                        href="/matches?team=Liverpool&league=Premier League"
                        className="text-l text-white hover:text-ticket-red transition-colors">
                        Community Sheild
                      </a>
                    </div>
                    <div className="flex items-center">
                      {/* <img
                        src="/uploads/leaguelogo/championship_play_offs.webp" // Add logo image URL
                        alt={`${name} logo`}
                        className="w-6 h-6 object-contain mr-2" // Adjust size and margin
                      /> */}
                      <a
                        href="/matches?team=Liverpool&league=Premier League"
                        className="text-l  text-white hover:text-ticket-red transition-colors">
                        Championship Play Off Final
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                {/* --- Trigger Link --- */}
                <Link
                  to="/premier-league"
                  className="navbar-link px-8 font-bold py-4 flex items-center group-hover:text-ticket-red whitespace-nowrap">
                  EUROPEAN CUPS
                  {/* <ChevronDown size={18} className="ml-1" /> */}
                </Link>

                {/* --- Full Width Dropdown Directly Below the Link --- */}
                <div className="fixed left-0 w-screen bg-ticket-primarycolor shadow-xl transform scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500 ease-in-out z-40">
                  <div className="max-w-screen-md mx-auto px-6 py-8 pl-20 flex flex-col space-y-4 items-start">
                    <div className="flex items-center">
                      <a
                        href="/matches?team=Liverpool&league=Premier League"
                        className="text-l font-light text-white hover:text-ticket-red transition-colors">
                        Champions League
                      </a>
                    </div>
                    <div className="flex items-center">
                      <a
                        href="/matches?team=Liverpool&league=Premier League"
                        className="text-l font-light text-white hover:text-ticket-red transition-colors">
                        Europa League
                      </a>
                    </div>
                    <div className="flex items-center">
                      <a
                        href="/matches?team=Liverpool&league=Premier League"
                        className="text-l font-light text-white hover:text-ticket-red transition-colors">
                        Super Cup
                      </a>
                    </div>
                    <div className="flex items-center">
                      <a
                        href="/matches?team=Liverpool&league=Premier League"
                        className="text-l font-light text-white hover:text-ticket-red transition-colors">
                        Conference League
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="group relative">
                <Link
                  to="/international"
                  className="navbar-link px-4 py-4 font-bold flex items-center whitespace-nowrap"
                >
                  INTERNATIONAL
                  <ChevronDown size={18} className="ml-1" />
                </Link>

                <div className="bg-ltg-white border-b-ltg-grey-4 shadow-ltg-grey-2 absolute z-10 hidden space-y-2 rounded-b-md px-4 py-2 shadow-lg group-hover:block bg-white min-w-[200px]">

                  <a href="/competition/world-cup-2026.html" className="border-b-ltg-grey-4 block min-w-[250px] border-b-2 py-3 text-left text-base text-black last:border-b-0 hover:text-opacity-50">World Cup 2026</a>

                  <a href="/competition/euro-cup-2028.html" className="border-b-ltg-grey-4 block min-w-[250px] border-b-2 py-3 text-left text-base text-black last:border-b-0 hover:text-opacity-50">Euro Cup 2028</a>

                  <a href="/competition/nations-league.html" className="border-b-ltg-grey-4 block min-w-[250px] border-b-2 py-3 text-left text-base text-black last:border-b-0 hover:text-opacity-50">Nations League</a>

                  <a href="/competition/copa-america.html" className="border-b-ltg-grey-4 block min-w-[250px] border-b-2 py-3 text-left text-base text-black last:border-b-0 hover:text-opacity-50">Copa America</a>

                </div>
              </div>

              <div className="group relative">
                <Link
                  to="/other-competitions"
                  className="navbar-link font-bold px-4 py-4 flex items-center whitespace-nowrap"
                >
                  OTHER COMPETITIONS
                  <ChevronDown size={18} className="ml-1" />
                </Link>
                <div className="bg-ltg-white border-b-ltg-grey-4 shadow-ltg-grey-2 absolute z-10 hidden space-y-2 rounded-b-md px-4 py-2 shadow-lg group-hover:block bg-white min-w-[200px]">

                  <a href="/english-championship-tickets.html" className="border-b-ltg-grey-4 block min-w-[250px] border-b-2 py-3 text-left text-base text-black last:border-b-0 hover:text-opacity-50">English Championship</a><a href="/la-liga-tickets.html" className="border-b-ltg-grey-4 block min-w-[250px] border-b-2 py-3 text-left text-base text-black last:border-b-0 hover:text-opacity-50">Spanish La Liga</a><a href="/segunda-division-tickets.html" className="border-b-ltg-grey-4 block min-w-[250px] border-b-2 py-3 text-left text-base text-black last:border-b-0 hover:text-opacity-50">Spanish Segunda Division</a><a href="/spl-tickets.html" className="border-b-ltg-grey-4 block min-w-[250px] border-b-2 py-3 text-left text-base text-black last:border-b-0 hover:text-opacity-50">Scottish Premier League</a><a href="/bundesliga-tickets.html" className="border-b-ltg-grey-4 block min-w-[250px] border-b-2 py-3 text-left text-base text-black last:border-b-0 hover:text-opacity-50">German Bundesliga</a><a href="/serie-a-tickets.html" className="border-b-ltg-grey-4 block min-w-[250px] border-b-2 py-3 text-left text-base text-black last:border-b-0 hover:text-opacity-50">Italian Serie A</a><a href="/eredivisie-tickets.html" className="border-b-ltg-grey-4 block min-w-[250px] border-b-2 py-3 text-left text-base text-black last:border-b-0 hover:text-opacity-50">Dutch Eredivisie</a><a href="/ligue-1-tickets.html" className="border-b-ltg-grey-4 block min-w-[250px] border-b-2 py-3 text-left text-base text-black last:border-b-0 hover:text-opacity-50">French Ligue 1</a><a href="/portuguese-liga-tickets.html" className="border-b-ltg-grey-4 block min-w-[250px] border-b-2 py-3 text-left text-base text-black last:border-b-0 hover:text-opacity-50">Portuguese Liga</a><a href="/mls-tickets.html" className="border-b-ltg-grey-4 block min-w-[250px] border-b-2 py-3 text-left text-base text-black last:border-b-0 hover:text-opacity-50">MLS USA</a><a href="/friendly-matches-tickets.html" className="border-b-ltg-grey-4 block min-w-[250px] border-b-2 py-3 text-left text-base text-black last:border-b-0 hover:text-opacity-50">Friendly Matches</a><a href="/nfl-london-tickets.html" className="border-b-ltg-grey-4 block min-w-[250px] border-b-2 py-3 text-left text-base text-black last:border-b-0 hover:text-opacity-50">NFL London</a></div>
              </div> */}
            </div>

            <Link
              to="/track"
              className="navbar-link px-4 py-4 flex items-center whitespace-nowrap">
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15.2859 4.15912C15.6826 4.13044 16 3.78624 16 3.3273V1.7497C16 0.774457 15.286 0 14.3868 0H1.61322C0.71405 0 0 0.774457 0 1.7497V3.35598C0 3.78624 0.317355 4.15912 0.71405 4.18781C1.45455 4.27386 2.00992 4.96226 2.00992 5.79409C2.00992 6.62591 1.45455 7.31432 0.71405 7.37169C0.317355 7.40037 0 7.77326 0 8.20351V9.78111C0 10.7563 0.71405 11.5308 1.61322 11.5308H14.3868C15.286 11.5308 16 10.7563 16 9.78111V8.20351C16 7.77326 15.6826 7.40037 15.2859 7.37169C14.5455 7.28563 13.9901 6.59723 13.9901 5.7654C13.9901 4.9049 14.5455 4.21649 15.2859 4.15912ZM14.8099 8.5764V9.78111C14.8099 10.0393 14.6248 10.24 14.3868 10.24H7.90744V8.69113C7.90744 8.34693 7.64297 8.03141 7.29917 8.03141C6.95537 8.03141 6.69091 8.31824 6.69091 8.69113V10.24H1.61322C1.37521 10.24 1.19008 10.0393 1.19008 9.78111V8.63376C2.35372 8.34693 3.2 7.19958 3.2 5.82277C3.2 4.47464 2.35372 3.29861 1.19008 2.98309V1.7497C1.19008 1.49155 1.37521 1.29076 1.61322 1.29076H6.71736V2.83968C6.71736 3.18388 6.98182 3.4994 7.32562 3.4994C7.66942 3.4994 7.93388 3.21256 7.93388 2.83968V1.29076H14.3868C14.6248 1.29076 14.8099 1.49155 14.8099 1.7497V2.92573C13.6463 3.24125 12.8 4.38859 12.8 5.7654C12.8 7.11353 13.6463 8.26088 14.8099 8.5764Z"
                  fill="#fff"></path>
                <path
                  d="M7.32567 4.38867C7.00832 4.38867 6.71741 4.67551 6.71741 5.04839V6.51126C6.71741 6.85546 6.98187 7.17098 7.32567 7.17098C7.66947 7.17098 7.93394 6.88414 7.93394 6.51126V5.04839C7.90749 4.67551 7.64303 4.38867 7.32567 4.38867Z"
                  fill="#fff"></path>
              </svg>
              <div>&nbsp; Track your tickets</div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
