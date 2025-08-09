export interface StadiumInfo {
    slug: string,
    team: string;
    stadium: string;
    description: string;
}

export const premierLeagueStadiums: StadiumInfo[] = [
    {
        team: "Arsenal",
        slug: "arsenal",  // Added slug
        stadium: "Emirates Stadium",
        description: "Mikel Arteta's side continues to play dynamic, possession-based football, with Bukayo Saka and Martin Ødegaard leading the charge. The Emirates Stadium buzzes with anticipation as they aim to clinch their first league title since 2004.",
    },
    {
        team: "Aston Villa",
        slug: "aston-villa",  // Added slug
        stadium: "Villa Park",
        description: "Under Unai Emery, Villa combine tactical discipline with attacking flair. Ollie Watkins remains a key figure, and Villa Park's passionate atmosphere makes for an electrifying matchday experience.",
    },
    {
        team: "AFC Bournemouth",
        slug: "afc-bournemouth",  // Added slug
        stadium: "Vitality Stadium",
        description: "Andoni Iraola's Cherries are known for their high-pressing, energetic style. With a youthful squad eager to make their mark, matches at the Vitality Stadium are full of excitement.",
    },
    {
        team: "Brentford",
        slug: "brentford",  // Added slug
        stadium: "Gtech Community Stadium",
        description: "Under Keith Andrews, the Bees will hope to continue to punch above their weight, showcasing cohesive team play with renewed tactical discipline. The addition of goalkeeper Caoimhín Kelleher from Liverpool will add solidity at the back, and Andrews’ leadership will instil greater resilience and organisation throughout the squad.",
    },
    {
        team: "Brighton & Hove Albion",
        slug: "brighton-hove-albion",  // Added slug
        stadium: "Falmer Stadium",
        description: "Brighton remain committed to attractive, attacking football. Their emphasis on youth development and tactical innovation underlines their status as one of the league's most intriguing teams.",
    },
    {
        team: "Burnley",
        slug: "burnley",  // Added slug
        stadium: "Turf Moor",
        description: "Vincent Kompany's Clarets are back in the top flight, bringing a blend of resilience and ambition. Turf Moor's intimate setting ensures a fiery atmosphere, especially against top-tier opponents.",
    },
    {
        team: "Chelsea",
        slug: "chelsea",  // Added slug
        stadium: "Stamford Bridge",
        description: "Enzo Maresca's youthful squad, featuring talents like Cole Palmer and new signing Liam Delap, secured 4th place. Stamford Bridge witnessed a blend of emerging talent and entertaining football.",
    },
    {
        team: "Crystal Palace",
        slug: "crystal-palace",  // Added slug
        stadium: "Selhurst Park",
        description: "Oliver Glasner's Eagles are flying high after clinching their first-ever FA Cup. Eberechi Eze's creativity and flair make Selhurst Park a must-visit for football purists.",
    },
    {
        team: "Everton",
        slug: "everton",  // Added slug
        stadium: "Hill Dickinson Stadium", // Also known as Bramley-Moore Dock home for the new season
        description: "Everton begin a bold new era at the Hill Dickinson Stadium, their stunning Bramley-Moore Dock home. With David Moyes back in charge and a focus on grit and youth, the Toffees promise intensity in a spectacular new setting.",
    },
    {
        team: "Fulham",
        slug: "fulham",  // Added slug
        stadium: "Craven Cottage",
        description: "Marco Silva's Cottagers play fluid, attacking football. Craven Cottage's riverside charm and vintage feel make it one of the most picturesque matchday experiences.",
    },
    {
        team: "Leeds United",
        slug: "leeds-united",  // Added slug
        stadium: "Elland Road",
        description: "Back in the Premier League, Leeds bring high-energy football and a fervent fanbase. Elland Road's atmosphere is unmatched, especially during intense Yorkshire derbies.",
    },
    {
        team: "Liverpool",
        slug: "liverpool",  // Added slug
        stadium: "Anfield",
        description: "Defending champions under Arne Slot, Liverpool combine tactical acumen with attacking prowess. Despite the departure of Trent Alexander-Arnold to Real Madrid, the Reds remain a formidable force at Anfield.",
    },
    {
        team: "Manchester City",
        slug: "manchester-city",  // Added slug
        stadium: "Etihad Stadium",
        description: "Pep Guardiola's side, integrating Tijjani Reijnders and Rayan Cherki, secured 3rd place. Their tactical brilliance and possession-based play make the Etihad a theatre of football artistry.",
    },
    {
        team: "Manchester United",
        slug: "manchester-united",  // Added slug
        stadium: "Old Trafford",
        description: "Ruben Amorim's Red Devils are undergoing a significant rebuild. The acquisition of Matheus Cunha aims to bolster their attacking options, with hopes of a resurgence at Old Trafford.",
    },
    {
        team: "Newcastle United",
        slug: "newcastle-united",  // Added slug
        stadium: "St James' Park",
        description: "Eddie Howe's Magpies clinched 5th and a League Cup victory. St James' Park's passionate supporters and the team's attacking style make them a thrilling watch.",
    },
    {
        team: "Nottingham Forest",
        slug: "nottingham-forest",  // Added slug
        stadium: "The City Ground",
        description: "Chris Wood's 20 goals propelled Forest to a surprising 7th-place finish. The City Ground's revival was a testament to their attacking resurgence.",
    },
    {
        team: "Sunderland",
        slug: "sunderland",  // Added slug
        stadium: "Stadium of Light",
        description: "Returning to the Premier League, Sunderland brings the historic Tyne-Wear derby back to the top flight. The Stadium of Light is set to host passionate encounters, reigniting old rivalries.",
    },
    {
        team: "Tottenham Hotspur",
        slug: "tottenham-hotspur",  // Added slug
        stadium: "Tottenham Hotspur Stadium",
        description: "Under Thomas Frank, Spurs will embrace a clear identity rooted in tactical organisation and intelligent pressing. The Danish manager will blend youthful talent with experienced heads to build a balanced and resilient side. Their recent Europa League triumph will give fans a long-awaited taste of success, and with Frank’s calm leadership at the helm, the Tottenham Hotspur Stadium will witness a new era of disciplined yet adventurous football.",
    },
    {
        team: "West Ham United",
        slug: "west-ham-united",  // Added slug
        stadium: "London Stadium",
        description: "Julen Lopetegui's Hammers are focusing on attacking football. The London Stadium's vibrant atmosphere complements their ambition to climb the league table.",
    },
    {
        team: "Wolves",
        slug: "wolves",  // Added slug
        stadium: "Molineux Stadium",
        description: "Vítor Pereira's Wolves showcase resilience, with Matheus Cunha's departure to Manchester United opening opportunities for emerging talents. Molineux remains a fortress of passionate support.",
    },
];



export function getDescriptionByTeamName(slug: string): string | undefined {
    const teamInfo = premierLeagueStadiums.find(
        (team) => team.slug.toLowerCase() === slug.toLowerCase()
    );
    return teamInfo ? teamInfo.description : undefined;
}