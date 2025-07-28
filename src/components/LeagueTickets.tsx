import React, { useEffect, useState } from "react";
import { GET_UPCOMING_POPULAR_MATCHES } from "../api/queries/PopularUpcomingMatches";
import { formatDate } from "../lib/utils";
import { useQuery } from "@apollo/client/react/hooks";
import  Link  from "next/link";

interface LeagueTicketsProps {
    league: string;
}

const LeagueTickets: React.FC<LeagueTicketsProps> = ({ league }) => {


    const [featuredMatches, setFeaturedMatches] = useState([]);

    const { data: upcomingData,
        loading: upcomingLoading,
        error: upcomingError,
    } = useQuery(GET_UPCOMING_POPULAR_MATCHES, {
        variables: { limit: 20, },
        fetchPolicy: "network-only",
    });

    useEffect(() => {
        if (upcomingData?.popularUpcomingMatches) {
            const formattedMatches = upcomingData.popularUpcomingMatches.map((match: any, index: number) => {
                const matchDate = new Date(Number(match.date));
                return {
                    id: index,
                    homeTeam: match.home_team,
                    awayTeam: match.away_team,
                    categoryName: match.league,
                    year: matchDate.getFullYear(),
                    month: matchDate.toLocaleString("en-US", { month: "short" }).toUpperCase(),
                    day: matchDate.getDate(),
                    time: matchDate.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    }),
                    venue: match.venue,
                    city: match.city,
                    country: match.country,
                    eventName: match.title,
                    date: formatDate(match.date),
                    league: match.league,
                    urlToEvent: match.slug,
                    tba: false,
                    minPrice: {
                        gbp: 95,
                        usd: 120,
                        eur: 110,
                        aud: 170,
                        cad: 160,
                        chf: 105,
                    },
                    link: `/tickets/${match.slug}`,
                };
            });
            setFeaturedMatches(formattedMatches);
        }
    }, [upcomingData]);


    return (
        <section className="py-8 bg-white">
            <div className="ticket-container">
                <div>
                    <h1 className="font-dosis text-ltg-black capitalize text-xl font-medium lg:text-xl">
                        ⚽ Buy 2025-2026 {league} tickets securely online
                    </h1>
                    <hr className="my-4" />
                    <div className="text-sm font-light text-black mb-2 text-justify">
                        <p>
                            Since the inception of the FA Premiership, the Premier League has been largely dominated by three clubs—Manchester United, Arsenal, and Chelsea. In recent years, Manchester City has also emerged as a major force. Manchester United holds the record for the most Premier League titles. Other teams that have claimed the Barclays Premier League title during United’s reign include Blackburn Rovers, Arsenal, Liverpool, and Chelsea.
                        </p>


                        <div className="py-4 pb-4">
                            <h2 className="font-dosis text-ltg-black capitalize text-xl font-medium lg:text-xl">

                                How to buy {league} tickets?</h2>
                            <div className="py-2">
                                <p>
                                    FootballTicketsHub offers a secure platform with real-time inventory for Premier League tickets, including match-day seats at various price points. Buy affordable or hard-to-get tickets for the Premier League, FA Cup, and top clubs like Liverpool, Manchester City, Manchester United, Tottenham, Arsenal, and Chelsea. Experience the excitement of live football—book your tickets now!
                                </p>
                            </div>
                            <div className="py-2">
                                <ol className="list-decimal pl-5 space-y-2">
                                    <li>Select the match you want to attend and click 'View Tickets'.</li>
                                    <li>Select the area you would like to sit within the stadium on the right-hand side.</li>
                                    <li>Select the number of tickets you would like to purchase.</li>
                                    <li>Click on the green 'Buy' button.</li>
                                    <li>Complete the order form using your personal details.</li>
                                    <li>Don't forget to check all your information is correct.</li>
                                    <li>Click 'Make Payment'.</li>
                                    <li>The tickets are now yours!</li>
                                </ol>
                            </div>


                        </div>

                        <div className="py-4 pb-4">
                            <h2 className="font-dosis text-ltg-black capitalize text-xl font-medium lg:text-xl">
                                {league} Tickets</h2>
                            <div className="py-2">
                                <p>
                                    The English Premier League boasts a passionate fan base supporting its 20 top clubs. Giants like Manchester United, Chelsea, Arsenal, Liverpool, Manchester City, and Tottenham dominate the league. Secure your tickets now at LiveFootballTickets.com for the best seats. We ensure a smooth booking process and timely ticket delivery for every match.
                                </p>
                            </div>
                        </div>


                        <div className="py-4 pb-4">
                            <h2 className="font-dosis text-ltg-black capitalize text-xl font-medium lg:text-xl">
                                2025-2026 important {league} fixtures
                            </h2>

                            <div className="py-2 overflow-x-auto">
                                <table className="w-full min-w-[600px] text-left border-b">
                                    <thead>
                                        <tr>
                                            <th className="text-xs font-semibold border-b py-2">Date</th>
                                            <th className="text-xs font-semibold border-b py-2">Home Team</th>
                                            <th className="text-xs font-semibold border-b py-2">Away Team</th>
                                            <th className="text-xs font-semibold border-b py-2">Tickets</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!upcomingLoading && featuredMatches.length > 0 ? (
                                            featuredMatches.map((match, index) => (
                                                <tr key={index}>
                                                    <td className="text-xs font-light border-b py-2">{match.date}</td>
                                                    <td className="text-xs font-light border-b py-2">{match.homeTeam}</td>
                                                    <td className="text-xs font-light border-b py-2">{match.awayTeam}</td>
                                                    <td className="text-xs font-light border-b py-2">
                                                        <Link
                                                            href={{
                                                                pathname:`${match.link}`,
                                                            query: {
                                                                homeTeam: match.homeTeam,
                                                                eventId: match.id,
                                                                eventCode: match.eventCode,
                                                                eventTypeCode: match.eventTypeCode,
                                                                pageNumber: 1,
                                                                eventName: match.eventName,
                                                                categoryName: match.categoryName,
                                                                day: match.day,
                                                                month: match.month,
                                                                year: match.year,
                                                                time: match.time,
                                                                venue: match.venue,
                                                                city: match.city,
                                                                country: match.country,
                                                                minPrice: match.minPrice,
                                                            }}}
                                                            className="text-gray-500 underline hover:underline"
                                                        >
                                                            Find your tickets
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="text-center text-sm text-gray-500 py-4">
                                                    No featured matches available.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>


                        <div className="py-4 pb-4">
                            <h2 className="font-dosis text-ltg-black capitalize text-xl font-medium lg:text-xl">
                                {league} wins and trophies</h2>
                            <div className="py-2">
                                <p>
                                    Defending England Premiership holders are Manchester City. Man Utd have won 20 English league trophies, the most of any side in the history of the first division league, while FC Liverpool has earned 19 Barclays Premiership titles. Other teams that have won the Premiership are Blackburn Rovers, Arsenal, Liverpool and Chelsea. Cheap and premium football tickets for the Barclays Premier League are available to buy now at LiveFootballTickets.com. In the table below you will find the clubs who have won the trophy since the start of the Premier League in 1992.                                </p>
                            </div>
                            <div className="py-2">
                                <table className="border-b w-full text-left">
                                    <thead>
                                        <tr>
                                            <th className="text-xs font-semibold border-b py-2">Team</th>
                                            <th className="text-xs font-semibold border-b py-2">No. Titles</th>
                                            <th className="text-xs font-semibold border-b py-2">Year(s) of Title</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { team: "Manchester United", titles: 13, years: "1993, 1994, 1996, 1999, 2000, 2001, 2003, 2006, 2008, 2009, 2011, 2013" },
                                            { team: "Manchester City", titles: 8, years: "2012, 2014, 2018, 2019, 2021, 2022, 2023, 2024" },
                                            { team: "Chelsea", titles: 5, years: "2005, 2006, 2010, 2015, 2017" },
                                            { team: "Arsenal", titles: 3, years: "1998, 2002, 2004" },
                                            { team: "Liverpool", titles: 2, years: "2020, 2025" },
                                            { team: "Blackburn Rovers", titles: 1, years: "1995" },
                                            { team: "Leicester City", titles: 1, years: "2016" },

                                        ].map((team, index) => (
                                            <tr key={index}>
                                                <td className="text-xs font-light border-b py-2">{team.team}</td>
                                                <td className="text-xs font-light border-b py-2">{team.titles}</td>
                                                <td className="text-xs font-light border-b py-2">{team.years}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="py-4 pb-4">
                            <h2 className="font-dosis text-ltg-black capitalize text-xl font-medium lg:text-xl">
                                Biggest tournaments in 2025-26 season</h2>
                            <div className="py-2">
                                <p>
                                    The 2025-2026 season is going to be a special one, since the Champions League enters a new phase. We've got loads of tickets for huge events during this entire season including FA Cup final tickets, Champions League final tickets, Europa League final tickets and Conference League final tickets amongst others via our booking system.
                                </p>
                            </div>
                            <div className="py-2">
                                <p>
                                    Take note that finals are not including in the cup ranges. The price of football tickets depends on supply and demand, the location in the stadium and other factors.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default LeagueTickets;
