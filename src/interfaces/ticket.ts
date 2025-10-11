import { LotTaxInfo } from "./lots";

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
