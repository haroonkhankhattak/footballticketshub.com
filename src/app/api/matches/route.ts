import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://www.livefootballtickets.com/", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://www.google.com/",
        Connection: "keep-alive",
      },
    });

    const html = await response.text();

    return new NextResponse(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch external site" },
      { status: 500 }
    );
  }
}
