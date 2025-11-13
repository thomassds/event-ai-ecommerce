import { Lot } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CheckoutState = {
  lotsSelected: Record<
    string,
    Lot & { quantitySelected: number; ticketName: string }
  >;
  isProcessingPayment: boolean;
};

const initialState: CheckoutState = {
  lotsSelected: {},
  isProcessingPayment: false,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setLotsSelected(
      state,
      action: PayloadAction<
        Record<string, Lot & { quantitySelected: number; ticketName: string }>
      >
    ) {
      state.lotsSelected = action.payload;
    },
    setIsProcessingPayment(state, action: PayloadAction<boolean>) {
      state.isProcessingPayment = action.payload;
    },
  },
});

export const { setLotsSelected, setIsProcessingPayment } =
  checkoutSlice.actions;

export default checkoutSlice.reducer;
