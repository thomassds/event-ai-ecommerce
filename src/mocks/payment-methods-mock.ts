import { PaymentMethod } from "@/interfaces";

export const paymentMethodsMock: PaymentMethod[] = [
  {
    id: 1,
    uuid: "uuid-1",
    name: "Cartão de Crédito",
    type: "credit_card",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    uuid: "uuid-2",
    name: "PIX",
    type: "pix",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
