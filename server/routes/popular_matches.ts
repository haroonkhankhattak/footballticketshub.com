import { Router } from "express";
import { getLiveFootballPopularMatches } from "../scraper.ts";

const router = Router();

router.get("/", async (_req, res) => {
  console.log("GET /api/popularmatches called");
  try {
    const matches = await getLiveFootballPopularMatches();
    res.json({ matches });
  } catch (error) {
    console.error("Error in /api/matches:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
