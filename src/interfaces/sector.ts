import { Ticket } from "./ticket";

export interface Sector {
  id: string;
  tenantId: string;
  eventId: string;
  companyId: string;
  name: string;
  slug: string;
  capacity: number;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  tickets?: Ticket[];
}
