"use client";

import { DateOption, EventDetails } from "@/interfaces";
import { TicketOption } from "@/interfaces/ticket";
import { TicketSelectorErrorBoundary } from "../";
import { TicketSelectorClient } from "../selectors";

interface EventTicketCardProps {
  event: EventDetails;
  tickets: TicketOption[];
  dates: DateOption[];
}

export const EventTicketCard = ({
  event,
  tickets,
  dates,
}: EventTicketCardProps) => {
  if (!tickets || tickets.length === 0) {
    return (
      <div className="md:px-0 lg:px-0 mt-6">
        <div className="mb-6">
          <div className="text-[14px] md:text-[20px] font-normal text-gray-900 font-[Montserrat]">
            Selecionar
          </div>
          <div
            className="text-[20px] md:text-[32px] font-semibold font-[Montserrat]"
            style={{ color: "#5400D6" }}
          >
            Ingresso
          </div>
        </div>
        <div className="text-center py-8 text-gray-500">
          <p>Nenhum ingresso disponível para este evento.</p>
        </div>
      </div>
    );
  }

  return (
    <TicketSelectorErrorBoundary>
      <TicketSelectorClient
        event={event}
        tickets={tickets}
        availableDates={dates}
        isUserAuthenticated={true}
        clientId={10}
      />
    </TicketSelectorErrorBoundary>
  );
};
