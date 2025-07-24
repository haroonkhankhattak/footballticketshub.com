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



const LeagueRecentNews = ({ league }: { league: string }) => {
  // const newsItems = [
  //   {
  //     title: "Manchester City edges Liverpool in title race thriller",
  //     summary:
  //       "Manchester City secured a crucial 2-1 victory over Liverpool at the Etihad Stadium, maintaining their lead in the Premier League title race.",
  //     date: "16/03/2025 22:30:00",
  //     link: "/news/man-city-liverpool-title-race",
  //   },
  //   {
  //     title: "Chelsea's late winner stuns Manchester United",
  //     summary:
  //       "Chelsea secured a dramatic 2-1 victory against Manchester United at Stamford Bridge with a stoppage-time winner.",
  //     date: "14/03/2025 21:00:12",
  //     link: "/news/chelsea-manchester-united-late-winner",
  //   },
  //   {
  //     title: "Newcastle United holds Arsenal to a thrilling draw",
  //     summary:
  //       "Newcastle United fought back from two goals down to secure a 2-2 draw against Arsenal at St. James' Park.",
  //     date: "13/03/2025 17:45:38",
  //     link: "/news/newcastle-arsenal-draw",
  //   },
  //   {
  //     title: "Everton secures vital win in relegation battle",
  //     summary:
  //       "Everton boosted their survival hopes with a 2-0 victory over Bournemouth, moving three points clear of the relegation zone.",
  //     date: "12/03/2025 15:20:22",
  //     link: "/news/everton-bournemouth-relegation-battle",
  //   },

  // ];

  // const recentTickets = [
  //   {
  //     date: "25 Apr 2025",
  //     name: "Christophe M obtained 2 tickets for",
  //     match: "Liverpool vs Tottenham Hotspur.",
  //   },
  //   {
  //     date: "25 Apr 2025",
  //     name: "Simon M grabbed 1 ticket for",
  //     match: "Arsenal vs Paris Saint-Germain.",
  //   },
  //   {
  //     date: "25 Apr 2025",
  //     name: "Michael M bought 3 tickets for",
  //     match: "Fulham vs Everton.",
  //   },
  //   {
  //     date: "25 Apr 2025",
  //     name: "Precious A got 2 tickets for",
  //     match: "Manchester United vs Wolverhampton.",
  //   },
  //   {
  //     date: "25 Apr 2025",
  //     name: "Michael M bought 3 tickets for",
  //     match: "Fulham vs Everton.",
  //   },
  //   {
  //     date: "25 Apr 2025",
  //     name: "Precious A got 2 tickets for",
  //     match: "Manchester United vs Wolverhampton.",
  //   },
  // ];

  const newsItems = [
    {
      title: "Transfer rumors, news: Liverpool ready to offer player as part of Guéhi deal",
      summary:
        "Liverpool's pursuit of Guéhi could see one of their promising young attackers go the other way. Transfer Talk has the latest news, gossip and rumors.",
      date: "30/06/2025 10:15:00",
      link: "/news/champions-league-final-2025",
    },
    {
      title: "Man United's Evans gets new club role",
      summary:
        "Jonny Evans has been handed a new job at Manchester United after calling time on his 20-year playing career.",
      date: "30/06/2025 10:00:00",
      link: "/news/liverpool-top-four",
    },
    {
      title: "Transfer window: What do Europe's big clubs still need?",
      summary:
        "The transfer window is starting to fully kick into gear. Europe's top clubs have already been making some big moves, but what else are they planning?",
      date: "30/06/2025 22:50:00",
      link: "/news/arsenal-chelsea-var",
    },
    {
      title: "Stan Sport buys rights to air Premier League",
      summary:
        "Nine has bought the media rights agreements to English Premier League and Emirates FA Cup games from Optus Sport, with the streaming service will shut down after a nine-year run.",
      date: "29/06/2025 21:00:00",
      link: "/news/man-united-manager-rumours",
    },
  ];

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
    <section className="py-12 bg-white">
      <div className="ticket-container">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-10">
          <div>
            <h2 className="text-xl border-b py-2 font-midium mb-6">Latest {league} News</h2>
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

          {/* <div>
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
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default LeagueRecentNews;
