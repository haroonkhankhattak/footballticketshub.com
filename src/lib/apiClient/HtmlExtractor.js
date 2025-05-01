import { ApiClient } from "../apiClient/ApiClient";
import * as cheerio from "cheerio";

/**
 * Fetches a webpage and extracts a section based on selector.
 * @param {string} url - The URL of the webpage.
 * @param {string} selector - CSS selector to extract (example: "#id", ".class", "table").
 * @returns {Promise<string>} HTML content of selected element.
 */
export async function fetchSectionFromHtml(url, selector) {
  try {
    const html = await ApiClient(url, { method: "GET" }); // will auto fallback to text
    const $ = cheerio.load(html);
    const selectedContent = $(selector).html(); // inner HTML
    return selectedContent;
  } catch (error) {
    console.error("Error scraping section:", error);
    throw error;
  }
}
