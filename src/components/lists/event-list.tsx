"use client";

import { EventCard } from "../cards";
import { EventCardSkeleton } from "../skeletons";
import { useEffect, useState } from "react";
import { useAppEvent } from "@/hooks";
import { Event } from "@/interfaces";

export const EventList = () => {
  const { selectEventsUpcoming } = useAppEvent();

  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  const handleLoadEvents = async () => {
    setIsLoading(true);
    const selectEvents = await selectEventsUpcoming();

    setEvents(selectEvents.data);

    setIsLoading(false);
  };

  useEffect(() => {
    handleLoadEvents();

    return () => {
      setEvents([]);
    };
  }, []);

  if (isLoading) {
    return (
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <EventCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};
