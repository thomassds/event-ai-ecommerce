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
