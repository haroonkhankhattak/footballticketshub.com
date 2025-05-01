import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    BadgeCheck,
    MapPin,
    Smartphone,
    Flag,
    CalendarDays,
    Info,
    ShieldCheck,
    Armchair,
    Eye,
} from "lucide-react";

const OrderSummary = () => {
    return (
        <Card className="border-none shadow-lg">
            <div className="relative h-40 w-full">
                <img
                    src="/uploads/teamfans/Liverpool.webp"
                    alt="Liverpool vs Tottenham match"
                    className="object-cover w-full h-full rounded-t-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg" />
            </div>

            <CardContent className="p-6 space-y-6">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-sky-500/10 text-sky-500 text-xs font-medium rounded">
                            ENGLISH PREMIER LEAGUE
                        </span>
                    </div>
                    <h2 className="text-xl font-semibold mt-2">
                        Liverpool vs Arsenal
                    </h2>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-500">
                        <CalendarDays className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-thin">
                            Sunday, 11th May 2025 16:30
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-500">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-thin">
                            Anfield Road, Liverpool, United Kingdom
                        </span>
                    </div>
                </div>

                <div className="space-y-3 bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-emerald-600">
                        <BadgeCheck className="h-4 w-4" />
                        <span className="text-sm font-medium">
                            100% Money Back Guarantee
                        </span>
                        <Info className="h-4 w-4 text-emerald-400 cursor-help" />
                    </div>

                    <div className="flex items-center gap-2 text-emerald-600">
                        <ShieldCheck className="h-4 w-4" />
                        <span className="text-sm">Easy and secure payments</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-700 text-2xl">
                        <img
                            src="/uploads/icons/visa-pay.svg"
                            className="object-cover rounded-t-lg text-black"
                            width={32}
                            height={32}
                        />
                        <img
                            src="/uploads/icons/master-pay.svg"
                            className="object-cover rounded-t-lg text-black"
                            width={32}
                            height={32}
                        />
                        <img
                            src="/uploads/icons/apple-pay.svg"
                            className="object-cover rounded-t-lg text-black"
                            width={32}
                            height={32}
                        />
                        <img
                            src="/uploads/icons/google-pay.svg"
                            className="object-cover rounded-t-lg text-black"
                            width={32}
                            height={32}
                        />
                    </div>
                </div>

                <hr className="border-t-1 border-dashed border-gray-400" />

                <div className="space-y-1">
                    <div className="flex items-start gap-2 text-gray-500">
                        <Smartphone className="h-4 w-4 text-gray-500 mt-1" />

                        <div className="flex flex-col">
                            <span className="text-sm font-semibold">E-Tickets</span>
                            <span className="text-sm font-thin">
                                Digital tickets (usually E-Ticket) will be sent to you digitaly.
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-2 text-gray-500">
                        <Flag className="h-4 w-4 text-gray-500 mt-1" />

                        <div className="flex flex-col">
                            <span className="text-sm font-semibold">Area / Section</span>
                            <span className="text-sm font-thin">KENNY DALGLISH STAND LOWER TIER KJ</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-2 text-gray-500">
                        <Armchair className="h-4 w-4 text-gray-500 mt-1" />

                        <div className="flex flex-col">
                            <span className="text-sm font-semibold">Seats</span>
                            <span className="text-sm font-thin">
                                Seats will NOT be next to each other.
                            </span>
                        </div>
                    </div>
                </div>

                <hr className="border-t-1 border-dashed border-gray-400" />

                <div className="space-y-1">
                    <div className="flex font-light justify-between text-gray-500">
                        <span>Price per ticket</span>
                        <span className="font-semibold">£675.00</span>
                    </div>

                    <div className="flex font-light justify-between text-gray-500">
                        <span>Quantity</span>
                        <span className="font-semibold">1x</span>
                    </div>

                    <div className="flex font-light justify-between text-gray-500">
                        <span>Service Fee + Tax</span>
                        <span className="font-semibold">£202.50</span>
                    </div>

                    <hr className="border-t-1 border-dashed border-gray-400" />

                    <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>£877.50</span>
                    </div>
                </div>

                <div className="w-100 h-20 border bg-white p-2 flex gap-0.5 justify-center items-end">
                    {Array.from({ length: 80 }).map((_, i) => (
                        <div
                            key={i}
                            className={`h-full ${i % 3 === 0
                                ? "w-1 bg-ticket-darkgray"
                                : i % 2 === 0
                                    ? "w-0.5 bg-black"
                                    : "w-0.5 bg-gray-200"
                                }`}></div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default OrderSummary;
