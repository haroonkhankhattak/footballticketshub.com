import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import TrustPilotRow from "../../components/TrustpilotRow";
import Footer from "../../components/layout/Footer";
// import HeroSection from "../../components/Hero";
import Breadcrumbs from "../../components/Breadcrumbs";
import TicketList from "../../components/TicketList";
import SupportInfo from "../../components/tickets/SupportInfo";
import StadiumSection from "../../components/tickets/StadiumSection";
import MatchInfo from "../../components/tickets/MatchInfo";
import HeroSection from "../../components/tickets/HeroSection";
import { Calendar, MapPin, CheckCircle, Info, Filter } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Tickets = () => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const titles = ["Home", "Premier League", "Liverpool vs Arsenal"];
  const links = [
    "/",
    "/league?league=Premier League",
    "/matches?team=Liverpool",
  ];

  const [ticketQuantity, setTicketQuantity] = useState<string>("ANY");
  const [priceRange, setPriceRange] = useState<string>("£199 - £1,000");
  const [location, setLocation] = useState<string>("All");
  const [seatedTogether, setSeatedTogether] = useState<boolean>(false);
  const tickets = [

    {
      id: 1,
      match: "Liverpool vs West Ham United",
      date: "14 April 2025",
      time: "15:00",
      competition: "Premier League",
      venue: "Anfield, Liverpool",
      area: "main-stand-lower-tier",
      section: "L10",
      row: "22",
      price: 350,
      availability: 8,
    },
    {
      id: 2,
      match: "Liverpool vs West Ham United",
      date: "14 April 2025",
      time: "15:00",
      competition: "Premier League",
      venue: "Anfield, Liverpool",
      area: "the-kop",
      section: "204",
      row: "15",
      price: 550,
      availability: 4,
    },
    {
      id: 3,
      match: "Liverpool vs West Ham United",
      date: "14 April 2025",
      time: "15:00",
      competition: "Premier League",
      venue: "Anfield, Liverpool",
      area: "kenny-dalglish-stand-lower-tier",
      section: "KJ",
      row: "10",
      price: 675,
      availability: 12,
    },
    {
      id: 4,
      match: "Liverpool vs West Ham United",
      date: "14 April 2025",
      time: "15:00",
      competition: "Premier League",
      venue: "Anfield, Liverpool",
      area: "anfield-road-upper",
      section: "AU4",
      row: "18",
      price: 725,
      availability: 6,
    },
    {
      id: 5,
      match: "Liverpool vs West Ham United",
      date: "14 April 2025",
      time: "15:00",
      competition: "Premier League",
      venue: "Anfield, Liverpool",
      area: "main-stand-lower-tier",
      section: "M3",
      row: "5",
      price: 800,
      availability: 3,
    },
    {
      id: 6,
      match: "Liverpool vs West Ham United",
      date: "14 April 2025",
      time: "15:00",
      competition: "Premier League",
      venue: "Anfield, Liverpool",
      area: "the-kop",
      section: "305",
      row: "7",
      price: 950,
      availability: 2,
    },
    {
      id: 7,
      match: "Liverpool vs West Ham United",
      date: "14 April 2025",
      time: "15:00",
      competition: "Premier League",
      venue: "Anfield, Liverpool",
      area: "kenny-dalglish-stand-lower-tier",
      section: "KJ",
      row: "10",
      price: 375,
      availability: 12,
    },
    {
      id: 8,
      match: "Liverpool vs West Ham United",
      date: "14 April 2025",
      time: "15:00",
      competition: "Premier League",
      venue: "Anfield, Liverpool",
      area: "kenny-dalglish-stand-lower-tier",
      section: "KJ",
      row: "10",
      price: 1125,
      availability: 12,
    },
    {
      id: 9,
      match: "Liverpool vs West Ham United",
      date: "14 April 2025",
      time: "15:00",
      competition: "Premier League",
      venue: "Anfield, Liverpool",
      area: "anfield-road-upper",
      section: "AU3",
      row: "10",
      price: 500,
      availability: 12,
    },
    {
      id: 10,
      match: "Liverpool vs West Ham United",
      date: "14 April 2025",
      time: "15:00",
      competition: "Premier League",
      venue: "Anfield, Liverpool",
      area: "anfield-road-upper",
      section: "AU3",
      row: "10",
      price: 725,
      availability: 12,
    },
    {
      id: 11,
      match: "Liverpool vs West Ham United",
      date: "14 April 2025",
      time: "15:00",
      competition: "Premier League",
      venue: "Anfield, Liverpool",
      area: "main-stand-lower-tier",
      section: "L9",
      row: "22",
      price: 350,
      availability: 8,
    },
    {
      id: 12,
      match: "Liverpool vs West Ham United",
      date: "14 April 2025",
      time: "15:00",
      competition: "Premier League",
      venue: "Anfield, Liverpool",
      area: "the-kop",
      section: "202",
      row: "15",
      price: 550,
      availability: 4,
    },
    {
      id: 13,
      match: "Liverpool vs West Ham United",
      date: "14 April 2025",
      time: "15:00",
      competition: "Premier League",
      venue: "Anfield, Liverpool",
      area: "kenny-dalglish-stand-lower-tier",
      section: "KL",
      row: "10",
      price: 675,
      availability: 12,
    },
    {
      id: 14,
      match: "Liverpool vs West Ham United",
      date: "14 April 2025",
      time: "15:00",
      competition: "Premier League",
      venue: "Anfield, Liverpool",
      area: "anfield-road-upper",
      section: "AL5",
      row: "18",
      price: 725,
      availability: 6,
    },
    {
      id: 15,
      match: "Liverpool vs West Ham United",
      date: "14 April 2025",
      time: "15:00",
      competition: "Premier League",
      venue: "Anfield, Liverpool",
      area: "main-stand-lower-tier",
      section: "M3",
      row: "5",
      price: 800,
      availability: 3,
    },
  ];

  const areaNames = {
    "anfield-road-upper": "ANFIELD ROAD UPPER",
    "anfield-road-lower": "ANFIELD ROAD LOWER",
    "kop-grandstand": "KOP GRANDSTAND",
    "the-kop": "THE KOP",
    "longside-upper": "LONGSIDE UPPER",
    "longside-lower": "LONGSIDE LOWER",
    "main-stand-lower-tier": "MAIN STAND LOWER TIER",
    "main-stand-upper-tier": "MAIN STAND UPPER TIER",
    "kenny-dalglish-stand-lower-tier": "KENNY DALGLISH STAND LOWER TIER",
    "kenny-dalglish-upper-tier": "KENNY DALGLISH UPPER TIER",
    "away-section": "AWAY SECTION",
    "longside-hospitality": "LONGSIDE HOSPITALITY",
    "premier-club-executive": "PREMIER CLUB EXECUTIVE",
    "main-stand-executive": "MAIN STAND EXECUTIVE",
    "anfield-road-middle-tier-hospitality":
      "ANFIELD ROAD MIDDLE TIER HOSPITALITY",
    "centenary-club-hospitality": "CENTENARY CLUB HOSPITALITY",
    "the-dugout-hospitality": "THE DUGOUT HOSPITALITY",
    "beautiful-game-hospitality": "BEAUTIFUL GAME HOSPITALITY",
    "chemistry-lounge-hospitality": "CHEMISTRY LOUNGE HOSPITALITY",
    "beat-lounge-hospitality": "BEAT LOUNGE HOSPITALITY",
  };

  const handleAreaClick = (area: string) => {
    setSelectedArea(area);
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

  const handleTicketSelect = (id: number) => {
    const ticket = tickets.find((t) => t.id === id);
    if (ticket) {
      setSelectedSeat(ticket.section);
      setSelectedArea(ticket.area);
    }
  };

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

        {/* Hero Section */}
        <HeroSection />

        {/* Main Content */}
        <section className="py-8">
          <div className="ticket-container">
            {/* <Breadcrumbs titles={titles} links={links} /> */}

            {/* Ticket filters */}
            <Card className="bg-white p-2 rounded-sm">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
                <div>
                  <h3 className="text-base  font-semibold mb-3">
                    How many tickets are you booking?
                  </h3>
                  <div className="flex">
                    <Button
                      variant={ticketQuantity === "ANY" ? "default" : "outline"}
                      className="rounded-l-md rounded-r-none border-r-0"
                      onClick={() => setTicketQuantity("ANY")}>
                      ANY
                    </Button>
                    <Button
                      variant={ticketQuantity === "1" ? "default" : "outline"}
                      className="rounded-none border-r-0"
                      onClick={() => setTicketQuantity("1")}>
                      1
                    </Button>
                    <Button
                      variant={ticketQuantity === "2" ? "default" : "outline"}
                      className="rounded-none border-r-0"
                      onClick={() => setTicketQuantity("2")}>
                      2
                    </Button>
                    <Button
                      variant={ticketQuantity === "3" ? "default" : "outline"}
                      className="rounded-none border-r-0"
                      onClick={() => setTicketQuantity("3")}>
                      3
                    </Button>
                    <Button
                      variant={ticketQuantity === "4" ? "default" : "outline"}
                      className="rounded-none border-r-0"
                      onClick={() => setTicketQuantity("4")}>
                      4
                    </Button>
                    <Button
                      variant={ticketQuantity === "5+" ? "default" : "outline"}
                      className="rounded-r-md rounded-l-none"
                      onClick={() => setTicketQuantity("5+")}>
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
                        onChange={() => setSeatedTogether(!seatedTogether)}
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
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select a price range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="£199 - £1,000">
                        £350 - £500
                      </SelectItem>
                      <SelectItem value="£199 - £500">£500 - £800</SelectItem>
                      <SelectItem value="£500 - £1,000">
                        £800 - £1,000
                      </SelectItem>
                      <SelectItem value="£1,000+">£1,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="text-base font-medium mb-3">Location</h3>
                  <Select value={location} onValueChange={handleAreaClick}>
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      {Object.entries(areaNames).map(([key, name]) => (
                        <SelectItem key={key} value={name}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            <div className="flex justify-between items-center mt-4">
              <div className="text-gray-600 text-sm">
                <span className="text-gray-800">
                  <strong>166 results</strong>
                </span>{" "}
                based on your search
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-gray-600 gap-2">
                <Filter size={16} />
                Clear all filters
              </Button>
            </div>

            {/* Available tickets section */}
            <div className="mt-8 border-b pb-4">
              <h2 className="text-xl font-semibold">Available Tickets</h2>
              <p className="text-gray-600 text-sm mt-2">
                Tickets are listed and priced by our trusted ticket partners
                competing with each other to deliver you the best seats and
                lowest prices. Find your seats, select the number of tickets,
                then click 'Get Now' to proceed.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column - Ticket Details */}
              <div className="lg:col-span-5 max-h-[calc(100vh-100px)] overflow-y-auto pr-2 mt-8">
                {/* <div className="bg-white rounded-lg shadow-sm border p-6 mb-2">
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar size={16} className="mr-2" />
                    <span>14 April 2025 | 15:00</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin size={16} className="mr-2" />
                    <span>Anfield, Liverpool</span>
                  </div>
                </div> */}

                <TicketList
                  tickets={tickets}
                  selectedSeat={selectedSeat}
                  areaNames={areaNames}
                  onTicketHover={(area, section) =>
                    handleTicketHover(area, section)
                  }
                  onTicketSelect={handleTicketSelect}
                  selectedArea={selectedArea}
                  selectedSection={selectedSection}
                />

                {/* <SupportInfo /> */}
              </div>

              {/* Right Column - 2D Stadium View */}
              <div className="lg:col-span-7">
                <div className="sticky top-0">
                  <StadiumSection
                    selectedArea={selectedSection}
                    onAreaClick={handleSectionClick}
                    areaNames={areaNames}
                    availableTickets={tickets}
                  />
                  {/* <MatchInfo /> */}
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
