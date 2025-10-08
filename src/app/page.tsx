import { EventCard } from "@/components";
import { Event } from "@/interfaces";
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
  const events: Event[] = [
    {
      id: 1,
      name: "Beach Tennis",
      slug: "beach-tennis",
      startDate: "10-09-2025",
      endDate: "11-09-2025",
      location: "Praia",
      price: 50,
      image: "/events/beach01.jpg",
      title: "Campeonato de Beach Tennis na Praia",
      link: "/events/beach-tennis",
    },
    {
      id: 2,
      name: "FuteVolei",
      slug: "futevolei",
      startDate: "09-09-2025",
      endDate: "09-09-2025",
      location: "Praia",
      price: 50,
      image: "/events/beach02.jpg",
      title: "Campeonato de Beach Tennis na Praia",
      link: "/events/futevolei",
    },
    {
      id: 3,
      name: "Volei de Areia",
      slug: "volei-de-areia",
      startDate: "02-09-2025",
      endDate: "03-09-2025",
      location: "Praia",
      price: 50,
      image: "events/beach03.jpg",
      title: "Campeonato de Beach Tennis 6k Premio",
      link: "/events/volei-de-areia",
    },
    {
      id: 4,
      name: "Beach Tennis",
      slug: "beach-tennis",
      startDate: "10-09-2025",
      endDate: "11-09-2025",
      location: "Praia",
      price: 50,
      image: "/events/beach01.jpg",
      title: "Campeonato de Beach Tennis na Praia",
      link: "/events/beach-tennis",
    },
    {
      id: 5,
      name: "FuteVolei",
      slug: "futevolei",
      startDate: "09-09-2025",
      endDate: "09-09-2025",
      location: "Praia",
      price: 50,
      image: "/events/beach02.jpg",
      title: "Campeonato de Beach Tennis na Praia",
      link: "/events/futevolei",
    },
    {
      id: 6,
      name: "Volei de Areia",
      slug: "volei-de-areia",
      startDate: "02-09-2025",
      endDate: "03-09-2025",
      location: "Praia",
      price: 50,
      image: "events/beach03.jpg",
      title: "Campeonato de Beach Tennis 6k Premio",
      link: "/events/volei-de-areia",
    },
    {
      id: 7,
      name: "Beach Tennis",
      slug: "beach-tennis",
      startDate: "10-09-2025",
      endDate: "11-09-2025",
      location: "Praia",
      price: 50,
      image: "/events/beach01.jpg",
      title: "Campeonato de Beach Tennis na Praia",
      link: "/events/beach-tennis",
    },
    {
      id: 8,
      name: "FuteVolei",
      slug: "futevolei",
      startDate: "09-09-2025",
      endDate: "09-09-2025",
      location: "Praia",
      price: 50,
      image: "/events/beach02.jpg",
      title: "Campeonato de Beach Tennis na Praia",
      link: "/events/futevolei",
    },
    {
      id: 9,
      name: "Volei de Areia",
      slug: "volei-de-areia",
      startDate: "02-09-2025",
      endDate: "03-09-2025",
      location: "Praia",
      price: 50,
      image: "events/beach03.jpg",
      title: "Campeonato de Beach Tennis 6k Premio",
      link: "/events/volei-de-areia",
    },
  ];

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
