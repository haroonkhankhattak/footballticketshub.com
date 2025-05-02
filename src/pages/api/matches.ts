// pages/api/livefootballtickets.ts

import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Make the server-side request to the external API
    const response = await fetch("https://www.livefootballtickets.com", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
      },
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch data from livefootballtickets.com");
    }

    // Get the response data
    const data = await response.text(); // or response.json() if it returns JSON

    // Send the data as a JSON response to the client
    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

export default handler;
