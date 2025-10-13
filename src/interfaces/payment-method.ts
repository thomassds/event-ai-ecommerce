export type PaymentMethodType =
  | "credit_card"
  | "credit_cash"
  | "credit_installment"
  | "pix";

export interface PaymentMethod {
  id: number;
  uuid: string;
  name: string;
  type: PaymentMethodType;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
