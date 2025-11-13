import { apiClient } from "@/configs/api";
import { Event, PaginatedResponse } from "@/interfaces";
import { AxiosError } from "axios";

export async function selectEventsUpcomingAction(): Promise<PaginatedResponse<Event> | null> {
  try {
    const { data } = await apiClient.get<PaginatedResponse<Event>>(
      "/events/upcoming"
    );

    return data;
  } catch {
    return null;
  }
}

export async function selectEventBySlugAction(
  slug: string,
  tenantId?: string
): Promise<Event | null> {
  try {
    console.log("Fetching event with slug:", slug, "for tenantId:", tenantId);
    const { data } = await apiClient.get<{ success: boolean; data: Event }>(
      `/events/slug/${slug}`,
      {
        headers: {
          ...(tenantId ? { "x-tenant-id": tenantId } : {}),
        },
      }
    );

    return data.data;
  } catch {
    return null;
  }
}
