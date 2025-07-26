import MatchPageClient from '../../../../features/matches/pages/MatchPageClient';
import { Suspense } from 'react';

interface MatchPageProps {
  params: {
    league: string;
    team: string;
  };
}

export default function MatchPage({ params }: MatchPageProps) {
  return (
    <Suspense fallback={<div>Loading team matches...</div>}>
      <MatchPageClient league={params.league} team={params.team} />
    </Suspense>
  );
}
