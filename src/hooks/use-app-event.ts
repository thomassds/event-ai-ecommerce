"use client";

import { selectEventBySlugAction, selectEventsUpcomingAction } from "@/actions";
import { Event, PaginatedResponse } from "@/interfaces";

interface UseAppEvent {
  selectEventsUpcoming: () => Promise<PaginatedResponse<Event>>;
  selectEventBySlug: (slug: string) => Promise<Event | null>;
}

export const useAppEvent = (): UseAppEvent => {
  const selectEventsUpcoming = async (): Promise<PaginatedResponse<Event>> => {
    const response = await selectEventsUpcomingAction();

    return {
      data: response ? response.data : [],
      page: response ? response.page : 1,
      limit: response ? response.limit : 0,
      total: response ? response.total : 0,
    };
  };

  const selectEventBySlug = async (slug: string): Promise<Event | null> => {
    const response = await selectEventBySlugAction(slug);

    return response;
  };

  return {
    selectEventsUpcoming,
    selectEventBySlug,
  };
};
