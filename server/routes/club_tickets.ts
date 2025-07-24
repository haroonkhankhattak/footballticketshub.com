import { Router } from "express";
import { getLiveFootballClubTicketsJson } from "../scraper.ts";

const router = Router();

router.post("/", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    res.status(400).json({ error: "Missing 'url' in request body" });
    return;
  } else {
    try {
      console.log("Received ticket URL (POST body):", url);
      const tickets = await getLiveFootballClubTicketsJson(url);
      console.log("Received response---", tickets);
      res.json({ tickets });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch ticket data" });
    }
  }
});

export default router;
