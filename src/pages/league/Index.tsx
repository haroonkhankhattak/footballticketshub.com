import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/layout/Header";
import TrustPilotRow from "../../components/TrustpilotRow";
import MatchLeague from "../../components/MatchLeague";
import LeagueMatchList from "../../components/LeagueMatchList";
import Testimonials from "../../components/Testimonials";
import LeagueRecentNews from "../../components/LeagueRecentNews";
import LeagueTickets from "../../components/LeagueTickets";
import Footer from "../../components/layout/Footer";
import { useParams, useSearchParams } from "react-router-dom";
import { EventProps, Props } from "../../types/event";
import { LEAGUE_MATCHES_API } from "../../lib/constants/apis";
import { premier_league_2025_2026_events } from "./matches";
import { useQuery } from "@apollo/client/react/hooks";
import { GET_MATCHES_BY_LEAGUE } from "../../lib/graphql/queries/MatchesByLeague";
import { Match } from "../../types/match";



const League = () => {
  // const [searchParams] = useSearchParams();
  // const team = searchParams.get("team");
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { league } = useParams();

  // useEffect(() => {
  //   fetch(LEAGUE_MATCHES_API, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ url: "https://www.livefootballtickets.com/english-premiership-tickets.html" }),
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log("Ticket API Response: size -- ", result.matches.size);
  //       if (Array.isArray(result.matches) && result.matches.length > 0) {
  //         setMatches(result.matches);
  //       }
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error sending ticket URL:", error);
  //     });
  // }, []);

  const { data } = useQuery(GET_MATCHES_BY_LEAGUE, {
    variables: { league: league, },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.matchesByLeague) {
      setMatches(data.matchesByLeague);
      setLoading(false);
    }
  }, [data]);


  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);




  return (
    <div className="min-h-screen flex-grow">
      <Header isScrolledPastHero={true} fixed={false} />
      <main className="flex-grow">
        {/* <TrustPilotRow /> */}
        <LeagueMatchList matches={matches} loading={loading} error={error} />
        <Testimonials />
        <LeagueRecentNews league={"English Premier League"} />
        <LeagueTickets league={"English Premier League"} />
      </main>
      <Footer />
    </div>
  );
};

export default League;
