import { Tenant } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TenantState = {
  tenant: Tenant | null;
};

const initialState: TenantState = {
  tenant: null,
};

const tenantSlice = createSlice({
  name: "tenant",
  initialState,
  reducers: {
    setTenant(state, action: PayloadAction<Tenant | null>) {
      state.tenant = action.payload;
    },
  },
});

export const { setTenant } = tenantSlice.actions;

export default tenantSlice.reducer;
