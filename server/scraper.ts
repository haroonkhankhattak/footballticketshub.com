import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { log } from "console";
// import { TicketsResponse } from "./types/tickets.ts";

export interface MatchProps {
  id: number;
  date: string;
  month: string;
  year: string;
  competition: string;
  teams: string;
  time: string;
  venue: string;
  country: string;
}

interface PopularEvent {
  "@type": string;
  startDate: string;
  location: {
    name: string;
    address: {
      addressCountry: {
        name: string;
      };
    };
  };
  competitor: Array<{ name: string }>;
  name: string;
  // Add other properties as needed based on your JSON structure
}

type EventProps = {
  id: number;
  homeTeam: string;
  categoryName: string;
  eventName: string;
  year: number;
  month: string;
  day: number;
  time: string;
  venue: string;
  city: string;
  country: string;
  urlToEvent: string;
  tba: boolean;
  minPrice: {
    gbp: number;
    usd: number;
    eur: number;
    aud: number;
    cad: number;
    chf: number;
  };
};

export interface ClubEventProps {
  name: string;
  startDate: string;
  endDate: string;
  locationName: string;
  city: string;
  country: string;
  competitors: string[];
}

type CurrencyAmount = {
  gbp: number;
  usd: number;
  eur: number;
  aud: number;
  cad: number;
  chf: number;
};

export interface TicketOption {
  type: string;
  options: {
    name: string;
    description: string;
    code: string;
  }[];
}

export interface TicketProps {
  url: string;
  ticketId: number;
  badges: string[];
  quantities: number[];
  section: string;
  row: string;
  sellerPrice: Record<string, number>;
  total: Record<string, number>;
  layoutCategoryId: number;
  shippingTypeId: string;
  ticketOptions: TicketOption[];
  allocationId: string;
  allocation: string;
}

export interface TicketsResponse {
  tickets: {
    items: TicketProps[];
    pageNumber: number;
    totalPages: number;
    totalCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export async function getLiveFootballPopularMatches(): Promise<EventProps[]> {
  console.log("--------", "getLiveFootballPopularMatches");

  const url = "https://www.livefootballtickets.com/";
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    },
  });

  const html = await response.text();
  const $ = cheerio.load(html);
  const matches: EventProps[] = [];
  const scriptTag = $('script:contains("popularEvents")');
  if (scriptTag.length) {
    const scriptContent = scriptTag.html();
    const match = scriptContent?.match(/__next_f\.push\((\[.*\])\)/);
    const jsonString = match?.[1];

    if (jsonString) {
      try {
        const parsed = JSON.parse(jsonString);
        // This is typically structured like: [1, "9:..."]
        const rawData = parsed[1]; // This might contain popularEvents inside

        if (
          typeof rawData === "string" &&
          rawData.includes('"popularEvents":')
        ) {
          const eventMatch = rawData.match(/"popularEvents":(\[.*?\])[,}]/s);
          if (eventMatch) {
            const popularEvents = JSON.parse(eventMatch[1]);
            popularEvents.forEach((event) => {
              const date = new Date(event.eventDateTime);

              const roundPrice = (value) => {
                if (typeof value !== "number") return 0;
                return Math.round(value);
              };
              console.log("--------oldest---", event.eventName);
              const homeTeam = getHomeTeam(event.eventName);
              matches.push({
                homeTeam: "homeTeam",
                id: event.id || Math.floor(Math.random() * 1000000),
                categoryName: event.categoryName || "Unknown Category",
                eventName: event.eventName || "Unnamed Event",
                year: date.getUTCFullYear(),
                month: date.toLocaleString("en-US", { month: "short" }),
                day: date.getUTCDate(),
                time: date.toISOString().substring(11, 16),
                venue: event.venue || "Unknown Venue",
                city: event.city || "Unknown City",
                country: event.country || "Unknown Country",
                urlToEvent: event.urlToEvent || "#",
                tba: event.tba ?? false,
                minPrice: {
                  gbp: roundPrice(event.minPrice?.gbp),
                  usd: roundPrice(event.minPrice?.usd),
                  eur: roundPrice(event.minPrice?.eur),
                  aud: roundPrice(event.minPrice?.aud),
                  cad: roundPrice(event.minPrice?.cad),
                  chf: roundPrice(event.minPrice?.chf),
                },
              });
            });
          }
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } else {
      console.log("------ jsonstring....2");
    }
  } else {
    console.log("------ jsonstring....1");
  }

  return matches;
}

