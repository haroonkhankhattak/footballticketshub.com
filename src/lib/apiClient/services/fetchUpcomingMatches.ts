// lib/scraper/fetchUpcomingMatches.ts
import * as cheerio from "cheerio";
import { Match } from "../models/Match";

export async function extractUpcomingMatches(html: string): Promise<Match[]> {
  const $ = cheerio.load(html);

  const matches: Match[] = [];

  $("[data-testid='upcoming-event']").each((_, el) => {
    const container = $(el);
    const url = container.attr("href")?.trim() ?? "";

    const day = container.find("[data-testid='day']").text().trim();
    const month = container.find("[data-testid='month']").text().trim();
    const year = container.find("[data-testid='year']").text().trim();
    const time = container.find("[data-testid='time'] span").text().trim();

    const dateFormatted = `${year}-${month}-${day}`; // You can reformat with luxon or dayjs

    const teams = container.find("h3").text().split(" v ");
    const homeTeam = teams[0]?.trim() ?? "";
    const awayTeam = teams[1]?.trim() ?? "";

    const stadium = container.find(".md\\:inline").text().trim();
    const locationParts = stadium.split(",");
    const city = locationParts[1]?.trim() ?? "";
    const country = locationParts[2]?.trim() ?? "";

    matches.push({
      url,
      date: dateFormatted,
      time,
      homeTeam,
      awayTeam,
      stadium,
      city,
      country,
    });
  });

  return matches;
}
