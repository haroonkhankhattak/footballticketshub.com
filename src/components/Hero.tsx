import React, { useState } from "react";
import { Calendar, Search } from "lucide-react";
import { GET_UPCOMING_POPULAR_MATCHES } from "../lib/graphql/queries/PopularUpcomingMatches";
import { GetServerSideProps } from "next";
import { client } from "@/lib/graphql/apollo-client";
import Link from "next/link";

type Match = {
  id: string;
  name: string;
  date: string;
  league: string;
};

type HeroProps = {
  posts: Match[];
};

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

const Hero = ({ posts }: HeroProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main>
      <div className="w-full relative">
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

              {/* Dynamic Upcoming Matches */}
              <div className="px-6 py-4">
                <div className="flex items-center mb-2">
                  <Calendar size={16} className="text-ticket-lightcolor mr-2" />
                  <span className="text-sm font-semibold text-ticket-lightcolor">
                    Popular Upcoming Matches
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {posts.map((match) => (
                    <Link
                      key={match.id}
                      href={`/match/${match.id}`}
                      className="bg-white p-3 rounded-md hover:shadow-md text-sm text-ticket-primarycolor hover:text-ticket-red group">
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
          </div>
        </div>
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
