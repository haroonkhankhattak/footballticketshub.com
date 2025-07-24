import Image from "next/image";
import { CLUB_FANS } from "../lib/constants";
import { getDescriptionByTeamName } from "../pages/matches/clubs";
import { convertSlugToTeamName } from "../lib/teamUtils";

interface LeagueCardProps {
    teamName: string;
}


const TeamCard: React.FC<LeagueCardProps> = ({ teamName }) => {

    const team = convertSlugToTeamName(teamName);
    const filename = CLUB_FANS[teamName];
    const imagePath = `/uploads/teamfans/${filename}`;

    // if (teamName === "Brighton ") {
    //     imagePath = `/uploads/teamfans/brighton-hove-albion.jpg`;
    // }


    const description = getDescriptionByTeamName(teamName);

    // console.log(teamName, filename, imagePath);

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
                        src={`${imagePath}`}
                        alt={teamName}
                        className="w-full h-full rounded-tl-lg rounded-tr-lg object-cover"
                    />
                </div>
                <div className="w-full">
                    <div className="p-4 text-center lg:p-6">
                        <h1 className="font-dosis text-ltg-black text-2xl font-medium capitalize lg:text-[28px] lg:leading-[36px] pb-4">
                            {team} Tickets
                        </h1>


                        {teamName === "Liverpool" ? (
                            <div className="font-light max-lg:text-center text-justify text-gray-500">
                                {description}
                            </div>
                        ) : (
                            <div className="font-light max-lg:text-center text-justify text-gray-500">
                                {description}
                                {/* The {capitalizeWords(teamName)} is one of the most exciting football leagues in the world.
                                <strong>Tickets for the {capitalizeWords(teamName)}</strong>
                                are very popular. We've got the best tickets available for the 2024-2025 season. Grab this opportunity to watch the best league in the world live in action. */}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamCard;
