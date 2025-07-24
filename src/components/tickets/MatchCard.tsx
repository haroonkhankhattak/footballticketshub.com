import React from "react";
import { Calendar, MapPin } from "lucide-react";

interface MatchCardProps {
    filename: string;
}

export default function MatchCard({ filename }: MatchCardProps) {
    const backgroundImage = `/uploads/teamfans/${filename}`;

    return (
        <div
            className="relative w-full h-[400px] bg-cover bg-center flex items-center justify-center"
            style={{
                backgroundImage: `url(${backgroundImage})`,
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>

            {/* Content */}
            <div className="relative z-10 flex items-center gap-10 max-w-5xl w-full px-6">
                {/* Info Card */}
                {/* <div className="bg-white/10 backdrop-blur-md text-white p-6 rounded-xl shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-1">Liverpool vs AFC Bournemouth</h2>
                    <p className="text-blue-400 text-sm font-semibold mb-4">PREMIER LEAGUE</p>
                    <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5" />
                        <span>15 Aug 2025 · 08:00 PM</span>
                    </div>
                    <div className="flex items-center gap-2 mb-6">
                        <MapPin className="w-5 h-5" />
                        <span>Anfield, Liverpool</span>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg font-medium">
                        Buy Tickets
                    </button>
                </div> */}

                {/* Team Logos */}
                <div className="hidden md:flex flex-col items-center justify-center">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg"
                        alt="Liverpool"
                        className="w-24 h-24 object-contain mb-2"
                    />
                    <span className="text-white font-bold text-xl mb-2">VS</span>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/en/e/e5/AFC_Bournemouth_%282013%29.svg"
                        alt="Bournemouth"
                        className="w-24 h-24 object-contain"
                    />
                </div>
            </div>
        </div>
    );
}
