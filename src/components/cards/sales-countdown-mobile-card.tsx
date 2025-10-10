"use client";

import { useState, useEffect, useCallback } from "react";
import { ClockIcon } from "@phosphor-icons/react/dist/ssr";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface SalesCountdownProps {
  endDate: string;
  title?: string;
  className?: string;
}

const calculateTimeLeft = (endDate: string): TimeLeft => {
  const difference = Math.max(0, +new Date(endDate) - Date.now());

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

export const SalesCountdownMobileCard = ({
  endDate,
  title = "Término das vendas online:",
  className = "",
}: SalesCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(endDate)
  );

  const updateTimer = useCallback(() => {
    setTimeLeft(calculateTimeLeft(endDate));
  }, [endDate]);

  useEffect(() => {
    updateTimer();

    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [updateTimer]);

  return (
    <div className={`flex items-center gap-3 px-1 py-4 ${className}`}>
      <ClockIcon size={20} color="#5400D6" />

      <div className="flex items-center justify-between flex-1">
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-600">
            <span className="hidden sm:inline">{title}</span>
            <div className="sm:hidden">
              <div>Término das</div>
              <div>vendas online:</div>
            </div>
          </div>
          <span className="text-gray-600">:</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-center">
            <div
              className="text-lg font-bold text-primary leading-none"
              suppressHydrationWarning
            >
              {String(timeLeft.days).padStart(2, "0")}
            </div>
            <div className="text-xs text-gray-600 mt-1">Dias</div>
          </div>

          <span className="text-gray-300 font-bold self-start mt-1">:</span>

          <div className="text-center">
            <div
              className="text-lg font-bold text-primary leading-none"
              suppressHydrationWarning
            >
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <div className="text-xs text-gray-600 mt-1">Horas</div>
          </div>

          <span className="text-gray-300 font-bold self-start mt-1">:</span>

          <div className="text-center">
            <div
              className="text-lg font-bold text-primary leading-none"
              suppressHydrationWarning
            >
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <div className="text-xs text-gray-600 mt-1">Min</div>
          </div>

          <span className="text-gray-300 font-bold self-start mt-1">:</span>

          <div className="text-center">
            <div
              className="text-lg font-bold text-primary leading-none"
              suppressHydrationWarning
            >
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
            <div className="text-xs text-gray-600 mt-1">Seg</div>
          </div>
        </div>
      </div>
    </div>
  );
};
