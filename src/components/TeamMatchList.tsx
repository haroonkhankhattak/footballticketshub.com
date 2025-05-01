import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock } from "lucide-react";
import LeagueCard from "./LeagueCard";
import { useSearchParams } from "react-router-dom";
import TeamCard from "./TeamCard";
import FilterButton from "@/components/FilterButton";

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
  priceRange: string;
  league: string;
}

interface Team {
  name: string;
  link: string;
}

interface LeagueSectionProps {
  title: string;
  teams: Team[];
}

const LeagueSection: React.FC<LeagueSectionProps> = ({ title, teams }) => {
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
    </div>
  );
};

const leagues = [
  {
    title: "English Premier League Teams",
    viewAllLink: "/english-premiership-tickets.html",
    teams: [
      { name: "Arsenal", link: "/matches?team=Arsenal&league=Premier League" },
      {
        name: "Aston Villa",
        link: "/matches?team=Aston Villa&league=Premier League",
      },
      {
        name: "Bournemouth",
        link: "/matches?team=Bournemouth&league=Premier League",
      },
      {
        name: "Brentford",
        link: "/matches?team=Brentford&league=Premier League",
      },
      {
        name: "Brighton",
        link: "/matches?team=Brighton&league=Premier League",
      },
      { name: "Burnley", link: "/matches?team=Burnley&league=Premier League" },
      { name: "Chelsea", link: "/matches?team=Chelsea&league=Premier League" },
      {
        name: "Crystal Palace",
        link: "/matches?team=Crystal Palace&league=Premier League",
      },
      { name: "Everton", link: "/matches?team=Everton&league=Premier League" },
      { name: "Fulham", link: "/matches?team=Fulham&league=Premier League" },
      {
        name: "Liverpool",
        link: "/matches?team=Liverpool&league=Premier League",
      },
      {
        name: "Luton Town",
        link: "/matches?team=Luton Town&league=Premier League",
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
      {
        name: "Nottingham Forest",
        link: "/matches?team=Nottingham Forest&league=Premier League",
      },
      {
        name: "Sheffield United",
        link: "/matches?team=Sheffield United&league=Premier League",
      },
      {
        name: "Tottenham Hotspur",
        link: "/matches?team=Tottenham Hotspur&league=Premier League",
      },
      {
        name: "West Ham United",
        link: "/matches?team=West Ham United&league=Premier League",
      },
      {
        name: "Wolverhampton Wanderers",
        link: "/matches?team=Wolverhampton Wanderers&league=Premier League",
      },
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
  priceRange,
  league,
}) => {
  return (
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
        <div className="text-xs text-gray-500 uppercase mb-1 group-hover:text-black transition">
          {league}
        </div>
        <div className="text-lg font-medium mb-1 group-hover:text-ticket-red transition">
          {teams}
        </div>
        <div className="flex items-center font-light text-sm text-gray-600 group-hover:text-gray-800 transition">
          <Clock size={14} className="mr-1" />
          {time}
          <span className="mx-2">•</span>
          <MapPin size={14} className="mr-1" />
          {venue}, {country}
        </div>
      </div>

      <div className="col-span-3 px-0 text-center">
        <Link
          to={`/tickets/${id}`}
          className="btn-primary inline-block text-sm px-8 bg-ticket-primarycolor group-hover:bg-ticket-red transition rounded-full">
          View Tickets
        </Link>

        <span className="inline-block text-sm">From £{priceRange}</span>
      </div>
    </div>
  );
};

const TeamMatchList = () => {
  const [searchParams] = useSearchParams();
  const league = searchParams.get("league");
  const team = searchParams.get("team");

  type Match = {
    id: number;
    date: string;         // e.g., "27"
    month: string;        // e.g., "APR"
    year: string;         // e.g., "2025"
    competition: string;  // league name
    teams: string;        // "Liverpool vs Tottenham Hotspur"
    time: string;         // e.g., "16:30"
    venue: string;        // e.g., "Anfield Road, Liverpool"
    country: string;      // e.g., "United Kingdom"
    priceRange: string;   // e.g., "350"
    league: string
  };


  const liverpoolMatches: Match[] = [
    {
      id: 1,
      date: "27",
      month: "APR",
      year: "2025",
      competition: league,
      teams: team + " vs Tottenham Hotspur",
      time: "16:30",
      venue: "Andfield Road, Liverpool",
      country: "United Kingdom",
      priceRange: "350",
      league: "English premier league"
    },
    {
      id: 2,
      date: "04",
      month: "MAY",
      year: "2025",
      competition: league,
      teams: "Chelsea vs " + team,
      time: "16:30",
      venue: "Stamford Bridge, London",
      country: "United Kingdom",
      priceRange: "250",
      league: "English premier league"
    },
    {
      id: 3,
      date: "11",
      month: "MAY",
      year: "2025",
      competition: league,
      teams: team + " vs Arsenal",
      time: "16:30",
      venue: "Andfield Road, Liverpool",
      country: "United Kingdom",
      priceRange: "299",
      league: "English premier league"
    },
    {
      id: 4,
      date: "19",
      month: "MAY",
      year: "2025",
      competition: league,
      teams: "Brighton & Hove Albion vs " + team,
      time: "20:00",
      venue: "Falmer Stadium, Brighton",
      country: "United Kingdom",
      priceRange: "450",
      league: "English premier league"
    },
    {
      id: 5,
      date: "25",
      month: "MAY",
      year: "2025",
      competition: league,
      teams: team + " vs Auston Villa",
      time: "16:00",
      venue: "Anfield Road, Liverpool",
      country: "United Kingdom",
      priceRange: "399",
      league: "English premier league"
    },
  ];

  const arsenalMatches: Match[] = [
    {
      id: 1,
      date: "29",
      month: "APR",
      year: "2025",
      competition: league,
      teams: team + " vs Paris Saint-Germain",
      time: "20:00",
      venue: "Emirates Stadium, London",
      country: "United Kingdom",
      priceRange: "320",
      league: "Champions League"
    },
    {
      id: 2,
      date: "03",
      month: "MAY",
      year: "2025",
      competition: league,
      teams: team + " vs Bournemouth",
      time: "17:30",
      venue: "Stamford Bridge, London",
      country: "United Kingdom",
      priceRange: "200",
      league: "English premier league"
    },
    {
      id: 3,
      date: "07",
      month: "MAY",
      year: "2025",
      competition: league,
      teams: "Paris Saint-Germain vs " + team,
      time: "21:00",
      venue: "Parc de Princes, Paris",
      country: "France",
      priceRange: "300",
      league: "Champions League"
    },
    {
      id: 4,
      date: "11",
      month: "MAY",
      year: "2025",
      competition: league,
      teams: "Liverpool vs " + team,
      time: "20:00",
      venue: "Anfield Road, Liverpool",
      country: "United Kingdom",
      priceRange: "450",
      league: "English premier league"
    },
    {
      id: 5,
      date: "18",
      month: "MAY",
      year: "2025",
      competition: league,
      teams: team + " vs Newcastle United",
      time: "16:00",
      venue: "Emirates Stadium, London",
      country: "United Kingdom",
      priceRange: "299",
      league: "English premier league"
    },
    {
      id: 6,
      date: "25",
      month: "MAY",
      year: "2025",
      competition: league,
      teams: "Southampton vs " + team,
      time: "16:00",
      venue: "St Mary Stadium, Southampton",
      country: "United Kingdom",
      priceRange: "150",
      league: "English premier league"
    },
  ];


  const matches: Match[] =
    team === "Liverpool"
      ? liverpoolMatches
      : team === "Arsenal"
        ? arsenalMatches
        : [];



  return (
    <section className=" bg-white">
      <div className="ticket-container">
        <div className="mt-6 lg:mt-14 font-light text-sm text-gray-500">
          <ul
            aria-label="breadcrumbs"
            className="text-ltg-grey-1 font-roboto flex flex-wrap items-center gap-x-3 uppercase">
            <li>
              <a
                href="/"
                data-testid="breadcrumb"
                className="whitespace-nowrap hover:underline">
                Home
              </a>
              <span className="pl-3 text-xl lg:text-2xl font-bold">▸</span>
            </li>
            <li>
              <a
                href="/league?league=Premier League"
                data-testid="breadcrumb"
                className="whitespace-nowrap hover:underline">
                {league}
              </a>
              <span className="pl-3 text-xl lg:text-2xl font-bold">▸</span>
            </li>
            <li>
              <a
                href={`/matches?team=${encodeURIComponent(
                  team
                )}&league=${encodeURIComponent(league)}`}
                data-testid="breadcrumb"
                className="whitespace-nowrap hover:underline">
                {team}
              </a>

              <span className="pl-3 text-xl lg:text-2xl font-bold"></span>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 py-4">
            {/* <LeagueCard leagueName={league} /> */}

            <TeamCard teamName={team} />

            <div className="lg:col-span-7 py-6">
              <div className="text-xl font-medium py-2 ">
                Upcoming {team} Fixtures
              </div>
              <FilterButton />
              <div className="max-h-[600px] overflow-y-auto space-y-2">
                {matches.map((match) => (
                  <MatchRow key={match.id} {...match} />
                ))}
              </div>
            </div>
          </div>

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
                    className="text-sky-500">
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
                    className="text-sky-500">
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
                    className="text-sky-500">
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
                    className="text-sky-500">
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
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamMatchList;
