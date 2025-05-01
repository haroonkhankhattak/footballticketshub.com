// models/Match.ts
export interface Match {
  url: string;
  date: string; // e.g. "2025-05-04"
  time?: string; // e.g. "16:30"
  homeTeam: string;
  awayTeam: string;
  stadium: string;
  city: string;
  country: string;
}
