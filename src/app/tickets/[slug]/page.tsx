'use client';

import { useEffect, useState } from "react";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import TicketList from "../../../components/TicketList";
import StadiumSection from "../../../components/tickets/StadiumSection";
import HeroSection from "../../../components/tickets/HeroSection";
import { Filter } from "lucide-react";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { PRIZE_RANGES } from "../../../lib/constants";
import { useLazyQuery, useQuery } from "@apollo/client/react/hooks";
import { GET_TICKETS_BY_MATCH } from "../../../api/queries/TicketsByMatch";
import { Listing } from "../../../types/listing";
import { useParams } from "next/navigation";
import { GET_MATCHE_BY_SLUG } from "../../../api/queries/MatcheBySlug";
import { Match } from "../../../types/match";
import { GET_STAND_NAMES_BY_VENUE } from "../../../api/queries/GetStandNames";
import { Stand } from "../../../types/Stands";

const Tickets = () => {

  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [match, setMatch] = useState<Match>(null);
  const [stands, setStands] = useState<Stand[]>([{ stand_name: "All" }]);
  const [filteredListing, setFilteredListing] = useState<Listing[]>([]);
  const { slug } = useParams();


  const [ticketQuantity, setTicketQuantity] = useState<"ANY" | number[]>("ANY");
  const [location, setLocation] = useState<string>("ALL");
  const [seatedTogether, setSeatedTogether] = useState<boolean>(false);

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

// 1. Load the match data by slug
const { data: matchData, loading: matchLoading } = useQuery(GET_MATCHE_BY_SLUG, {
  variables: { slug },
  fetchPolicy: "network-only",
});

// 2. Prepare lazy query for stand names
const [getStands, { data: standsData }] = useLazyQuery(GET_STAND_NAMES_BY_VENUE, {
  fetchPolicy: "network-only",
});

// 3. Once matchData is available, trigger the second query
useEffect(() => {
  if (matchData?.matchBySlug) {
    const match = matchData.matchBySlug;
    setMatch(match);

    // Fetch stands using the stadium_id
    if (match.stadium_id) {
      getStands({ variables: { venue: match.stadium_id } });
    }
  }
}, [matchData]);

// 4. When stand data is available, update state
useEffect(() => {
  if (standsData?.standNamesByVenue) {
    setStands([{ stand_name: "All" }, ...standsData.standNamesByVenue]);
  }
}, [standsData]);


  const applyFilters = (listings: Listing[]) => {
    const filtered = listings.filter(ticket => {
      const inPriceRange = ticket.price >= filters.minPrice && ticket.price <= filters.maxPrice;
      const areaFilterIsActive = filters.areas.length > 0 && !filters.areas.includes("All");

      const inSelectedAreas =
        !areaFilterIsActive || filters.areas.some(area =>
          area.toLowerCase() === ticket.section_stand_name.toLowerCase()
        ); const hasEnoughTickets = ticket.tickets.length >= filters.minTickets;

      // quantity filtering logic
      let matchesQuantity = true;
      if (filters.allowedQuantities.length > 0) {
        const minSelected = Math.min(...filters.allowedQuantities);
        matchesQuantity = ticket.tickets.length >= minSelected;
      }

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



  const { data: ticketData,
    loading: ticketLoading } = useQuery(GET_TICKETS_BY_MATCH, {
      variables: { eventId: match?.id },
      fetchPolicy: "network-only",
    });


  useEffect(() => {
    if (ticketLoading) return;

    if (ticketData?.getListingsByMatch.listings) {
      setListings(ticketData.getListingsByMatch.listings);
      const allStandNames = listings.map(listing => listing.section_stand_name);
      const distinctStandNames = Array.from(new Set(allStandNames));
      setAreaNames(["All", ...distinctStandNames]);


      // const newListings = ticketData.getListingsByMatch.listings;
      // setListings(newListings);
      // const distinctStandNames = [...new Set(newListings.map(l => l.section_stand_name))];
      // setAreaNames(["All", ...distinctStandNames]);


      applyFilters(ticketData.getListingsByMatch.listings);
    }
  }, [filters, ticketData, ticketLoading]);

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

        {match && (
          <div>
            <HeroSection
              homeTeam={match.home_team}
              eventName={match.title}
              categoryName={match.league}
              date={match.date}
              venue={match.venue}
              city={match.city}
              country={match.country}
              minPrice={match.price_starts_from}
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
                            {stands.map((item, index) => (
                              <SelectItem key={index} value={item['stand_name']}>
                                {item['stand_name']}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Price - Left Side */}
                      {/* <div className="order-1 w-1/2 flex flex-col gap-0">
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
                      </div> */}
                    </div>

                    {/* Preserve these empty divs to maintain 4-column layout on md+ */}
                    <div className="hidden md:block" />
                    <div className="hidden md:block" />
                  </div>
                </Card>

                {/* Desktop Ticket filters */}
                <Card className="bg-white p-2 rounded-sm hidden sm:block">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
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
                            Seat together
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* <div>
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


                    </div> */}

                    <div>
                      <h3 className="text-base font-medium mb-3">Stand / Block</h3>
                      <Select value={location} onValueChange={handleAreaChange}>
                        <SelectTrigger className="w-full bg-white text-black">
                          <SelectValue placeholder="All" />

                        </SelectTrigger>
                        <SelectContent>
                          {stands.map((item, index) => (
                            <SelectItem key={index} value={item['stand_name']}>
                              {item['stand_name']}
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
                      <div className="lg:col-span-5 max-h-[calc(130vh-100px)] overflow-y-auto pr-2 mt-1 thin-scrollbar">
                        {ticketLoading ? (
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
                          venue={match?.venue}
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
                          venue={match?.venue}
                          selectedArea={selectedSection}
                          onAreaClick={handleSectionClick}
                          availableListing={filteredListing}
                        />
                      </div>
                    </div>

                    {/* Ticket list (moved below on mobile) */}
                    <div className="lg:col-span-5 order-2 lg:order-none">
                      <div className="max-h-[calc(145vh-100px)] overflow-y-auto pr-2 mt-0">
                        {ticketLoading ? (
                          <div className="text-center py-10">Loading tickets...</div>
                        ) : filteredListing.length === 0 ? (
                          <div className="text-center text-muted-foreground py-0">
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
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Tickets;
