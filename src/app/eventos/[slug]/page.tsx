import { Suspense } from "react";
import {
  Banners,
  EventAboutCard,
  EventBreadcrumb,
  EventDetailPageSkeleton,
  EventInfoCard,
  EventTicketCard,
  OrderSummaryCard,
  OrderSummaryErrorBoundary,
  SalesCountdownMobileCard,
} from "@/components";
import { notFound } from "next/navigation";
import { categories, eventsDetails, tickets } from "@/mocks";
import { EventDetails, TicketOption } from "@/interfaces";
import { EventVideoCard } from "@/components/cards/event-video-card";

export default async function EventDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug || typeof slug !== "string") {
    notFound();
  }

  const event = eventsDetails.find((evt) => evt.slug === slug);
  if (!event) {
    notFound();
  }

  return (
    <div className="w-full flex flex-col">
      <Suspense fallback={<EventDetailPageSkeleton />}>
        <div className="min-h-screen bg-white">
          <div className="md:hidden px-4 py-1 border-b border-gray-300">
            <div className="max-w-7xl mx-auto">
              <SalesCountdownMobileCard
                endDate={event.salesEndDate}
                title="Término das vendas online:"
              />
            </div>
          </div>

          <EventBreadcrumb
            eventTitle={event.title}
            category={categories[0].name || "Eventos"}
          />

          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-1">
            <Banners
              banners={[
                {
                  url: event.image,
                  alt: event.title,
                  title: event.title,
                  description: `Imagem do evento ${event.title}`,
                  priority: true,
                },
              ]}
              autoPlay={false}
              className="rounded-lg overflow-hidden"
              ariaLabel={`Banner do evento ${event.title}`}
            />
          </div>

          <div className="md:hidden">
            <div className="max-w-7xl mx-auto md:px-6 lg:px-8 mb-8">
              <EventInfoCard event={event} showCountdown={true} />
            </div>
          </div>

          <MobileLayout event={event} tickets={tickets} />
          <TabletLayout event={event} tickets={tickets} />
          <DesktopLayout event={event} tickets={tickets} />

          <div className="mt-8 space-y-8">
            {event.description && (
              <div className="md:px-0 lg:px-0">
                <EventAboutCard
                  description={event.description}
                  isLoading={false}
                  error={null}
                />
              </div>
            )}
            {/* <div className="px-0 md:px-0 lg:px-0">
              <EventInfoAccordion
                items={processedEventInfo}
                isLoading={false}
                error={null}
              />
            </div> */}
            {event.videoData && (
              <div className="md:px-6 lg:px-0">
                <EventVideoCard
                  videoUrl={event.videoData.videoUrl}
                  thumbnailUrl={event.videoData.thumbnailUrl}
                  title={event.videoData.title}
                  isLoading={false}
                  error={null}
                />
              </div>
            )}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg md:hidden z-50 rounded-t-2xl">
          <OrderSummaryErrorBoundary>
            <OrderSummaryCard variant="mobile" />
          </OrderSummaryErrorBoundary>
        </div>
      </Suspense>
    </div>
  );
}

const MobileLayout = ({
  event,
  tickets,
}: {
  event: EventDetails;
  tickets: TicketOption[];
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-4 lg:px-8 mt-8 md:mt-2">
      <div className="block md:hidden space-y-8">
        <EventTicketCard event={event} tickets={tickets} dates={[]} />
      </div>
    </div>
  );
};

const TabletLayout = ({
  event,
  tickets,
}: {
  event: EventDetails;
  tickets: TicketOption[];
}) => {
  return (
    <div
      className="hidden md:block lg:hidden"
      style={{
        width: "100%",
        maxWidth: "100%",
        overflowX: "hidden",
      }}
    >
      <div className="space-y-6 w-full">
        <div className="w-full">
          <EventTicketCard event={event} tickets={tickets} dates={[]} />
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-lg w-full">
          <EventInfoCard event={event} showCountdown={true} />
        </div>

        <div className="w-full">
          <OrderSummaryErrorBoundary>
            <OrderSummaryCard />
          </OrderSummaryErrorBoundary>
        </div>
      </div>
    </div>
  );
};

const DesktopLayout = ({
  event,
  tickets,
}: {
  event: EventDetails;
  tickets: TicketOption[];
}) => {
  return (
    <div className="hidden lg:grid lg:grid-cols-3 lg:gap-12 xl:gap-16">
      <div className="lg:col-span-2 space-y-8">
        <EventTicketCard event={event} tickets={tickets} dates={[]} />
      </div>

      <div className="lg:col-span-1 lg:self-start lg:sticky lg:top-[240px] space-y-6 z-10">
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
          <EventInfoCard event={event} showCountdown={true} />
        </div>

        <OrderSummaryErrorBoundary>
          <OrderSummaryCard />
        </OrderSummaryErrorBoundary>
      </div>
    </div>
  );
};
