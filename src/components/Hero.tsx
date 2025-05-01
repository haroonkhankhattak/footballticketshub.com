import React, { useState } from "react";
import { Calendar, MapPin, Search, Check } from "lucide-react";
import TrustPilotRow from "../components/TrustpilotRow";
import { Link } from "react-router-dom";
// import type { HomePageProps } from "../pages/Index";
// import type { HomePageProps } from "../pages/Index";

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredMatches = [
    {
      id: 1,
      name: "Asenal vs Bournemouth",
      date: "May 03, 2025",
      league: "Premier League",
    },
    {
      id: 3,
      name: "Newcastle vs Chelsea",
      date: "May 11, 2025",
      league: "English Premier League",
    },
    {
      id: 3,
      name: "Chelsea vs Liverpool",
      date: "May 04, 2025",
      league: "English Premier League",
    },
    {
      id: 4,
      name: "Arsenal vs Paris Saint-Germain",
      date: "April 29, 2025",
      league: "Champions League",
    },
  ];

  return (
    <main>
      {/* <TrustPilotRow /> */}
      <div className="w-full relative">
        {/* Hero Background Image */}
        <div
          className="w-full h-[60vh] min-h-[300px] bg-cover bg-center relative"
          style={{
            backgroundImage: `url('/uploads/monochrome-soccer-fans-cheering.jpg')`,
            backgroundPosition: "50% 30%",
          }}>
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>

          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4">
            <div className="bg-white/10 my-12 rounded-xl shadow-lg max-w-3xl mx-auto overflow-visible mb-12 animate-slide-in">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Search size={20} className="text-ticket-lightcolor" />
                  <h2 className="text-lg font-semibold ml-2">
                    Find your perfect match
                  </h2>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search teams or competitions..."
                        className="w-full border border-ticket-lightgray rounded-lg p-3 pl-10 focus:outline-none focus:ring-1 focus:ring-ticket-red text-black"
                      />
                      <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 "
                        size={18}
                      />
                    </div>
                  </div>

                  <button className="btn-primary bg-ticket-primarycolor hover:bg-ticket-red flex items-center justify-center">
                    <Search size={18} className="mr-2" />
                    Find Tickets
                  </button>
                </div>
              </div>

              {/* Quick Picks */}
              <div className="px-6 py-4">
                <div className="flex items-center mb-2">
                  <Calendar size={16} className="text-ticket-lightcolor mr-2" />
                  <span className="text-sm font-semibold text-ticket-lightcolor">
                    Popular Upcoming Matches
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {featuredMatches.map((match) => (
                    <Link
                      key={match.id}
                      to={`/tickets/${match.id}`}
                      className="bg-white p-3 rounded-md hover:shadow-md text-sm text-ticket-primarycolor hover:text-ticket-red group">
                      {/* Match name wrapper */}
                      <div className="font-medium overflow-hidden ">
                        <div className="inline-block whitespace-nowrap transition-transform duration-500 group-hover:translate-x-[-30%]">
                          {match.name}
                        </div>
                      </div>

                      <div className="text-xs text-gray-500 flex items-center group-hover:text-ticket-darkcolor mt-1">
                        <Calendar size={12} className="mr-1" />
                        {match.date}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* <h1 className="font-dosis text-4xl font-bold mb-6">
              Be part of the live action!
            </h1>
            <p className="text-xl md:text-xl font-bold mb-8">
              Score tickets fast & safe on the most trusted platform
            </p> */}

            {/* Search Bar */}
            {/* <div className="w-full max-w-2xl relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for team, match, stadium or city"
                className="w-full py-2 px-5 pr-12 rounded-md text-black text-lg focus:outline-none"
              />
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Search size={24} />
              </button>
            </div> */}
          </div>
        </div>

        {/* Guarantee Banner */}
        {/* <div className="bg-white py-4 text-center">
          <div className="flex justify-center items-center text-green-600">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span className="font-medium">
              All our orders are 150% guaranteed
            </span>
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
        </div> */}

        {/* <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-16 py-8 mb-4">

          <div className="bg-white p-4 rounded-md text-center shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-center items-center space-y-1  transform">
            <div className="text-ticket-red font-semibold text-lg">100%</div>
            <div className="text-sm font-medium text-black">Ticket Guarantee</div>
          </div>
          <div className="bg-white p-4 rounded-md text-center shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-center items-center space-y-1  transform">
            <div className="text-ticket-red font-semibold text-lg">24/7</div>
            <div className="text-sm font-medium text-black">Customer Support</div>
          </div>
          <div className="bg-white p-4 rounded-md text-center shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-center items-center space-y-1  transform">
            <div className="text-ticket-red font-semibold text-lg">Global</div>
            <div className="text-sm font-medium text-black">Worldwide Coverage</div>
          </div>
          <div className="bg-white p-4 rounded-md text-center shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-center items-center space-y-1  transform">
            <div className="text-ticket-red font-semibold text-lg">Fast</div>
            <div className="text-sm font-medium text-black">E-Ticket Delivery</div>
          </div>
          <div className="bg-white p-4 rounded-md text-center shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-center items-center space-y-1  transform">
            <div className="text-ticket-red font-semibold text-lg">Secure</div>
            <div className="text-sm font-medium text-black">Checkout Process</div>
          </div>

        </div> */}
      </div>
    </main>
  );
};

export default Hero;

// import React, { useState } from 'react';
// import { Calendar, Search, MapPin } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const Hero = () => {
//   const [searchQuery, setSearchQuery] = useState('');

//   // Featured matches data
//   const featuredMatches = [
//     { id: 1, name: 'Man United vs Liverpool', date: 'October 20, 2023', league: 'Premier League' },
//     { id: 2, name: 'Real Madrid vs Barcelona', date: 'October 28, 2023', league: 'La Liga' },
//     { id: 3, name: 'PSG vs Bayern Munich', date: 'November 7, 2023', league: 'Champions League' },
//     { id: 4, name: 'Arsenal vs Tottenham', date: 'November 15, 2023', league: 'Premier League' },
//   ];

//   return (
//     <div className="pt-24 bg-gradient-to-b from-white to-ticket-gray">
//       <div className="ticket-container py-12">
//         {/* Search Box */}
//         <div className="bg-white rounded-xl shadow-lg max-w-3xl mx-auto overflow-hidden mb-12 animate-slide-in">
//           <div className="p-6">
//             <div className="flex items-center mb-4">
//               <Search size={20} className="text-ticket-red" />
//               <h2 className="text-lg font-semibold ml-2">
//                 Find your perfect match
//               </h2>
//             </div>

//             <div className="flex flex-col md:flex-row md:items-center gap-4">
//               <div className="flex-1">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search teams or competitions..."
//                     className="w-full border border-ticket-lightgray rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-ticket-red"
//                   />
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                 </div>
//               </div>

//               <button className="btn-primary flex items-center justify-center">
//                 <Search size={18} className="mr-2" />
//                 Find Tickets
//               </button>
//             </div>
//           </div>

//           {/* Quick Picks */}
//           <div className="bg-ticket-gray px-6 py-4">
//             <div className="flex items-center mb-2">
//               <Calendar size={16} className="text-ticket-red mr-2" />
//               <span className="text-sm font-medium text-ticket-darkgray">Popular Upcoming Matches</span>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
//               {featuredMatches.map(match => (
//                 <Link
//                   key={match.id}
//                   to={`/match/${match.id}`}
//                   className="bg-white p-3 rounded-md hover:shadow-md transition-shadow text-sm hover:text-ticket-red"
//                 >
//                   <div className="font-medium truncate">{match.name}</div>
//                   <div className="text-xs text-gray-500 flex items-center mt-1">
//                     <Calendar size={12} className="mr-1" />
//                     {match.date}
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Trust Badges */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
//           <div className="bg-white rounded-lg p-4 text-center shadow-sm">
//             <div className="text-ticket-red font-bold mb-1">100%</div>
//             <div className="text-sm text-ticket-darkgray">Ticket Guarantee</div>
//           </div>
//           <div className="bg-white rounded-lg p-4 text-center shadow-sm">
//             <div className="text-ticket-red font-bold mb-1">24/7</div>
//             <div className="text-sm text-ticket-darkgray">Customer Support</div>
//           </div>
//           <div className="bg-white rounded-lg p-4 text-center shadow-sm">
//             <div className="text-ticket-red font-bold mb-1">Secure</div>
//             <div className="text-sm text-ticket-darkgray">Checkout Process</div>
//           </div>
//           <div className="bg-white rounded-lg p-4 text-center shadow-sm">
//             <div className="text-ticket-red font-bold mb-1">Fast</div>
//             <div className="text-sm text-ticket-darkgray">Worldwide Shipping</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;
