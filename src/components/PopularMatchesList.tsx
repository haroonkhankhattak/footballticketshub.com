import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock } from "lucide-react";
import LeagueCard from "./LeagueCard";

interface MatchProps {
  id: number;
  date: string;
  month: string;
  year: string;
  competition: string;
  teams: string;
  time: string;
  venue: string;
  country: string;
}

interface Team {
  name: string;
  link: string;
}

interface LeagueSectionProps {
  title: string;
  teams: Team[];
  viewAllLink: string;
}

const LeagueSection: React.FC<LeagueSectionProps> = ({
  title,
  teams,
  viewAllLink,
}) => {
  return (
    <div className="mb-16">
      <h2 className="font-dosis text-ltg-black text-lg font-medium capitalize pb-3">
        {title}
      </h2>
      <ul className="text-sm">
        {teams.map((team, index) => (
          <li
            key={index}
            className="border-ltg-grey-4 border-t py-2 last:border-b">
            <a href={team.link} className="flex hover:underline">
              {team.name}
            </a>
          </li>
        ))}
      </ul>
      <a
        href={viewAllLink}
        className="text-ltg-grey-1 inline-block pt-3 text-gray-500 text-sm">
        View all {title} <span className="capitalize">tickets</span>&nbsp;»
      </a>
    </div>
  );
};

const leagues = [
  {
    title: "English Premier League",
    viewAllLink: "/english-premiership-tickets.html",
    teams: [
      { name: "Arsenal", link: "/matches?team=Arsenal&league=Premier League" },
      {
        name: "Aston Villa",
        link: "/matches?team=Aston Villa&league=Premier League",
      },
      { name: "Chelsea", link: "/matches?team=Chelsea&league=Premier League" },
      { name: "Everton", link: "/matches?team=Everton&league=Premier League" },
      { name: "Fulham", link: "/matches?team=Fulham&league=Premier League" },
      {
        name: "Liverpool",
        link: "/matches?team=Liverpool&league=Premier League",
      },
      {
        name: "Manchester City",
        link: "/matches?team=Manchester City&league=Premier League",
      },
      {
        name: "Manchester United",
        link: "/matches?team=Manchester United&league=Premier League",
      },
      {
        name: "Newcastle United",
        link: "/matches?team=Newcastle United&league=Premier League",
      },
    ],
  },
  {
    title: "Spanish La Liga",
    viewAllLink: "/la-liga-tickets.html",
    teams: [
      { name: "FC Barcelona", link: "/la-liga/fc-barcelona-tickets.html" },
      { name: "Real Madrid", link: "/la-liga/real-madrid-tickets.html" },
    ],
  },
  {
    title: "National Football Teams",
    viewAllLink: "/national-football-teams-tickets.html",
    teams: [
      {
        name: "England",
        link: "/national-football-teams/england-football-tickets.html",
      },
      {
        name: "Scotland",
        link: "/national-football-teams/scotland-football-tickets.html",
      },
    ],
  },
  {
    title: "Champions League",
    viewAllLink: "/champions-league-tickets.html",
    teams: [
      {
        name: "Real Madrid",
        link: "/champions-league/real-madrid-tickets.html",
      },
      {
        name: "Bayern Munich",
        link: "/champions-league/bayern-munich-tickets.html",
      },
    ],
  },
  {
    title: "Italian Serie A",
    viewAllLink: "/serie-a-tickets.html",
    teams: [
      { name: "AC Milan", link: "/serie-a/ac-milan-tickets.html" },
      { name: "AS Roma", link: "/serie-a/as-roma-tickets.html" },
    ],
  },
];

const MatchRow: React.FC<MatchProps> = ({
  id,
  date,
  month,
  year,
  competition,
  teams,
  time,
  venue,
  country,
}) => {
  return (
    <Link to={`/tickets/${id}`} className="block">
      <div className="grid grid-cols-12 items-center border-b border-gray-200 group hover:bg-gray-100 cursor-pointer transition">
        <div className="col-span-1 bg-gray-50 text-center group-hover:bg-gray-200 transition">
          <div className="py-5">
            <div className="uppercase text-xs text-gray-800">{month}</div>
            <div className="text-3xl font-bold group-hover:text-ticket-red">
              {date}
            </div>
            <div className="text-sm text-gray-400">{year}</div>
          </div>
        </div>

        <div className="col-span-8 pl-4">
          <div className="text-xs text-gray-500 group-hover:text-black uppercase mb-1 group-hover:sky-700 transition">
            {competition}
          </div>
          <div className="text-lg font-medium mb-1 group-hover:text-ticket-red text-black transition">
            {teams}
          </div>
          <div className="flex items-center font-light text-sm text-gray-600 group-hover:text-gray-800  transition">
            <Clock size={14} className="mr-1" />
            {time}
            <span className="mx-2">•</span>
            <MapPin size={14} className="mr-1" />
            {venue}, {country}
          </div>
        </div>

        <div className="col-span-3 px-4 text-right">
          <Link
            to={`/tickets/${id}`}
            className="btn-primary inline-block text-sm px-8 bg-ticket-primarycolor group-hover:bg-ticket-red transition rounded-full">
            View Tickets
          </Link>
        </div>
      </div>
    </Link>
  );
};

