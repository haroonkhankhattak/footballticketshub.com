import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "lucide-react";
import { Listing } from "../pages/tickets/listing";

interface BasketWithTimerProps {
    listing: Listing
    expiresAt: string
    onExpire: () => void;
}

const BasketWithTimer: React.FC<BasketWithTimerProps> = ({ listing, expiresAt, onExpire }) => {

    const calculateRemainingSeconds = () => {
        const now = Date.now();
        const expires = Number(expiresAt);
        const diffInMs = expires - now;
        return Math.max(Math.floor(diffInMs / 1000), 0);
    };

    const [timeLeft, setTimeLeft] = useState(calculateRemainingSeconds);

    useEffect(() => {
        if (listing.tickets.length === 0) return;

        if (timeLeft === 0) {
            onExpire();
            return;
        }

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    onExpire();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [listing.tickets.length, onExpire, timeLeft]);


    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    return (
        <div className="flex items-center space-x-2">
            <Link
                to="/checkout"
                state={{
                    ticket: listing,
                    quantity: listing.tickets.length,
                    expiresAt: expiresAt,
                }}
                className="text-primary navbar-link px-0 py-4 flex items-center whitespace-nowrap"
            >
                <div className="relative mr-1">
                    <ShoppingCartIcon className="w-6 h-6" />
                    {listing.tickets.length > 0 && (
                        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                            {listing.tickets.length}
                        </span>
                    )}
                </div>
                <div>Basket</div>
            </Link>

            {/* Timer to the right */}
            {listing.tickets.length > 0 && (
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                    Expires in {" "}
                    <span className="font-medium inline-block w-[60px] text-left">
                        {formatTime(timeLeft)}
                    </span>
                </div>

            )}
        </div>

    );
};

export default BasketWithTimer;
