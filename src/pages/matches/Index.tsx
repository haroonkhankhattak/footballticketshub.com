import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/layout/Header";
import TrustPilotRow from "../../components/TrustpilotRow";
import TeamMatchList from "../../components/TeamMatchList";
import Testimonials from "../../components/Testimonials";
import RecentNews from "../../components/RecentNews";
import FootballTickets from "../../components/FootballTickets";
import Footer from "../../components/layout/Footer";
import { useParams, useSearchParams } from "react-router-dom";
import { convertSlugToTeamName, convertTeamNameToSlug } from "../../lib/teamUtils";
import { EventProps, Props } from "../../types/event";
import { CLUB_MATCHES_API } from "../../lib/constants/apis";
import { premier_league_2025_2026_events } from "../league/matches";
import { formatDate } from "../../lib/utils";
import { useQuery } from "@apollo/client/react/hooks";
import { GET_MATCHES_BY_TEAM } from "../../lib/graphql/queries/MatchesByTeam";
import { Match } from "../../types/match";



export interface MatchProps {
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



const Matches = () => {

  const { league, team } = useParams();
  console.log(league, team)
  // const [searchParams] = useSearchParams();
  // const slug = searchParams.get("team");
  // const { league, team } = useParams();

  // const [matches, setMatches] = useState<EventProps[]>([]);

  const [filteredMatches, setFilteredMatches] = useState<EventProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // const team = convertSlugToTeamName(slug);

  // const url = `https://www.livefootballtickets.com/english-premiership/${slug}-tickets.html`;
  // const body = JSON.stringify({ url });

  // useEffect(() => {
  //   fetch(CLUB_MATCHES_API, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log("club matches -- ", result.matches);
  //       if (Array.isArray(result.matches) && result.matches.length > 0) {
  //         setMatches(result.matches);
  //       }
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error sending ticket URL:", error);

  //     });
  // }, []);

  const [matches, setMatches] = useState<Match[]>([]);

  // useEffect(() => {
  //   if (data?.matchesByTeam) {
  //     const formattedMatches = data.matchesByTeam.map((match: any, index: number) => {
  //       const matchDate = new Date(Number(match.date)); // ensure it's a number

  //       return {
  //         id: index,
  //         homeTeam: match.home_team,
  //         categoryName: match.league,
  //         year: matchDate.getFullYear(),
  //         month: matchDate.toLocaleString("en-US", { month: "short" }).toUpperCase(),
  //         day: matchDate.getDate(),
  //         time: matchDate.toLocaleTimeString("en-US", {
  //           hour: "2-digit",
  //           minute: "2-digit",
  //           hour12: true,
  //         }),
  //         venue: match.venue,
  //         city: match.city,
  //         country: match.country,
  //         eventName: match.title,
  //         date: formatDate(match.date),
  //         league: match.league,
  //         urlToEvent: match.slug,
  //         tba: false,
  //         minPrice: {
  //           gbp: 95,
  //           usd: 120,
  //           eur: 110,
  //           aud: 170,
  //           cad: 160,
  //           chf: 105,
  //         },
  //         link: `/tickets/${match.slug}`,
  //       };
  //     });

  //     setMatches(formattedMatches);
  //   }
  // }, [data]);

  const { data } = useQuery(GET_MATCHES_BY_TEAM, {
    variables: { team: team, },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.matchesByTeam) {
      console.log(data.matchesByTeam)
      setMatches(data.matchesByTeam);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  }, []);


  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });

  //   setFilteredMatches(getClubMatches(premier_league_2025_2026_events, team || ""));

  // }, []);

  // function getClubMatches(events, clubName) {
  //   return events.filter(event =>
  //     event.homeTeam.includes(clubName) ||
  //     event.eventName.includes(clubName)
  //   );
  // }

  return (
    <div className="min-h-screen flex-grow">
      <Header isScrolledPastHero={true} fixed={false} />
      <main className="flex-grow">
        {/* <TrustPilotRow /> */}
        <TeamMatchList matches={matches} loading={loading} error={error} />
        <Testimonials />
        <RecentNews />
        <FootballTickets />
      </main>
      <Footer />
    </div>
  );
};

export default Matches;
