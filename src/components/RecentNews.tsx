import React from "react";
import { Link } from "react-router-dom";

interface NewsItemProps {
  title: string;
  summary: string;
  date: string;
  link: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ title, summary, date, link }) => {
  return (
    <article className="mb-6 pb-6 border-b border-gray-200 group hover:text-ticket-red transition-colors">
      <Link to={link} className="block">
        <h3 className="text-sm font-bold mb-2 group-hover:text-ticket-red transition-colors">
          {title}
        </h3>
        <p className="text-sm font-light text-gray-600 mb-2">{summary}</p>
        <div className="text-sm font-light text-gray-400">Posted on {date}</div>
      </Link>
    </article>
  );
};


interface RecentTicketProps {
  date: string;
  name: string;
  match: string;
}

const RecentTicket: React.FC<RecentTicketProps> = ({ date, name, match }) => {
  return (
    <div className="mb-3">
      <div className="font-medium border-b pb-4">
        <span className="text-sm font-bold mb-2 group-hover:text-ticket-red transition-colors">{date}</span>
        <span className="text-sm font-light text-gray-600 mb-2"> {name}</span>
        <span className="text-sm font-light text-gray-600 mb-2"> {match}</span>
      </div>
    </div>
  );
};



const RecentNews = () => {
  const newsItems = [
    {
      title: "Barcelona stuns Atletico Madrid with late comeback",
      summary:
        "Barcelona stuns Atlético Madrid with a dramatic 4-2 comeback, scoring twice in stoppage time to stay level with Real Madrid in the La Liga title race.",
      date: "16/03/2025 23:02:56",
      link: "/news/barcelona-atletico-madrid-comeback",
    },
    {
      title: "Man United beats Leicester City 0-3",
      summary:
        "Manchester United secured an impressive away win against Leicester City with a commanding 3-0 victory at the King Power Stadium.",
      date: "15/03/2025 18:45:30",
      link: "/news/man-united-leicester-city",
    },
    {
      title: "Barcelona stuns Atletico Madrid with late comeback",
      summary:
        "Barcelona stuns Atlético Madrid with a dramatic 4-2 comeback, scoring twice in stoppage time to stay level with Real Madrid in the La Liga title race.",
      date: "16/03/2025 23:02:56",
      link: "/news/barcelona-atletico-madrid-comeback",
    },
    {
      title: "Man United beats Leicester City 0-3",
      summary:
        "Manchester United secured an impressive away win against Leicester City with a commanding 3-0 victory at the King Power Stadium.",
      date: "15/03/2025 18:45:30",
      link: "/news/man-united-leicester-city",
    },

  ];

  const recentTickets = [
    {
      date: "25 Apr 2025",
      name: "Christophe M obtained 2 tickets for",
      match: "Liverpool vs Tottenham Hotspur.",
    },
    {
      date: "25 Apr 2025",
      name: "Simon M grabbed 1 ticket for",
      match: "Arsenal vs Paris Saint-Germain.",
    },
    {
      date: "25 Apr 2025",
      name: "Michael M bought 3 tickets for",
      match: "Fulham vs Everton.",
    },
    {
      date: "25 Apr 2025",
      name: "Precious A got 2 tickets for",
      match: "Manchester United vs Wolverhampton.",
    },
    {
      date: "25 Apr 2025",
      name: "Michael M bought 3 tickets for",
      match: "Fulham vs Everton.",
    },
    {
      date: "25 Apr 2025",
      name: "Precious A got 2 tickets for",
      match: "Manchester United vs Wolverhampton.",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="ticket-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-xl border-b py-2 font-midium mb-6">Latest Football News</h2>
            {newsItems.map((item, index) => (
              <NewsItem
                key={index}
                title={item.title}
                summary={item.summary}
                date={item.date}
                link={item.link}
              />
            ))}
          </div>

          <div>
            <h2 className="text-xl border-b py-2 font-midium mb-6">
              Latest Football fans who trusted us for their tickets
            </h2>
            {recentTickets.map((ticket, index) => (
              <RecentTicket
                key={index}
                date={ticket.date}
                name={ticket.name}
                match={ticket.match}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentNews;
