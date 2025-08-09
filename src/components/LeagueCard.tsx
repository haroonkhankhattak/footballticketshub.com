import Image from "next/image";
import slugify from 'slugify';


interface LeagueCardProps {
    leagueName: string;
}

const description = `The Premier League is widely regarded as the most exciting football league in the world, known for its fast-paced, high-intensity matches and the incredible atmosphere in its stadiums. Every game is unpredictable, with even smaller clubs capable of defeating the biggest teams, ensuring that every fixture is thrilling. The league is home to many of the world’s best players and managers, attracting fans from all over the globe. While fans worldwide tune in to watch, being in the stadium offers a unique and unforgettable experience—the loud chants, passionate supporters, and thrilling moments create an electric atmosphere. From famous grounds like Old Trafford, Anfield, and the Emirates, the Premier League delivers unforgettable live football every week.`;

const LeagueCard: React.FC<LeagueCardProps> = ({ leagueName }) => {

    const slug = slugify(leagueName, { lower: true });
    console.log(leagueName);
    const capitalizeWords = (str: string) =>
        str
            .toLowerCase()
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-transform hover:shadow-xl hover:-translate-y-1 animate-fadeIn">
            <div className="relative group h-40 md:h-52 overflow-hidden">
                <img
                    src={`/uploads/leaguefans/${slug}.jpg`}
                    alt={slug}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4 bg-white p-1 rounded-full shadow-md">
                    <img
                        src={`/uploads/leaguelogo/${slug}.png`}
                        alt={`${slug} logo`}
                        className="h-12 w-12 object-contain"
                    />
                </div>
            </div>

            <div className="p-5 md:p-6 text-gray-800">
                <h2 className="text-2xl font-bold text-ticket-blue text-center capitalize">
                    {capitalizeWords(leagueName)} Tickets
                </h2>
                <p className="mt-4 text-sm md:text-base text-gray-700 text-justify leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default LeagueCard;