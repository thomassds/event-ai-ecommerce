import { EventStatusEnum } from "@/enums";
import { House } from "./house";
import { Sector } from "./sector";

export interface Event {
  id: string;
  tenantId: string;
  companyId: string;
  categoryId?: string;
  houseId?: string;
  name: string;
  description: string;
  slug: string;
  thumbnail?: string;
  banner?: string;
  startAt: Date;
  endAt: Date;
  startSaleAt: Date;
  endSaleAt: Date;
  openDoorAt?: Date;
  isPublic: boolean;
  showWebsite?: string;
  status: EventStatusEnum;
  house?: House;
  sectors?: Sector[];
  createdAt: Date;
  updatedAt: Date;
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
