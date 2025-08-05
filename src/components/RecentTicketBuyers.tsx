import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_BLOGS } from "../api/queries/GetBlogs";
import { Blog } from "../types/blog";
import { formatDate, formatDateTime } from "../lib/utils";
import { GET_RECENT_BUYERS } from "../api/queries/GetRecentBuyers";
import { RecentBuyers } from "../types/recentBuyers";


interface RecentTicketProps {
  date: string;
  name: string;
  match: string;
}

const RecentTicket: React.FC<RecentTicketProps> = ({ date, name, match }) => {
  return (
    <div className="mb-3">
      <div className="font-medium border-b pb-4">
        <span className="text-sm font-bold mb-2 group-hover:text-ticket-red transition-colors">{formatDate(date)}</span>
        <span className="text-sm font-light text-gray-600 mb-2"> {name}</span>
        <span className="text-sm font-light text-gray-600 mb-2"> {match}</span>
      </div>
    </div>
  );
};



const RecentTicketBuyers = () => {


  const [recentBuyers, setRecentBuyers] = useState<RecentBuyers[]>([]);
  const { data, loading } = useQuery(GET_RECENT_BUYERS, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.getRecentBuyers) {
      setRecentBuyers(data.getRecentBuyers);
    }
  }, [data, recentBuyers]);



  // --- UPDATED HARDCODED RECENT TICKETS ---
  const recentTickets = [
    {
      date: "05 Jun 2025", // Today's date
      name: "Sophia L obtained 2 tickets for",
      match: "Man City vs Arsenal.",
    },
    {
      date: "05 Jun 2025",
      name: "Liam K grabbed 1 ticket for",
      match: "Chelsea vs Tottenham Hotspur.",
    },
    {
      date: "04 Jun 2025",
      name: "Olivia M bought 3 tickets for",
      match: "Liverpool vs Man United.",
    },
    {
      date: "04 Jun 2025",
      name: "Noah J got 2 tickets for",
      match: "Everton vs Newcastle United.",
    },
    {
      date: "03 Jun 2025",
      name: "Emma D purchased 1 ticket for",
      match: "West Ham vs Crystal Palace.",
    },
    {
      date: "03 Jun 2025",
      name: "Lucas P secured 2 tickets for",
      match: "Aston Villa vs Brighton.",
    },
  ];

  return (
    <section className="py-0 bg-white">
      <div className="ticket-container">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-10">
          <div>
            <h2 className="text-xl border-b py-2 font-midium mb-6">Latest Football fans who trusted us for their tickets</h2>
            {loading ? (
              <div className="w-full py-6 flex items-center justify-center bg-white/60">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-ticket-primarycolor border-gray-200"></div>
              </div>
            ) : recentBuyers.length === 0 ? (
              <div className="text-center text-gray-500 py-8">No blogs found.</div>
            ) : (
              recentBuyers.map((ticket, index) => (
              <RecentTicket
                key={index}
                date={ticket.created_at}
                name={ticket.name}
                match={ticket.match}
              />
            )))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default RecentTicketBuyers;
