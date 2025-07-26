'use client';

import { useEffect, useState } from 'react';
import Header from '../../../components/layout/Header';
import TeamMatchList from '../../../components/TeamMatchList';
import Testimonials from '../../../components/Testimonials';
import RecentNews from '../../../components/RecentNews';
import FootballTickets from '../../../components/FootballTickets';
import Footer from '../../../components/layout/Footer';

import { useQuery } from '@apollo/client';
import { GET_MATCHES_BY_TEAM } from '../../../api/queries/MatchesByTeam';
import { Match } from '../../../types/match';

interface MatchPageClientProps {
  league: string;
  team: string;
}

export default function MatchPageClient({ league, team }: MatchPageClientProps) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data, error: gqlError } = useQuery(GET_MATCHES_BY_TEAM, {
    variables: { team },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data?.matchesByTeam) {
      setMatches(data.matchesByTeam);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (gqlError) setError(gqlError.message);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [gqlError]);

  return (
    <div className="min-h-screen flex-grow">
      <Header isScrolledPastHero fixed={false} />
      <main className="flex-grow">
        <TeamMatchList matches={matches} loading={loading} error={error} />
        <Testimonials />
        <RecentNews />
        <FootballTickets />
      </main>
      <Footer />
    </div>
  );
}
