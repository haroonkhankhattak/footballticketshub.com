import { NextResponse } from "next/server";

export async function GET() {
  try {
    const externalRes = await fetch("https://www.livefootballtickets.com/", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html",
        "Accept-Language": "en-US,en;q=0.9",
        Connection: "keep-alive",
      },
    });

    const html = await externalRes.text();

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: "Failed to fetch from target site", details: "ksdjfaksldjf" },
      { status: 500 }
    );
  }
}
