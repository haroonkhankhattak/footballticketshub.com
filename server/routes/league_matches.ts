import { Router } from "express";
import { getLiveFootballLeagueMatchesJson } from "../scraper.ts";

const router = Router();

router.post("/", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    res.status(400).json({ error: "Missing 'url' in request body" });
    return;
  } else {
    try {
      console.log("Received ticket URL (POST body):", url);
      const matches = await getLiveFootballLeagueMatchesJson(url);
      res.json({ matches });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch ticket data" });
    }
  }
});

export default router;
