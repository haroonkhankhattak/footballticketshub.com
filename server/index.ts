// import express from "express";
// import cors from "cors";
// import matchesRoute from "./routes/popular_matches.ts";
// import ticketsRoute from "./routes/club_tickets.ts";
// import leagueMatchesRoute from "./routes/league_matches.ts";
// import clubMatchesRoute from "./routes/club_matches.ts";

// const app = express();
// const port = 4000;

// app.use(cors());
// app.use(express.json());
// app.use(express.text());

// app.get("/", (_req, res) => {
//   res.send("Server is alive ✅");
// });

// app.use("/api/popular_matches", matchesRoute);
// app.use("/api/league_matches", leagueMatchesRoute);
// app.use("/api/club_matches", clubMatchesRoute);
// app.use("/api/club_tickets", ticketsRoute);

// app.listen(port, () => {
//   console.log(`🚀 Server is running at http://localhost:${port}`);
// });
