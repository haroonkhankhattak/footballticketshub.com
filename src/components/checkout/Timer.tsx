import React, { useState, useEffect } from "react";
import { Timer as TimerIcon } from "lucide-react";
import { Alert, AlertDescription } from "../../components/ui/alert";

import { useRouter } from 'next/navigation';

interface TimerProps {
  initialMinutes: number;
  initialSeconds: number;
}

const Timer: React.FC<TimerProps> = ({ initialMinutes, initialSeconds }) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1);
      } else if (minutes > 0) {
        setMinutes((prev) => prev - 1);
        setSeconds(59);
      } else {
        clearInterval(timer);
        router.back(); 
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes, seconds, router]);

  return (
    <Alert className="max-w-7xl mx-auto bg-white shadow-lg">
      <div className="flex items-center gap-3">
        <TimerIcon className="h-5 w-5 text-ticket-red animate-pulse" />
        <AlertDescription className="text-xs sm:text-base text-gray-700">
          The tickets are reserved for you.
          <span className="font-semibold ml-1">
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds} &nbsp;
          </span>
          remaining to finish your order.
        </AlertDescription>
      </div>
    </Alert>
  );
};

export default Timer;
