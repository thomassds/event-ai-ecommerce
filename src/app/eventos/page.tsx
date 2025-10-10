import {
  EventCard,
  EventSearchBreadcrumb,
  VerticalBanners,
  EventsPageSkeleton,
} from "@/components";
import { banners, events } from "@/mocks";
import { type Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const title = `Beach Ticket - Compre Ingressos Online para Eventos, Shows e Espetáculos`;
    const description = `Beach Ticket - Compre ingressos online para eventos, shows e espetáculos. Encontre os melhores eventos na sua cidade com segurança e praticidade!`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
        locale: "pt_BR",
        siteName: "beachticket",
        url: "https://www.beachticket.com.br",
        images: [
          {
            url: "/logo.svg",
            width: 1200,
            height: 630,
            alt: `beachticket - Plataforma de Ingressos Online`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [""],
      },
      alternates: {
        canonical: "https://www.beachticket.com.br",
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    return {
      title:
        "Beach Ticket - Compre Ingressos Online para Eventos, Shows e Espetáculos",
      description:
        "Beach Ticket - Compre ingressos online para eventos, shows e espetáculos. Encontre os melhores eventos na sua cidade com segurança e praticidade!",
      robots: {
        index: true,
        follow: true,
      },
    };
  }
}

export default async function Events() {
  return (
    <Suspense fallback={<EventsPageSkeleton />}>
      <div className="w-full flex flex-col">
        <div className="w-full mx-auto flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Buscar Eventos</h1>
          <EventSearchBreadcrumb />

          <div className="flex gap-4 justify-between">
            {/* <EventFilter /> */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            <div className="hidden xl:block w-60">
              <VerticalBanners
                intervalTime={5000}
                ariaLabel="Banners promocionais de eventos"
                banners={banners.map((banner) => ({
                  url: banner.url,
                  alt: banner.alt,
                  title: banner.title,
                  description: banner.description,
                  link: banner.link,
                  priority: banner.priority,
                }))}
              />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
