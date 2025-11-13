"use client";

import {
  setIsProcessingPayment,
  setLotsSelected,
} from "@/store/slices/checkout-slice";
import { useAppDispatch } from "./use-app-dispatch";
import { useAppSelector } from "./use-app-selector";
import { Lot, LotTaxInfo, Ticket } from "@/interfaces";
import { useRouter } from "next/navigation";

interface UseAppCheckoutReturn {
  lotsSelected: Record<
    string,
    Lot & { quantitySelected: number; ticketName: string }
  >;
  addLotSelected: (lot: Lot, quantity: number, ticket?: Ticket) => void;
  removeLotSelected: (lotId: string) => void;
  calculateResume: () => {
    subtotal: number;
    adminTax: number;
    discount: number;
    finalTotal: number;
  };
  isProcessingPayment: boolean;
  handleProcessPayment: () => void;
}

export const useAppCheckout = (): UseAppCheckoutReturn => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { lotsSelected, isProcessingPayment } = useAppSelector(
    (state) => state.checkout
  );

  const addLotSelected = (lot: Lot, quantity: number, ticket?: Ticket) => {
    const lotAlreadySelected = lotsSelected[lot.id];
    if (lotAlreadySelected && lotAlreadySelected.quantitySelected > 0) {
      const newlotSelected = {
        ...lotsSelected,
        [lot.id]: {
          ...lot,
          quantitySelected: lotAlreadySelected.quantitySelected + quantity,
          ticketName: lotAlreadySelected.ticketName,
        },
      };

      return dispatch(setLotsSelected(newlotSelected));
    }

    return dispatch(
      setLotsSelected({
        ...lotsSelected,
        [lot.id]: {
          ...lot,
          quantitySelected: quantity,
          ticketName: ticket ? ticket.name : "",
        },
      })
    );
  };

  const removeLotSelected = (lotId: string) => {
    const lotAlreadySelected = lotsSelected[lotId];

    if (!lotAlreadySelected) return;

    if (lotAlreadySelected && lotAlreadySelected.quantitySelected > 1) {
      const newlotSelected = {
        ...lotsSelected,
        [lotId]: {
          ...lotAlreadySelected,
          quantitySelected: lotAlreadySelected.quantitySelected - 1,
        },
      };

      return dispatch(setLotsSelected(newlotSelected));
    }

    const newLotsSelected = { ...lotsSelected };
    delete newLotsSelected[lotId];

    return dispatch(setLotsSelected(newLotsSelected));
  };

  const calculateResume = () => {
    const subtotal = Object.values(lotsSelected).reduce((acc, lot) => {
      return acc + lot.price * lot.quantitySelected;
    }, 0);

    const adminTax = Object.values(lotsSelected).reduce((acc, lot) => {
      if (lot.taxType === "P") {
        const taxAdm = lot.price * (lot.taxAdm / 100);

        return acc + taxAdm * lot.quantitySelected;
      }

      return acc + lot.taxAdm * lot.quantitySelected;
    }, 0);

    const discount = 0;

    const finalTotal = subtotal + adminTax - discount;

    return { subtotal, adminTax, discount, finalTotal };
  };

  const handleProcessPayment = async () => {
    try {
      dispatch(setIsProcessingPayment(true));

      await new Promise((resolve) => setTimeout(resolve, 2000));

      router.push("/checkout/success");

      dispatch(setIsProcessingPayment(false));
      dispatch(setLotsSelected({}));
    } catch (error) {
      console.log(error);
      dispatch(setIsProcessingPayment(false));
    }
  };

  return {
    lotsSelected,
    addLotSelected,
    removeLotSelected,
    calculateResume,
    isProcessingPayment,
    handleProcessPayment,
  };
};
