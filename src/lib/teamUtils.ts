export function convertTeamNameToSlug(teamName: string): string {
  const map: Record<string, string> = {
    Arsenal: "arsenal",
    "Aston Villa": "aston-villa",
    Bournemouth: "bournemouth",
    Brentford: "brentford",
    Brighton: "brighton-hove-albion",
    "Brighton & Hove Albion": "brighton-hove-albion",
    Burnley: "burnley",
    Chelsea: "chelsea",
    "Crystal Palace": "crystal-palace",
    Everton: "everton",
    Fulham: "fulham",
    Liverpool: "liverpool",
    "Luton Town": "luton-town",
    "Manchester City": "manchester-city",
    "Manchester United": "manchester-united",
    Newcastle: "newcastle-united",
    "Newcastle United": "newcastle-united",
    "Nottingham Forest": "nottingham-forest",
    "Sheffield United": "sheffield-united",
    Tottenham: "tottenham-hotspur",
    "Tottenham Hotspur": "tottenham-hotspur",
    "West Ham": "west-ham-united",
    "West Ham United": "west-ham-united",
    Wolves: "wolves",
    Wolverhampton: "wolverhampton-wanderers",
    "Wolverhampton Wanderers": "wolverhampton-wanderers",
  };

  const normalized = teamName.trim();
  return map[normalized] || normalized.toLowerCase().replace(/\s+/g, "-");
}

export function convertSlugToTeamName(slug: string): string {
  const map: Record<string, string> = {
    arsenal: "Arsenal",
    "aston-villa": "Aston Villa",
    bournemouth: "Bournemouth",
    brentford: "Brentford",
    "brighton-hove-albion": "Brighton & Hove Albion",
    burnley: "Burnley",
    chelsea: "Chelsea",
    "crystal-palace": "Crystal Palace",
    everton: "Everton",
    fulham: "Fulham",
    liverpool: "Liverpool",
    "leeds-united": "Leeds United",
    "manchester-city": "Manchester City",
    "manchester-united": "Manchester United",
    "newcastle-united": "Newcastle United",
    "nottingham-forest": "Nottingham Forest",
    "sheffield-united": "Sheffield United",
    "tottenham-hotspur": "Tottenham Hotspur",
    "west-ham-united": "West Ham United",
    wolves: "Wolves",
    "wolverhampton-wanderers": "Wolverhampton Wanderers",
    "premier-league": "Premier League",
  };

  const normalized = slug.trim().toLowerCase();
  return map[normalized] || normalized.replace(/-/g, " ");
}
