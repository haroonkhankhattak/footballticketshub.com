import { extractUpcomingMatches } from "@/lib/apiClient/services/fetchUpcomingMatches";
import { ApiClient } from "../apiClient/ApiClient";
import * as cheerio from "cheerio";
import { Match } from "./models/Match";

export async function fetchMatchesFromUrl(url: string): Promise<Match[]> {
  const html = await ApiClient<string>(url); // fetch full page
  return extractUpcomingMatches(html);
}
