import { EventCard } from "@/components";
import { Event } from "@/interfaces";
import { events } from "@/mocks";
import { type Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const title = `My Ticket - Compre Ingressos Online para Eventos, Shows e Espetáculos`;
    const description = `My Ticket - Compre ingressos online para eventos, shows e espetáculos. Encontre os melhores eventos na sua cidade com segurança e praticidade!`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
        locale: "pt_BR",
        siteName: "myticket",
        url: "https://www.myticket.com.br",
        images: [
          {
            url: "/logo.svg",
            width: 1200,
            height: 630,
            alt: `MyTicket - Plataforma de Ingressos Online`,
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
        canonical: "https://www.myticket.com.br",
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    return {
      title:
        "My Ticket - Compre Ingressos Online para Eventos, Shows e Espetáculos",
      description:
        "My Ticket - Compre ingressos online para eventos, shows e espetáculos. Encontre os melhores eventos na sua cidade com segurança e praticidade!",
      robots: {
        index: true,
        follow: true,
      },
    };
  }
}

export default async function Home() {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full mx-auto flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Eventos</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
