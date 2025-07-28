'use client';

import { useState, useEffect } from "react";
import Header from "../../../components/layout/Header";
import TeamMatchList from "../../../components/TeamMatchList";
import Testimonials from "../../../components/Testimonials";
import RecentNews from "../../../components/RecentNews";
import FootballTickets from "../../../components/FootballTickets";
import Footer from "../../../components/layout/Footer";
import { useParams } from 'next/navigation';

import { useQuery } from "@apollo/client/react/hooks";
import { GET_MATCHES_BY_TEAM } from "../../../api/queries/MatchesByTeam";
import { Match } from "../../../types/match";

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


const Team = () => {

  const { league, team } = useParams();
  console.log("league:",league, "taem:",team)

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);



  const [matches, setMatches] = useState<Match[]>([]);



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


  return (
    <div className="min-h-screen flex-grow">
      <Header isScrolledPastHero={true} fixed={false} />
      <main className="flex-grow">
        {/* <TrustPilotRow /> */}
        <TeamMatchList league={league.toString()} team={team.toString()} matches={matches} loading={loading} error={error} />
        <Testimonials />
        <RecentNews />
        <FootballTickets />
      </main>
      <Footer />
    </div>
  );
};

export default Team;