export async function getLiveFootballLeagueMatchesJson(
  url: string
): Promise<EventProps[]> {
  console.log("--------", "getLiveFootballLeagueMatchesJson");

  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    },
  });

  const html = await response.text();
  const $ = cheerio.load(html);
  console.log("-----jsonString-----", url);
  const matches: EventProps[] = [];
  const scriptTag = $('script:contains("popularEvents")');
  if (scriptTag.length) {
    console.log("jsonString");
    const scriptContent = scriptTag.html();
    const match = scriptContent?.match(/__next_f\.push\((\[.*\])\)/);
    const jsonString = match?.[1];

    console.log("123.", jsonString);
    if (jsonString) {
      console.log(jsonString);

      try {
        const parsed = JSON.parse(jsonString);
        // This is typically structured like: [1, "9:..."]
        const rawData = parsed[1]; // This might contain popularEvents inside

        if (
          typeof rawData === "string" &&
          rawData.includes('"popularEvents":')
        ) {
          const eventMatch = rawData.match(/"popularEvents":(\[.*?\])[,}]/s);
          if (eventMatch) {
            const popularEvents = JSON.parse(eventMatch[1]);

            popularEvents.forEach((event) => {
              const date = new Date(event.eventDateTime);

              const roundPrice = (value) => {
                if (typeof value !== "number") return 0;
                return Math.round(value);
              };
              console.log("--------old---", event.eventName);
              const homeTeam = getHomeTeam(event.eventName);
              matches.push({
                homeTeam: homeTeam,
                id: event.id || Math.floor(Math.random() * 1000000),
                categoryName: event.categoryName || "Unknown Category",
                eventName: event.eventName || "Unnamed Event",
                year: date.getUTCFullYear(),
                month: date.toLocaleString("en-US", { month: "short" }),
                day: date.getUTCDate(),
                time: date.toISOString().substring(11, 16),
                venue: event.venue || "Unknown Venue",
                city: event.city || "Unknown City",
                country: event.country || "Unknown Country",
                urlToEvent: event.urlToEvent || "#",
                tba: event.tba ?? false,
                minPrice: {
                  gbp: roundPrice(event.minPrice?.gbp),
                  usd: roundPrice(event.minPrice?.usd),
                  eur: roundPrice(event.minPrice?.eur),
                  aud: roundPrice(event.minPrice?.aud),
                  cad: roundPrice(event.minPrice?.cad),
                  chf: roundPrice(event.minPrice?.chf),
                },
              });
            });
          }
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } else {
      console.log("------ jsonstring....2");
    }
  } else {
    console.log("------ jsonstring....1");
  }

  return matches;
}

export async function getLiveFootballClubMatchesJson(
  url: string
): Promise<EventProps[]> {
  console.log("--------", "getLiveFootballClubMatchesJson");
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
      },
    });
    const matches: EventProps[] = [];
    if (!response.ok) {
      console.error(`Failed to fetch URL: ${url} - Status: ${response.status}`);
      return [];
    }

    const roundPrice = (value) => {
      if (typeof value !== "number") return 0;
      return Math.round(value);
    };

    const html = await response.text();
    const $ = cheerio.load(html);
    const scriptTags = $('script:contains("upcomingEvents")');

    if (scriptTags.length >= 2) {
      const secondScript = scriptTags.eq(1).html();
      const match = secondScript?.match(/__next_f\.push\((\[.*\])\);?/);

      if (match && match[1]) {
        try {
          const rawArray = match[1]
            .replace(/\\u0026/g, "&") // decode unicode ampersand
            .replace(/\\"/g, '"') // unescape quotes
            .replace(/\\n/g, "") // remove line breaks
            .replace(/\\\//g, "/"); // unescape slashes

          const jsonSubstringMatch = rawArray.match(
            /"upcomingEvents":(\[.*?\])(?:,|})/s
          );

          if (jsonSubstringMatch && jsonSubstringMatch[1]) {
            const upcomingEvents = JSON.parse(jsonSubstringMatch[1]);
            upcomingEvents.map((event) => {
              const date = new Date(event.eventDateTime);
              console.log("--------", event.eventName);
              const homeTeam = getHomeTeam(event.eventName);
              matches.push({
                homeTeam: homeTeam,
                id: event.id,
                categoryName: event.categoryName,
                eventName: event.eventName,
                year: date.getUTCFullYear(),
                month: date.toLocaleString("en-US", { month: "short" }),
                day: date.getUTCDate(),
                time: date.toISOString().substring(11, 16), // "HH:MM" in UTC
                venue: event.venue,
                city: event.city,
                country: event.country,
                urlToEvent: event.urlToEvent,
                tba: event.tba ?? false,
                minPrice: {
                  gbp: roundPrice(event.minPrice?.gbp),
                  usd: roundPrice(event.minPrice?.usd),
                  eur: roundPrice(event.minPrice?.eur),
                  aud: roundPrice(event.minPrice?.aud),
                  cad: roundPrice(event.minPrice?.cad),
                  chf: roundPrice(event.minPrice?.chf),
                },
              });
            });
            return matches;
          } else {
            console.error("Could not extract upcomingEvents JSON");
            return [];
          }
        } catch (error) {
          console.error("Error parsing JSON from the second script:", error);
        }
      } else {
        console.warn(
          "Could not find target jsonString in the second script tag."
        );
      }
    } else if (scriptTags.length === 1) {
      console.warn("Only one script tag with 'upcomingEvents' found.");
    } else {
      console.warn("No script tags containing 'upcomingEvents' found.");
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return [];
  }
}

