import { Category } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CategoryState = {
  categories?: Category[];
};

const initialState: CategoryState = {
  categories: undefined,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = categorySlice.actions;

export default categorySlice.reducer;
