import Image from "next/image";
import { CLUB_FANS } from "../lib/constants";
import { getDescriptionByTeamName } from "../lib/constants/clubs";
import { convertSlugToTeamName } from "../lib/teamUtils";

interface LeagueCardProps {
    teamName: string;
}

const TeamCard: React.FC<LeagueCardProps> = ({ teamName }) => {
    const team = convertSlugToTeamName(teamName);
    const filename = CLUB_FANS[teamName];
    const imagePath = `/uploads/teamfans/${filename}`;
    const description = getDescriptionByTeamName(teamName);

    return (
        <div className="relative group">
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-white">
                {/* Top Image */}
                <div className="relative h-40 md:h-48 lg:h-52 w-full overflow-hidden">
                    <img
                        src={imagePath}
                        alt={team}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
                    <div className="absolute top-4 left-4 bg-white p-1 rounded-full shadow-md">
                        <img
                            src={`/uploads/teamlogo/${teamName}.svg`}
                            alt={`${teamName} logo`}
                            className="h-12 w-12 object-contain"
                        />
                    </div>
                    <h2 className="absolute bottom-3 left-4 text-white font-bold text-xl drop-shadow-md">
                        {team}
                    </h2>
                </div>

                {/* Content */}
                <div className="px-5 py-6">
                    <h3 className="text-xl font-bold text-ticket-blue text-center mb-3">
                        {team} Tickets
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed text-justify">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TeamCard;