export async function getLiveFootballPopularMatchesHTML(): Promise<
  MatchProps[]
> {
  console.log("--------", "getLiveFootballPopularMatchesHTML");

  const url = "https://www.livefootballtickets.com/";
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    },
  });

  const html = await response.text();
  const $ = cheerio.load(html);

  const matches: MatchProps[] = [];

  $('a[data-testid="upcoming-event"]').each((_, el) => {
    const month = $(el).find('[data-testid="month"]').text().trim();
    const day = $(el).find('[data-testid="day"]').text().trim();
    const year = $(el).find('[data-testid="year"]').text().trim();
    const date = day;

    const time = $(el).find('[data-testid="time"] span').first().text().trim();
    const competition = $(el)
      .find('p:contains("League"), p:contains("Cup")')
      .first()
      .text()
      .trim();
    const teams = $(el).find("p.text-xl, p.font-medium").first().text().trim();
    const location = $(el).find(".text-ltg-grey-1 span").last().text().trim();
    // console.log("------popularEvents------", popularEvents);

    matches.push({
      id: Math.floor(Math.random() * 1000000), // optional unique ID
      date,
      month,
      year,
      competition,
      teams,
      time,
      venue: location,
      country: "", // you can extract country if needed
    });
  });

  return matches;
}

export async function getLiveFootballClubMatches(
  url: string
): Promise<MatchProps[]> {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    },
  });

  const html = await response.text();
  const $ = cheerio.load(html);

  const matches: MatchProps[] = [];

  $('a[data-testid="upcoming-event"]').each((_, el) => {
    const month = $(el).find('[data-testid="month"]').text().trim();
    const day = $(el).find('[data-testid="day"]').text().trim();
    const year = $(el).find('[data-testid="year"]').text().trim();
    const date = day; // ✅ Only the day number

    const time = $(el).find('[data-testid="time"] span').first().text().trim();
    const competition = $(el)
      .find('p:contains("League"), p:contains("Cup")')
      .first()
      .text()
      .trim();
    const teams = $(el).find("p.text-xl, p.font-medium").first().text().trim();
    const location = $(el).find(".text-ltg-grey-1 span").last().text().trim();

    matches.push({
      id: Math.floor(Math.random() * 1000000), // optional unique ID
      date,
      month,
      year,
      competition,
      teams,
      time,
      venue: location,
      country: "Unknown", // you can extract country if needed
    });
  });

  return matches;
}

//tickets
export async function getLiveFootballClubTicketsJson(
  url: string
): Promise<TicketsResponse> {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tickets");
  }

  const tickets = (await response.json()) as TicketsResponse;

  return tickets;
}

export function getHomeTeam(matchTitle: string): string {
  const vsIndex = matchTitle.toLowerCase().indexOf(" vs ");
  if (vsIndex === -1) return matchTitle.trim(); // fallback if 'vs' not found

  const homeTeam = matchTitle.slice(0, vsIndex).trim();
  return homeTeam;
}
