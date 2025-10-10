export interface Event {
  id: number;
  name: string;
  slug: string;
  startDate: string;
  endDate: string;
  salesEndDate: string;
  location: string;
  price: number;
  image: string;
  title: string;
  link: string;
}

export interface EventDetails {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  date: {
    start: string;
    end: string;
    formatted: string;
  };
  location: {
    name: string;
    address: string;
    city: string;
    state: string;
  };
  prices: {
    min: string;
    max: string;
    label: string;
  };
  salesEndDate: string;
  categories: string[];
  organizer: {
    name: string;
    contact: string;
  };
  ticketTypes: Array<{
    id: string;
    name: string;
    price: string;
    available: boolean;
    description: string;
  }>;
  eventType: "single-day" | "multi-day";
  fullAddress?: string;
  imageMapEvent?: string;
  reservationTime?: string;
  paymentTime?: string;
  subEvents?: EventDetails[];
  // Dados adicionais para sub-eventos
  faqItems?: Array<{ id: string; title: string; content: string }>;
  eventInfo?: Array<{
    id: string;
    title: string;
    content: string | React.ReactNode;
  }>;
  videoData?: { videoUrl: string; thumbnailUrl: string; title: string };
  aboutData?: { description: string };
  acquirerId?: number;
  locationReveal?: "S" | "N";
  domainURL?: string;
}
