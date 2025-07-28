'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import LeagueMatchList from "../../components/LeagueMatchList";
import Testimonials from "../../components/Testimonials";
import LeagueRecentNews from "../../components/LeagueRecentNews";
import LeagueTickets from "../../components/LeagueTickets";
import Footer from "../../components/layout/Footer";

import { useQuery } from "@apollo/client";
import { GET_MATCHES_BY_LEAGUE } from "../../api/queries/MatchesByLeague";
import { Match } from "../../types/match";

export default function League() {
  const { league } = useParams(); 

  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data } = useQuery(GET_MATCHES_BY_LEAGUE, {
    variables: { league },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.matchesByLeague) {
      setMatches(data.matchesByLeague);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen flex-grow">
      <Header isScrolledPastHero={true} fixed={false} />
      <main className="flex-grow">
        <LeagueMatchList league={league.toString()} matches={matches} loading={loading} error={error} />
        <Testimonials />
        <LeagueRecentNews league={league.toString()} />
        <LeagueTickets league={league.toString()} />
      </main>
      <Footer />
    </div>
  );
}
