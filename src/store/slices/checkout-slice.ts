import { LotTaxInfo } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CheckoutState = {
  lotsSelected: Record<string, LotTaxInfo & { quantitySelected: number }>;
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
        Record<string, LotTaxInfo & { quantitySelected: number }>
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
