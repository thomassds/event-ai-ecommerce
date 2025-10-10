"use client";

import { useState, useEffect, useCallback, useMemo, memo } from "react";
import {
  IconContext,
  CalendarIcon,
  MapPinIcon,
  InstagramLogoIcon,
  FacebookLogoIcon,
  TiktokLogoIcon,
  ShareFatIcon,
  ClockIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import { toast } from "sonner";
import { EventDetails } from "@/interfaces";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface EventInfoCardProps {
  event: EventDetails;
  showCountdown?: boolean;
}

const calculateTimeLeft = (endDate: string): TimeLeft => {
  const now = new Date().getTime();
  const target = new Date(endDate).getTime();
  const difference = target - now;

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }
  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
};

export const EventInfoCard = memo(
  ({ event, showCountdown = false }: EventInfoCardProps) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
      showCountdown
        ? calculateTimeLeft(event.salesEndDate)
        : { days: 0, hours: 0, minutes: 0, seconds: 0 }
    );

    const updateTimer = useCallback(() => {
      if (showCountdown) {
        setTimeLeft(calculateTimeLeft(event.salesEndDate));
      }
    }, [event.salesEndDate, showCountdown]);

    useEffect(() => {
      if (showCountdown) {
        updateTimer();
        const timer = setInterval(updateTimer, 1000);
        return () => clearInterval(timer);
      }
    }, [updateTimer, showCountdown]);

    const iconContextValue = useMemo(
      () => ({
        size: 20,
        color: "#5400D6",
        className: "flex-shrink-0",
      }),
      []
    );

    const handleShare = async (platform?: string) => {
      const url = window.location.href;
      const title = event.title;
      const text = `Confira este evento: ${title}`;

      if (platform === "instagram") {
        await navigator.clipboard.writeText(url);
        window.open("https://www.instagram.com/", "_blank");
        return;
      }
      if (platform === "whatsapp") {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
          `Confira este evento que eu achei no Ingressos WEB: ${title}\n${url}`
        )}`;
        window.open(whatsappUrl, "_blank");
        return;
      }

      if (platform === "facebook") {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        window.open(facebookUrl, "_blank");
        return;
      }

      if (platform === "tiktok") {
        await navigator.clipboard.writeText(url);
        window.open("https://www.tiktok.com/", "_blank");
        return;
      }
      if (navigator.share) {
        try {
          await navigator.share({ title, text, url });
        } catch (err) {
          console.error("Erro ao compartilhar:", err);
          await navigator.clipboard.writeText(url);
          toast("Link copiado para a área de transferência!");
        }
      } else {
        await navigator.clipboard.writeText(url);
        toast("Link copiado para a área de transferência!");
      }
    };

    return (
      <IconContext.Provider value={iconContextValue}>
        <div className="flex flex-col items-start mx-4 -mt-40 md:mt-0 md:mx-0 relative z-10 max-w-[calc(100vw-32px)] md:max-w-none p-4 md:p-4 lg:p-6 rounded-lg bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.30),0px_1px_3px_rgba(0,0,0,0.15)]">
          <h1
            className="text-lg font-semibold leading-6 m-0 font-[Montserrat]"
            style={{ color: "#5400D6" }}
          >
            {event.title}
          </h1>

          <div className="flex items-center w-full gap-2 mt-7">
            <CalendarIcon />
            <span className="text-gray-500 text-sm">
              {event.date.formatted}
            </span>
          </div>

          <div className="flex items-center w-full gap-2 mt-7">
            <MapPinIcon />
            <span className="text-gray-500 text-sm">
              {event.location.city}, {event.location.state}
            </span>
          </div>

          {showCountdown && (
            <div className="flex items-center w-full gap-2 mt-7">
              <ClockIcon />
              <div className="flex items-center justify-between flex-1">
                <div className="text-sm text-gray-600">
                  <div>Término das</div>
                  <div>vendas online:</div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="text-center">
                    <div
                      className="text-lg font-bold leading-none"
                      style={{ color: "#5400D6" }}
                      suppressHydrationWarning
                    >
                      {String(timeLeft.days).padStart(2, "0")}
                    </div>
                    <div className="text-xs text-gray-600">Dias</div>
                  </div>
                  <span className="text-gray-300 font-bold self-start">:</span>
                  <div className="text-center">
                    <div
                      className="text-lg font-bold leading-none"
                      style={{ color: "#5400D6" }}
                      suppressHydrationWarning
                    >
                      {String(timeLeft.hours).padStart(2, "0")}
                    </div>
                    <div className="text-xs text-gray-600">Horas</div>
                  </div>
                  <span className="text-gray-300 font-bold self-start">:</span>
                  <div className="text-center">
                    <div
                      className="text-lg font-bold leading-none"
                      style={{ color: "#5400D6" }}
                      suppressHydrationWarning
                    >
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </div>
                    <div className="text-xs text-gray-600">Min</div>
                  </div>
                  <span className="text-gray-300 font-bold self-start">:</span>
                  <div className="text-center">
                    <div
                      className="text-lg font-bold leading-none"
                      style={{ color: "#5400D6" }}
                      suppressHydrationWarning
                    >
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </div>
                    <div className="text-xs text-gray-600">Seg</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <hr className="w-full border-t border-gray-200 my-0 mt-7" />

          <div className="flex items-center w-full gap-2 mt-4">
            <ShareFatIcon />
            <span className="text-gray-500 text-sm font-medium">
              Compartilhe:
            </span>
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => handleShare("instagram")}
                className="hover:opacity-70 transition-opacity cursor-pointer"
                aria-label="Compartilhar no Instagram"
              >
                <InstagramLogoIcon size={24} color="#5400D6" />
              </button>
              <button
                onClick={() => handleShare("whatsapp")}
                className="hover:opacity-70 transition-opacity cursor-pointer"
                aria-label="Compartilhar no Whatsapp"
              >
                <WhatsappLogoIcon size={24} color="#5400D6" />
              </button>

              <button
                onClick={() => handleShare("facebook")}
                className="hover:opacity-70 transition-opacity cursor-pointer"
                aria-label="Compartilhar no Facebook"
              >
                <FacebookLogoIcon size={24} color="#5400D6" />
              </button>
              <button
                onClick={() => handleShare("tiktok")}
                className="hover:opacity-70 transition-opacity cursor-pointer"
                aria-label="Compartilhar no TikTok"
              >
                <TiktokLogoIcon size={24} color="#5400D6" />
              </button>
            </div>
          </div>
        </div>
      </IconContext.Provider>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.event.id === nextProps.event.id &&
      prevProps.event.title === nextProps.event.title &&
      prevProps.event.date.start === nextProps.event.date.start &&
      prevProps.event.date.end === nextProps.event.date.end &&
      prevProps.event.location.city === nextProps.event.location.city &&
      prevProps.event.location.state === nextProps.event.location.state &&
      prevProps.event.salesEndDate === nextProps.event.salesEndDate &&
      prevProps.showCountdown === nextProps.showCountdown
    );
  }
);
EventInfoCard.displayName = "EventInfoCard";