const PopularMatchesList = () => {
  const matches = [

    {
      id: 6,
      date: "29",
      month: "APR",
      year: "2025",
      competition: "CHAMPIONS LEAGUE",
      teams: "Arsenal vs Paris Saint-Germain",
      time: "20:00",
      venue: "Emirates Stadium, London",
      country: "United Kingdom",
      priceRange: "320",
    },
    {
      id: 7,
      date: "04",
      month: "MAY",
      year: "2025",
      competition: "ENGLISH PREMIERE LEAGUE",
      teams: "Chelsea vs Liverpool",
      time: "16:30",
      venue: "Stamford Bridge, London",
      country: "United Kingdom",
      priceRange: "250",
    },
    {
      id: 3,
      date: "11",
      month: "MAY",
      year: "2025",
      competition: "ENGLISH PREMIER LEAGUE",
      teams: "Liverpool vs Arsenal",
      time: "16:30",
      venue: "Andfield Road, Liverpool",
      country: "United Kingdom",
      priceRange: "299",
    },
    {
      id: 9,
      date: "18",
      month: "MAY",
      year: "2025",
      competition: "ENGILSH PREMIERE LEAGUE",
      teams: "Arsenal vs Newcastle United",
      time: "16:00",
      venue: "Emirates Stadium, London",
      country: "United Kingdom",
      priceRange: "299",
    },
    {
      id: 1,
      date: "26",
      month: "APR",
      year: "2025",
      competition: "ENGLISH PREMIER LEAGUE",
      teams: "Chelsea vs Everton",
      time: "12:30",
      venue: "Stamford Bridge, London",
      country: "United Kingdom",
      priceRange: "110",
    },
    {
      id: 2,
      date: "26",
      month: "APR",
      year: "2025",
      competition: "ENGLISH PREMIER LEAGUE",
      teams: "Newcastle United vs Ipswich Town",
      time: "15:00",
      venue: "St James Park, Newcastle Upon Tyne ",
      country: "United Kingdom",
      priceRange: "320",
    },
    {
      id: 3,
      date: "26",
      month: "APR",
      year: "2025",
      competition: "FA CUP",
      teams: "Crystal Palace vs Aston Villa",
      time: "19:45",
      venue: "Wembley Stadium, London",
      country: "United Kingdom",
    },
    {
      id: 4,
      date: "27",
      month: "APR",
      year: "2025",
      competition: "FA CUP",
      teams: "Nottingham Forest vs Manchester City ",
      time: "16:30",
      venue: "Wembley Stadium, London",
      country: "United Kingdom",
    },
  ];


  return (
    <section className="py-8 bg-white">
      <div className="ticket-container">
        <div className="grid lg:grid-cols-12 gap-8 px-4">
          {/* div left */}
          <div className="lg:col-span-8">
            <div className="text-xl font-medium py-4 border-b sticky top-0 bg-white z-10">
              Most Popular Football Tickets
            </div>
            <div className="max-h-[1500px] overflow-y-auto space-y-2">
              {matches.map((match) => (
                <MatchRow key={match.id} {...match} />
              ))}
            </div>
          </div>

          {/* div right */}
          <div className="lg:col-span-4 space-y-16">
            <div className="space-y-4 border-b py-4">
              <div className="text-xl font-medium py-4 border-b">
                Book With Confidence
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-sky-700">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="font-light text-sm">
                    Champions League level Customer support
                  </h3>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-sky-700">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="font-light text-sm">
                    5 star rating on Trustpilot (13k+ reviews)
                  </h3>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-sky-700">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="font-light text-sm">
                    Best ticket selection and prices
                  </h3>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-sky-700">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="font-light text-sm">
                    150% Money Back Guarantee
                  </h3>
                </div>
              </div>
            </div>
            <div>
              {leagues.map((league, index) => (
                <LeagueSection
                  key={index}
                  title={league.title}
                  teams={league.teams}
                  viewAllLink={league.viewAllLink}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularMatchesList;
