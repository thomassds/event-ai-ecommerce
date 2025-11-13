import { Lot, LotTaxInfo } from "./lots";

export enum TicketSex {
  MALE = "MALE",
  FEMALE = "FEMALE",
  UNISEX = "UNISEX",
}

export enum TicketEntryType {
  FREE = "FREE",
  PAID = "PAID",
  INVITE = "INVITE",
}

export interface Ticket {
  id: string;
  tenantId: string;
  eventId: string;
  sectorId: string;
  companyId: string;
  name: string;
  description?: string;
  sex: TicketSex;
  entryType: TicketEntryType;
  startSaleDate: Date;
  endSaleDate: Date;
  automaticLotRollover: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  lots?: Lot[];
}

export interface TicketVariation {
  id: string;
  name: string;
  lote: string;
  price: number;
  priceFormatted: string;
  available: boolean;
  maxQuantity: number;
  sectorId: number;
  lotId: string;
  lotTaxInfo?: LotTaxInfo;
}

export interface TicketOption {
  id: string;
  name: string;
  price: string;
  available: boolean;
  description?: string;
  color: string;
  variations: TicketVariation[];
}
