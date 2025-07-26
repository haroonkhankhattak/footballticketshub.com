import { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useLocation } from "react-router-dom";
import TicketList from "../../components/TicketList";
import StadiumSection from "../../components/tickets/StadiumSection";
import HeroSection from "../../components/tickets/HeroSection";
import { Filter } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { TicketsResponse } from "../../../server/types/tickets";

import FullScreenLoader from "../../components/FullScreenLoader";
import { PRIZE_RANGES } from "../../lib/constants";
import { useQuery } from "@apollo/client/react/hooks";
import { GET_TICKETS_BY_MATCH } from "../../api/queries/TicketsByMatch";
import { Listing } from "./listing";


const Tickets = () => {

  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  // const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListing, setFilteredListing] = useState<Listing[]>([]);
  const [response, setResponse] = useState<TicketsResponse>();
  const [error, setError] = useState<string | null>(null);
  const urlLocation = useLocation();

  const state = urlLocation.state as {
    homeTeam: string;
    eventId: string;
    eventCode: string;
    eventTypeCode: string;
    pageNumber: number;
    eventName: string,
    categoryName: string,
    day: number,
    month: string,
    year: number,
    time: string,
    venue: string,
    city: string,
    country: string
    minPrice: string
  };

  const [ticketQuantity, setTicketQuantity] = useState<"ANY" | number[]>("ANY");
  const [location, setLocation] = useState<string>("ALL");
  const [seatedTogether, setSeatedTogether] = useState<boolean>(false);
  // const [priceRange, setPriceRange] = useState<string>("ALL");

  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: Infinity,
    areas: [] as string[],
    minTickets: 1,
    allowedQuantities: [] as number[],
    minTogatherSeats: 1,
  });

  const [areaNames, setAreaNames] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(PRIZE_RANGES[0]?.value ?? "");
  const [availableTickets, setAvailableTickets] = useState<Listing[]>([]);

  // useEffect(() => {
  //   const handlePageShow = (event: PageTransitionEvent) => {
  //     const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;

  //     if (event.persisted || navEntry?.type === "back_forward") {
  //       window.location.reload();
  //     }
  //   };

  //   window.addEventListener("pageshow", handlePageShow);
  //   return () => window.removeEventListener("pageshow", handlePageShow);
  // }, []);



  const applyFilters = (listings: Listing[]) => {
    const filtered = listings.filter(ticket => {
      const inPriceRange = ticket.price >= filters.minPrice && ticket.price <= filters.maxPrice;
      const inSelectedAreas = filters.areas.length === 0 || filters.areas.includes(ticket.section_stand_name);
      const hasEnoughTickets = ticket.tickets.length >= filters.minTickets;

      // quantity filtering logic
      let matchesQuantity = true;
      if (filters.allowedQuantities.length > 0) {
        const minSelected = Math.min(...filters.allowedQuantities);
        matchesQuantity = ticket.tickets.length >= minSelected;
      }

      console.log("Tickets togather upto :", ticket.togather_upto);
      const meetsTogatherRequirement = filters.minTogatherSeats == null || (Number(ticket.togather_upto)) >= Number(filters.minTogatherSeats);

      return (
        inPriceRange &&
        inSelectedAreas &&
        hasEnoughTickets &&
        matchesQuantity &&
        meetsTogatherRequirement
      );
    });
    setFilteredListing(filtered);
  };


  const handlePriceRangeChange = (value: string) => {
    setPriceRange(value);

    if (value !== "All") {
      const [min, max] = value.split("-").map(v => parseInt(v.trim()));
      setFilters(prev => ({
        ...prev,
        minPrice: min,
        maxPrice: isNaN(max) ? Infinity : max,
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        minPrice: 0,
        maxPrice: Infinity,
      }));
    }
  };


  const handleSeatedTogether = (value: boolean) => {
    setSeatedTogether(value);

    const quantityCount = Array.isArray(ticketQuantity)
      ? Math.max(...ticketQuantity)
      : 1;

    setFilters(prev => ({
      ...prev,
      minTogatherSeats: value && quantityCount > 1 ? quantityCount : 1,
    }));
  };


  const handleQuantityChange = (quantities: number[] | "ANY") => {
    setTicketQuantity(quantities);

    const quantityCount =
      quantities === "ANY" ? 1 : Math.max(...quantities);

    setFilters(prev => ({
      ...prev,
      allowedQuantities: quantities === "ANY" ? [] : quantities,
      minTogatherSeats:
        seatedTogether && quantityCount > 1 ? quantityCount : 1,
    }));
  };


  const handleAreaChange = (value: string) => {
    setLocation(value);

    setFilters(prev => ({
      ...prev,
      areas: value === "All" ? [] : [value],
    }));
  };

  const handleMinTicketsChange = (min: number) => {
    setFilters(prev => ({
      ...prev,
      minTickets: min,
    }));
  };


  const handleClearFilter = () => {
    setFilters({
      minPrice: 0,
      maxPrice: Infinity,
      areas: [],
      minTickets: 1,
      allowedQuantities: [],
      minTogatherSeats: 1
    });

    setPriceRange("All");
    setLocation("All");
    setTicketQuantity("ANY");
    setSeatedTogether(false);
    setSelectedSection(null);
    setSelectedSeat(null);
  };


  const handleAreaClick = (area: string) => {
    setSelectedArea(area);
    setLocation(area);
    setSelectedSeat(null);
  };

  const handleSectionClick = (section: string) => {
    setSelectedSection(section);
    setSelectedSeat(null);
  };

  const handleTicketHover = (ticketArea: string, ticketSection?: string) => {
    setSelectedArea(ticketArea);
    if (ticketSection) {
      setSelectedSeat(ticketSection);
    }
  };

  const handleTicketSelect = (id: string) => {
    const ticket = listings.find((t) => t.listing_id === id);
    if (ticket) {
      setSelectedSeat(ticket.section_tier);
      setSelectedArea(ticket.section_stand_name);
      setSelectedSection(ticket.section_name);
    }
  };

  // const availableTickets: Record<string, Ticket[]> = {
  //   "Anfield": liverpool_tickets,
  //   "Old Trafford": manchester_united_tickets,
  //   "Tottenham Hotspur Stadium": tottenham_hotspur_tickets,
  //   "Craven Cottage": fulham_tickets,
  //   "The City Ground": nottingham_forest_tickets,
  //   "Molineux Stadium": wolverhampton_wanderers_tickets,
  //   "St. James' Park": newcastle_united_tickets,
  //   "Portman Road": ipswich_town_tickets,
  //   "Vitality Stadium": afc_bournemouth_tickets,
  //   "Selhurst Park": crystal_palace_tickets,
  //   "Emirates Stadium": arsenal_tickets,
  //   "Goodison Park": everton_tickets,
  //   "Etihad Stadium": manchester_city_tickets,
  //   "Stamford Bridge": chelsea_tickets,
  //   "Villa Park": aston_villa_tickets,
  //   "London Stadium": west_ham_united_tickets,
  //   "Gtech Community Stadium": brentford_tickets,
  //   "Turf Moor": burnley_tickets,
  //   "Elland Road": leeds_united_tickets,
  //   "Falmer Stadium": brighton_tickets,
  // };


  console.log("State event id :", state.eventId);


  const { data, loading } = useQuery(GET_TICKETS_BY_MATCH, {
    variables: { eventId: state.eventId },
    fetchPolicy: "network-only",
  });


  useEffect(() => {
    if (loading) return; // skip while loading

    if (data?.getListingsByMatch.listings) {
      setListings(data.getListingsByMatch.listings);

      const allStandNames = listings.map(listing => listing.section_stand_name);
      const distinctStandNames = Array.from(new Set(allStandNames));
      setAreaNames(["All", ...distinctStandNames]);

      applyFilters(data.getListingsByMatch.listings);
    }
  }, [filters, data, loading]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header isScrolledPastHero={true} fixed={false} />
      <main className="flex-grow">
        {/* <TrustPilotRow /> */}

        <HeroSection
          {...{
            homeTeam: state.homeTeam,
            eventName: state.eventName,
            categoryName: state.categoryName,
            day: state.day,
            month: state.month,
            year: state.year,
            time: state.time,
            venue: state.venue,
            city: state.city,
            country: state.country,
            minPrice: state.minPrice,
          }}
        />

        {/* {loading && <FullScreenLoader />} */}

        {/* Main Content */}
        <section className="py-8">

          <div className="ticket-container">
            {/* <Breadcrumbs titles={titles} links={links} /> */}

            {/* Mobile Ticket filters */}
            <Card className="bg-white p-2 sm:p-0 rounded-sm block sm:hidden">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8">

                {/* Quantity + Toggle: inline only on mobile */}
                <div className="flex flex-col gap-0">
                  <h3 className="text-sm sm:text-base font-semibold mb-2">How many tickets are you booking?</h3>

                  {/* Wrap both quantity buttons + toggle for mobile */}
                  <div className="flex flex-wrap items-center gap-2">

                    {/* Quantity buttons */}
                    <div className="flex flex-wrap gap-1">
                      {["ANY", 1, 2, 3, 4, 5].map((qty, i) => (
                        <Button
                          key={i}
                          variant={
                            qty === "ANY"
                              ? ticketQuantity === "ANY"
                                ? "default"
                                : "outline"
                              : Array.isArray(ticketQuantity) && ticketQuantity.includes(qty)
                                ? "default"
                                : "outline"
                          }
                          className="px-3 py-1 text-xs sm:text-sm"
                          onClick={() => handleQuantityChange(qty === "ANY" ? "ANY" : [qty])}
                        >
                          {qty === 5 ? "5+" : qty}
                        </Button>
                      ))}
                    </div>

                    {/* Toggle Switch next to buttons on mobile */}
                    <div className="flex flex-col items-center gap-0">
                      <label className="inline-flex items-center ms-2">
                        <input
                          type="checkbox"
                          checked={seatedTogether}
                          onChange={() => handleSeatedTogether(!seatedTogether)}
                          className="sr-only peer"
                        />
                        <div className="relative w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-ticket-red"></div>
                        {/* <span className="ms-2 text-xs sm:text-sm font-medium text-gray-700">Stay together</span> */}
                      </label>
                      <span className="ms-2 text-xs sm:text-sm font-medium text-gray-700">Stay together</span>

                    </div>

                  </div>
                </div>

                {/* Price and Area: inline row only on mobile */}
                <div className="flex gap-2 flex-nowrap">

                  {/* Area / Location - Right Side */}
                  <div className="order-2 w-1/2 flex flex-col gap-0">
                    <h3 className="text-xs font-medium mb-0">Area / Location</h3>
                    <Select value={location} onValueChange={handleAreaChange}>
                      <SelectTrigger className="w-full h-8 text-xs text-black">
                        <SelectValue placeholder="Area" />
                      </SelectTrigger>
                      <SelectContent>
                        {areaNames.map((name) => (
                          <SelectItem key={name} value={name}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price - Left Side */}
                  <div className="order-1 w-1/2 flex flex-col gap-0">
                    <h3 className="text-xs font-medium mb-0">Price</h3>
                    <Select value={priceRange} onValueChange={handlePriceRangeChange}>
                      <SelectTrigger className="w-full h-8 text-xs">
                        <SelectValue placeholder="Price range" />
                      </SelectTrigger>
                      <SelectContent>
                        {PRIZE_RANGES.map((range) => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Preserve these empty divs to maintain 4-column layout on md+ */}
                <div className="hidden md:block" />
                <div className="hidden md:block" />
              </div>
            </Card>

            {/* Desktop Ticket filters */}
            <Card className="bg-white p-2 rounded-sm hidden sm:block">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
                <div>
                  <h3 className="text-base  font-semibold mb-3">
                    How many tickets are you booking?
                  </h3>
                  <div className="flex">
                    <Button
                      variant={ticketQuantity === "ANY" ? "default" : "outline"}
                      className="rounded-l-md rounded-r-none border-r-0"
                      onClick={() => handleQuantityChange("ANY")}>
                      ANY
                    </Button>
                    <Button
                      variant={Array.isArray(ticketQuantity) && ticketQuantity.includes(1) ? "default" : "outline"}
                      className="rounded-none border-r-0"
                      onClick={() => handleQuantityChange([1])}
                    >
                      1
                    </Button>
                    <Button
                      variant={Array.isArray(ticketQuantity) && ticketQuantity.includes(2) ? "default" : "outline"}
                      className="rounded-none border-r-0"
                      onClick={() => handleQuantityChange([2])}
                    >
                      2
                    </Button>
                    <Button
                      variant={Array.isArray(ticketQuantity) && ticketQuantity.includes(3) ? "default" : "outline"}
                      className="rounded-none border-r-0"
                      onClick={() => handleQuantityChange([3])}
                    >
                      3
                    </Button>
                    <Button
                      variant={Array.isArray(ticketQuantity) && ticketQuantity.includes(4) ? "default" : "outline"}
                      className="rounded-none border-r-0"
                      onClick={() => handleQuantityChange([4])}
                    >
                      4
                    </Button>
                    <Button
                      variant={Array.isArray(ticketQuantity) && ticketQuantity.includes(5) ? "default" : "outline"}
                      className="rounded-r-md rounded-l-none"
                      onClick={() => handleQuantityChange([5])}>
                      5+
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col h-full">
                  <div className="mt-auto">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={seatedTogether}
                        onChange={() => handleSeatedTogether(!seatedTogether)}
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ticket-red"></div>
                      <span className="ms-3 text-sm font-medium text-gray-700">
                        Stay together
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-medium mb-3">Price range</h3>

                  <Select value={priceRange} onValueChange={handlePriceRangeChange}>
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select a price range" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRIZE_RANGES.map(range => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>


                </div>

                <div>
                  <h3 className="text-base font-medium mb-3">Area / Location</h3>
                  <Select value={location} onValueChange={handleAreaChange}>
                    <SelectTrigger className="w-full bg-white text-black">
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                    <SelectContent>
                      {areaNames.map((name) => (
                        <SelectItem key={name} value={name}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

              </div>
            </Card>

            <div className="flex justify-between items-center mt-1">
              <div className="text-gray-600 text-xs mt-0 sm:text-sm">
                <span className="text-gray-800">
                  <strong>{filteredListing.length} results</strong>
                </span>{" "}
                based on your search
              </div>
              <Button
                onClick={handleClearFilter}
                variant="outline"
                size="sm"
                className="text-gray-600 gap-1 text-sm">
                <Filter size={16} />
                Clear all filters
              </Button>
            </div>

            {/* Available tickets section */}
            {filteredListing.length > 0 && (
              <div className="mt-4  pb-4">
                <h2 className="text-sm mt-0 sm:text-xl font-semibold">Available Tickets</h2>
                <p className="text-gray-600 text-xs mt-0 sm:text-sm">
                  Tickets are listed by trusted partners competing to offer the best seats at the lowest prices. Select your seats, choose quantity, and click 'Buy Now' to continue.
                </p>
              </div>
            )}

            <hr className="mt-4 mb-4"></hr>


            {/* Desktop view */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-5" >
                  <div className="lg:col-span-5 max-h-[calc(130vh-100px)] overflow-y-auto pr-2 mt-1">
                    {loading ? (
                      <div className="w-full py-6 flex items-center justify-center bg-white/60">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-ticket-primarycolor border-gray-200"></div>
                      </div>
                    ) : filteredListing.length === 0 ? (
                      <div className="text-center text-muted-foreground py-10">
                        No tickets available for this match.
                      </div>

                    ) : (
                      <TicketList
                        listings={filteredListing}
                        selectedSeat={selectedSeat}
                        areaNames={areaNames}
                        onTicketHover={(area, section) => handleTicketHover(area, section)}
                        onTicketSelect={handleTicketSelect}
                        selectedArea={selectedArea}
                        selectedSection={selectedSection}
                      />
                    )}
                  </div>
                </div>


                {/* Right Column - 2D Stadium View */}
                <div className="lg:col-span-7">
                  <div className="sticky top-0">

                    <StadiumSection
                      venue={state.venue}
                      selectedArea={selectedSection}
                      onAreaClick={handleSectionClick}
                      availableListing={filteredListing}
                    />
                    {/* <MatchInfo /> */}
                  </div>
                </div>

              </div>
            </div>


            {/* Mobile view */}
            <div className="block lg:hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Stadium section (always on top on mobile) */}
                <div className="lg:col-span-7 order-1 lg:order-none">
                  <div className="sticky top-0">
                    <StadiumSection
                      venue={state.venue}
                      selectedArea={selectedSection}
                      onAreaClick={handleSectionClick}
                      availableListing={filteredListing}
                    />
                  </div>
                </div>

                {/* Ticket list (moved below on mobile) */}
                <div className="lg:col-span-5 order-2 lg:order-none">
                  <div className="max-h-[calc(145vh-100px)] overflow-y-auto pr-2 mt-8">
                    {loading ? (
                      <div className="text-center py-10">Loading tickets...</div>
                    ) : filteredListing.length === 0 ? (
                      <div className="text-center text-muted-foreground py-10">
                        No tickets available for this match.
                      </div>
                    ) : (
                      <TicketList
                        listings={filteredListing}
                        selectedSeat={selectedSeat}
                        areaNames={areaNames}
                        onTicketHover={(area, section) => handleTicketHover(area, section)}
                        onTicketSelect={handleTicketSelect}
                        selectedArea={selectedArea}
                        selectedSection={selectedSection}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Tickets;
