interface Team {
  name: string;
  link: string;
}

interface League {
  title: string;
  viewAllLink: string;
  teams: Team[];
}

export const leagues: League[] = [
  {
    title: "English Premier League",
    viewAllLink: "/league/premier-league",
    teams: [
      { name: "Arsenal", link: "/matches/premier-league/arsenal" },
      { name: "Aston Villa", link: "/matches/premier-league/aston-villa" },
      { name: "Bournemouth", link: "/matches/premier-league/bournemouth" },
      { name: "Brentford", link: "/matches/premier-league/brentford" },
      {
        name: "Brighton & Hove Albion",
        link: "/matches/premier-league/brighton-hove-albion",
      },
      { name: "Burnley", link: "/matches/premier-league/burnley" },
      { name: "Chelsea", link: "/matches/premier-league/chelsea" },
      {
        name: "Crystal Palace",
        link: "/matches/premier-league/crystal-palace",
      },
      { name: "Everton", link: "/matches/premier-league/everton" },
      { name: "Fulham", link: "/matches/premier-league/fulham" },
      { name: "Leeds United", link: "/matches/premier-league/leeds-united" },
      { name: "Liverpool", link: "/matches/premier-league/liverpool" },
      {
        name: "Manchester City",
        link: "/matches/premier-league/manchester-city",
      },
      {
        name: "Manchester United",
        link: "/matches/premier-league/manchester-united",
      },
      {
        name: "Newcastle United",
        link: "/matches/premier-league/newcastle-united",
      },
      {
        name: "Nottingham Forest",
        link: "/matches/premier-league/nottingham-forest",
      },
      {
        name: "Tottenham Hotspur",
        link: "/matches/premier-league/tottenham-hotspur",
      },
      {
        name: "West Ham United",
        link: "/matches/premier-league/west-ham-united",
      },
      { name: "Wolves", link: "/matches/premier-league/wolves" },
      { name: "Sunderland", link: "/matches/premier-league/sunderland" },
    ],
  },
];

// {
//   title: "Spanish La Liga",
//   viewAllLink: "/la-liga-tickets.html",
//   teams: [
//     { name: "FC Barcelona", link: "/la-liga/fc-barcelona-tickets.html" },
//     { name: "Real Madrid", link: "/la-liga/real-madrid-tickets.html" },
//   ],
// },
// {
//   title: "National Football Teams",
//   viewAllLink: "/national-football-teams-tickets.html",
//   teams: [
//     {
//       name: "England",
//       link: "/national-football-teams/england-football-tickets.html",
//     },
//     {
//       name: "Scotland",
//       link: "/national-football-teams/scotland-football-tickets.html",
//     },
//   ],
// },
// {
//   title: "Champions League",
//   viewAllLink: "/champions-league-tickets.html",
//   teams: [
//     {
//       name: "Real Madrid",
//       link: "/champions-league/real-madrid-tickets.html",
//     },
//     {
//       name: "Bayern Munich",
//       link: "/champions-league/bayern-munich-tickets.html",
//     },
//   ],
// },
// {
//   title: "Italian Serie A",
//   viewAllLink: "/serie-a-tickets.html",
//   teams: [
//     { name: "AC Milan", link: "/serie-a/ac-milan-tickets.html" },
//     { name: "AS Roma", link: "/serie-a/as-roma-tickets.html" },
//   ],
// },
// ];
