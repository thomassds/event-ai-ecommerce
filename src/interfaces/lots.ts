export enum LotPreTaxAdm {
  BEFORE = "BEFORE",
  AFTER = "AFTER",
}

export interface Lot {
  id: string;
  tenantId: string;
  eventId: string;
  ticketId: string;
  sectorId?: string;
  companyId: string;
  name: string;
  order: number;
  startSaleDate: Date;
  endSaleDate: Date;
  price: number;
  preTaxAdm: LotPreTaxAdm;
  taxType: "P" | "F";
  taxAdm: number;
  amount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface LotTaxInfo {
  id: string;
  uuid: string;
  name: string;
  price: number; // Preço base (sem taxa)
  typeTaxAdm: "P" | "F"; // P = Percentual, F = Fixo
  taxAdm: number; // Valor da taxa (% ou valor fixo)
  calculatedPrice: number; // Preço final (base + taxa)
  availableQuantity: number;
  startDate: string;
  endDate: string;
  status: string;
  order: number;
  ticketId: number;
}
