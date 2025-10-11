import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Theme = "light" | "dark";

type UiState = {
  theme: Theme;
  isMenuOpen: boolean;
};

const initialState: UiState = {
  theme: "light",
  isMenuOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    toggleMenu(state) {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setMenuOpen(state, action: PayloadAction<boolean>) {
      state.isMenuOpen = action.payload;
    },
  },
});

export const { toggleTheme, setTheme, toggleMenu, setMenuOpen } =
  uiSlice.actions;

export default uiSlice.reducer;
