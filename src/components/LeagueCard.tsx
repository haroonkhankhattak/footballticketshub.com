import Image from "next/image";

interface LeagueCardProps {
    leagueName: string;
}

const description = `The Premier League is widely regarded as the most exciting football league in the world, known for its fast-paced, high-intensity matches and the incredible atmosphere in its stadiums. Every game is unpredictable, with even smaller clubs capable of defeating the biggest teams, ensuring that every fixture is thrilling. The league is home to many of the world’s best players and managers, attracting fans from all over the globe. While fans worldwide tune in to watch, being in the stadium offers a unique and unforgettable experience—the loud chants, passionate supporters, and thrilling moments create an electric atmosphere. From famous grounds like Old Trafford, Anfield, and the Emirates, the Premier League delivers unforgettable live football every week.`;


const LeagueCard: React.FC<LeagueCardProps> = ({ leagueName }) => {
    // Function to capitalize each word
    const capitalizeWords = (str: string) => {
        return str
            .toLowerCase()
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <div>
            <div className="bg-ltg-white rounded-lg border border-solid border-[rgba(238,238,238,1)] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1)]">
                <div className="relative h-32 w-full rounded-tl-lg rounded-tr-lg md:h-36">
                    <img
                        src={`/uploads/leaguefans/premier-league.jpg`}
                        alt={leagueName}
                        className="w-full h-full rounded-tl-lg rounded-tr-lg object-cover"
                    />
                </div>
                <div className="w-full">
                    <div className="p-4 text-center lg:p-6">
                        <h1 className="font-dosis text-ltg-black text-2xl font-medium capitalize lg:text-[28px] lg:leading-[36px] pb-4">
                            {capitalizeWords(leagueName)} Tickets
                        </h1>
                        <div className="font-light max-lg:text-center text-justify text-gray-500">
                            {description}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LeagueCard;
