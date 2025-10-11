import { LotTaxInfo } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CheckoutState = {
  lotsSelected: Record<string, LotTaxInfo & { quantitySelected: number }>;
};

const initialState: CheckoutState = {
  lotsSelected: {},
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
  },
});

export const { setLotsSelected } = checkoutSlice.actions;
checkoutSlice.actions;

export default checkoutSlice.reducer;
