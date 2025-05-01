import React, { useState } from "react";
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

interface Hero2Props {
    matchTitle?: string;
    league?: string;
    date?: string;
    time?: string;
    venue?: string;
    minPrice?: number;
}

const HeroSection: React.FC<Hero2Props> = ({
    matchTitle = "Liverpool vs Arsenal Tickets",
    league = "ENGLISH PREMIER LEAGUE",
    date = "Sunday, 11th May 2025",
    time = "16:30",
    venue = "Anfield Road, Liverpool, United Kingdom",
    minPrice = 350.0,
}) => {
    const [ticketQuantity, setTicketQuantity] = useState<string>("1");
    const [priceRange, setPriceRange] = useState<string>("£199 - £1,000");
    const [location, setLocation] = useState<string>("All");
    const [seatedTogether, setSeatedTogether] = useState<boolean>(true);

    return (
        <section className="w-full bg-white ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="rounded-md shadow-md border-b overflow-hidden">
                    {/* Image at the top */}

                    <div className="h-[200px] relative ">
                        <img
                            src="/uploads/teamfans/Liverpool.webp"
                            alt="Liverpool fans"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50"></div>
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                            {/* <h1 className="text-4xl md:text-5xl font-bold mb-4">Liverpool FC Tickets</h1> */}
                            {/* <p className="text-xl max-w-3xl text-center">
                                Experience the thrill of watching Liverpool at Anfield - secure your seats Now!
                            </p> */}
                        </div>
                    </div>

                    {/* Content below image */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 p-4 gap-8">
                        {/* Match info - Left side */}
                        <div className="lg:col-span-3 space-y-6">
                            <div>
                                <h1 className="text-2xl font-semibold mt-1">{matchTitle}</h1>
                                <p className="text-sky-500 text-sm uppercase tracking-wider mt-2">
                                    {league}
                                </p>

                                <div className="flex flex-col gap-2 mt-4">
                                    <div className="flex items-center text-gray-600">
                                        <Calendar
                                            size={18}
                                            className="mr-2 flex-shrink-0 text-gray-600"
                                        />
                                        <span className="text-sm text-gray-600">
                                            {date} {time}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <MapPin
                                            size={18}
                                            className="mr-2 flex-shrink-0 text-gray-600"
                                        />
                                        <span className="text-sm text-gray-600">{venue}</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-m font-light">
                                <span className="font-bold">Tickets</span> available from{" "}
                                <span className="font-bold">£{minPrice.toFixed(2)}</span>
                            </p>
                        </div>

                        {/* Trust indicators - Right side */}
                        <div className="lg:col-span-2 flex flex-col justify-center space-y-4">
                            <div className="flex items-start">
                                <CheckCircle
                                    className="text-sky-500 mt-0.5 mr-3 flex-shrink-0"
                                    size={20}
                                />
                                <p className="text-gray-700 text-sm">
                                    Tickets provided by our Trusted partners
                                </p>
                            </div>
                            <div className="flex items-start">
                                <CheckCircle
                                    className="text-sky-500 mt-0.5 mr-3 flex-shrink-0"
                                    size={20}
                                />
                                <p className="text-gray-700 text-sm">
                                    All our orders are 150% guaranteed{" "}
                                    {/* <Info size={16} className="inline ml-1 text-gray-400" /> */}
                                </p>
                            </div>
                            <div className="flex items-start">
                                <CheckCircle
                                    className="text-sky-500 mt-0.5 mr-3 flex-shrink-0"
                                    size={20}
                                />
                                <p className="text-gray-700 text-sm">
                                    Seated together, unless stated otherwise
                                </p>
                            </div>
                            <div className="flex items-start">
                                <CheckCircle
                                    className="text-sky-500 mt-0.5 mr-3 flex-shrink-0"
                                    size={20}
                                />
                                <p className="text-gray-700 text-sm">
                                    Seated together, unless stated otherwise
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <Separator className="my-4 bg-transparent" /> */}

                {/* Ticket filters */}
                {/* <Card className="bg-gray-100 p-2 rounded-sm">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
                        <div>
                            <h3 className="text-base  font-semibold mb-3">How many tickets are you booking?</h3>
                            <div className="flex">
                                <Button
                                    variant={ticketQuantity === "ANY" ? "default" : "outline"}
                                    className="rounded-l-md rounded-r-none border-r-0"
                                    onClick={() => setTicketQuantity("ANY")}
                                >
                                    ANY
                                </Button>
                                <Button
                                    variant={ticketQuantity === "1" ? "default" : "outline"}
                                    className="rounded-none border-r-0"
                                    onClick={() => setTicketQuantity("1")}
                                >
                                    1
                                </Button>
                                <Button
                                    variant={ticketQuantity === "2" ? "default" : "outline"}
                                    className="rounded-none border-r-0"
                                    onClick={() => setTicketQuantity("2")}
                                >
                                    2
                                </Button>
                                <Button
                                    variant={ticketQuantity === "3" ? "default" : "outline"}
                                    className="rounded-none border-r-0"
                                    onClick={() => setTicketQuantity("3")}
                                >
                                    3
                                </Button>
                                <Button
                                    variant={ticketQuantity === "4" ? "default" : "outline"}
                                    className="rounded-none border-r-0"
                                    onClick={() => setTicketQuantity("4")}
                                >
                                    4
                                </Button>
                                <Button
                                    variant={ticketQuantity === "5+" ? "default" : "outline"}
                                    className="rounded-r-md rounded-l-none"
                                    onClick={() => setTicketQuantity("5+")}
                                >
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
                                    <span className="ms-3 text-sm font-medium text-gray-700">Stay together</span>
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
                                    <SelectItem value="£199 - £1,000">£199 - £1,000</SelectItem>
                                    <SelectItem value="£199 - £500">£199 - £500</SelectItem>
                                    <SelectItem value="£500 - £1,000">£500 - £1,000</SelectItem>
                                    <SelectItem value="£1,000+">£1,000+</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <h3 className="text-base font-medium mb-3">Location</h3>
                            <Select value={location} onValueChange={setLocation}>
                                <SelectTrigger className="w-full bg-white">
                                    <SelectValue placeholder="Select a location" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All</SelectItem>
                                    <SelectItem value="Main Stand">Main Stand</SelectItem>
                                    <SelectItem value="The Kop">The Kop</SelectItem>
                                    <SelectItem value="Anfield Road Stand">Anfield Road Stand</SelectItem>
                                    <SelectItem value="Sir Kenny Dalglish Stand">Sir Kenny Dalglish Stand</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>


                </Card> */}

                {/* <div className="flex justify-between items-center mt-4">
                    <div className="text-gray-600 text-sm">
                        <span className="text-gray-800"><strong>166 results</strong></span> based on your search
                    </div>
                    <Button variant="outline" size="sm" className="text-gray-600 gap-2">
                        <Filter size={16} />
                        Clear all filters
                    </Button>
                </div> */}

                {/* Available tickets section */}
                {/* <div className="mt-8 border-b pb-4">
                    <h2 className="text-xl font-semibold">Available Tickets</h2>
                    <p className="text-gray-600 text-sm mt-2">
                        Tickets are listed and priced by our trusted ticket partners competing with each other to deliver you the best seats and lowest prices.
                        Find your seats, select the number of tickets, then click 'Get Now' to proceed.
                    </p>
                </div> */}
            </div>
        </section>
    );
};

export default HeroSection;
