import { Match } from "./match";

export interface Props {
  matches: Match[];
  loading: boolean;
  error: string | null;
}

// export type EventProps = {
//   homeTeam: string;
//   id: number;
//   categoryName: string;
//   eventName: string;
//   year: number;
//   month: string;
//   day: number;
//   venue: string;
//   city: string;
//   country: string;
//   time: string;
//   urlToEvent: string;
//   tba: boolean;
//   minPrice: {
//     gbp: number;
//     usd: number;
//     eur: number;
//     aud: number;
//     cad: number;
//     chf: number;
//   };
// };
