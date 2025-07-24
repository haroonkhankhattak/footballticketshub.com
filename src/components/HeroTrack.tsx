import React, { useState } from "react";
import { Calendar, MapPin, Search, Check, Ticket } from "lucide-react";
import TrustPilotRow from "../components/TrustpilotRow";
import { Link } from "react-router-dom";
import { leagueRedirects, predefinedKeywords, teamRedirects } from "../lib/searchKeywords";
import { Card } from "./ui/card";
import { Input } from "./ui/input";


const TrackHero = () => {

    return (
        <main>
            <div className="w-full relative md:mt-10">
                <div
                    className="w-full h-[60vh] min-h-[300px] bg-cover bg-center relative"
                    style={{
                        backgroundImage: `url('/uploads/monochrome-soccer-fans-cheering.jpg')`,
                        backgroundPosition: "50% 30%",
                    }}>

                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    <h2 className="text-2xl sm:text-4xl text-white text-center text-44 p-10 font-bold relative z-10">
                        Track your Tickets
                    </h2>
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4">

                        {/* Mobile Ticket filters */}
                        <Card className="p-6 bg-gray-50/50 block sm:hidden">

                            <div key={1} className="mb-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <Ticket className="h-5 w-5 text-primary" />
                                    <h3 className="font-medium">Enter your Ticket Details</h3>
                                </div>

                                <div className="flex flex-col gap-4">
                                    {/* Order ID Field */}
                                    <div className="w-full">
                                        <label className="text-l text-start text-black font-normal mb-1 block">
                                            Order ID # <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            type="text"
                                            placeholder="Enter Order ID here"
                                            className="h-9 w-full"
                                        />
                                    </div>

                                    {/* Email Field */}
                                    <div className="w-full">
                                        <label className="text-l text-start text-black font-normal mb-1 block">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            type="text"
                                            placeholder="Enter Email Address"
                                            className="h-9 w-full"
                                        />
                                    </div>

                                    {/* Button */}
                                    <div className="flex justify-center">
                                        <button className="h-9 px-6 btn-primary bg-ticket-primarycolor text-white flex items-center justify-center hover:bg-ticket-red rounded-md">
                                            Track Order
                                        </button>
                                    </div>
                                </div>


                            </div>

                        </Card>

                        {/* Desktop Ticket filters */}
                        <Card className="p-6 bg-gray-50/50 hidden sm:block">

                            <div key={1} className="mb-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <Ticket className="h-5 w-5 text-primary" />
                                    <h3 className="font-medium">Enter your Ticket Details</h3>
                                </div>

                                <div className="flex gap-4 items-end">
                                    <div className="flex-1">
                                        <label className="text-l text-start text-black font-normal mb-1 block">
                                            Order ID # <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            type="text"
                                            placeholder="Enter Order ID here"
                                            className="h-9"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <label className="text-l text-start text-black font-normal mb-1 block">
                                            Email # <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            type="text"
                                            placeholder="Enter Email Address"
                                            className="h-9"
                                        />
                                    </div>

                                    <div>
                                        <button className="h-9 px-6 btn-primary bg-ticket-primarycolor flex items-center hover:bg-ticket-red">
                                            Track Order
                                        </button>
                                    </div>
                                </div>

                            </div>

                        </Card>


                    </div>

                </div>
            </div>

        </main>
    );
};

export default TrackHero;
